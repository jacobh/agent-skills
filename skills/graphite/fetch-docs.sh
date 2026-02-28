#!/usr/bin/env bash
set -euo pipefail

DOCS_DIR="$(cd "$(dirname "$0")" && pwd)/docs"
INDEX_URL="https://graphite.com/docs/llms.txt"

mkdir -p "$DOCS_DIR"

echo "Fetching index from $INDEX_URL..."
index=$(curl -sf "$INDEX_URL")

# Save the index file itself
echo "$index" > "$DOCS_DIR/llms.txt"

# Extract all markdown doc URLs from the index
urls=$(echo "$index" | grep -oE 'https://[^)]+\.md' | sort -u)
count=$(echo "$urls" | wc -l | tr -d ' ')

echo "Found $count documentation URLs"
echo ""

# Download each doc in parallel (8 at a time)
i=0
for url in $urls; do
  filename=$(basename "$url")
  i=$((i + 1))
  (
    if curl -sf "$url" -o "$DOCS_DIR/$filename"; then
      echo "  [$i/$count] ✓ $filename"
    else
      echo "  [$i/$count] ✗ $filename (failed)"
    fi
  ) &

  # Throttle to 8 concurrent downloads
  if (( i % 8 == 0 )); then
    wait
  fi
done

wait

# Also grab the OpenAPI spec
echo ""
echo "Fetching OpenAPI spec..."
openapi_url=$(echo "$index" | grep -oE 'https://[^)]+\.json' | head -1)
if [ -n "$openapi_url" ]; then
  if curl -sf "$openapi_url" -o "$DOCS_DIR/openapi.json"; then
    echo "  ✓ openapi.json"
  else
    echo "  ✗ openapi.json (failed)"
  fi
fi

echo ""
echo "Done! Downloaded to $DOCS_DIR"
ls "$DOCS_DIR" | wc -l | xargs -I{} echo "{} files total"
