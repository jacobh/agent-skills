#!/usr/bin/env bash
set -euo pipefail

REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
HOME_DIR="$HOME"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m'

DRY_RUN=false
VERIFY_ONLY=false

usage() {
  echo "Usage: $0 [--dry-run | --verify]"
  echo "  --dry-run   Show what would be done without making changes"
  echo "  --verify    Check that all expected symlinks are in place"
  exit 1
}

for arg in "$@"; do
  case "$arg" in
    --dry-run) DRY_RUN=true ;;
    --verify) VERIFY_ONLY=true ;;
    --help|-h) usage ;;
    *) echo "Unknown argument: $arg"; usage ;;
  esac
done

errors=0

ensure_symlink() {
  local source="$1"
  local target="$2"
  local target_dir
  target_dir="$(dirname "$target")"

  if [ "$VERIFY_ONLY" = true ]; then
    if [ -L "$target" ]; then
      local current
      current="$(readlink "$target")"
      if [ "$current" = "$source" ]; then
        echo -e "  ${GREEN}✓${NC} $target → $source"
      else
        echo -e "  ${RED}✗${NC} $target → $current (expected $source)"
        errors=$((errors + 1))
      fi
    elif [ -e "$target" ]; then
      echo -e "  ${RED}✗${NC} $target exists but is not a symlink"
      errors=$((errors + 1))
    else
      echo -e "  ${YELLOW}✗${NC} $target missing"
      errors=$((errors + 1))
    fi
    return
  fi

  # Safety: refuse to overwrite a real file/directory (not a symlink)
  if [ -e "$target" ] && [ ! -L "$target" ]; then
    echo -e "  ${RED}ERROR${NC}: $target exists and is not a symlink. Skipping to avoid data loss."
    echo "         Remove it manually if you want to proceed."
    errors=$((errors + 1))
    return
  fi

  if [ "$DRY_RUN" = true ]; then
    if [ -L "$target" ]; then
      echo -e "  ${YELLOW}~${NC} $target → $source (would re-create)"
    else
      echo -e "  ${GREEN}+${NC} $target → $source"
    fi
    return
  fi

  mkdir -p "$target_dir"

  # Remove existing symlink if present
  if [ -L "$target" ]; then
    rm "$target"
  fi

  ln -s "$source" "$target"
  echo -e "  ${GREEN}✓${NC} $target → $source"
}

# install_dir <repo_subdir> <home_dotdir>
#
# For each top-level child in <repo_subdir>, symlink it into <home_dotdir>.
# If the child is a directory, recurse one level and symlink its children
# instead — this avoids replacing whole directories that contain runtime state.
install_dir() {
  local source_base="$1"
  local target_base="$2"

  if [ ! -d "$source_base" ]; then
    return
  fi

  for child in "$source_base"/*; do
    [ -e "$child" ] || continue
    local child_name
    child_name="$(basename "$child")"

    if [ -d "$child" ] && [ ! -L "$child" ]; then
      # Recurse: symlink each grandchild
      for grandchild in "$child"/*; do
        [ -e "$grandchild" ] || continue
        local grandchild_name
        grandchild_name="$(basename "$grandchild")"
        ensure_symlink "$grandchild" "$target_base/$child_name/$grandchild_name"
      done
    else
      ensure_symlink "$child" "$target_base/$child_name"
    fi
  done
}

# --- Agent directories ---
# claude/* → ~/.claude/*
# pi/*     → ~/.pi/*

echo ""
echo "~/.claude:"
install_dir "$REPO_DIR/claude" "$HOME_DIR/.claude"

echo ""
echo "~/.pi:"
install_dir "$REPO_DIR/pi" "$HOME_DIR/.pi"

echo ""
if [ "$VERIFY_ONLY" = true ]; then
  if [ $errors -gt 0 ]; then
    echo -e "${RED}Verification failed: $errors issue(s) found${NC}"
    exit 1
  else
    echo -e "${GREEN}All symlinks verified ✓${NC}"
  fi
elif [ $errors -gt 0 ]; then
  echo -e "${YELLOW}Completed with $errors error(s). See above.${NC}"
  exit 1
else
  echo -e "${GREEN}Done ✓${NC}"
fi
