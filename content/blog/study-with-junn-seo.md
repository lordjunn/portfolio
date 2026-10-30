---
date: '2026-10-17T18:55:00.000Z'
title: "Zero-Budget SEO Engineering: Scaling an Academic Knowledge Base to 1,000+ Students with 29.8% CTR"
tagline: "How hyper-specific long-tail intent, dual-course taxonomy, and an automated Python sitemap crawler dominated Google search results for university coursework without spending a cent"
preview: "A deep dive into building Study with Junn: structuring a zero-framework static knowledge base, weaponizing semantic HTML and dual-course taxonomy for search engines, automating XML sitemaps with Python, and achieving a 29.8% Google CTR across 1,000+ students."
image: "/Work/Exams.jpg"
keywords: "SEO, Web Performance, Python, Static Sites, Information Architecture, Google Search Console, HTML, Content Engineering, Automation"
category: "writeup"
projectId: 1
author:
    authorname: Lord Junn
    authorimage: "/ProfilePictures/Mutsumi.png"
    readingtime: 13
---

# Zero-Budget SEO Engineering: Scaling an Academic Knowledge Base to 1,000+ Students with 29.8% CTR

Ask any modern software engineer how to build an academic content library, and you will almost certainly receive an over-engineered blueprint: a Next.js 15 App Router with Server-Side Rendering (SSR), a PostgreSQL database on Supabase, an Algolia search integration, Tailwind CSS, Redis caching, and continuous deployment via Vercel.

When I set out to solve the chaotic problem of academic resource fragmentation at Multimedia University (MMU) in Cyberjaya, I chose the exact opposite path:

**Pure, hand-crafted, semantic HTML5, modular CSS, vanilla JavaScript, and an automated Python sitemap generator.**

No bundlers. No Node.js runtime. No client-side framework hydration delays. No database queries.

```text
       ┌──────────────────────────────────────────────────────────────┐
       │              The Student Pain Point (Week 12)                │
       │  "Does anyone have the 2023 past paper answer for TMA1201?"  │
       │  • Expired Mega links          • Restricted Google Drives    │
       │  • Dead Discord attachments    • MFA friction & clean slates │
       └──────────────────────────────┬───────────────────────────────┘
                                      │
                                      ▼
       ┌──────────────────────────────────────────────────────────────┐
       │                 Study with Junn Architecture                 │
       │  • Dual-Code Taxonomy (Old MMU Codes vs New Curriculum)      │
       │  • Direct FCI Hierarchy: Subject -> Topic -> Module / Papers │
       │  • Sub-200ms First Contentful Paint on terrible campus Wi-Fi │
       └──────────────────────────────┬───────────────────────────────┘
                                      │
                                      ▼
       ┌──────────────────────────────────────────────────────────────┐
       │               Google Search Console Outcomes                 │
       │  • 1.84K Clicks               • 6.17K Impressions            │
       │  • 29.8% Organic CTR          • 5.6 Average Search Position  │
       │  • 1,000+ Active Students across Multiple Intakes            │
       └──────────────────────────────────────────────────────────────┘
```

The result? Over **1,000 active university students**, **6.17K Google impressions**, and an organic **Click-Through Rate (CTR) of 29.8%**—nearly ten times the standard web average of 3–5%.

As I wrote in the site's update logs when grinding through exam season:

> *"Who cares if it's basic as long as it gets the job done?"*

Here is the engineering breakdown of how [Study with Junn](https://github.com/LordJunn/Study-With-Junn) was designed, how it weaponized long-tail search intent to dominate Google rankings, and why low-tech architectures often outperform modern stacks.

---

## 1. The Core Problem: The University Information Fragmentation Void

Every student in a computer science faculty knows the ritual that unfolds two weeks before final exams:
- Course materials are scattered across temporary Telegram groups, private WhatsApp chats, and locked Google Drive links where you must "request access" from a senior who graduated eight months ago—and who is:
  - **a)** Locked out of their university Google account post-graduation,
  - **b)** Working full-time and too busy to care about responding to random university email alerts, or
  - **c)** The link has long since rotted into a dead 404.
- The official university Learning Management System (Moodle) isn't necessarily broken, but it requires Multi-Factor Authentication (MFA) on every single session, and past trimester materials stay strictly restricted to the students who were already enrolled in that specific term. Newbies and juniors taking the subject get a completely clean, empty slate—meaning zero historical access to past tutorial solutions or exam archives.
- **The Official PYQ Gate**: Finding Past Year Questions (PYQ) through official university channels isn't impossible, but it is absurdly tedious: you have to install the university Fortinet SSL-VPN, figure out how to configure it on your personal machine, and log into the university's internal "erep" repository—which bizarrely indexes undergraduate exam papers alongside Master's and PhD theses for some reason. Repeating that entire VPN drill every exam season just to grab a single past paper is pure friction.
- Back in the **pre-AI era (2022–2023)**, quality past-year exam questions with complete, verified step-by-step solutions were essentially non-existent in any indexed, searchable format. (While generative AI later changed how students get answers, the site remains the definitive repository for downloading the actual, unadulterated past-year exam papers that AI can't conjure up on its own).

Students don't need a heavy web application with social login, profile avatars, and comment threads. **They need slides, past papers, and revision notes delivered to their screen in less than two seconds at 2:00 AM on spotty campus Wi-Fi.**

### The Engineering Principles
To solve this, I laid down four straightforward technical constraints:
1. **Zero Runtime Latency**: Sub-second page loads on spotty cellular connections or congested campus Wi-Fi.
2. **Direct FCI Hierarchy**: No bloated campus-wide multi-faculty bureaucracy. The site was built strictly for FCI (Faculty of Computing & Informatics): *Subject $\to$ Topic $\to$ Module / Past Papers* in under three clicks.
3. **Dual-Taxonomy Search Discoverability**: Both legacy course codes and freshly reformed syllabus codes must resolve to the identical authoritative document.
4. **Zero Maintenance Overhead**: Pure static hosting on GitHub Pages and Cloudflare Pages with zero monthly infrastructure bills.

---

## 2. Information Architecture & The Dual-Code Taxonomy Trap

Designing an academic portal sounds trivial until the university administration decides to overhaul the entire curriculum numbering scheme mid-way through your degree.

At MMU's Faculty of Computing & Informatics (FCI), course codes underwent a major transition:
- **Legacy Foundation/Degree Codes**: `PMT 0101`, `TMA 1101`, `TMA 1201`, `TSN 2101`, `TCP 2101`, `TDS 2201`, `TCS 3351`
- **Modern Reformed Syllabus Codes**: `CMT 1114`, `CMA 6134`, `CDS 6224`, `CSN 6214`, `CCP 6214`, `CCS 6314`

This created a severe indexing dilemma:
- If a site only optimizes for the **new codes**, senior students, repeating students, and anyone referencing historical syllabus sheets search the old codes and find nothing.
- If a site only uses the **old codes**, incoming first-year freshmen have no idea that `TMA 1201` is identical to their registered subject `CDS 6224`.

### The Solution: Dual-Taxonomy Semantic Aliasing
Instead of splitting content into redundant duplicate pages (which severely harms SEO via canonical duplication penalties), I engineered an aliased header metadata and navigation schema.

In the subject HTML files (such as [`TMA 1201.html`](file:///K:/Github/Study-With-Junn/TMA%201201.html) and [`TDS 2201.html`](file:///K:/Github/Study-With-Junn/TDS%202201.html)), page headers dynamically ingest a dual-coded configuration payload:

```html
<!-- Configuration element parsed dynamically by js/subject.js -->
<div id="header-config"
     data-title="Discrete Structures and Probability"
     data-menu-links='[
       {"text": "Back to home", "href": "index.html"},
       {"text": "TMA 1201"},
       {"text": "CDS 6224"}
     ]'>
</div>
```

On the client side, [`js/subject.js`](file:///K:/Github/Study-With-Junn/js/subject.js) parses the data attributes and dynamically constructs the navigation bar, ensuring both course codes appear in the Document Object Model (DOM) and the visible UI:

```javascript
// Lightweight client-side header injection without framework overhead
document.addEventListener("DOMContentLoaded", function () {
  const config = document.getElementById("header-config");
  if (!config) return;

  const title = config.getAttribute("data-title");
  const menuLinks = JSON.parse(config.getAttribute("data-menu-links") || "[]");

  const header = document.createElement("header");
  header.innerHTML = `
    <a href="#" class="logo">${title}</a>
    <div class="bx bx-menu" id="menu-icon"></div>
    <ul class="navbar">
      ${menuLinks.map(link => `<li><a href="${link.href || '#'}">${link.text}</a></li>`).join("")}
    </ul>
  `;
  document.getElementById("header-container").appendChild(header);
});
```

Because both `TMA 1201` and `CDS 6224` exist as explicit text strings within the `<title>`, `<meta name="description">`, `<h1>`, and `<nav>` anchors, Google's indexers recognize the document as the canonical authority for both search tokens simultaneously.

---

## 3. Deconstructing the 29.8% CTR: Zero-Budget SEO Mechanics

Google Search Console metrics for **Study with Junn** (tracking from December 2024 to April 2026) revealed numbers that look like an anomaly:

| Metric | Recorded Value | Industry Benchmark (Education / Web Search) |
| :--- | :---: | :---: |
| **Total Organic Clicks** | **1.84K** | — |
| **Total Impressions** | **6.17K** | — |
| **Average Click-Through Rate (CTR)** | **29.8%** | **2.5% – 4.5%** |
| **Average Search Position** | **5.6** | Top 10 |

```text
Impressions:  ████████████████████████████████████████ 6.17K
Clicks:       ████████████ 1.84K (29.8% CTR)
Avg Position: [ 5.6 ] — Consistently Page 1, Top 3-5
```

Why was the organic CTR nearly **10x higher** than typical search traffic?

### 1. The Long-Tail Intent Monopoly
Students do not search broad, competitive queries like *"How does calculus work?"* or *"Computer science lecture notes."*

They search hyper-targeted, high-urgency long-tail queries:
- `"TDS 2201 statistical data analysis past year with answers"`
- `"PMT 0101 mathematics 1 topic 2 module 2.1"`
- `"TMA 1101 calculus small notes MMU"`
- `"CSN 6114 computer architecture tutorial 3"`

Because commercial content farms (like Course Hero, Studocu, or Scribd) hide these resources behind paywalls, login gates, or blurry preview paywalls, students quickly learn to skip them. When a search snippet clearly presents:

> **PMT 0101 - Mathematics 1**  
> *Study with Junn - Free study notes, modules, and exam questions covering algebra, equations, geometry, functions, polynomials, and logarithms.*

The student clicks instantly. There is zero click friction, zero account registration, and zero paywall deception.

### 2. High-Density Semantic HTML
Modern JavaScript Single Page Applications (SPAs) often fail basic SEO audits because client-rendered content requires search engine bots to execute a headless Chromium instance, run JavaScript bundles, and wait for asynchronous network requests. If the bot's execution budget expires, it indexes an empty `<div id="root"></div>`.

In contrast, every single page in Study with Junn is pure static markup. When Googlebot or Bingbot requests `Math 1.html`:
- The exact topic names (`Fundamentals of Algebra`, `Equations & Inequalities`, `Polynomial Functions`) are visible in plain text inside semantic `<h1>`, `<p>`, and `<h3>` tags.
- Links to internal modules (`Math 1/Module 1.1.html`) and topic assets (`Math 3/PMT0301 Topic 1.pdf`) are standard `<a href="...">` anchors that crawlers can spider effortlessly.
- Direct keyword alignment between query and markup results in rich snippets and top-ranking positions.

---

## 4. Automated Sitemap Engineering: `generate_sitemap.py`

When an academic repository grows to dozens of subjects, hundreds of modules, and hundreds of lecture assets, manually editing an XML sitemap is a recipe for broken links and stale indexing.

To automate search index synchronization, I engineered a custom Python crawler ([`generate_sitemap.py`](file:///K:/Github/Study-With-Junn/generate_sitemap.py)) that runs locally before each deployment:

```python
"""
Sitemap Generator for Study with Junn
--------------------------------------
Scans all HTML files, reads their last-modified date from the filesystem,
encodes URLs, applies priority overrides, and generates sitemap.xml with XSL styling.
"""

import os
import datetime
import urllib.parse

BASE_URL = "https://lordjunn.github.io/Study-With-Junn/"
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))

DEFAULT_PRIORITY = "0.5"
DEFAULT_CHANGEFREQ = "yearly"

# Blacklist templates, verification tokens, and duplicate scratch files
EXCLUDE = {
    "googled56de59a594a0c09.html",
    "Module Format.html",
    "Notes Format.html",
    "Subject Format.html",
    "Exam Format.html",
    "Notes 1 - Copy (2).html",
}

# Explicit priority hierarchy based on user navigation value
OVERRIDES = {
    "index.html":       ("1.0", "weekly"),
    "Update logs.html": ("0.8", "weekly"),
    "Math 1.html":      ("0.7", "monthly"),
    "TMA 1101.html":    ("0.7", "monthly"),
}

def get_last_modified(filepath: str) -> str:
    """Extract filesystem last-modified timestamp in ISO YYYY-MM-DD."""
    timestamp = os.path.getmtime(filepath)
    return datetime.datetime.fromtimestamp(timestamp).strftime("%Y-%m-%d")

def generate():
    urls = []
    for dirpath, _, filenames in os.walk(ROOT_DIR):
        for filename in filenames:
            if not filename.endswith(".html") or filename in EXCLUDE:
                continue

            filepath = os.path.join(dirpath, filename)
            rel_path = os.path.relpath(filepath, ROOT_DIR).replace("\\", "/")

            if rel_path.startswith("."):
                continue

            lastmod = get_last_modified(filepath)
            # URL-encode spaces and special characters safely
            encoded_path = urllib.parse.quote(rel_path, safe="/")
            full_url = BASE_URL + encoded_path

            priority, changefreq = OVERRIDES.get(rel_path, (DEFAULT_PRIORITY, DEFAULT_CHANGEFREQ))
            urls.append((full_url, lastmod, changefreq, priority))

    # Sort descending by priority, then alphabetically
    urls.sort(key=lambda x: (-float(x[3]), x[0]))

    # Generate XML payload with XSLT visual stylesheet
    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<?xml-stylesheet type="text/xsl" href="sitemap.xsl"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ]

    for loc, lastmod, changefreq, priority in urls:
        lines.append(f"  <url>\n    <loc>{loc}</loc>\n    <lastmod>{lastmod}</lastmod>\n    <changefreq>{changefreq}</changefreq>\n    <priority>{priority}</priority>\n  </url>")
    lines.append("</urlset>")

    with open(os.path.join(ROOT_DIR, "sitemap.xml"), "w", encoding="utf-8") as f:
        f.write("\n".join(lines))
```

### The Architecture of the Generator
1. **Dynamic `lastmod` Detection**: Uses `os.path.getmtime(filepath)` to extract real filesystem update dates. When notes are revised before midterms, Googlebot immediately sees updated timestamps in `sitemap.xml` and schedules prompt re-crawling.
2. **Safe URI Encoding**: University subject paths frequently contain spaces (`Math 1/Module 1.1.html`). Using `urllib.parse.quote(..., safe="/")` ensures standard RFC 3986 compliance, preventing crawler parsing crashes.
3. **Priority Hierarchy**: Rather than assigning an arbitrary `0.5` across the board, root hubs are weighted `1.0`, active update logs `0.8`, core subject portals `0.7`, and individual modular sub-pages `0.5`.
4. **Human-Readable XSLT Stylesheet**: The XML output references `sitemap.xsl`. When a human developer or contributor visits `/sitemap.xml` directly in a browser, the XSL stylesheet renders a styled, sortable HTML table of all indexed endpoints instead of raw XML text.

---

## 5. Why Raw HTML Beat a Heavy React SPA on Campus

It is tempting to overcomplicate web performance with abstract Lighthouse benchmarks and corporate buzzwords, but the reality on the ground was purely practical:
- Cyberjaya campus lecture halls (such as FCI CLCRs and MMU Grand Hall) frequently have cellular dead zones where mobile signals drop to 1–2 bars of EDGE/3G, and campus Wi-Fi can get saturated during peak hours.
- Forcing a student to download a 3MB client-side JavaScript bundle on a throttled connection just to view a list of tutorial questions makes zero sense.

By sticking strictly to vanilla HTML5, CSS, and minimal JavaScript:
- **Instant Paint (Sub-200ms FCP)**: The browser parses HTML immediately upon arrival without waiting for a client-side JavaScript framework to hydrate.
- **No PDF Viewer Hell: Slicing Exam PDFs into Sequential Lazy-Loaded PNGs**: 
  Instead of embedding raw, unwieldy multi-page PDF documents—which force students on budget phones to pinch-to-zoom across clunky A4 margins or download third-party PDF reader apps—I slashed every exam PDF into individual question images (`TCP 2101, Exams, image 1.png`, `image 2.png`). Each question was embedded inside a zero-JS pure CSS accordion (`<input type="checkbox" class="hidecontent">`) with native `loading="lazy"`. On a mobile phone screen in a cramped lecture hall, a student simply taps the trimester accordion; Question 1 expands instantly as a cropped, high-legibility graphic, and subsequent questions only download as the student scrolls down.
- **Dual Zero-Cost Redundancy**: Hosted concurrently on **GitHub Pages** and mirrored to **Cloudflare Pages** (`study-with-junn.pages.dev`), providing instant global edge caching without a single monthly hosting bill.

As the site update logs stated plainly: *"Who cares if it's basic as long as it gets the job done?"*

---

## 6. The 1-Man Show, AI Evolution, and Community Adoption

Technical metrics only tell half the story. The real story was the human reality behind the repository:

### The Strict 1-Man Show (and BadSpider1)
There was no team, no student committee, and no institutional backing. If you check [`Credits.html`](file:///K:/Github/Study-With-Junn/Credits.html) under "Additional Contributions," the list of contributors literally reads:

```html
<div class="container-box">
    <h4>Additional Contributions</h4>
    <p>Special thanks to the following contributors for their valuable input, be it physically, mentally or another way:</p>
    <div class="content">
        <ul>
            <li>Silence...</li>
        </ul>
    </div>
</div>
```

Zero campus funding. The hosting was free, and the sole financial contribution in the site's history came from an online donor named `BadSpider1` ($24 via Ko-fi)—who wasn't even Malaysian and just tipped for the fun of it!

### Scaling Through Academic Overload with AI
Maintaining an entire faculty's worth of notes and past papers solo during intense trimesters is an express lane to burnout. Balancing degree coursework, assignments, and FYP meant manual typesetting and transcription were impossible to sustain alone.

Once generative AI models matured enough to be trustworthy for formatting and mathematical derivation, I started using AI as an assistant to structure tutorial notes and format worked solutions. It wasn't about offloading learning—it was about survival and pragmatic throughput during peak academic overload.

### The Shift When Generative AI Arrived
In the **pre-AI era (2022–2023)**, Study with Junn was an absolute lifesaver because verified step-by-step solutions for MMU subjects were virtually non-existent anywhere on the public internet.

When generative AI took off, the platform's usage pattern inevitably shifted: students began dumping their daily tutorial questions directly into ChatGPT or Claude, and traffic for reading static step-by-step solutions naturally died down.

However, the site retained a vital, enduring role: **the unblocked archive for raw past-year exam papers**. Generative AI cannot conjure up the official 2023 MMU FCI final exam questions out of thin air. To get the actual exam PDF without hunting down a graduated senior or dealing with Moodle MFA clean slates, students still rely on Study with Junn.

In [`Update logs.html`](file:///K:/Github/Study-With-Junn/Update%20logs.html), the site documented this journey right up to the end:

```text
[11 Jul 2026]
Removed timer for CDS6334 Presentation. (Targeted)
Added timer for CDS6324 Presentation.
Updated timer for end of Trimester 2610 break.

[14 Aug 2026]
As I'll be graduating, further updates of the site may slow down, or even cease.
But do not worry, the site will remain online and functional.
```

---

## 7. Key Engineering Takeaways

1. **Pick the Right Weapon, Not the Trendiest One**: Building a static content library with a dynamic JavaScript framework often introduces unnecessary complexity, hydration delays, and fragile dependencies. Static HTML is fast, durable, and immune to ecosystem deprecation.
2. **SEO is an Information Architecture Challenge**: High search rankings don't come from keyword stuffing; they come from mapping clean directory structures to user intent. Designing a dual-code taxonomy ensured no student was left behind regardless of which curriculum code they searched.
3. **Automate Boring Indexing**: A 50-line Python script scanning file modification timestamps replaces hours of manual XML sitemap edits and guarantees search engines receive fresh crawl directives.
4. **Solve Real Human Friction**: The best projects are born from genuine personal suffering. When you build something that solves an acute, everyday frustration for yourself and your peers, distribution takes care of itself.
