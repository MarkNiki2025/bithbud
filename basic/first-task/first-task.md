[⬅️ **ide-setup**](../ide-setup/ide-setup.md) • [**content**](../README.md) • [**labels** ➡️](../labels/labels.md)

---

# First task - Guide

#### You must already have cloned the dev-tutorials repository. This is because all further actions are performed only in it!

This article discusses the basic rules for working with GitLab and Git. To get started, you should have already gone through the [IDE setup tutorial](../ide-setup/ide-setup.md).

### 1. Create and take the task

First, you need to open GitLab. You should already have an account created and be logged in.
If you are not logged in yet, go back to this tutorial: [lab-onboard-short-public](https://docs.google.com/document/d/1PVIGMi9ibZVWB7rkmawEKqM8926aqjjbR375TxzKY9E/edit?tab=t.0#heading=h.2ogvsc7qpa5f).

When you open GitLab, you will see the home page, as shown below.
The next thing you need to do is go to your working repository. To do this, click the "Projects" button, which is circled in red in the screenshot.

![alt text](./attachments/first-task-1.png)

If you haven’t made any changes to the project yet, it will be displayed in the “Member” section (highlighted in red in the screenshot).
Once you make any changes to the project, it will also appear in the “Contributed” section.

![alt text](./attachments/first-task-2.png)

Next, select your working project. For now, it will be “dev-tutorials.”

![alt text](./attachments/first-task-3.png)

Then, click the "Plan" button and select "Issue boards."

![alt text](./attachments/first-task-4.png)

Here you will see a board with tasks.
Tasks are divided into the following categories: `Open`, `Paused`, `In-progress`, `Review`, and `Closed`.
In short:

-   `Open` - the task is available to be taken, provided it doesn’t have the “blocked” label and no one has been assigned to it yet.
-   `Paused` - someone has already taken the task, but it is temporarily on hold.
-   `In-progress` - someone is currently working on the task.
-   `Review` - the task is awaiting review.
-   `Close` - the task has been completed, and the working branch has been merged into the main branch.

At this stage, you need to create the task you will work on. In the future, you will mostly work on already created tasks.

Let’s briefly explain task priority: tasks are categorized by priority levels from `p1` to `p9`. The lower the priority number, the higher the importance of the task. You don’t need to spend much time choosing a task — just pick the first one with the highest priority. For now, you’ll create a task yourself. To do this, click the “plus” button as shown in the screenshot. Then, come up with a title for your task (for example, “My first test task”). Finally, click the “Create issue” button.

> **Attention** we using **only english language** to name of tasks, merge requests, branches and commits!
> **Any other languages aren't allowed** to name tasks, merge requests, branches and commits!

![alt text](./attachments/first-task-5.png)

When you have created a task, you will see window with task details. First of all, imagine description for your task. For example "Create new file and writing comment". To change task description to your click on "edit" button.
When you have created a task, you will see a window with the task details. First of all, write a description for your task. For example: “Create a new file and write a comment.” To change the task description, click the “Edit” button.

![alt text](./attachments/first-task-6.png)

Then write something like this: “Need to create a new file with the comment ‘It’s my first task’.”
After that, click the “Save changes” button.

![alt text](./attachments/first-task-7.png)

Next, assign the task to yourself. To do this, click the “Assign yourself” button, as shown in the screenshot. Right below this, you’ll see a list of labels — click the “Edit” button, as shown in the screenshot.

![alt text](./attachments/first-task-8.png)

Now you need to add two labels: the first one is `p9`, and the second is `in-progress`, as shown in the screenshot.

![alt text](./attachments/first-task-9.png)

### 2. Create merge request

Great! Now click on the “Create merge request” button, as shown in the screenshot.

![alt text](./attachments/first-task-10.png)

In the modal window, click “Create merge request” again.

![alt text](./attachments/first-task-11.png)

Next, copy the branch name and paste it into the “title” field. This will be the name of your merge request — it should match your branch name. In my case, the branch name is "1-my-first-test-task", so I paste it into the title field.

![alt text](./attachments/first-task-12.png)

Then scroll down and do the following:

1. Assign yourself to this merge request by clicking the “Assign to me” button.
2. Assign your reviewer by selecting their name in the “Reviewer” dropdown menu — in your case, it’s Vova Pe.
3. Remove the label "in-progress".
4. Check the box “Squash commits when merge request is accepted.”
5. Finally, click the “Create merge request” button.

![alt text](./attachments/first-task-13.png)

Great! Now we are on our merge request page. We need to copy the branch name and open our IDE. I’m using VS Code, and I’ll show all the examples in it. If you’re using a different IDE, your steps might vary slightly. In the screenshot below, I’ve highlighted in red the button used to copy the branch name.

![alt text](./attachments/first-task-14.png)

### 3. Working with task in IDE

First, open your working project in VS Code: **File > Open Folder > folder-of-your-project**. It should look similar to the screenshot below. As you can see, I have an empty project, but you may already have some folders and files there.

![alt text](./attachments/first-task-15.png)

Then open the terminal - on the keyboard press **Ctrl + `**, or **View > Terminal**. I will show everything in Git Bash because it works the same on all OS. You can use any other console.

Now we need switch to your working branch. To find out which branch you are currently in, type the command:

```
git status
```

![alt text](./attachments/first-task-16.png)

I am currently on the main branch.
To switch to the new branch we created in GitLab, you first need to pull it from the remote repository:

```
git pull
```

![alt text](./attachments/first-task-17.png)

After pulling, you’ll see your new branch.
To switch to a different branch, run:

```
git checkout branch-name
```

In my case, this command look like this:

```
git checkout 1-my-first-test-task
```

After switching, you should see a message like this:

![alt text](./attachments/first-task-18.png)

#### You are now in your working branch, now you can start working on the task!

### 4. How push your changes to GitLab

Usually you just start performing tasks now, but since we are just teaching you basic skills in working with Git, your task for now is to create a file and make some changes to it.

First of all, in order to perform the following tasks, we need to execute the following commands:

```
# Navigate to the basic directory
cd basic

# Install project dependencies
pnpm install
```

![alt text](./attachments/first-task-29.png)

Then create a new file in the `dev-tutorials/basic/playground` folder. Name this file `test-task.ts` and write the following line of code:

```
const temp = 0;
```

Now you must commit your changes. To do this, run the following commands:

1. `git add .` - stages all the changes you made.
2. `git commit -m "Commit message"` - creates a commit with all staged changes.

But oops, we got an error like this:

![alt text](./attachments/first-task-27.png)

Why? We got an error because we use pre-commit hook in our development.

**What is a pre-commit hook?**  
It's an automated check that runs before every commit. It helps maintain code quality by:

-   Running tests
-   Checking code style (ESLint)
-   Verifying the project builds successfully

In 95% of cases it works correctly and if it finds any error then you need to fix it. But sometimes you just need to skip the check for some reason. For this use the following command (**NOT USE IT NOW**):

`git commit --no-verify -m "Commit message"` - skips pre-commit check.

But now we got the correct error. It says: **'temp' is assigned a value but never used** and that's it. So let's fix the error and instead of declaring a variable, just leave a comment in the file like this:

```
// I created new file.
```

Now run the following commands:

> **Commit Message Format:** `git commit -m "<task-number> - <brief description of changes>"`
>
> **Example:** If your task number is 1 (visible at the start of your branch name like `1-my-first-test-task`),
> your commit should look like:
> `git commit -m "1-create-test-file-with-comment"`

1. `git add .`
2. `git commit -m "Commit message"`

As you can see, everything run well:

![alt text](./attachments/first-task-28.png)

After that, run the following command to push the changes to the remote repository:

`git push origin` - pushes your commit to the remote repository.

It should look like this:

![alt text](./attachments/first-task-19.png)

### 5. Changing labels on GitLab

Now go to GitLab. Open your **merge request** (not the task/issue) and add the labels `action-required3` and `code-review`. You can also see your commit in the merge request history. In the end, it should look like this:

![alt text](./attachments/first-task-20.png)

Next, go to your task — you can do this by clicking the link:

![alt text](./attachments/first-task-21.png)

The last one - remove `in-progress` label and set the `review` label.

![alt text](./attachments/first-task-22.png)

### 6. Cleaning

Now close your merge request. Click on your mr:

![alt text](./attachments/first-task-23.png)

Then scroll down and click the "Close merge request" button.

![alt text](./attachments/first-task-24.png)

After that, go to your task (as we did previously), click the three dots in the upper right corner, and select “Delete issue”:

![alt text](./attachments/first-task-25.png)

Confirm the action in the modal window:

![alt text](./attachments/first-task-26.png)

### Now I recommend you to read more about [labels](../labels/labels.md) and [comments](../comment/comments.md)!

---

[⬅️ **ide-setup**](../ide-setup/ide-setup.md) • [**content**](../README.md) • [**labels** ➡️](../labels/labels.md)
