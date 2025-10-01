[⬅️ **edit-commits**](../working-with-commits/working-with-commits.md) • [**content**](../README.md) • [**running-and-testing-eslint-rules** ➡️](../running-testing-eslint-rules/running-testing-eslint-rules.md)

---

# Git Commands

### 1. Configuration

Commands to set up Git and user identity:

`git config --global user.name` - set username.  
`git config --global user.email` - set email.  
`git config --list` - list all Git configuration settings.

### 2. Repository Management

Creating and initializing repositories:

`git init` - initialize a new Git repository.  
`git clone <url or ssh>` - clone a remote repository into a new directory.  
`git clone <url or ssh> .` - clone a repository into the current directory.

### 3. Basic Workflow

Working with changes and staging:

`git status` - show working directory status.  
`git add <file>` - stage a file.  
`git add .` - stage all changes in the current directory.  
`git add -A` - stage all changes in the entire repository.  
`git commit -m "message"` - commit staged changes.  
`git commit --amend` - modify the last commit by adding staged changes and/or editing its message.  
`git commit --amend --no-edit` - modify the last commit with staged changes, but keep the original commit message.  
`git commit --no-verify` - commit, skipping any pre-commit hooks (e.g., linters, tests).  
`git commit --amend --author="FernirTeam <team@fernir.co>"` - change the author of the last commit.  
`git diff` - show unstaged changes.  
`git diff --staged` - show staged changes.

### 4. Branching & Merging

Managing branches and integrating changes:

`git branch` - list branches.
`git branch <name>` - create a new branch.  
`git checkout <branch>` - switch branch.  
`git checkout -b <branch>` - create and switch to a branch.  
`git merge <branch>` - merge branch into current.  
`git merge --abort` - return to the state before the merge began.  
`git rebase <branch>` - rebase current branch onto another.  
`git branch -d <branch>` - delete a branch locally.  
`git push origin --delete <branch>` - delete branch remotely.

### 5. Remote Operations

Working with remote repositories:

`git fetch` - fetch changes from remote.  
`git pull` - fetch + merge changes.  
`git push` - push commits to remote.  
`git push -u origin <branch>` - push and set upstream.  
`git push origin HEAD` - push current branch to remote (useful when branch name is long).  
`git pull --rebase` - pull with rebase.  
`git push --force` - overwrites the remote branch, discarding any new changes from others.  
`git push --force-with-lease` - force push, but fails if the remote branch has been updated by others.  
`git remote -v` - list remote repositories and their URLs.

### 6. Inspecting History

View commits and logs:

`git log` - show commit history.  
`git log --oneline` - compact log.  
`git log --graph --oneline` - visual branch graph.

### 7. Undoing Changes

Reverting or resetting changes:

`git restore <file>` - discard changes in working directory.  
`git restore --staged <file>` - unstage a staged file.  
`git reset <commit>` - reset current branch to a commit (soft).  
`git reset --hard <commit>` - reset branch + working directory.  
`git reset --hard HEAD` - discard all uncommitted changes and return to HEAD.  
`git reset --soft HEAD~1` - undo the last commit but keep all changes staged.  
`git reset --soft origin/main` - reset commits back to origin/main, but keep all changes staged.  
`git revert <commit>` - create a commit that undoes a previous commit.

### 8. Stashing

Temporarily save changes:

`git stash` - stash changes.  
`git stash list` - show stashes.  
`git stash apply` - apply latest stash.  
`git stash pop` - apply + remove latest stash.  
`git stash drop` - remove a stash.  
`git stash apply stash@{index}` - apply a specific stash from the list by its index (e.g., stash@{0} is the latest).

### 9. Interactive & Advanced

Useful tools for advanced operations:

`git cherry-pick <commit>` - apply a commit from another branch.  
`git rebase -i <commit>` - interactive rebase.  
`git rebase -i origin/main` - interactively rebase current branch commits onto origin/main.

---

[⬅️ **edit-commits**](../working-with-commits/working-with-commits.md) • [**content**](../README.md) • [**running-and-testing-eslint-rules** ➡️](../running-testing-eslint-rules/running-testing-eslint-rules.md)
