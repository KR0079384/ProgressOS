#!/usr/bin/env python3
"""
Repository Navigation & Wiki Validator for ProgressOS / OS3 LLM Navigation System.

Mechanically verifies:
1. Every meaningful directory has a local wiki named <dirname>.md (or primary.md at root).
2. Every direct child file is indexed in the directory's wiki file.
3. Every direct child subdirectory is indexed in the directory's wiki file.
4. All relative navigation wiki links point to actual existing files.
5. No broken links or stale paths exist.
"""

import os
import re
import sys
from pathlib import Path

# Directories to ignore from repository navigation system
IGNORED_DIRS = {
    ".git",
    "node_modules",
    "dist",
    ".tanstack",
    ".lovable",
    ".vscode",
    "__pycache__",
}


def get_repo_root() -> Path:
    return Path(__file__).parent.parent.resolve()


def is_meaningful_dir(path: Path) -> bool:
    if not path.is_dir():
        return False
    parts = path.parts
    return not any(part in IGNORED_DIRS for part in parts)


def validate_repository():
    repo_root = get_repo_root()
    errors = []
    warnings = []
    indexed_files_count = 0
    wiki_files_count = 0
    directories_count = 0

    # 1. Check primary.md
    primary_path = repo_root / "primary.md"
    if not primary_path.is_file():
        errors.append("Missing root navigation file: primary.md")
    else:
        wiki_files_count += 1

    # 2. Walk directory tree
    for root, dirs, files in os.walk(repo_root):
        # Filter ignored directories in-place
        dirs[:] = [d for d in dirs if d not in IGNORED_DIRS]
        
        current_dir = Path(root)
        if not is_meaningful_dir(current_dir):
            continue

        directories_count += 1

        # Identify required wiki file for this directory
        if current_dir == repo_root:
            wiki_file = current_dir / "primary.md"
        else:
            wiki_file = current_dir / f"{current_dir.name}.md"
            wiki_files_count += 1

        if not wiki_file.is_file():
            errors.append(f"Directory missing required wiki file '{wiki_file.name}': {current_dir.relative_to(repo_root)}")
            continue

        wiki_content = wiki_file.read_text(encoding="utf-8")

        # Get direct child files (excluding wiki file itself and hidden files if appropriate)
        child_files = [
            f for f in files
            if f != wiki_file.name and not (current_dir == repo_root and f == "primary.md")
        ]

        for file_name in child_files:
            indexed_files_count += 1
            if file_name not in wiki_content:
                errors.append(
                    f"File '{file_name}' in '{current_dir.relative_to(repo_root)}' is not listed in '{wiki_file.name}'"
                )

        # Get direct child directories
        child_dirs = [d for d in dirs if d not in IGNORED_DIRS]
        for dir_name in child_dirs:
            if dir_name not in wiki_content:
                errors.append(
                    f"Subdirectory '{dir_name}' in '{current_dir.relative_to(repo_root)}' is not listed in '{wiki_file.name}'"
                )
            
            # Check wiki link target
            expected_wiki_path = current_dir / dir_name / f"{dir_name}.md"
            if not expected_wiki_path.is_file():
                errors.append(
                    f"Subdirectory '{dir_name}' is missing expected wiki '{expected_wiki_path.relative_to(repo_root)}'"
                )

        # 3. Check for broken Markdown links in this wiki file
        # Matches [label](relative_path)
        markdown_links = re.findall(r'\[([^\]]+)\]\(([^)]+)\)', wiki_content)
        for label, target in markdown_links:
            # Skip external URL links
            if target.startswith(("http://", "https://", "mailto:")):
                continue
            
            # Remove anchor fragments if any
            target_path_str = target.split("#")[0]
            if not target_path_str:
                continue

            target_path = (wiki_file.parent / target_path_str).resolve()
            if not target_path.exists():
                errors.append(
                    f"Broken link in '{wiki_file.relative_to(repo_root)}': '{target}' points to non-existent path '{target_path}'"
                )

    print("=== Repository Navigation Validation Report ===")
    print(f"Meaningful Directories Checked : {directories_count}")
    print(f"Wiki Files Validated           : {wiki_files_count}")
    print(f"Child Files Indexed            : {indexed_files_count}")
    
    if errors:
        print(f"\n[FAIL] Found {len(errors)} validation errors:")
        for err in errors:
            print(f" - {err}")
        sys.exit(1)
    else:
        print("\n[SUCCESS] All repository navigation wikis are synchronized and valid!")
        sys.exit(0)


if __name__ == "__main__":
    validate_repository()
