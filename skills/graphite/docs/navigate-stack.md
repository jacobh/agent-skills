> ## Documentation Index
> Fetch the complete documentation index at: https://graphite-58cc94ce.mintlify.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Navigate A Stack

> Learn how to navigate stacked branches with the Graphite CLI.

<Frame>
  <iframe width="750" height="360" src="https://www.youtube.com/embed/pYKuimOYWaA?si=lfPQ3iocq2z9UU8Z" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen />
</Frame>

## Prerequisites

To navigate a stack of branches with the Graphite CLI, make sure you've:

* [Installed and configured the CLI](/install-the-cli)

* [Authenticated with GitHub](/install-the-cli#authenticating-the-cli)

* [Initialized `gt`](/cli-quick-start#initializing-graphite) in a repo of your choice

* [Created](/create-stack) or tracked a branch/stack of branches

## `gt log`

You can use `gt log` to view the current state of your repository:

```bash Terminal theme={null}
> gt log


◉ pp--06-14-part_3 (current)
│ 8 seconds ago
│
│ 95338df - part 3
│
◯ pp--06-14-part_2
│ 8 seconds ago
│
│ 95610c6 - part 2
│
◯ pp--06-14-part_1
│ 27 seconds ago
│
│ 48cd85e - part 1
│
◯ main
│ 5 weeks ago
│
```

### Check out a branch

Branches in Graphite are just `git` branches under the hood—you can check them out with native `git`, but the easiest way is to use `gt checkout`:

```bash Terminal theme={null}
# checkout pp--06-14-part_1
gt checkout pp--06-14-part_1


# even easier, use the alias!
gt co pp--06-14-part_1
```

If you aren't sure which branch you want to checkout, you can also use `gt checkout` (or `gt co`) in interactive mode:

```bash Terminal theme={null}
> gt co


? Checkout a branch (autocomplete or arrow keys) ›
    pp--06-14-part_3
    pp--06-14-part_2
❯   pp--06-14-part_1
    main
```

Now, you can see in `gt log short` you're on `part_1` as intended:

```bash Terminal theme={null}
> gt ls


◯  pp--06-14-part_3
◯  pp--06-14-part_2
◉  pp--06-14-part_1
◯  main
```

### Move up and down a stack

Sometimes you want to move to the branch directly above or below the current branch in a stack. The `gt up`, `gt down`, `gt top`, and `gt bottom` commands help make this possible.

Since `gt bottom` takes you to the bottom-most branch in your stack not including your trunk branch, you can use `gt checkout --trunk/-t`, which always takes you to your `trunk` branch (e.g. `main`):

```bash Terminal theme={null}
# check out the branch directly upstack (in this case part_2)
gt up
#alias for branch up
gt u


# check out the branch directly downstack (in this case back to part_1)
gt down
#alias for branch down
gt d


# move multiple branches at a time (up to part_3)
gt up 2
# alias for branch up 2
gt u 2


# move multiple branches at a time (back to main)
gt down 3
# alias for branch down 3
gt d 3


# move to the tip of the stack (back to part_3)
gt top
# alias for branch top
gt t


# move to the base of the stack, not including trunk (to part_1)
gt bottom
# alias for branch bottom
gt b
```

<Note>
  If you find yourself navigating a complex stack where there are multiple children of a particular branch, `gt up` and `gt top` will ask which child branch you'd like to checkout if there's ever ambiguity.
</Note>
