> ## Documentation Index
> Fetch the complete documentation index at: https://graphite-58cc94ce.mintlify.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# PR Page overview

> Learn how to review pull requests on Graphite.

This page walks you through the different sections of the Graphite PR page, and their purposes.
You can be notified that a PR needs your review in Graphite in one of two ways:

* Pull requests appear in the *Needs Review* section of your pull request inbox
* Through the Graphite integration for Slack

<Frame>
  <iframe width="750" height="360" src="https://www.youtube.com/embed/g04ReJ6Hmm8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen />
</Frame>

## Stack

The Stack section shows you all the PRs that are stacked alongside the PR you're currently viewing.

<Frame>
  <img src="https://mintcdn.com/graphite-58cc94ce/tUKGL2Qo64KDkx4t/images/stack%20view%20(light).png?fit=max&auto=format&n=tUKGL2Qo64KDkx4t&q=85&s=de010a1381ad4dd33929b4cc9570a5ac" data-og-width="2302" width="2302" data-og-height="1540" height="1540" data-path="images/stack view (light).png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/graphite-58cc94ce/tUKGL2Qo64KDkx4t/images/stack%20view%20(light).png?w=280&fit=max&auto=format&n=tUKGL2Qo64KDkx4t&q=85&s=27751ce6c3b7ca504c18c934c47d24b9 280w, https://mintcdn.com/graphite-58cc94ce/tUKGL2Qo64KDkx4t/images/stack%20view%20(light).png?w=560&fit=max&auto=format&n=tUKGL2Qo64KDkx4t&q=85&s=a63d537e07597611504bbc5ecbb9e6c5 560w, https://mintcdn.com/graphite-58cc94ce/tUKGL2Qo64KDkx4t/images/stack%20view%20(light).png?w=840&fit=max&auto=format&n=tUKGL2Qo64KDkx4t&q=85&s=2807d58f07a7e5275816f3bbbab7f65d 840w, https://mintcdn.com/graphite-58cc94ce/tUKGL2Qo64KDkx4t/images/stack%20view%20(light).png?w=1100&fit=max&auto=format&n=tUKGL2Qo64KDkx4t&q=85&s=5ac6cf263582393616a7587bbd132fb7 1100w, https://mintcdn.com/graphite-58cc94ce/tUKGL2Qo64KDkx4t/images/stack%20view%20(light).png?w=1650&fit=max&auto=format&n=tUKGL2Qo64KDkx4t&q=85&s=eea4e7d0413168e6ae7555c01da166f5 1650w, https://mintcdn.com/graphite-58cc94ce/tUKGL2Qo64KDkx4t/images/stack%20view%20(light).png?w=2500&fit=max&auto=format&n=tUKGL2Qo64KDkx4t&q=85&s=48ce2df3d658e7d296e8606f521c9343 2500w" />
</Frame>

## Description

The description editor supports rich-text editing and Markdown. You can quickly access robust rich-text formatting options by typing a **/** in the description to do things like adding images, formatting as code, inserting tables, collapsible sections, and alerts.

You can use the toggle in the top left of the section to switch between editing in rich-text or as Markdown.

You can click the **"Generate"** button to have Graphite Agent automatically generate a PR description. Click **Save** in the upper right corner to save your changes.

<img src="https://graphite-email-images-prod.s3.us-west-2.amazonaws.com/description+editing+(light).gif" alt="Description editing" className="w-full max-w-[800px] h-auto" />

## Discussion

Discussion is below the PR description, and contains PR-level comments that aren't related to a specific line of code.

## PR info & status

PR info and statuses appear in the top right of the page.

* **Status** of the PR appears at the top right of the page.
* **Review status** shows whether the PR is waiting on reviewers or if it's ready to merge. It will also show if Graphite Agent found any issues.
* **Checks** is an expandable toggle that contains your CI checks and their information. You can click on the checks to open them in GitHub.
* **Reviewers** contains the currently assigned reviewers. You can hover over the reviewers to remove them or re-request a review.
* **Labels** are the labels assigned to the PR, where you can add or remove them.
* **Assignees** are the owner(s) of the PR.
* **Related tasks** are related tasks from your project management platform (such as Linear).

<Frame>
  <img src="https://mintcdn.com/graphite-58cc94ce/tUKGL2Qo64KDkx4t/images/info%20panel%20unresolved%20comments%20(light).png?fit=max&auto=format&n=tUKGL2Qo64KDkx4t&q=85&s=d075f1f8094b045deb46161047f068fe" data-og-width="728" width="728" data-og-height="1516" height="1516" data-path="images/info panel unresolved comments (light).png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/graphite-58cc94ce/tUKGL2Qo64KDkx4t/images/info%20panel%20unresolved%20comments%20(light).png?w=280&fit=max&auto=format&n=tUKGL2Qo64KDkx4t&q=85&s=e48222a26b3dd42de3967c4c63a3fdbd 280w, https://mintcdn.com/graphite-58cc94ce/tUKGL2Qo64KDkx4t/images/info%20panel%20unresolved%20comments%20(light).png?w=560&fit=max&auto=format&n=tUKGL2Qo64KDkx4t&q=85&s=9adb883a4d725aef42ffd0a4cf2207f8 560w, https://mintcdn.com/graphite-58cc94ce/tUKGL2Qo64KDkx4t/images/info%20panel%20unresolved%20comments%20(light).png?w=840&fit=max&auto=format&n=tUKGL2Qo64KDkx4t&q=85&s=36518fb6afb3db5129520d3bb56b3b96 840w, https://mintcdn.com/graphite-58cc94ce/tUKGL2Qo64KDkx4t/images/info%20panel%20unresolved%20comments%20(light).png?w=1100&fit=max&auto=format&n=tUKGL2Qo64KDkx4t&q=85&s=f671801d74fa822a1734b8100f29d9ce 1100w, https://mintcdn.com/graphite-58cc94ce/tUKGL2Qo64KDkx4t/images/info%20panel%20unresolved%20comments%20(light).png?w=1650&fit=max&auto=format&n=tUKGL2Qo64KDkx4t&q=85&s=34af9bed51d8c090055e1d4d10ffe6f4 1650w, https://mintcdn.com/graphite-58cc94ce/tUKGL2Qo64KDkx4t/images/info%20panel%20unresolved%20comments%20(light).png?w=2500&fit=max&auto=format&n=tUKGL2Qo64KDkx4t&q=85&s=1f61e2e9c58327c0a7d9727a9b69f1ad 2500w" />
</Frame>

## Navigating files

The file tree is expanded by default next to the diff, below the PR Description and Discussion sections. Clicking on a file name in the file tree will scroll you to that file in the diff.

You can press **F** to expand or collapse the file tree. When the file tree is collapsed, the list of files is still accessible from a table of contents visualizer on the left side of the page.

<img src="https://graphite-email-images-prod.s3.us-west-2.amazonaws.com/file+tree+(light)+(2).gif" alt="Adding comments" className="w-full max-w-[800px] h-auto" />

<Note>
  To prevent certain files from displaying in diffs by default, you can use a [`.gitattributes` file with the `linguist-generated` attribute](https://docs.github.com/en/repositories/working-with-files/managing-files/customizing-how-changed-files-appear-on-github).
</Note>

## Start a review

You can start a review by hovering over a line number to leave a comment. Clicking the line number will allow you to leave a comment on a single line. Clicking and dragging across multiple lines will allow you to leave a comment spanning those lines. Graphite allows you to comment on both changed and unchanged lines of code.

<img src="https://graphite-email-images-prod.s3.us-west-2.amazonaws.com/commenting+basic+(light).gif" alt="Adding comments" className="w-full max-w-[800px] h-auto" />

Clicking the comment icon that appears next to the line number will open a comment editor to the right of the diff. Comments support rich-text editing, and you can attach files or add a comment as part of a review.

Hit **Cmd+Enter** to submit your comment once you're done typing it, or click the blue up arrow. This posts the comment immediately — useful for one-off, non-opinionated comments.

Checking the box next to **"Add to review"** will add the comment to a "batch." Once you batch the comment, it will be pending and only visible to you until you've submitted your final review, at which point all of your batched comments will also be submitted.

Adding a comment to review will cause it to appear in the **"Finish review"** button at the top of the page:

<Frame>
  <img src="https://mintcdn.com/graphite-58cc94ce/SXTOqGO9HawJ42Ja/images/add%20to%20review%202%20(light).png?fit=max&auto=format&n=SXTOqGO9HawJ42Ja&q=85&s=9db9764fb8466628b6a12f3af29928cf" data-og-width="1268" width="1268" data-og-height="1174" height="1174" data-path="images/add to review 2 (light).png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/graphite-58cc94ce/SXTOqGO9HawJ42Ja/images/add%20to%20review%202%20(light).png?w=280&fit=max&auto=format&n=SXTOqGO9HawJ42Ja&q=85&s=7cb9af7ca953f3b8e061c65eae7019f2 280w, https://mintcdn.com/graphite-58cc94ce/SXTOqGO9HawJ42Ja/images/add%20to%20review%202%20(light).png?w=560&fit=max&auto=format&n=SXTOqGO9HawJ42Ja&q=85&s=5b0f36e3a32912dce8630be214294576 560w, https://mintcdn.com/graphite-58cc94ce/SXTOqGO9HawJ42Ja/images/add%20to%20review%202%20(light).png?w=840&fit=max&auto=format&n=SXTOqGO9HawJ42Ja&q=85&s=6f5b5276c5c636df171f418337c428df 840w, https://mintcdn.com/graphite-58cc94ce/SXTOqGO9HawJ42Ja/images/add%20to%20review%202%20(light).png?w=1100&fit=max&auto=format&n=SXTOqGO9HawJ42Ja&q=85&s=a30cbce7eed028f98bf49b3587ad7174 1100w, https://mintcdn.com/graphite-58cc94ce/SXTOqGO9HawJ42Ja/images/add%20to%20review%202%20(light).png?w=1650&fit=max&auto=format&n=SXTOqGO9HawJ42Ja&q=85&s=222e8357f761168a58af195af81c827f 1650w, https://mintcdn.com/graphite-58cc94ce/SXTOqGO9HawJ42Ja/images/add%20to%20review%202%20(light).png?w=2500&fit=max&auto=format&n=SXTOqGO9HawJ42Ja&q=85&s=54ff416fc08a1d83ddb60f3c5ccc85a9 2500w" />
</Frame>

## Suggested edits

While reviewing, you can directly leave a suggested code edit to streamline the review process.

<Frame>
  <img src="https://mintcdn.com/graphite-58cc94ce/tUKGL2Qo64KDkx4t/images/suggest%20edits%201%20(light).png?fit=max&auto=format&n=tUKGL2Qo64KDkx4t&q=85&s=3fb84fadd5f0a206cb6cb45e05b7eacd" data-og-width="1855" width="1855" data-og-height="842" height="842" data-path="images/suggest edits 1 (light).png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/graphite-58cc94ce/tUKGL2Qo64KDkx4t/images/suggest%20edits%201%20(light).png?w=280&fit=max&auto=format&n=tUKGL2Qo64KDkx4t&q=85&s=a030a16bc905ded3069292872c3d9cb2 280w, https://mintcdn.com/graphite-58cc94ce/tUKGL2Qo64KDkx4t/images/suggest%20edits%201%20(light).png?w=560&fit=max&auto=format&n=tUKGL2Qo64KDkx4t&q=85&s=2b3eb3ee9d05d8169d9107723c31da7f 560w, https://mintcdn.com/graphite-58cc94ce/tUKGL2Qo64KDkx4t/images/suggest%20edits%201%20(light).png?w=840&fit=max&auto=format&n=tUKGL2Qo64KDkx4t&q=85&s=cf395915e2218c276278528ccec87ab5 840w, https://mintcdn.com/graphite-58cc94ce/tUKGL2Qo64KDkx4t/images/suggest%20edits%201%20(light).png?w=1100&fit=max&auto=format&n=tUKGL2Qo64KDkx4t&q=85&s=cff91afccc1cfe34892697562b154d16 1100w, https://mintcdn.com/graphite-58cc94ce/tUKGL2Qo64KDkx4t/images/suggest%20edits%201%20(light).png?w=1650&fit=max&auto=format&n=tUKGL2Qo64KDkx4t&q=85&s=ce11900d1f2d6d181e5f96e9661e3f90 1650w, https://mintcdn.com/graphite-58cc94ce/tUKGL2Qo64KDkx4t/images/suggest%20edits%201%20(light).png?w=2500&fit=max&auto=format&n=tUKGL2Qo64KDkx4t&q=85&s=cb9640e2f4018e9d2ff9356ef55d2bd5 2500w" />
</Frame>

## Line-level actions & Graphite Agent

If you hover over any lines in the diff, you can use the overflow menu to perform actions on the associated lines of code.

* **Add comment** allows you to add a comment on that line.
* **Suggest change** allows you to add a suggested edit.
* **Add to chat** will open the Chat sidebar and add the selected lines to the Chat context, where you can prompt Graphite Agent to fix the code, explain it, or improve it.
* **Copy code** allows you to copy the code from that line.
* **Copy link** creates a shareable link to the line of code you selected.

<img src="https://graphite-email-images-prod.s3.us-west-2.amazonaws.com/line+level+actions+copy+link+(light).gif" alt="Adding comments" className="w-full max-w-[800px] h-auto" />

## Submitting your review

To finish your review, you can click the **"Finish review"** button at the top of the page, or you can scroll down to the bottom of the diff and click **"Comment"** (**R** then **C**), **"Request changes"** (**R** then **N**), or **"Approve"** (**R** then **A**).

Using any of these options will open a panel where you can comment, request changes, approve, or submit your review with a review summary comment.

If you'd like to approve a PR without a comment, use the shortcut **R** then **Y** to quick-approve.
