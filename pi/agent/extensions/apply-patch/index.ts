import { renderDiff as renderAnsiDiff, type ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { Container, Text } from "@earendil-works/pi-tui";
import { Type } from "typebox";
import type { Static } from "typebox";
import { mkdir, readFile, stat, unlink, writeFile } from "node:fs/promises";
import * as path from "node:path";

const PARAMETERS = Type.Object({
	patch: Type.String({
		description:
			"A complete apply_patch patch. Must start with *** Begin Patch and end with *** End Patch.",
	}),
});

type ApplyPatchParams = Static<typeof PARAMETERS>;

type UpdateFileChunk = {
	changeContext: string | undefined;
	oldLines: string[];
	newLines: string[];
	isEndOfFile: boolean;
};

type Hunk =
	| { type: "add"; path: string; contents: string }
	| { type: "delete"; path: string }
	| { type: "update"; path: string; movePath: string | undefined; chunks: UpdateFileChunk[] };

type AffectedPaths = {
	added: string[];
	modified: string[];
	deleted: string[];
};

type PlannedChange =
	| { type: "add"; path: string; absolutePath: string; newContent: string }
	| { type: "delete"; path: string; absolutePath: string; oldContent: string }
	| {
			type: "update";
			path: string;
			absolutePath: string;
			movePath: string | undefined;
			absoluteMovePath: string | undefined;
			oldContent: string;
			newContent: string;
		};

type PreviewFile = {
	type: PlannedChange["type"];
	path: string;
	movePath: string | undefined;
	additions: number;
	removals: number;
	diff: string;
};

type ApplyPatchDetails = {
	affected: AffectedPaths;
	preview: PreviewFile[];
	stats: { additions: number; removals: number };
};

type ApplyPatchRenderState = {
	details: ApplyPatchDetails;
	status: "pending" | "applied" | "failed";
};

const renderStates = new Map<string, ApplyPatchRenderState>();

class ApplyPatchError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "ApplyPatchError";
	}
}

const BEGIN_PATCH_MARKER = "*** Begin Patch";
const END_PATCH_MARKER = "*** End Patch";
const ENVIRONMENT_ID_MARKER = "*** Environment ID: ";
const ADD_FILE_MARKER = "*** Add File: ";
const DELETE_FILE_MARKER = "*** Delete File: ";
const UPDATE_FILE_MARKER = "*** Update File: ";
const MOVE_TO_MARKER = "*** Move to: ";
const EOF_MARKER = "*** End of File";
const CHANGE_CONTEXT_MARKER = "@@ ";
const EMPTY_CHANGE_CONTEXT_MARKER = "@@";

function parsePatch(patch: string): Hunk[] {
	const lines = stripOptionalHeredoc(patch.trim().split(/\r?\n/));
	const firstLine = lines.at(0)?.trim();
	const lastLine = lines.at(-1)?.trim();

	if (firstLine !== BEGIN_PATCH_MARKER) {
		throw new ApplyPatchError("Invalid patch: The first line of the patch must be '*** Begin Patch'");
	}
	if (lastLine !== END_PATCH_MARKER) {
		throw new ApplyPatchError("Invalid patch: The last line of the patch must be '*** End Patch'");
	}

	let remaining = lines.slice(1, -1);
	let lineNumber = 2;
	const firstHunkLine = remaining.at(0);
	if (firstHunkLine?.trimStart().startsWith(ENVIRONMENT_ID_MARKER)) {
		const environmentId = firstHunkLine.trimStart().slice(ENVIRONMENT_ID_MARKER.length).trim();
		if (!environmentId) {
			throw new ApplyPatchError("Invalid patch: apply_patch environment_id cannot be empty");
		}
		remaining = remaining.slice(1);
		lineNumber += 1;
	}

	const hunks: Hunk[] = [];
	while (remaining.length > 0) {
		const parsed = parseOneHunk(remaining, lineNumber);
		hunks.push(parsed.hunk);
		remaining = remaining.slice(parsed.linesParsed);
		lineNumber += parsed.linesParsed;
	}
	return hunks;
}

function stripOptionalHeredoc(lines: string[]): string[] {
	const first = lines.at(0);
	const last = lines.at(-1);
	if (
		(first === "<<EOF" || first === "<<'EOF'" || first === '<<"EOF"') &&
		last?.endsWith("EOF") &&
		lines.length >= 4
	) {
		return lines.slice(1, -1);
	}
	return lines;
}

function parseOneHunk(lines: string[], lineNumber: number): { hunk: Hunk; linesParsed: number } {
	const firstLine = lines[0]?.trim();
	if (firstLine === undefined) {
		throw new ApplyPatchError(`Invalid patch hunk on line ${lineNumber}: missing hunk header`);
	}

	const addPath = firstLine.startsWith(ADD_FILE_MARKER) ? firstLine.slice(ADD_FILE_MARKER.length) : undefined;
	if (addPath !== undefined) {
		let contents = "";
		let parsedLines = 1;
		for (const addLine of lines.slice(1)) {
			if (!addLine.startsWith("+")) break;
			contents += `${addLine.slice(1)}\n`;
			parsedLines += 1;
		}
		return { hunk: { type: "add", path: addPath, contents }, linesParsed: parsedLines };
	}

	const deletePath = firstLine.startsWith(DELETE_FILE_MARKER)
		? firstLine.slice(DELETE_FILE_MARKER.length)
		: undefined;
	if (deletePath !== undefined) {
		return { hunk: { type: "delete", path: deletePath }, linesParsed: 1 };
	}

	const updatePath = firstLine.startsWith(UPDATE_FILE_MARKER)
		? firstLine.slice(UPDATE_FILE_MARKER.length)
		: undefined;
	if (updatePath !== undefined) {
		let remaining = lines.slice(1);
		let parsedLines = 1;
		let movePath: string | undefined;
		const moveLine = remaining.at(0);
		if (moveLine?.startsWith(MOVE_TO_MARKER)) {
			movePath = moveLine.slice(MOVE_TO_MARKER.length);
			remaining = remaining.slice(1);
			parsedLines += 1;
		}

		const chunks: UpdateFileChunk[] = [];
		while (remaining.length > 0) {
			const currentLine = remaining[0];
			if (currentLine === undefined) break;
			if (currentLine.trim() === "") {
				remaining = remaining.slice(1);
				parsedLines += 1;
				continue;
			}
			if (currentLine.startsWith("*")) break;

			const parsed = parseUpdateFileChunk(remaining, lineNumber + parsedLines, chunks.length === 0);
			chunks.push(parsed.chunk);
			remaining = remaining.slice(parsed.linesParsed);
			parsedLines += parsed.linesParsed;
		}

		if (chunks.length === 0) {
			throw new ApplyPatchError(
				`Invalid patch hunk on line ${lineNumber}: Update file hunk for path '${updatePath}' is empty`,
			);
		}

		return { hunk: { type: "update", path: updatePath, movePath, chunks }, linesParsed: parsedLines };
	}

	throw new ApplyPatchError(
		`Invalid patch hunk on line ${lineNumber}: '${firstLine}' is not a valid hunk header. Valid hunk headers: '*** Add File: {path}', '*** Delete File: {path}', '*** Update File: {path}'`,
	);
}

function parseUpdateFileChunk(
	lines: string[],
	lineNumber: number,
	allowMissingContext: boolean,
): { chunk: UpdateFileChunk; linesParsed: number } {
	const firstLine = lines[0];
	if (firstLine === undefined) {
		throw new ApplyPatchError(`Invalid patch hunk on line ${lineNumber}: Update hunk does not contain any lines`);
	}

	let changeContext: string | undefined;
	let startIndex = 0;
	if (firstLine === EMPTY_CHANGE_CONTEXT_MARKER) {
		startIndex = 1;
	} else if (firstLine.startsWith(CHANGE_CONTEXT_MARKER)) {
		changeContext = firstLine.slice(CHANGE_CONTEXT_MARKER.length);
		startIndex = 1;
	} else if (!allowMissingContext) {
		throw new ApplyPatchError(
			`Invalid patch hunk on line ${lineNumber}: Expected update hunk to start with a @@ context marker, got: '${firstLine}'`,
		);
	}

	if (startIndex >= lines.length) {
		throw new ApplyPatchError(`Invalid patch hunk on line ${lineNumber + 1}: Update hunk does not contain any lines`);
	}

	const chunk: UpdateFileChunk = { changeContext, oldLines: [], newLines: [], isEndOfFile: false };
	let parsedLines = 0;
	for (const line of lines.slice(startIndex)) {
		if (line === EOF_MARKER) {
			if (parsedLines === 0) {
				throw new ApplyPatchError(`Invalid patch hunk on line ${lineNumber + 1}: Update hunk does not contain any lines`);
			}
			chunk.isEndOfFile = true;
			parsedLines += 1;
			break;
		}

		const marker = line.at(0);
		if (marker === undefined) {
			chunk.oldLines.push("");
			chunk.newLines.push("");
		} else if (marker === " ") {
			chunk.oldLines.push(line.slice(1));
			chunk.newLines.push(line.slice(1));
		} else if (marker === "+") {
			chunk.newLines.push(line.slice(1));
		} else if (marker === "-") {
			chunk.oldLines.push(line.slice(1));
		} else {
			if (parsedLines === 0) {
				throw new ApplyPatchError(
					`Invalid patch hunk on line ${lineNumber + 1}: Unexpected line found in update hunk: '${line}'. Every line should start with ' ' (context line), '+' (added line), or '-' (removed line)`,
				);
			}
			break;
		}
		parsedLines += 1;
	}

	return { chunk, linesParsed: parsedLines + startIndex };
}

async function planHunks(hunks: Hunk[], cwd: string): Promise<PlannedChange[]> {
	if (hunks.length === 0) {
		throw new ApplyPatchError("No files were modified.");
	}

	const changes: PlannedChange[] = [];
	for (const hunk of hunks) {
		if (hunk.type === "add") {
			changes.push({ type: "add", path: hunk.path, absolutePath: resolvePatchPath(cwd, hunk.path), newContent: hunk.contents });
			continue;
		}

		if (hunk.type === "delete") {
			const filePath = resolvePatchPath(cwd, hunk.path);
			await ensureFile(filePath, `Failed to delete file ${filePath}`);
			const oldContent = await readFile(filePath, "utf8");
			changes.push({ type: "delete", path: hunk.path, absolutePath: filePath, oldContent });
			continue;
		}

		const filePath = resolvePatchPath(cwd, hunk.path);
		const { originalContents, newContents } = await deriveNewContentsFromChunks(filePath, hunk.chunks);
		const absoluteMovePath = hunk.movePath ? resolvePatchPath(cwd, hunk.movePath) : undefined;
		changes.push({
			type: "update",
			path: hunk.path,
			absolutePath: filePath,
			movePath: hunk.movePath,
			absoluteMovePath,
			oldContent: originalContents,
			newContent: newContents,
		});
	}
	return changes;
}

async function applyPlannedChanges(changes: PlannedChange[]): Promise<AffectedPaths> {
	const affected: AffectedPaths = { added: [], modified: [], deleted: [] };
	for (const change of changes) {
		if (change.type === "add") {
			await writeFileCreatingParents(change.absolutePath, change.newContent);
			affected.added.push(change.path);
			continue;
		}

		if (change.type === "delete") {
			await ensureFile(change.absolutePath, `Failed to delete file ${change.absolutePath}`);
			await unlink(change.absolutePath);
			affected.deleted.push(change.path);
			continue;
		}

		if (change.movePath && change.absoluteMovePath) {
			await writeFileCreatingParents(change.absoluteMovePath, change.newContent);
			await ensureFile(change.absolutePath, `Failed to remove original ${change.absolutePath}`);
			await unlink(change.absolutePath);
			affected.modified.push(change.movePath);
		} else {
			await writeFile(change.absolutePath, change.newContent);
			affected.modified.push(change.path);
		}
	}
	return affected;
}

function buildPreview(changes: PlannedChange[]): PreviewFile[] {
	return changes.map((change) => {
		if (change.type === "add") {
			const diff = unifiedDiff("/dev/null", change.path, "", change.newContent);
			const stats = diffStats(diff);
			return { type: "add", path: change.path, movePath: undefined, diff, ...stats };
		}
		if (change.type === "delete") {
			const diff = unifiedDiff(change.path, "/dev/null", change.oldContent, "");
			const stats = diffStats(diff);
			return { type: "delete", path: change.path, movePath: undefined, diff, ...stats };
		}
		const diff = unifiedDiff(change.path, change.movePath ?? change.path, change.oldContent, change.newContent);
		const stats = diffStats(diff);
		return { type: "update", path: change.path, movePath: change.movePath, diff, ...stats };
	});
}

function resolvePatchPath(cwd: string, patchPath: string): string {
	if (path.isAbsolute(patchPath)) {
		throw new ApplyPatchError(`Absolute paths are not allowed in apply_patch: ${patchPath}`);
	}

	const resolved = path.resolve(cwd, patchPath);
	const relative = path.relative(cwd, resolved);
	if (relative === "" || relative.startsWith("..") || path.isAbsolute(relative)) {
		throw new ApplyPatchError(`Path escapes current working directory: ${patchPath}`);
	}
	return resolved;
}

async function ensureFile(filePath: string, context: string): Promise<void> {
	try {
		const metadata = await stat(filePath);
		if (!metadata.isFile()) {
			throw new ApplyPatchError(`${context}: path is a directory`);
		}
	} catch (error) {
		if (error instanceof ApplyPatchError) throw error;
		throw new ApplyPatchError(`${context}: ${errorMessage(error)}`);
	}
}

async function writeFileCreatingParents(filePath: string, contents: string): Promise<void> {
	await mkdir(path.dirname(filePath), { recursive: true });
	await writeFile(filePath, contents);
}

async function deriveNewContentsFromChunks(
	filePath: string,
	chunks: UpdateFileChunk[],
): Promise<{ originalContents: string; newContents: string }> {
	let originalContents: string;
	try {
		originalContents = await readFile(filePath, "utf8");
	} catch (error) {
		throw new ApplyPatchError(`Failed to read file to update ${filePath}: ${errorMessage(error)}`);
	}

	const originalLines = originalContents.split("\n");
	if (originalLines.at(-1) === "") {
		originalLines.pop();
	}

	const replacements = computeReplacements(originalLines, filePath, chunks);
	const newLines = applyReplacements(originalLines, replacements);
	if (newLines.at(-1) !== "") {
		newLines.push("");
	}

	return { originalContents, newContents: newLines.join("\n") };
}

function computeReplacements(
	originalLines: string[],
	filePath: string,
	chunks: UpdateFileChunk[],
): Array<{ startIndex: number; oldLength: number; newLines: string[] }> {
	const replacements: Array<{ startIndex: number; oldLength: number; newLines: string[] }> = [];
	let lineIndex = 0;

	for (const chunk of chunks) {
		if (chunk.changeContext !== undefined) {
			const contextIndex = seekSequence(originalLines, [chunk.changeContext], lineIndex, false);
			if (contextIndex === undefined) {
				throw new ApplyPatchError(`Failed to find context '${chunk.changeContext}' in ${filePath}`);
			}
			lineIndex = contextIndex + 1;
		}

		if (chunk.oldLines.length === 0) {
			replacements.push({ startIndex: originalLines.length, oldLength: 0, newLines: [...chunk.newLines] });
			continue;
		}

		let pattern = chunk.oldLines;
		let newSlice = chunk.newLines;
		let found = seekSequence(originalLines, pattern, lineIndex, chunk.isEndOfFile);
		if (found === undefined && pattern.at(-1) === "") {
			pattern = pattern.slice(0, -1);
			newSlice = newSlice.at(-1) === "" ? newSlice.slice(0, -1) : newSlice;
			found = seekSequence(originalLines, pattern, lineIndex, chunk.isEndOfFile);
		}

		if (found === undefined) {
			throw new ApplyPatchError(`Failed to find expected lines in ${filePath}:\n${chunk.oldLines.join("\n")}`);
		}

		replacements.push({ startIndex: found, oldLength: pattern.length, newLines: [...newSlice] });
		lineIndex = found + pattern.length;
	}

	return replacements.sort((lhs, rhs) => lhs.startIndex - rhs.startIndex);
}

function applyReplacements(
	lines: string[],
	replacements: Array<{ startIndex: number; oldLength: number; newLines: string[] }>,
): string[] {
	const result = [...lines];
	for (const replacement of replacements.slice().reverse()) {
		result.splice(replacement.startIndex, replacement.oldLength, ...replacement.newLines);
	}
	return result;
}

function seekSequence(lines: string[], pattern: string[], start: number, eof: boolean): number | undefined {
	if (pattern.length === 0) return start;
	if (pattern.length > lines.length) return undefined;

	const searchStart = eof && lines.length >= pattern.length ? lines.length - pattern.length : start;
	const searchEnd = lines.length - pattern.length;
	const comparisons: Array<(lhs: string, rhs: string) => boolean> = [
		(lhs, rhs) => lhs === rhs,
		(lhs, rhs) => lhs.trimEnd() === rhs.trimEnd(),
		(lhs, rhs) => lhs.trim() === rhs.trim(),
		(lhs, rhs) => normalisePunctuation(lhs) === normalisePunctuation(rhs),
	];

	for (const compare of comparisons) {
		for (let index = searchStart; index <= searchEnd; index += 1) {
			const matches = pattern.every((value, offset) => compare(lines[index + offset] ?? "", value));
			if (matches) return index;
		}
	}
	return undefined;
}

function normalisePunctuation(value: string): string {
	return value
		.trim()
		.replace(/[\u2010-\u2015\u2212]/g, "-")
		.replace(/[\u2018\u2019\u201A\u201B]/g, "'")
		.replace(/[\u201C\u201D\u201E\u201F]/g, '"')
		.replace(/[\u00A0\u2002-\u200A\u202F\u205F\u3000]/g, " ");
}

function unifiedDiff(oldPath: string, newPath: string, oldContent: string, newContent: string): string {
	const oldLines = contentToLines(oldContent);
	const newLines = contentToLines(newContent);
	const diffLines = lineDiff(oldLines, newLines);
	return [`--- ${oldPath}`, `+++ ${newPath}`, "@@", ...diffLines].join("\n").concat("\n");
}

function contentToLines(content: string): string[] {
	const lines = content.split("\n");
	if (lines.at(-1) === "") {
		return lines.slice(0, -1);
	}
	return lines;
}

function lineDiff(oldLines: string[], newLines: string[]): string[] {
	const lcs = Array.from({ length: oldLines.length + 1 }, () => Array.from({ length: newLines.length + 1 }, () => 0));

	for (let oldIndex = oldLines.length - 1; oldIndex >= 0; oldIndex -= 1) {
		for (let newIndex = newLines.length - 1; newIndex >= 0; newIndex -= 1) {
			if (oldLines[oldIndex] === newLines[newIndex]) {
				lcs[oldIndex][newIndex] = (lcs[oldIndex + 1]?.[newIndex + 1] ?? 0) + 1;
			} else {
				lcs[oldIndex][newIndex] = Math.max(lcs[oldIndex + 1]?.[newIndex] ?? 0, lcs[oldIndex]?.[newIndex + 1] ?? 0);
			}
		}
	}

	const result: string[] = [];
	let oldIndex = 0;
	let newIndex = 0;
	while (oldIndex < oldLines.length || newIndex < newLines.length) {
		const oldLine = oldLines[oldIndex];
		const newLine = newLines[newIndex];
		if (oldLine !== undefined && newLine !== undefined && oldLine === newLine) {
			result.push(` ${oldLine}`);
			oldIndex += 1;
			newIndex += 1;
		} else if (newLine !== undefined && (oldLine === undefined || (lcs[oldIndex]?.[newIndex + 1] ?? 0) > (lcs[oldIndex + 1]?.[newIndex] ?? 0))) {
			result.push(`+${newLine}`);
			newIndex += 1;
		} else if (oldLine !== undefined) {
			result.push(`-${oldLine}`);
			oldIndex += 1;
		}
	}
	return result;
}

function diffStats(diff: string): { additions: number; removals: number } {
	return diff.split("\n").reduce(
		(stats, line) => ({
			additions: stats.additions + (line.startsWith("+") && !line.startsWith("+++") ? 1 : 0),
			removals: stats.removals + (line.startsWith("-") && !line.startsWith("---") ? 1 : 0),
		}),
		{ additions: 0, removals: 0 },
	);
}

function previewStats(preview: PreviewFile[]): { additions: number; removals: number } {
	return preview.reduce(
		(stats, file) => ({ additions: stats.additions + file.additions, removals: stats.removals + file.removals }),
		{ additions: 0, removals: 0 },
	);
}

function affectedFromPreview(preview: PreviewFile[]): AffectedPaths {
	return {
		added: preview.filter((file) => file.type === "add").map((file) => file.path),
		modified: preview.filter((file) => file.type === "update").map((file) => file.movePath ?? file.path),
		deleted: preview.filter((file) => file.type === "delete").map((file) => file.path),
	};
}

function summarizeAffected(affected: AffectedPaths): string {
	const parts = [
		affected.added.length > 0 ? `A ${affected.added.length}` : undefined,
		affected.modified.length > 0 ? `M ${affected.modified.length}` : undefined,
		affected.deleted.length > 0 ? `D ${affected.deleted.length}` : undefined,
	].filter((part): part is string => part !== undefined);
	return parts.length > 0 ? parts.join(" / ") : "no changes";
}

function summarizeHunks(hunks: Hunk[]): string {
	const added = hunks.filter((hunk) => hunk.type === "add").length;
	const deleted = hunks.filter((hunk) => hunk.type === "delete").length;
	const modified = hunks.filter((hunk) => hunk.type === "update").length;
	return summarizeAffected({ added: Array.from({ length: added }, () => ""), modified: Array.from({ length: modified }, () => ""), deleted: Array.from({ length: deleted }, () => "") });
}

function detailsFromUnknown(details: unknown): ApplyPatchDetails | undefined {
	if (typeof details !== "object" || details === null) return undefined;
	const candidate = details as Partial<ApplyPatchDetails>;
	if (!candidate.affected || !candidate.preview || !candidate.stats) return undefined;
	return { affected: candidate.affected, preview: candidate.preview, stats: candidate.stats };
}

function renderApplyPatchPreview(
	details: ApplyPatchDetails,
	status: ApplyPatchRenderState["status"],
	expanded: boolean,
	theme: { fg(role: string, text: string): string; bold(text: string): string },
): string {
	const firstFile = details.preview[0];
	const verb = status === "failed" ? "Edit failed" : status === "pending" ? "Patching" : firstFile && details.preview.length === 1 ? previewVerb(firstFile) : "Edited";
	const target = firstFile && details.preview.length === 1 ? previewTarget(firstFile) : summarizeAffected(details.affected);
	const prefix = theme.fg(status === "failed" ? "error" : "dim", "•");
	let text = `${prefix} ${theme.bold(verb)} ${theme.fg("accent", target)}`;
	text += ` ${theme.fg("success", `(+${details.stats.additions}`)} ${theme.fg("error", `-${details.stats.removals})`)}`;

	if (!expanded) {
		if (details.preview.length === 1) {
			return text;
		}
		for (const [index, file] of details.preview.entries()) {
			const linePrefix = index === 0 ? "  └ " : "    ";
			const title = previewTarget(file);
			text += `\n${theme.fg("dim", linePrefix)}${theme.fg("accent", title)} ${theme.fg("success", `(+${file.additions}`)} ${theme.fg("error", `-${file.removals})`)}`;
		}
		return text;
	}

	for (const [index, file] of details.preview.entries()) {
		const title = previewTarget(file);
		if (index > 0) text += "\n";
		text += `\n${theme.fg("dim", "  └ ")}${theme.fg("accent", title)} ${theme.fg("success", `(+${file.additions}`)} ${theme.fg("error", `-${file.removals})`)}`;
		text += `\n${renderPreviewDiff(file.diff)}`;
	}

	return text;
}

function previewVerb(file: PreviewFile): string {
	if (file.type === "add") return "Added";
	if (file.type === "delete") return "Deleted";
	return "Edited";
}

function previewTarget(file: PreviewFile): string {
	return file.movePath ? `${file.path} → ${file.movePath}` : file.path;
}

function renderPreviewDiff(diff: string): string {
	try {
		return renderAnsiDiff(diff)
			.split("\n")
			.map((line) => `    ${line}`)
			.join("\n");
	} catch {
		return diff
			.split("\n")
			.filter((line) => line.length > 0)
			.map((line) => `    ${line}`)
			.join("\n");
	}
}

function printSummary(affected: AffectedPaths): string {
	return [
		"Success. Updated the following files:",
		...affected.added.map((filePath) => `A ${filePath}`),
		...affected.modified.map((filePath) => `M ${filePath}`),
		...affected.deleted.map((filePath) => `D ${filePath}`),
	]
		.join("\n")
		.concat("\n");
}

function errorMessage(error: unknown): string {
	return error instanceof Error ? error.message : String(error);
}

export default function applyPatchExtension(pi: ExtensionAPI) {
	pi.registerTool({
		name: "apply_patch",
		label: "Apply Patch",
		description: "Apply a Codex-style apply_patch patch to files under the current working directory.",
		promptSnippet: "Create, update, move, or delete files with a Codex-style apply_patch patch.",
		promptGuidelines: [
			"Use apply_patch for precise file edits, especially multi-file edits, rather than shell heredocs or ad-hoc scripts.",
			"apply_patch patches must include *** Begin Patch and *** End Patch, use relative paths only, and prefix added file contents with '+'.",
			"apply_patch update hunks should include enough context to uniquely locate each change.",
		],
		parameters: PARAMETERS,
		async execute(toolCallId, params: ApplyPatchParams, _signal, onUpdate, ctx) {
			try {
				const hunks = parsePatch(params.patch);
				const affected: AffectedPaths = { added: [], modified: [], deleted: [] };
				const preview: PreviewFile[] = [];
				for (const hunk of hunks) {
					const changes = await planHunks([hunk], ctx.cwd);
					preview.push(...buildPreview(changes));
					const previewAffected = affectedFromPreview(preview);
					const stats = previewStats(preview);
					renderStates.set(toolCallId, { details: { affected: previewAffected, preview: [...preview], stats }, status: "pending" });
					onUpdate?.({
						content: [{ type: "text", text: `Preview: ${summarizeAffected(previewAffected)} (+${stats.additions} -${stats.removals})` }],
						details: { affected: previewAffected, preview, stats },
					});
					const nextAffected = await applyPlannedChanges(changes);
					affected.added.push(...nextAffected.added);
					affected.modified.push(...nextAffected.modified);
					affected.deleted.push(...nextAffected.deleted);
				}
				const stats = previewStats(preview);
				renderStates.set(toolCallId, { details: { affected, preview, stats }, status: "applied" });
				const output = printSummary(affected);
				return {
					content: [{ type: "text", text: output }],
					details: { affected, preview, stats },
				};
			} catch (error) {
				const existing = renderStates.get(toolCallId);
				if (existing) {
					renderStates.set(toolCallId, { ...existing, status: "failed" });
				}
				return {
					content: [{ type: "text", text: `Error: ${errorMessage(error)}` }],
					details: { error: errorMessage(error) },
					isError: true,
				};
			}
		},
		renderCall(args, theme, context) {
			if (context.argsComplete === false) {
				return new Text(`${theme.fg("dim", "•")} ${theme.bold("Patching")}`, 0, 0);
			}

			const cached = renderStates.get(context.toolCallId);
			if (cached) {
				return new Text(renderApplyPatchPreview(cached.details, cached.status, context.expanded, theme), 0, 0);
			}

			let text = `${theme.fg("dim", "•")} ${theme.bold("Patching")}`;
			try {
				const hunks = parsePatch(String(args.patch ?? ""));
				text += ` ${theme.fg("accent", summarizeHunks(hunks))}`;
			} catch {
				text += ` ${theme.fg("warning", "patch")}`;
			}
			return new Text(text, 0, 0);
		},
		renderResult(result, { isPartial }, theme, _context) {
			const content = result.content[0];
			if (content?.type === "text" && content.text.startsWith("Error:")) {
				return new Text(theme.fg("error", content.text.split("\n")[0] ?? content.text), 0, 0);
			}

			return isPartial ? new Text(`${theme.fg("dim", "•")} ${theme.bold("Patching")}`, 0, 0) : new Container();
		},
	});
}
