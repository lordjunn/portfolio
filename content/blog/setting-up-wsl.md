---
date: '2023-07-15T10:00:00.000Z'
title: Setting Up WSL and Installing Essential Tools on Windows
tagline: A Step-by-Step Guide to Set Up WSL 2 and Install Node.js
preview: >-
  Learn how to set up Windows Subsystem for Linux (WSL), install Ubuntu, and get essential development tools like Node.js running on your system.
image: >-
  https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070
keywords: "WSL, Ubuntu, Node.js, PostgreSQL, Windows Subsystem for Linux"
author:
  authorname: Lord Junn
  authorimage: >-
    https://cdn.discordapp.com/avatars/294784896579403777/fffbe8d9591126d66f8a3b57da81e26a.png?size=4096
readingtime: 6
---

# Setting Up WSL and Installing Essential Tools on Windows

If you're a developer looking to work with a Linux environment on your Windows machine, setting up Windows Subsystem for Linux (WSL) is a great way to go. 
This article will guide you through the process of setting up WSL, installing Ubuntu 24.04 LTS and getting Node.js.

# Why use WSL?
To me, I usually code all my Python things in here to prevent conflicts on my main Windows. 
Ever since I got introduced to WSL, my coding environment has never been better. 
It may just be my personal preference, but I like my things to work out of the box, without any issues for a long time, even if it meant installing and tinkering more things. 

Like a programmer, build a program that takes them 10 hours, to do a task that takes them 10 minutes.

## Step 1: Install WSL 2

To begin, we need to install Windows Subsystem for Linux 2 (WSL 2) on your system. Follow these steps:

### 1. Install WSL:

  Open your PowerShell as an Administrator and run the following command:

  ```powershell
  wsl --install
  
  ```

  This will download and install WSL 2 on your system. You might see messages like this in your terminal:

  ```
  Downloading: Windows Subsystem for Linux 2.4.11
  Installing: Windows Subsystem for Linux 2.4.11
  Windows Subsystem for Linux 2.4.11 has been installed.
  ```

### 2. Enable Virtual Machine Platform:

  You'll also need to enable the "VirtualMachinePlatform" feature. If you don't have this enabled already, you can use the Deployment Image Servicing and Management tool (DISM) to do so:

  ```powershell
  DISM /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart

  ```

  Once this is done, you will need to restart your system to complete the installation.

  > **Note**: After a reboot, open the terminal again, and you might see another pop-up asking you to select your preferred Linux distribution. Choose **Ubuntu 24.04 LTS** from the list.

### 3. Install Ubuntu 24.04 LTS:

  After restarting, run the following command to install Ubuntu:

  ```powershell
  C:\WINDOWS\System32\wsl.exe --install -d Ubuntu-24.04

  ```

  You'll see messages like:

  ```
  Downloading: Ubuntu 24.04 LTS
  Installing: Ubuntu 24.04 LTS
  Distribution successfully installed. It can be launched via 'wsl.exe -d Ubuntu-24.04'
  ```

### 4. Launch Ubuntu:

  Once the installation completes, you can launch Ubuntu by running:

  ```powershell
  wsl -d Ubuntu-24.04

  ```

  The first time you run Ubuntu, it will set up the necessary files and prompt you to create a user account. Follow the instructions on the screen.

## Step 2: Install Node.js

Now that you have Ubuntu running in WSL, it's time to install Node.js, a must-have tool for many developers. Follow these steps:

### 1. Install cURL:

  First, ensure that `curl` is installed by running:

  ```bash
  sudo apt-get install curl

  ```

### 2. Install NVM (Node Version Manager):

  NVM is a great tool to manage multiple versions of Node.js. Install it by running the following command:

  ```bash
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash

  ```

  After the installation, restart your terminal (or close and reopen it).

### 3. Install the Latest LTS Version of Node.js:

  Once NVM is installed, use it to install the latest long-term support (LTS) version of Node.js:

  ```bash
  nvm install --lts

  ```

  This will download and install the latest LTS version of Node.js. You can verify the installation by running:

  ```bash
  node -v
  npm -v
  
  ```

## Bonus Steps: Installing language packs

Things such as C++, Python, Java and other languages that would be used for coursework.

### TLDR:
Install the extension. That's it.

## Conclusion

With these steps, you should now have WSL set up on your Windows machine, running Ubuntu 24.04 LTS, along with Node.js. This setup will provide you with a powerful development environment where you can work with Linux tools on your Windows system.

Don't forget to explore additional configurations and tools that may further enhance your development experience. Happy coding!

