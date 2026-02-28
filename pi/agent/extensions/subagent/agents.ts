/**
 * Worker agent configuration
 */

import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { parseFrontmatter } from "@mariozechner/pi-coding-agent";

export interface WorkerConfig {
	tools?: string[];
	model?: string;
	systemPrompt: string;
	filePath: string;
}

export function loadWorkerConfig(): WorkerConfig | null {
	const filePath = path.join(os.homedir(), ".pi", "agent", "agents", "worker.md");

	let content: string;
	try {
		content = fs.readFileSync(filePath, "utf-8");
	} catch {
		return null;
	}

	const { frontmatter, body } = parseFrontmatter<Record<string, string>>(content);

	const tools = frontmatter.tools
		?.split(",")
		.map((t: string) => t.trim())
		.filter(Boolean);

	return {
		tools: tools && tools.length > 0 ? tools : undefined,
		model: frontmatter.model,
		systemPrompt: body,
		filePath,
	};
}
