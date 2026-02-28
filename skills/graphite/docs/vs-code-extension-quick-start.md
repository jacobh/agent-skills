> ## Documentation Index
> Fetch the complete documentation index at: https://graphite-58cc94ce.mintlify.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Quick Start

> Get started using the Graphite VS Code extension to stack pull requests.

## Understand elements of the VS Code extension

<Frame>
  <img src="https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/8de2a4f7-1702403419-frame-10123329.png?fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=8bb463c49b6da47dd8861c5e87bab72c" data-og-width="1350" width="1350" data-og-height="1246" height="1246" data-path="images/8de2a4f7-1702403419-frame-10123329.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/8de2a4f7-1702403419-frame-10123329.png?w=280&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=16e8b4dd88d4ac86c842d5e1af5a6ed2 280w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/8de2a4f7-1702403419-frame-10123329.png?w=560&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=7b14ede735e854a22d727033f57747c1 560w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/8de2a4f7-1702403419-frame-10123329.png?w=840&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=e5ef697d585d3e89b317932596445afa 840w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/8de2a4f7-1702403419-frame-10123329.png?w=1100&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=b17aed70606b9a7c0a76cc551b0a071f 1100w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/8de2a4f7-1702403419-frame-10123329.png?w=1650&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=f880d9be58c625ddec62ea2735dae258 1650w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/8de2a4f7-1702403419-frame-10123329.png?w=2500&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=40b1ea01e521ecd6200ef7dc261e1c10 2500w" />
</Frame>

## Walkthrough video

<Frame>
  <iframe width="750" height="360" src="https://www.youtube.com/embed/TCFa0Sf_5X8?si=uLxzTYILcwrg27rW" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen />
</Frame>

## Check out a branch

There are two ways to check out branch in the VS Code extension:

1. Double-click the branch on the stack view

2. Focus a branch (single-click a branch such that it has a blue outline) and click "check out" in the branch info panel

A checked out branch will be indicated by a blue background/a pointer on the left side of the stack view.

## Focus a branch

Focusing a branch allows you to see what's been changed in the branch without checking it out. To focus a branch, single-click the branch in the visualization such that it has a blue outline. Focusing a branch adjusts the branch info panel so that it shows the files touched by that branch.

<Frame>
  <img src="https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/36c613bb-1702403792-video-to-gif-converter.gif?s=396f57854367d789c378154c9f0f0e20" data-og-width="600" width="600" data-og-height="788" height="788" data-path="images/36c613bb-1702403792-video-to-gif-converter.gif" data-optimize="true" data-opv="3" />
</Frame>

## View uncommitted changes

Uncommitted changes are represented by a node labeled "uncommitted changes" on the stack view. To see your uncommitted changes in the extension, focus the "uncommitted changes" node as you would any other branch. The branch info panel will adjust to a staging environment with your local changes.

<Frame>
  <img src="https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/355db816-1702403994-frame-10123330.png?fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=15b28ed2c4d12c6063d06e3f8bf35648" data-og-width="1350" width="1350" data-og-height="928" height="928" data-path="images/355db816-1702403994-frame-10123330.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/355db816-1702403994-frame-10123330.png?w=280&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=04c80db62bddd3467cea8874a4608a51 280w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/355db816-1702403994-frame-10123330.png?w=560&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=a3b5a23a831c3f98290efb4f8d6775b8 560w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/355db816-1702403994-frame-10123330.png?w=840&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=b1055c4b7acce61f494eaf8f13b0df2c 840w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/355db816-1702403994-frame-10123330.png?w=1100&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=b6be292fa487bbe6484246c331d35e58 1100w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/355db816-1702403994-frame-10123330.png?w=1650&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=d44a2f08ac05c38dc07f7f674e60a4f4 1650w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/355db816-1702403994-frame-10123330.png?w=2500&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=a934de0b537e095f56fddbaf11c10fcb 2500w" />
</Frame>

## Staging and unstaging files

Toggling the checkbox near each file in the uncommitted changes panel will stage or unstage that file independently. Hovering over the file will give you the option to view the diff, or delete those changes.

There are additional options to "stage all," "unstage all," and "delete all changes."

## Creating a new branch/modifying a branch

After staging relevant changes, you can **create a new branch** by entering a commit message and clicking "create new branch."

To modify an existing branch, ensure you have the desired branch checked out, stage relevant changes, check the "modify \<branch-name>" checkbox, and click "commit to the current branch."

<Frame>
  <img src="https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/91b2ce0b-1702404673-frame-10123331.png?fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=37c450a94784890d17a1a0f8b6e9ed9a" data-og-width="1350" width="1350" data-og-height="1174" height="1174" data-path="images/91b2ce0b-1702404673-frame-10123331.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/91b2ce0b-1702404673-frame-10123331.png?w=280&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=e81d88374e2a321cb3cc7afe39acab77 280w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/91b2ce0b-1702404673-frame-10123331.png?w=560&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=e971517131f629f0b180e0359ef6424c 560w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/91b2ce0b-1702404673-frame-10123331.png?w=840&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=70f4af05263018c5a4cdb0312c819dae 840w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/91b2ce0b-1702404673-frame-10123331.png?w=1100&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=98c5b929f040f7f422625d9cf367e496 1100w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/91b2ce0b-1702404673-frame-10123331.png?w=1650&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=b141e8b1ae0c5ae7d51794cfca9f23c7 1650w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/91b2ce0b-1702404673-frame-10123331.png?w=2500&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=617480709e6db0dbf4fe5417eca9b3cd 2500w" />
</Frame>

### Setting default modify behavior

When modifying a branch, you can either create a new commit on that branch, or modify the previous commit on that branch. You can set your preferred behavior in the extension's settings:

<Frame>
  <img src="https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/ac32c075-1702404784-frame-10123332.png?fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=266b97279b92107f0bee04913381268f" data-og-width="1224" width="1224" data-og-height="528" height="528" data-path="images/ac32c075-1702404784-frame-10123332.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/ac32c075-1702404784-frame-10123332.png?w=280&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=e3d1cde2e52dd435fe36d72da5589e2a 280w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/ac32c075-1702404784-frame-10123332.png?w=560&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=5bd43ef3ba2486021d8bfedd7a55c31f 560w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/ac32c075-1702404784-frame-10123332.png?w=840&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=a53324885b14ff8b67ab218fd598ff7d 840w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/ac32c075-1702404784-frame-10123332.png?w=1100&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=ea1469ce7604a7b58d7e01365be12390 1100w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/ac32c075-1702404784-frame-10123332.png?w=1650&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=58c6478e6da6e37d77e6c7135c414fef 1650w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/ac32c075-1702404784-frame-10123332.png?w=2500&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=f7f01c4df16fe2afdbdef01bca1acd92 2500w" />
</Frame>

Note that if your preferred modify behavior is commit, you'll be prompted to enter a commit message before creating the commit. If the default behavior is amend, you won't be prompted to do so.

## Drag to move/rebase branches

You can re-arrange branches by dragging them onto a new parent.

<Frame>
  <img src="https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/19c44dee-1702413095-video-to-gif-converter-1.gif?s=08c83cf86f1421e4ae302889fec68bf0" data-og-width="600" width="600" data-og-height="810" height="810" data-path="images/19c44dee-1702413095-video-to-gif-converter-1.gif" data-optimize="true" data-opv="3" />
</Frame>

## Tracking and getting branches

You can track branches onto a parent by clicking the "cloud" icon in the upper right hand corner of the extension. This is equivalent to the CLI's `gt track` and `gt get` commands.

<Frame>
  <img src="https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/e85d5acb-1705600738-frame-10123333.png?fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=706d8c45ef70af72ddb957f71da5185f" data-og-width="1350" width="1350" data-og-height="1246" height="1246" data-path="images/e85d5acb-1705600738-frame-10123333.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/e85d5acb-1705600738-frame-10123333.png?w=280&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=2e99dcdc7461b1139e6ae5a259808cad 280w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/e85d5acb-1705600738-frame-10123333.png?w=560&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=5299e8110c7c05feabc87742d2b6cc04 560w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/e85d5acb-1705600738-frame-10123333.png?w=840&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=fb76fe544b3d7c6fbeb636e258567cb4 840w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/e85d5acb-1705600738-frame-10123333.png?w=1100&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=e3fc863ac916bb782b10786a83ca9394 1100w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/e85d5acb-1705600738-frame-10123333.png?w=1650&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=d69c6837de87515a701a5fd3e6872bac 1650w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/e85d5acb-1705600738-frame-10123333.png?w=2500&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=8a74f9cf3774b01fb10d61a49c272ce3 2500w" />
</Frame>
