---

date: '2026-07-10T12:00:00.000Z'
title: Railway Went Down (For Real), So I Downsized My Discord Bot
tagline: Running out of credits led to a much leaner bot
preview: >-
    My Discord bot had been happily running on Railway until it suddenly stopped.
    What started as a scramble to find a new host eventually became an exercise
in reducing RAM usage, removing unnecessary services, and making every feature optional.
image: >-
    https://railway.com/brand/logo-dark.svg
keywords: "Discord Bot, Python, discord.py, Railway, VPS, Optimisation, Hosting"
author:
    authorname: Lord Junn
    authorimage: >-
        /ProfilePictures/Mutsumi.png
readingtime: 8
--------------

# Railway Went Down (For Real), So I Downsized My Discord Bot

For months, my Discord bot quietly lived on Railway's free plan.

No crashes.

No maintenance.

No surprises.

It simply worked.

Then one day it... didn't.

---

# Wait, What Happened?

The bot suddenly went offline.

My first thought was that Railway was having an outage.

After checking the dashboard, it turned out the platform itself was fine.

The real culprit?

I'd completely run out of my monthly credits.

Normally that wouldn't have been too much of an issue—I only needed to wait a few days for the allowance to refresh.

The confusing part was the dashboard insisting that my project had *permanently expired* and encouraging me to upgrade to a paid plan.

It wasn't immediately obvious whether waiting would actually bring the bot back, so I started looking for alternatives instead.

---

# Oracle Cloud Wasn't Meant to Be

The obvious replacement was Oracle Cloud's Always Free tier.

A free VPS with full control sounded perfect.

Unfortunately, reality had other plans.

The first issue was capacity.

The region I wanted to use (Kulim) simply had no storage available, so creating a VM wasn't possible.

No problem, I thought.

I'll just switch to Pay As You Go.

That plan ended almost immediately when payment verification refused to cooperate with my debit card.

After a while, I decided I'd spent enough time fighting account creation instead of actually hosting the bot.

---

# Looking Elsewhere

I started searching for other free hosting providers.

Eventually I came across **bot-hosting.net**.

It wasn't a VPS, but for a Discord bot that mostly sits around waiting for events, it was more than enough.

There was one catch, though.

The available resources were much smaller than what I'd been assuming I needed.

Instead of trying to squeeze a bloated application onto a tiny server, I decided to ask a better question:

> "Does the bot actually need all of this running?"

---

# Reality Check

The new server wasn't particularly powerful.

```
512 MB RAM
Limited CPU
Always-on process
```

At first glance, that sounded restrictive.

After taking a closer look at my own codebase, I realised the hardware wasn't really the problem.

The bot was.

Too many features were permanently enabled, even when I rarely used them.

---

# Looking for the Heavy Parts

The project already used a modular cog system.

```
cogs/
├── general.py
├── reminders.py
├── github_tracker.py
├── scrapper.py
├── emote_counter.py
└── connection_alerts.py
```

Splitting features into separate cogs made the project easy to organise.

It also made it very easy to forget that every loaded cog consumes memory.

Some of them even started background tasks automatically.

Those little workers quietly stayed alive whether anyone needed them or not.

---

# Feature Flags Instead of Deleting Code

Rather than deleting features, I made them configurable.

Originally, every cog loaded during startup.

```python
await bot.load_extension("cogs.emote_counter")
```

Now the bot reads a configuration file instead.

```json
{
  "cogs": {
    "general": true,
    "reminders": true,
    "github_tracker": true,
    "scrapper": true,
    "connection_alerts": false,
    "emote_counter": false
  }
}
```

If a feature is disabled, it never loads.

That means:

* no imports
* no listeners
* no background tasks
* no unnecessary RAM usage

The code still exists.

It just stays asleep until I actually need it.

---

# The Result

After trimming everything down, the bot became much lighter.

Enabled:

* General commands
* Reminders
* GitHub tracker
* Scrapper

Disabled:

* Emote analytics
* Connection alerts
* Finance bot
* Miscellaneous background services

Current memory usage:

```
~80 MB RAM
```

Server limit:

```
512 MB RAM
```

That leaves plenty of breathing room for future additions without worrying about running out of memory.

---

# What I Learned

## Bigger Servers Hide Bad Architecture

When resources are plentiful, inefficient code rarely gets noticed.

Working with limited hardware forces you to justify every feature that's always running.

Sometimes the easiest optimisation isn't making something faster.

It's simply not running it in the first place.

---

## Background Tasks Add Up

Commands aren't usually the expensive part.

It's the things quietly running in the background.

Things like:

* polling loops
* scheduled workers
* history scanners
* oversized caches
* forgotten tasks

Each one seems harmless on its own.

Together, they slowly chip away at your available memory.

---

# Conclusion

Running out of Railway credits wasn't exactly how I expected to spend my evening.

What started as "find somewhere else to host the bot" ended up becoming a complete optimisation pass.

In the end, I got:

* lower RAM usage
* cleaner architecture
* configurable features
* fewer unnecessary background workers
* a bot that comfortably fits on much smaller hardware

Sometimes being forced onto a smaller server is exactly what exposes the parts of your application that never really needed to be running in the first place.
