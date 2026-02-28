> ## Documentation Index
> Fetch the complete documentation index at: https://graphite-58cc94ce.mintlify.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Use CLI Binaries

We publish binaries of our CLI [here](https://github.com/withgraphite/homebrew-tap/releases). Here's an example a script you might use to download the binaries on a VM. Note that we are using `gt-linux` here — there are other OS/arch combinations available on that page.

```bash Terminal theme={null}
version="$(curl https://registry.npmjs.org/@withgraphite/graphite-cli/stable | jq -r .version)"
url="https://github.com/withgraphite/homebrew-tap/releases/download/v$version/gt-linux"
curl -L "$url" -o /path/to/gt
chmod +x /path/to/gt
```

You can replace `/path/to/gt` with your preferred install location (e.g., `/usr/local/bin/gt`).
