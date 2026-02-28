> ## Documentation Index
> Fetch the complete documentation index at: https://graphite-58cc94ce.mintlify.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Create A Pull Request

> Learn to use the Graphite CLI to create a single pull request.

This tutorial will teach you how to create a single pull request with the `gt` CLI. Your goal is to learn how your existing Git/GitHub workflow for creating pull requests maps to `gt` commands.

This tutorial intentionally avoids discussing stacked pull requests, so you can stay focused on building confidence with the basic single PR workflow.

<Note>
  Before working through this tutorial, make sure to [install & authenticate the CLI](/install-the-cli).
</Note>

## Choose a repo to work in

Pick a Git repository that already exists on your computer, and change to that directory:

```bash Terminal theme={null}
cd ~/path/to/your/repo
```

If you don’t have a repository or prefer a blank one for demo purposes, you can [create a new repository](https://github.com/new) on GitHub, git clone it locally, and cd to the folder.

If this is the first time working with `gt` in this repo, run `gt init` and select your trunk branch when prompted (usually `main` or `master`):

```bash Terminal theme={null}
gt init
```

Your repo is now configured to work with `gt` and you’re ready to start making your first pull request.

## Build your feature

For this tutorial, pretend that your team is building a new activity feed feature, and you’ve been assigned a task to build a server API endpoint that returns the current user’s activity feed items:

```bash Terminal theme={null}
GET /activity-feed


[
  { id: 1, title: "Photo uploaded", body: "Alice uploaded a photo" },
  { id: 2, title: "Comment on post", body: "Charlie commented on Bob's post" },
]
```

Your goal is to get something up with dummy data quickly, so the frontend engineers on your team can start building UI components that consume this API.

This tutorial isn’t focused on coding, so paste this command into your terminal to quickly create a file with the new API changes:

```bash Terminal theme={null}
cat << EOF > activity_feed.js
const express = require('express');
const app = express();
const port = 3000;


// Fake data for the activity feed
const activityFeed = [
  {
    id: 1000,
    title: 'New Photo Uploaded',
    body: 'Alice uploaded a new photo to her album.'
  },
  {
    id: 2000,
    title: 'Comment on Post',
    body: "Bob commented on Charlie's post."
  },
  {
    id: 13,
    title: 'Status Update',
    body: 'Charlie updated their status: "Excited about the new project!"'
  }
];


app.get('/feed', (req, res) => {
  res.json(activityFeed);
});


app.listen(port, () => {
  console.log(\`Server running on port \${port}\`);
});
EOF
```

Run `git status` and confirm that `activity_feed.js` shows up as an untracked file. At this point, you’re ready to commit your work to a new branch.

## Commit and create a branch

If you’re coming from Git/GitHub, you’re probably used to this workflow:

```bash Terminal theme={null}
# Create a new branch
git checkout -b your-feature-branch-name


# Do some coding
echo "some changes" >> a_file.js


# Stage your changes
git add a_file.js


# Commit your changes
git commit -m "feat: Add a new feature to a_file.js"
```

Because this is such a common workflow, we’ve wrapped it up in a single `gt create` command, which:

* Takes a commit message

* Creates a branch with a name based on that commit message

* Commits your changes under that same message

* Checks out the new branch

From the previous section, your repo should have an uncommitted file called `activity_feed.js`.

To commit this new file & create a new branch for it:

```bash Terminal theme={null}
gt add activity_feed.js
gt create --message "feat: Add basic activity feed API"
```

If you run `gt log short`, you should see your new branch, with an indicator that you’ve also checked the branch out:

```plain Terminal theme={null}
◉  12-26-feat_Add_basic_activity_feed_API
◯  main
```

Now that your branch is created, you’re ready to submit it for review.

<Tip>
  `gt create` takes an `--all` flag that will stage your unstaged changes for you, similar to `git commit --all`.

  Both `--all` and `--message` have short versions: `gt create -am "commit message"` works the same as `git commit --all --message "commit message"`.
</Tip>

## Submit the branch

Once your work is finished locally, the next step in the authoring workflow is to submit it for code review.

Since `gt create` already checked out your new feature branch for you, run the following command to create a new pull request:

```bash Terminal theme={null}
gt submit
```

It will prompt you with a few questions:

* Whether you want to edit the PR description now

  * If you select **yes**, it will open the PR description in your `$EDITOR` for editing.

* Whether you want a draft PR, or to publish it immediately

  * Since this is a tutorial, it’s probably best to create a **draft** PR

When `gt submit` completes, it will print out the URL of the newly created pull request. You can either directly click the URL, or run `gt pr` to quickly open the new PR in your default browser.

<Tip>
  Graphite has a streamlined, stack-aware code review interface that `gt pr` will take you to by default. However, your coworkers can still decide whether to review with Graphite or GitHub, as we 2-way sync every pull request.

  Comments & feedback from the GitHub PR interface will show up on Graphite, and vice versa!
</Tip>

## Responding to review feedback

Once your coworker reviews your new pull request, it’s possible they might have some blocking changes they’d like you to make.

A typical Git workflow might look like this:

```bash Terminal theme={null}
# Check out the branch and address the feedback
git checkout your-feature-branch
echo "respond to feedback" > file.js


# Stage + commit the changes
git add file.js
git commit -m "responded to feedback"


# Push the new changes to GitHub & update your PR
git push origin your-feature-branch
```

With `gt`, you can make this a little easier.

If you need to check out your branch, you can do it with autocomplete and/or arrow key selection by running:

```bash Terminal theme={null}
gt checkout
```

You’ll be prompted for which branch to pick, saving you the effort of copying the branch name from your pull request on GitHub.

Once you’ve made your changes and are ready to `git add && git commit`, you can run:

```bash Terminal theme={null}
gt modify
```

and your changes will be amended to the existing commit.

If you prefer to create a new commit for your changes, you can pass the `--commit` flag to `gt modify`:

```bash Terminal theme={null}
gt modify --commit --message "Responded to Alice's feedback"


# or, with short arguments:
gt modify -cm "Responded to Alice's feedback"


# or, with short command AND short arguments :)
gt m -cm "Responded to Alice's feedback"
```

Now that you’ve committed your changes, you can push them up using the same command as before:

```bash Terminal theme={null}
gt submit
```

The full workflow for updating an existing branch is:

```bash Terminal theme={null}
# Check out your branch interactively
gt checkout  # or gt co


# Make changes and amend the branch
echo "some changes" > file.js
gt modify    # or gt m


# Push the changes up
gt submit    # or gt s
```
