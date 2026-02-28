> ## Documentation Index
> Fetch the complete documentation index at: https://graphite-58cc94ce.mintlify.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Update The CLI

> Learn how to update the Graphite CLI.

## Versions `1.7.6` and greater

```bash Terminal theme={null}
gt upgrade
```

## homebrew

```bash Terminal theme={null}
brew update && brew upgrade withgraphite/tap/graphite
```

## npm

```bash Terminal theme={null}
npm install -g @withgraphite/graphite-cli@stable
```

<Tip>
  If you are having trouble updating through homebrew, fully resetting your tap may fix the issue:
  `brew uninstall graphite && brew untap withgraphite/tap && brew install withgraphite/tap/graphite`
</Tip>
