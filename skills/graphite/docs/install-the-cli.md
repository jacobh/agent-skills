> ## Documentation Index
> Fetch the complete documentation index at: https://graphite-58cc94ce.mintlify.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Install & Authenticate The CLI

> Learn how to install & authenticate Graphite's CLI to start creating stacked pull requests.

The Graphite CLI is a tool to help you break up large engineering tasks into a series of small, incremental code changes directly from the command line. The Graphite CLI makes it easy to stay unblocked as an author, develop faster, and provide more helpful comments as a reviewer.

The Graphite CLI is fully compatible with `git`—just install it on an existing repository and begin using our suite of `gt` commands.

## Install the CLI

Install the Graphite CLI using either [Homebrew](https://brew.sh/) or [npm](https://www.npmjs.com/):

### brew installation

We recommend installing via Homebrew for smoothest sailing, [even on Linux!](https://docs.brew.sh/Homebrew-on-Linux)

```bash Terminal theme={null}
brew install withgraphite/tap/graphite
gt --version
```

### npm installation

```bash Terminal theme={null}
npm install -g @withgraphite/graphite-cli@stable
gt --version
```

### node.js versioning (for npm installation only)

We develop Graphite with Node.js v22, but Graphite should run with no major issues on any current version of Node. If you run into any issues that seem Node-related, try using v22 as a first workaround! If that doesn't work, we recommend the `brew` installation, which ships standalone binaries for both MacOS and Linux.

### git versioning

As of v1.0.0, Graphite requires a minimum `git --version` of 2.38.0.

#### Ubuntu

Ubuntu LTS currently provides a relatively old version of Git by default. You can source the latest version from the \`git-core\` PPA repository.

```bash Terminal theme={null}
sudo add-apt-repository ppa:git-core/ppa
sudo apt update
sudo apt install git
```

[Read more on the Git website](https://git-scm.com/download/linux)

#### MacOS

Upgrading to the latest version of XCode tooling, provides a recent version of git that's suitable for Graphite. You can also use Homebrew to install the latest version of Git.

#### Unsafe: overriding

If you believe this is an error, and your git version is higher than 2.38.0 but something about it's packaging is making Graphite incorrectly infer it's not the right version, you can unsafely suppress this message via `GRAPHITE_IGNORE_GIT_VERSION=1`. This is discouraged, so be careful; most Graphite commands will not work on older versions.

### Windows

Currently, the best way to install Graphite on Windows is via `npm`. If you do not use Node in your day-to-day work, there are a variety of ways to get it set up on your system, listed in the NPM documentation.

[Click here for instructions.](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm#os-x-or-windows-node-installers)

Alternatively, you can use either `brew` or `npm` on WSL (Windows Subsystem for Linux).

We are always working towards better native Windows support, although occasionally it falls behind \*nix systems in priority. If you run into any issues, especially if they are blocking your workflow, please reach out in our [community Slack](https://community.graphite.com).

## Authenticate the CLI

<Note>
  To use Graphite to create or update pull requests in GitHub for the branches in your stack, you must authenticate the CLI with your GitHub account. See [Privacy and Security](/privacy-and-security) to understand which GitHub permissions Graphite requires. Graphite is architected to ask for the minimum set of permissions necessary within the constraints of GitHub's API.
</Note>

1. Sign into [https://app.graphite.com/activate](https://app.graphite.com/activate) with your GitHub account.

2. Copy the `gt auth --token <your_cli_auth_token>` command shown (your CLI auth token will be pre-filled for you).

3. Paste and run it in your terminal.

```bash Terminal theme={null}
> gt auth --token <YOUR_AUTH_TOKEN>
🔐 Saved auth token to "/Users/pranathiperi/.graphite_user_config"
```

Once you've authenticated the CLI, you can [initialize `gt` to be used in your repositories](/cli-quick-start#initializing-graphite).
