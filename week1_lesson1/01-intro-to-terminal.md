# Intro to Terminal

### Objectives

After this lesson, students will be able to:

- Use common terminal commands
- Explain the role and importance of the terminal
- Explain how to navigate through directories in the terminal
- Create, copy, move, and remove files from the terminal

## GUI vs CLI - slide 12

GUI stands for Graphical User Interface.

CLI stands for Command Line Interface.

Most apps you're used to using are GUIs (pronounced gooey). But before we had GUIs all we had on computers were CLIs (who remembers MS DOS?).

The CLI or terminal is an application that provides direct access to the inner workings of your operating system.

What do we use it for?

- Navigating the file system
- Creating, copying, moving and renaming files
- Working with git
- Installing system applications (eg. homebrew, npm)
- Working with Node Package Manager
- Running local servers
- Running build scripts
- Deployment of apps (eg. heroku, netlify, github, AWS)
- Connecting to and controlling remote machines

Terminal takes a bit of getting used to but will become a fast way of working with all sorts of tools.

The good news is you'll be using it every day as a developer so you'll get used very quickly!

### Opening Terminal slide 9

The Terminal.app is found on your Virtual Box desktop or Workspace dock

## Common Commands

| Command        | Explanation                                                     |
| -------------- | --------------------------------------------------------------- |
| ls             | list the contents of the current directory                      |
| ls -a          | list all contents including hidden files and directories        |
| ls -l          | list files in long format                                       |
| cd             | change directory - navigate up or down the folder tree          |
| pwd            | print working directory - output the path of the current folder |
| mkdir          | make directory - make a new folder                              |
| mv file1 file2 | move or rename a file                                           |
| cp file1 file2 | copy a file                                                     |
| cp -r          | copy recursively - for folders                                  |
| rm file        | delete a file                                                   |
| rm -rf         | delete a folder with recursive force - DANGER                   |
| touch          | create a new file                                               |
| code .         | open the current folder (or file) in VS Code                    |
| history        | list recent commands used                                       |
| .              | reference the current folder                                    |
| ..             | reference the parent folder                                     |
| ~              | the home directory of the current user                          |

## Useful Keyboard Shortcuts

| Shortcut | Explanation                                       |
| -------- | ------------------------------------------------- |
| Ctrl + C | stop the current running process                  |
| Ctrl + R | search and cycle through command history          |
| Cmd + T  | open a new tab                                    |
| TAB      | autocompletion of commands, cycle through options |

## Command Line Practice

Here is a little exercise to help you practice with using the terminal:

- Navigate to your desktop
- Create a directory called films
- Go into this directory
- Create a file for your favourite film
- Open this file in VS Code and add some text inside
- Create another 3 files for other films in one line
- Rename one of the films to the name of the sequel
- Open the entire directory inside VS Code so you can see all files and make some changes (remember to save files)
- Delete your two least favourite films

Already a terminal wizard? Try this exercise out:

- Navigate to your desktop
- In a single command, create a directory called terminal-practice-1 and change your working directory to terminal-practice-1
- In a single command, create this file structure:

```
index.html
|
|___css
|   |__main.css
|   |__main.scss
|
|___js
    |__app.js
```

- Navigate back to your desktop
- In a single command, create a new directory called terminal-practice-2 and move the contents of terminal-practice-1 into terminal-practice-2
- Delete terminal-practice-1
- Rename terminal-practice-2 to terminal-practice
