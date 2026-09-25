---
title: "A simple architecture for a personal blog"
description: "Why I combined Obsidian, GitHub, Astro and Cloudflare into one simple pipeline: content crosses one boundary and the web remains static."
image: "/blog/blog-architektura/blog-architektura-en.jpg"
pubDate: 2026-09-19
tags:
  - astro
  - cloudflare
  - github
---

It is easy to start a blog by asking which CMS to use. For me, a more important question was: **what is the source of truth, who is responsible for the build, and where does the result end up on the internet?**

The answer is one simple pipeline. Content starts in Obsidian, passes through Git, Astro turns it into a static website, and Cloudflare delivers it to visitors. Each part has one responsibility and does not need to know much about the others.

## Starting points

The architecture follows four requirements:

- I need to be able to write articles in a regular local editor,
- every change needs its own version and the ability to be rolled back,
- publishing must not require maintaining a running server,
- the resulting website should remain simple to host and read.

A CMS would be possible, but for a personal blog it would add another system, another user interface and another place where the content can break. A database and application server would add operations that I do not need here.

The important point is therefore not which framework I use. It is that every step has a clear boundary.

## One responsibility per layer

```
Obsidian (.md)
    ↓
GitHub (versions + CI)
    ↓
Astro (build + static files)
    ↓
Cloudflare (CDN + TLS)
```

- **Obsidian is the workspace for content.** An article is a regular Markdown file with frontmatter. It is not an export into another system, but a source I can commit, edit and compare.
- **GitHub is the source of truth and the validation point.** Git keeps the history, while GitHub Actions installs dependencies from a clean state and stops the Astro build if the frontmatter or content structure is invalid.
- **Astro is the compilation boundary.** It turns Markdown and templates into concrete pages, route sitemaps and other output files. Astro does not need to run as an application for the website to be available.
- **Cloudflare is distribution.** It deploys the generated `dist/` directory as static files and delivers them through a CDN with TLS.

The boundary matters: **GitHub does not deploy arbitrary files, and Cloudflare does not take responsibility for a broken build.** Validation happens first, and only then does the artifact become public.

## Why static output

The biggest simplification is not Astro itself. It is that the result is a directory of files, not a running application.

This brings a few advantages:

- the website has no server process to patch and monitor,
- the output can be reviewed before publication,
- every change is versioned and reversible,
- delivery can be handled by a CDN and cache,
- hosting scales more easily than an application with a database.

The trade-off is just as important. Every new change requires a commit and a build. There is no editorial interface where I edit an article directly in a browser, and there is no database queried on every request.

For a personal blog, this is an acceptable trade-off. Changes are infrequent and each version is cheap to create and fix.

## A custom template is more than design

Using a ready-made theme would have been completely reasonable. I chose a custom template because, in a project this small, every unnecessary dependency is another thing to maintain.

The sidebar, simple palette and light/dark mode are not the reason for the architecture. The reason is that the entire flow remains understandable: I know where content is created, where it is validated, what is deployed and what the host only delivers.

I had AI agents generate the template. That is an implementation method, not an architectural principle. The important part is that I can review and understand the result instead of adopting a foreign template and its dependencies without knowing their boundaries.

## Content and language

I write content in Slovak. AI helps with correction, phrasing and English translation. The topic, decisions and architectural views remain mine.

## Where this architecture stops being enough

This solution is not universal. With multiple authors, a CMS might be needed to handle roles, previews and workflow. Comments, authentication or personalised content would require adding a database and a backend.

Even then, I would first look for a separate boundary that can be added without rewriting the whole system. RSS, sitemaps or search can be extensions of this architecture. A more complex backend introduces a new set of problems around operations, data storage and responsibility.

From a data-sovereignty perspective, this pipeline has one important property: the content remains readable Markdown files under my own control. Git keeps its version, the build transforms it, and Cloudflare receives only the resulting artifact. Hosting is therefore not the source of truth for the content.

## Conclusion

The value of this architecture is not that it uses the fewest tools. It is that it has clear responsibilities, a verifiable build and a simple boundary between authorship, distribution and publishing.

For this scope, it is the right trade-off: less runtime complexity, more control over the content and the ability to replace individual parts later.
