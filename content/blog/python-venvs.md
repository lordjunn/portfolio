---

date: '2026-07-06T12:00:00.000Z'
title: I Keep Forgetting How to Create Python Virtual Environments
tagline: So I wrote it down once and for all
preview: >-
    I somehow forget the commands for creating Python virtual environments every few weeks.
    Instead of searching Google again, here's my personal cheat sheet.
image: >-
    https://images.unsplash.com/photo-1515879218367-8466d910aaa4
keywords: "Python, Virtual Environment, venv, pip, Development"
author:
    authorname: Lord Junn
    authorimage: >-
        /ProfilePictures/Mutsumi.png
readingtime: 7
--------------

# I Keep Forgetting How to Create Python Virtual Environments

Every few weeks, I run into the same problem.

I open a new Python project, stare at my terminal, and think...

> "Wait... was it `python -m venv .venv` or `python3 -m venv venv`?"

Instead of searching Google or Stack Overflow for the hundredth time, I figured I'd write everything down here.

This post is mainly for future me, because I somehow forget these commands every few weeks.

But if you found this through Google or happened to stumble across my blog, welcome! Hopefully this saves you a few minutes too.

---

## What Is a Virtual Environment?

A virtual environment (or **venv**) is an isolated Python environment for a project.

Instead of installing every package globally on your computer, each project gets its own set of dependencies.

For example:

Project A might use:

* Flask 3.1
* Requests 2.32

Project B might use:

* Django 5
* FastAPI
* SQLAlchemy

Without virtual environments, these projects could end up conflicting with one another.

Keeping each project's dependencies separate makes life much easier.

---

## Where Should I Create My Project?

One thing that confused me when I first started learning Python was where I was actually supposed to create my projects.

My Python installation lives on my **C:** drive, but that doesn't mean every Python project has to live there too.

Personally, I prefer keeping all my projects on another drive, such as **D:**. That way I don't flood my operating system drive with dozens of repositories, virtual environments and downloaded packages.

My folder structure usually looks something like this:

```text
D:\
└── Projects
    ├── Flask-App
    ├── Discord-Bot
    ├── Data-Analysis
    └── Random-Scripts
```

Then I simply navigate to whichever project I'm working on.

```bash
cd D:\Projects\Flask-App
```

The important thing to understand is this:

Your Python interpreter can be installed on **C:** while your project and virtual environment live on **D:** (or any other drive).

The `venv` command simply uses your installed Python to create a self-contained environment inside your current project folder.

So don't worry if your Python installation and your projects aren't on the same drive—they don't need to be.

---

## Step 1: Create a Project Folder

If you haven't already created one:

```bash
mkdir my-project
cd my-project
```

---

## Step 2: Create the Virtual Environment

I usually name mine `.venv` since many editors recognise it automatically.

```bash
python -m venv .venv
```

If your system uses `python3`, run:

```bash
python3 -m venv .venv
```

After running the command, your folder should look something like this:

```text
my-project/
│
├── .venv/
```

---

## Step 3: Activate It

### Windows (Command Prompt)

```cmd
.venv\Scripts\activate
```

### Windows (PowerShell)

```powershell
.venv\Scripts\Activate.ps1
```

If PowerShell blocks the script, you can temporarily allow local scripts for your current session:

```powershell
Set-ExecutionPolicy -Scope Process RemoteSigned
```

Then run the activation command again.

### macOS / Linux

```bash
source .venv/bin/activate
```

Once activated, your terminal usually changes to something like this:

```text
(.venv) D:\Projects\Flask-App>
```

That's how you know you're inside the virtual environment.

---

## Step 4: Install Packages

Now install whatever your project needs.

For example:

```bash
pip install flask
```

or

```bash
pip install requests
```

You can check what's installed using:

```bash
pip list
```

---

## Step 5: Save Your Dependencies

Once you've installed everything you need, save the dependency list.

```bash
pip freeze > requirements.txt
```

Your `requirements.txt` might look like this:

```text
Flask==3.1.0
requests==2.32.0
pandas==2.3.1
```

This makes it easy to recreate the environment later.

---

## Step 6: Install Dependencies on Another Machine

If someone else clones your project—or if future you returns to it six months later—all that's needed is:

```bash
pip install -r requirements.txt
```

Python will install every package listed in the file.

---

## Step 7: Deactivate the Environment

When you're finished working:

```bash
deactivate
```

That's it.

---

## Don't Commit Your Virtual Environment

Your virtual environment can easily grow to hundreds of megabytes.

Instead of uploading it to GitHub, add it to your `.gitignore` file.

```text
.venv/
```

Only commit your source code and your `requirements.txt`.

Anyone can recreate the environment by running the install command.

---

## My Usual Workflow

Whenever I start a new Python project, I pretty much follow these commands.

```bash
mkdir my-project
cd my-project

python -m venv .venv

# Windows
.venv\Scripts\activate

# macOS/Linux
source .venv/bin/activate

pip install <packages>

pip freeze > requirements.txt
```

It's honestly about 95% of what I ever need.

---

## Bonus: Check Which Python You're Using

Sometimes you have multiple Python installations on your computer.

To see which one is currently being used:

### Windows

```cmd
where python
```

### macOS / Linux

```bash
which python
```

You can also check the version directly:

```bash
python --version
```

---

## Final Thoughts

Virtual environments aren't difficult.

They're just one of those things I use often enough to know they exist, but not often enough to remember the commands.

So this post is mostly for future me—and anyone else who somehow ends up here after forgetting the exact same thing.

If you're reading this because you searched **"how to create a Python virtual environment"** for the hundredth time...

Welcome to the club.

Hopefully this post saves both of us from opening Stack Overflow again.
