> ## Documentation Index
> Fetch the complete documentation index at: https://graphite-58cc94ce.mintlify.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# CLI Troubleshooting FAQs

> Tips for resolving common Graphite CLI issues.

### Submit a bug report

If you find yourself in a bad state and are unsure how to proceed, please submit a bug report with debug information by running `gt feedback` and sending debug logs. This allows us to fix most issues.

### Unblock yourself

If the CLI gets stuck in a broken state and you are not able to wait for a member of our team to help, there are a few options.

* `gt dev cache --clear` is a safe command that sometimes fixes inadvertent issues that we haven't caught before release. It doesn't change any `git` or Graphite state.

* `gt untrack` specific branches that are behaving weirdly. You will then need to re-track branches with `gt track` – note that in certain cases you may need to `git rebase` manually in order to track a branch with the correct parent. [Read more about `gt track`](/track-branches#track-branches-created-outside-of-gt) .

* `gt init --reset` is the nuclear option which deletes all Graphite metadata from your repository. All branches will need to be re-tracked.

* The debug logs that `gt feedback` sends us are stored at `~/.local/share/graphite/debug` (or `$XDG_DATA_HOME/graphite/debug`). Each file contains the logs for a single CLI invocation, and includes information about underlying git commands and network requests. Logs are stored for 24 hours —`gt feedback` sends the whole directory. If you encounter any issues with the `gt feedback` command, feel free to zip the directory and include it in a support ticket to [support@graphite.com](mailto:support@graphite.com). You can also go spelunking in the logs yourself if you are curious!

If none of these work, and you would like specific help for your issue, reach out in our [community Slack channel](https://community.graphite.com).

## CLI FAQ

### Why did my "submit" overwrite a coworker's changes to my branch?

We use `git push --force-with-lease` under the hood for our push, which should ensure this doesn't happen. You should only be able to overwrite changes that you have already pushed from your machine or synced to your machine with `gt get`.

Using this option is just like using `--force` (push to a branch on remote even if remote's SHA cannot be fast-forwarded to the new SHA), with the caveat that if the remote's SHA for the branch doesn't match the "remote-tracking branch" on your machine (for example, `refs/remotes/origin/feature`), it will fail, as this means that someone else has updated the branch since you last pushed to it or pulled it. Graphite respects the "remote-tracking branch", only updating it on a `gt submit` or `gt get` operation.

The issue can arise if you have some other tooling (for example, some VS Code extension) that is `git fetch`ing your branches in the background. This could update the "remote-tracking branch" and result in the `--force-with-lease` check passing—even if someone has updated the branch to a commit that you haven't synced to your repository (or pushed yourself).

### Why are my actions running twice?

Because `gt submit` both performs a `git push` and a GitHub API call, occasionally GitHub will pick up both as a [`synchronize`](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#pull_request) event on the PR.

We recommend using GitHub's [concurrency](https://docs.github.com/en/actions/using-jobs/using-concurrency) configuration to ensure that you do not have duplicated CI.

For example, the following configuration will cancel previous CI runs on the same pull request:

```yaml YAML theme={null}
concurrency:
  group: ${{ github.repository }}-${{ github.workflow }}-${{ github.ref }}-${{ github.ref == 'refs/heads/main' && github.sha || ''}}
  cancel-in-progress: true
```

### Why am I getting a 500 error when submitting PRs after renaming repository?

When trying to submit pull requests using `gt submit` after a GitHub repository has been renamed, you may encounter a 500 error from the pre-submit-pull-requests endpoint, even though repository syncing works correctly within Graphite.

Even though GitHub redirects old repository URLs to new ones for Git operations, this redirection may cause issues with `gt`'s PR submission process. Ensure both your Git and Graphite configurations are updated to use the new repository name directly:

* Run `gt config` to access `Repository-level settings` > `Remote repository` > `Configure repo name` and update the repository name to match the new repository name
* Run `git remote set-url origin https://github.com/owner/new-repo-name.git` to update your Git remote origin to point to the new repository name

### Single-commit workflow

The Graphite CLI use branches instead of commits to represent atomic changes in a stack. But it's possible to replicate the single-commit workflow.

Just don't use `gt modify --commit`, and if you end up with multiple commits on a branch by accident, you can always use `gt squash` to get your branch back to a single commit. This way, you can essentially only use `gt`, and your workflow will look something like (making use of lots of shortcuts and short-form flags):

Terminal

```python  theme={null}
# make changes to the codebase

gt c -am "my first commit"

# make some more changes

gt c -am "my second commit"

# now we're ready to submit!

gt s -np

# address requested changes

gt co my_first_commit
gt m -a
gt ss

# or you can use

gt absorb -a
gt ss

# ... etc
```
