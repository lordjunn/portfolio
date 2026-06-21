---

date: '2026-06-21T10:35:00.000Z'
title: Things I Built During My Software Engineering Internship
tagline: From payment gateways to reporting systems and automation tools
preview: >-
    During my internship at Presoft, I expected to spend most of my time fixing bugs or writing small scripts.
    Instead, I ended up working on payment systems, reporting tools, database utilities, Power BI dashboards and automation projects.
image: >-
    https://images.unsplash.com/photo-1516321318423-f06f85e504b3
keywords: "Internship, Software Engineering, Python, C#, Automation, Power BI"
author:
    authorname: Lord Junn
    authorimage: >-
        /ProfilePictures/Mutsumi.png
readingtime: 10
---------------

# Things I Built During My Software Engineering Internship

When most students imagine an internship, they think about shadowing employees, fixing minor bugs, or handling documentation.

My experience was quite different.

During my three months at Presoft, I was given the opportunity to work on a variety of real-world projects ranging from payment gateway integrations to reporting systems and automation tools.

Some projects were small utilities.

Others became tools that were eventually used by internal staff.

Here are some of the projects I worked on and what I learned from them.

---

## 1. Evaluating Payment Gateways

One of my earliest tasks involved researching payment gateways for potential company integration.

At first, I assumed this would simply involve comparing prices.

Instead, I quickly learned that selecting a payment gateway involves much more than transaction fees.

I evaluated providers such as:

* Billplz
* Stripe
* iPay88
* Fiuu
* SenangPay
* eGHL

The evaluation included:

* FPX support
* API quality
* Documentation
* Sandbox environments
* Transaction costs
* Ease of implementation

To better understand each platform, I built test integrations using both Python Flask and C# WinForms.

This was my first exposure to how businesses evaluate third-party services before committing to them.

The biggest lesson was that good documentation can save hundreds of development hours.

---

## 2. Testing an AutoCount Plugin

Many students expect internships to focus entirely on development.

One of my projects focused almost entirely on testing.

I was tasked with creating test cases for an AutoCount plugin developed internally.

Initially, there was almost no documentation available.

This forced me to approach the software like an actual end user.

I had to:

* Understand expected behaviour
* Create test plans
* Identify bugs
* Document reproduction steps
* Communicate findings with developers

One unexpected contribution was creating a README file for the project.

While it seemed like a small task, it eventually became one of the most useful resources for future testing and maintenance.

This project taught me that software quality is not only about writing code.

Documentation and testing are equally important.

---

## 3. Building a MySQL Database Copier

One request from a client involved copying specific tables between databases.

The existing process required manual SQL operations and technical knowledge.

To simplify this, I developed a C# WinForms utility that allowed users to:

* Connect to a MySQL server
* Select source databases
* Select destination databases
* Clone selected tables

The first version required users to type table names manually.

After receiving feedback, I redesigned the interface using checkboxes.

A small change, but it significantly improved usability.

This project reinforced a lesson I would encounter repeatedly throughout the internship:

Users rarely care about how clever the code is.

They care about how easy the software is to use.

---

## 4. Improving a Legacy Integration System

One of the more challenging projects involved improving an existing integration between EMAS and AutoCount.

The integration connected a legacy FoxPro-based system with a modern SQL Server environment.

Several issues already existed:

* User inputs disappearing
* Database switching problems
* Unstable connections
* Missing table handling

Rather than building something from scratch, I had to understand existing code written by someone else.

This was considerably harder.

I added:

* Better validation
* Fallback logic
* Improved connection handling
* More stable configuration persistence

The project taught me an important industry reality:

Maintaining software is often harder than creating new software.

---

## 5. Automating MDEC Reports

One of the most impactful projects was building a report automation tool.

Previously, staff manually searched for company information, copied data between websites and Excel files, and prepared monthly reports.

I developed a Python-based solution using:

* Selenium
* Pandas
* OpenPyXL
* JSON configuration files

The tool automatically:

* Collected company information
* Reused historical data
* Filled report fields
* Generated formatted Excel files

To make deployment easier, I packaged everything into a standalone executable.

This project showed me how much time can be saved through automation.

A process that previously required hours of repetitive work could now be completed in minutes.

---

## 6. Building a Quote Status Reporting Platform

My largest project during the internship was a quote reporting platform.

The goal was to allow staff to generate reports without writing SQL queries.

The application was built using:

* Python
* Tkinter
* SQL Server
* Pandas
* Jinja2
* Power BI

Users could filter reports by:

* Customer
* Agent
* Product
* Status
* Date range

The system would then:

* Execute SQL queries
* Process the data
* Generate HTML reports
* Generate Excel reports
* Feed data into Power BI dashboards

One of the most interesting challenges was translating business requirements into technical solutions.

The difficult part was not writing SQL.

The difficult part was understanding what information users actually needed.

---

## 7. Working With APIs

Throughout the internship, I interacted with several APIs.

Examples included:

* Billplz
* Stripe
* Zoho Bigin

I learned how to:

* Authenticate requests
* Handle API responses
* Process webhooks
* Manage error conditions
* Design data extraction workflows

Before this internship, most of my university projects focused on local data.

Working with real APIs exposed me to how modern software systems communicate with each other.

---

## What Surprised Me Most

Before starting my internship, I assumed software development was mostly about programming.

In reality, programming was only one part of the job.

A significant amount of time was spent on:

* Research
* Communication
* Debugging
* Testing
* Documentation
* Requirement gathering

Many projects succeeded not because of complicated algorithms, but because the requirements were understood correctly.

---

## Final Thoughts

Looking back, the internship exposed me to far more technologies than I expected.

In three months, I worked with:

* Python
* C#
* WinForms
* SQL Server
* MySQL
* Power BI
* Selenium
* REST APIs
* HTML
* CSS
* Jinja2

More importantly, I learned how software is actually developed inside a company.

University teaches you how to write programs.

Industry teaches you how to solve business problems.

And those are often very different things.
