> ## Documentation Index
> Fetch the complete documentation index at: https://graphite-58cc94ce.mintlify.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Comparing Git And Gt

> Learn the key differences between working with the Graphite CLI vs. vanilla git.

In this guide, you’ll learn some of the main differences between using `gt` and `git`, like fixup commits, working asynchronously, check pointing, syncing from remote, and restacking.

Once you learn more about `gt` and how it interacts with `git`, you can then re-integrate your previous `git` workflow into `gt`.

## Example of gt vs. git

Imagine you’re an engineer at a company that builds task management software (for example, Asana, Linear, or JIRA) and you want to build the ability to search across all task titles.

Let’s say this project has four parts:

1. Add an index to the task table on `title` so you can search through this field quickly

2. Add a helper function to query this table given a search query and returning tasks that match: `searchTasks(string searchQuery) -> Task[]`

3. Expose an endpoint on your webserver that allows the frontend to search for tasks

4. Query this endpoint and display results on the frontend

Here’s how this would look in `git`**:**

```sh terminal theme={null}
// Create new branch & check it out
$ git branch task_search && git checkout task_search
// Make index changes (~10 lines of code)
$ git add --all && git commit --message 'add index for searching tasks'
// Make helper function (~50 lines of code)
$ git add --all && git commit --message 'add helper function to search tasks'
// Make endpoint (~100 lines of code)
$ git add --all && git commit --message 'add endpoint to search tasks'
// Make UI (~200 lines of code)
$ git add --all && git commit --message 'addtUI to display searched tasks'
// Push changes to remote
$ git push origin task_search
```

Now you have a **branch** that implements search end to end. Next you want to get this reviewed by your teammates before it gets merged. There are a couple important issues here:

* This is a large PR! It has many lines of code changes for someone to review.

* The folks who own the UI are different from the folks who own the task table. You need multiple people on different teams to review your PR.

Here’s how this would look in `gt`:

```sh terminal theme={null}
// Make index changes (~10 lines of code)
$ gt create --all --message 'add index for searching tasks'
// Make helper function (~50 lines of code)
$ gt create --all --message 'add helper function to search tasks'
// Make endpoint (~100 lines of code)
$ gt create --all --message 'add endpoint to search tasks'
// Make UI (~200 lines of code) using aliases
$ gt create -a -m 'add UI to display searched tasks'
// Submit changes to remote
$ gt submit --stack
```

Now you have a **stack** that implements search end to end. A stack is made up of multiple branches stacked on top of each other.

Instead of creating a single PR to merge all these changes, Graphite creates four PRs for this stack (one per `gt create` command above). You can get each PR reviewed by a person who is familiar with that particular change.

This solves the two issues when using `git`: each PR with `gt` is small (and easier to review), and you can get reviews from different people for different parts of your change depending on their expertise.

## Fixup commits in gt

Continuing with the example above, let’s say you receive some comments about performance, related to the second part of your change “add helper function to search tasks”. You want to only search tasks within the last year—tasks older than that are out of scope for your search prototype.

How this looks with `git`:

```sh TERMINAL theme={null}
// Make changes to limit the helper function's search scope to ~1 year
$ git add --all // stage changes
$ git commit --fixup=<commit hash of add helper function to search tasks> // Make the fixup commit
$ git rebase --interactive --autosquash=<commit hash of add helper function to search tasks>~1 // Merge fixup commit into previous commit
```

How this looks with `gt`:

```sh TERMINAL theme={null}
$ gt checkout 'add helper function to search tasks'
// Make changes to limit the helper function's search scope to ~1 year
$ gt modify --all // Stage & amend these changes into "add helper function to search tasks"
// Push stack to remote
$ gt submit --stack
```

<Note>
  If you make changes lower down the stack, it is important to run `gt submit --stack` versus just `gt submit` because changes up the stack will not receive the new updates otherwise. This will result in the PR diff on the UI to not match what you see locally through `git show` or `gt info --diff` for any upstack PRs.
</Note>

## Working asynchronously

The reason `gt` is so powerful is because it enables working asynchronously. Because each branch in the **stack** is independent, you can keep building on top of the existing changes without worrying about growing the size of your PR and making things a worse experience for reviewers.

Let’s say you’re waiting on your above PR(s) to be reviewed, when a colleague has a great idea that rather than just allowing people to search for tasks, you should also allow them to search for user profiles in the same UI.

In `git`, you now have three options:

* Wait until `task_search` is merged into `main`, pull `main`, then create a new branch `profile_search` and repeat the earlier steps

  * This isn’t great because you now need to wait for reviews and merging before you can work on `profile_search`

* Update `task_search` with all changes required to implement `profile_search`

  * This isn’t great because now you have to further pollute the `task_search` PR which was already large, and wait for reviews from new reviewers, and so on.

* Create a new branch `profile_search` on top of `task_search`, and make changes to that.

  * This works well, until you need to change `task_search`, and run a rebase. The `gt` workflow handles this for you automatically.

In `gt`, you can simply run:

```sh terminal theme={null}
$ gt checkout 'add UI to display searched tasks'
// Make changes to implement profile search
$ gt create --all --message 'implement profile search'
$ gt submit --stack
```

Now, implementing profile search is built on top of “add UI to display searched tasks”, but it creates a new PR that is independent of all the changes below it. You can keep building on top of this stack, while all PRs lower down the stack (”downstack”) are independent of these changes up the stack (”upstack”).

## Check pointing in gt

A common use case for `git commit` is to check point yourself in the process of development. An example commit history would look something like:

1. Initialize boilerplate

2. Fix copy paste bug in boilerplate

3. Fill out functions in boilerplate

4. …

If you want to do something similar in `gt`, just use `gt create` every time you would `git commit`. However, it is important to not `gt submit` the entire stack until some organization is done, otherwise each of your intermediate check points will create PRs, making for a really poor review experience for your reviewers. Instead, once you have your changes in a good place, use `gt fold` to fold a child branch into its parent. This will allow you to create checkpoints without submitting PRs for each checkpoint.

<Tip>
  Run into any issues with `gt fold`? You can always split it back into separate branches with `gt split`.
</Tip>

## Syncing from remote, restacking, and resubmitting

While you're working on a piece of code, there is a chance that someone else touches the same code on `main`, or someone makes changes that you want to use. In `git`, to handle this you could do:

```sh terminal theme={null}
$ git checkout main
$ git pull
$ git checkout <my new branch>
$ git merge main
```

In `gt`, you would do the following instead:

```sh terminal theme={null}
$ gt sync
$ gt checkout <my new branch>
$ gt restack // This will rebase your stack onto main
```

Let’s assume you have a stack of PR#1 → PR#2 → PR#3.

`gt restack` tells Graphite to check if any rebases need to happen in order to correct your dependency list. For example, let's say you make a change lower down in the stack, in PR #1. PR #3 doesn't know about this until you do`gt restack`. So`gt restack`is telling Graphite that you have made changes on a PR that could affect its children—to check the children for any conflicts, and perform a rebase if it finds them.
