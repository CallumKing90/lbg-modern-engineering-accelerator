# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) Git and GitHub Intro

### LEARNING OBJECTIVES

_After this lesson, you will be able to:_

- Explain basic git commands like init, add, commit, push, pull and clone
- Distinguish between local and remote repositories
- Create, copy, and delete repositories locally, or on GitHub
- Fork and clone remote repositories

### STUDENT PRE-WORK

_Before this lesson, you should already be able to:_

- Use the command line
- Use a text editor

## Introduction: Git vs GitHub and version control (10 mins)

#### What is Git?

[Git](https://git-scm.com/) is:

- A program you run from the command line
- A distributed version control system

Programmers use Git so that they can keep the history of all the changes to their code. This means that they can rollback changes (or switch to older versions) as far back in time as they started using Git on their project.

You know how Google Docs allow you to have a "version history" and move between different versions whenever you want? Git enables you to do that with any folder - and its contents - on your computer!

A codebase in Git is referred to as a **repository**, or **repo**, for short.

**_Knowledge Check_** Who invented Git?

Git was created by [Linus Torvalds](https://en.wikipedia.org/wiki/Linus_Torvalds), the principal developer of Linux.

#### What is GitHub?

[GitHub](https://github.com/) is:

- A hosting service for Git repositories
- A web interface to explore Git repositories
- A social network of programmers
  - We all have individual accounts and put our codebases on our GitHub account
  - You can follow users and star your favorite projects
- A place where developers can access public codebases

#### Can you use git without GitHub?

> Instructor Note: Explain the differences between 'remote' and 'local'.

Git is a software that enables version control on local folders on your machine. GitHub is a place to host your Git repositories, remotely. You can certainly have local files, that are using Git, that are not sent to or stored on GitHub.

Read [this](http://stackoverflow.com/questions/11816424/understanding-the-basics-of-git-and-github) when you have time!

> Check: Ask students to describe how remote files compare to local files. Describe how Git compares to GitHub.

## Demo: Why is Git tricky to understand? (15 mins)

Git is tricky to understand because describing 'how' it works would require the use of strange and technical-sounding words like:

- [Directed acyclic graph](https://en.wikipedia.org/wiki/Directed_acyclic_graph)
- [SHA-1](https://en.wikipedia.org/wiki/SHA-1)
- blob
- tree

However, you don't actually need to know how it works under the hood in order to use it.

#### Trees?!

Even though you don't need to know how they work, it is useful to know that your local repository consists of three "trees" maintained by Git.

- **Working Directory**: like any other folder on your machine; just holds the actual files
- **Index**: acts as a staging area (an area that holds files "ready" to be versioned)
- **HEAD**: points to the last commit you've made (the last "version" of the code you've stored using git)

![workflow](https://cloud.githubusercontent.com/assets/40461/8221736/f1f7e972-1559-11e5-9dcb-66b44139ee6f.png)

#### So many commands?!

There are also a lot of commands you can use in Git. You can take a look at a list of the available commands by running:

```bash
$ git help -a
```

Even though there are lots of commands, on the course we will really only need about 10.

#### Git File Lifecycle

To understand how Git works, we need to talk about the lifecycle of a Git-tracked file.

![lifecycle](https://cloud.githubusercontent.com/assets/40461/8226866/62730b4c-159a-11e5-89cd-20b72ed1de45.png)

Schema From [git-scm.com](https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository)

There are 4 main stages of Git version controlled file:

1. **Untracked**: When a file is "untracked," Git is not "watching" this file; the file will not be added in the next commit
2. **Staged**: Staged files have not yet been committed to memory but they are "on deck", so to speak, for your next commit
3. **Unmodified**: The file has already been committed and has not changed since the last commit
4. **Modified**: You have changes in the file since it was last committed, you will need to stage them again for the changes to be added in the next commit

Once you have committed a file and it becomes "unmodified" then it's contents are saved in Git's memory.

- **Not saved in git memory**: Your file is not saved until you commit the file to Git's memory
- **Saved in git memory**: Only once you have committed a file, it becomes saved in Git's memory

> Check: Work with the person next to you, get on the web, and take 3 minutes to come up with a one-sentence explanation of the difference between untracked and stage files. Get ready to share out.

## Guided Practice: Let's use Git (15 mins) slide 26

Let's make our first Git repo. Try this with me!

First, create a directory on your Desktop:

```bash
$ cd ~/Desktop
$ mkdir hello-world
```

You can place this directory under Git revision control using the command:

```bash
$ git init
```

Git will reply:

```bash
Initialized empty Git repository in <location>
```

> Check: Did students get this message?

You've now initialized the working directory.

#### The .git folder

If we look at the contents of this empty folder using:

```bash
ls -a
```

We should see that there is now a hidden folder called `.git` this is where all of the information about your repository is stored. There is no need for you to make any changes to this folder. You can control all the git flow using `git` commands.

#### Add a file

Let's create a new file:

```bash
$ touch a.txt
```

If we run `git status` we should get:

```bash
On branch master

Initial commit

Untracked files:
  (use "git add <file>..." to include in what will be committed)

	a.txt

nothing added to commit but untracked files present (use "git add" to track)
```

This means that there is a new **untracked** file. Next, tell Git to take a snapshot of the contents of all files under the current directory (note the .)

```bash
$ git add .
```

This snapshot is now stored in a temporary staging area which Git calls the "index".

#### Commit

To permanently store the contents of the index in the repository, (commit these changes to the HEAD), you need to run:

```bash
$ git commit -m "Please remember this file at this time"
```

You should now get:

```bash
[master (root-commit) b4faebd] Please remember this file at this time
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 a.txt
```

> Check: Did students get this message?

#### Checking the log

If we want to view the commit history, we can run:

```bash
git log
```

You should see:

```bash
* b4faebd (HEAD -> master) Please remember this file at this time
```

> Check: Did students get this message?

#### Make changes to the file

Now let's open a.txt in a text editor.

Inside the file, write something.

```
This next line is dependent on config of the VM - currently it will not show git dif
If you press `return` in the terminal, you will now see that you have untracked changes.

```

Running `git status` again will show you that a.txt has been **modified**.

#### Revert to a previous commit

> Instructor Note: Demonstrate this to show the power of Git/GitHub but don't have students follow along.

Let's now make a second commit.

```bash
$ git add .
$ git commit -m "Second commit"
```

Checking `git log` will show you 2 commits with different ids:

```bash
* 6e78569 (HEAD, master) Second commit
* b4faebd Please remember this file at this time
```

We can revert the file back to the first commit using it's specific commit id with:

```bash
$ git reset --soft b4faebd
```

This will do a soft reset, where the changes in the file we made are still there - the changes are staged but not committed anymore.

If we want to revert the file back and disregard any changes (dangerous!), we can use:

```bash
$ git reset --hard b4faebd
```
