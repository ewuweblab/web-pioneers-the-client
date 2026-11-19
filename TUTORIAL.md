# Build "Web Pioneers" with Astro + Keystatic

In this tutorial you start from the **Astro + Keystatic + Cloudflare starter** and turn it into **Web Pioneers**: a small site with one page for each person who helped build the web.

- **Start:** [ewuweblab/astro-keystatic-cloudflare-starter](https://github.com/ewuweblab/astro-keystatic-cloudflare-starter)
- **Finish:** [ewuweblab/web-pioneers-the-client](https://github.com/ewuweblab/web-pioneers-the-client)

When you're done, your site will have:

- A home page that lists every pioneer
- One page per pioneer with a photo, a short intro, a link to their homepage, and a longer bio
- A content editor at `/keystatic` where you can add and edit pioneers without touching code
- A shared layout, so every page has the same `<head>` and footer

> **How to use this guide:** Work through the phases in order. Each phase ends with a **✅ Check it** step and a **💾 Commit** step. If something breaks, you can always go back to your last commit. If you get stuck, compare your files with the finished repo.

---

## Contents

- [Words to know](#words-to-know)
- [Before you start](#before-you-start)
- [Phase 1: Create your project from the template](#phase-1-create-your-project-from-the-template)
- [Phase 2: Take a tour of the starter](#phase-2-take-a-tour-of-the-starter)
- [Phase 3: Clear out the sample page](#phase-3-clear-out-the-sample-page)
- [Phase 4: Turn "Posts" into "Pioneers"](#phase-4-turn-posts-into-pioneers)
- [Phase 5: Add fields for image, intro, and homepage](#phase-5-add-fields-for-image-intro-and-homepage)
- [Phase 6: Add pioneers in the Keystatic editor](#phase-6-add-pioneers-in-the-keystatic-editor)
- [Phase 7: Show the new fields on each pioneer page](#phase-7-show-the-new-fields-on-each-pioneer-page)
- [Phase 8: Share code with a layout](#phase-8-share-code-with-a-layout)
- [Phase 9: Give the site its own favicon](#phase-9-give-the-site-its-own-favicon)
- [Phase 10: Build, check, and push](#phase-10-build-check-and-push)
- [Troubleshooting](#troubleshooting)

---

## Words to know

| Word | What it means |
| :--- | :--- |
| **Astro** | The framework that turns your `.astro` files and content into a website. |
| **Keystatic** | A content editor (a "CMS") that runs at `/keystatic`. It saves your content as files in your project. |
| **Markdoc** (`.mdoc`) | A text format like Markdown. Each pioneer is saved as one `.mdoc` file. |
| **Frontmatter** | The block between the `---` lines at the top of an `.mdoc` file. It holds data like `title` and `image`. |
| **Collection** | A group of content files that share the same shape, like "all the pioneers." |
| **Schema** | The list of fields each item in a collection has, and what type each field is (text, URL, image…). |
| **Slug** | The URL-friendly version of a name. "Tim Berners-Lee" becomes `tim-berners-lee`. |
| **Component frontmatter** | The block between `---` lines at the top of an `.astro` file. It's JavaScript that runs before the HTML is built. |
| **Layout** | An Astro component that wraps a page with shared HTML (like `<head>` and a footer). |
| **Cloudflare** | The hosting service the starter is set up to deploy to. You won't deploy in this tutorial. |

---

## Before you start

Install these tools first:

1. **Node.js 22 or newer.** Check by running `node -v` in a terminal.
2. **Git.** Check by running `git --version`.
3. **A GitHub account.**
4. **VS Code** with the **Astro** extension. VS Code will offer to install it when you open the project.

---

## Phase 1: Create your project from the template

**Goal:** Get your own copy of the starter running on your computer.

### 1.1 Make your own repo from the template

1. Go to [the starter repo](https://github.com/ewuweblab/astro-keystatic-cloudflare-starter).
2. Click the green **Use this template** button, then **Create a new repository**.
3. Name it `web-pioneers` (or anything you like) and click **Create repository**.

### 1.2 Clone it to your computer

On your new repo's page, click **Code** and copy the URL. Then in a terminal (replace `YOUR-USERNAME`):

```bash
git clone https://github.com/YOUR-USERNAME/web-pioneers.git
```

```bash
cd web-pioneers
```

Open the folder in VS Code.

### 1.3 Install and start the dev server

```bash
npm install
```

```bash
npm run dev
```

Leave this terminal running. The dev server watches your files and reloads the browser when you save.

### ✅ Check it

- Open <http://localhost:4321>. You should see **Astro + Keystatic CMS + CloudFlare** with a list of two posts.
- Open <http://localhost:4321/keystatic>. You should see the Keystatic editor with **Posts** and **Sample Page**.

---

## Phase 2: Take a tour of the starter

**Goal:** Know what each file does before you change anything. No code changes in this phase.

```text
web-pioneers/
├── public/                    ← Files served as-is (images, favicon)
├── src/
│   ├── content/               ← Your content, saved as .mdoc files
│   │   ├── pages/sample.mdoc
│   │   └── posts/*.mdoc
│   ├── pages/                 ← Every file here becomes a URL
│   │   ├── index.astro        →  /
│   │   ├── sample.astro       →  /sample
│   │   └── posts/[slug].astro →  /posts/entry-from-local-dev, etc.
│   └── content.config.ts      ← Tells ASTRO what content looks like
├── keystatic.config.ts        ← Tells KEYSTATIC what content looks like
├── astro.config.mjs           ← Turns on React, Markdoc, Keystatic, Cloudflare
└── package.json               ← Project name, scripts, and dependencies
```

### The big idea: two schemas that must agree

Your content is described in **two** places:

| File | Who reads it | What it controls |
| :--- | :--- | :--- |
| `keystatic.config.ts` | Keystatic | Which fields appear in the editor, and where files get saved |
| `src/content.config.ts` | Astro | Which fields your pages can read, and their types |

**Whenever you add, rename, or remove a field, change both files.** You'll do this several times in this tutorial.

### How one post becomes a page

1. Keystatic saves a post to `src/content/posts/entry-from-local-dev.mdoc`.
2. `src/content.config.ts` tells Astro to load every `.mdoc` in that folder as the `posts` collection.
3. `src/pages/posts/[slug].astro` asks for every post and makes one page for each. The `[slug]` in the file name gets replaced by each post's slug.

Open each of those three files now and read the comments.

---

## Phase 3: Clear out the sample page

**Goal:** Remove the "Sample Page" demo so only the parts you'll use are left.

The sample page shows off Keystatic's editor, but your site doesn't need it. It's spread across five places, and you'll remove all of them.

### 3.1 Delete the sample files

Delete these three files:

- `src/pages/sample.astro`
- `src/content/pages/sample.mdoc`
- `public/images/kitchen-sink/editor-image.svg`

The empty `pages` and `kitchen-sink` folders can go too.

### 3.2 Remove the singleton from `keystatic.config.ts`

In `keystatic.config.ts`, delete the whole `singletons: { ... },` block (everything from `singletons: {` to its closing `},`).

Then remove `singleton` from the import on line 2, since nothing uses it anymore:

```ts
import { config, fields, collection } from '@keystatic/core';
```

### 3.3 Remove the `pages` collection from `src/content.config.ts`

Delete the `const pages = defineCollection({ ... });` block and its comment. Then update the last line so it only exports `posts`:

```ts
export const collections = { posts };
```

### 3.4 Remove the link from the home page

In `src/pages/index.astro`, delete these lines near the bottom:

```astro
<h2>Pages</h2>
<ul>
	<li><a href="/sample">Sample Page</a></li>
</ul>
```

### ✅ Check it

- The home page still lists the two posts, and the **Pages** heading is gone.
- `/keystatic` only shows **Posts**.
- `/sample` now shows a 404 page. That's expected.

### 💾 Commit

```bash
git add -A
```

```bash
git commit -m "Remove sample page"
```

---

## Phase 4: Turn "Posts" into "Pioneers"

**Goal:** Rename the `posts` collection to `pioneers` everywhere, so the code matches what the site is about.

A name like `posts` shows up in the config files, the folder names, and the URLs. You need to change all of them together.

### 4.1 Delete the starter posts

Delete both files in `src/content/posts/`:

- `entry-from-local-dev.mdoc`
- `entry-from-remote-cms.mdoc`

You'll add real pioneers in Phase 6.

### 4.2 Rename the folders

Rename these two folders:

| From | To |
| :--- | :--- |
| `src/content/posts/` | `src/content/pioneers/` |
| `src/pages/posts/` | `src/pages/pioneers/` |

Renaming `src/pages/posts` changes the URLs from `/posts/...` to `/pioneers/...`.

> **Tip:** Git doesn't track empty folders. If `src/content/pioneers/` disappears, that's fine. Keystatic creates it again when you save your first pioneer.

### 4.3 Update `keystatic.config.ts`

Change the `posts` collection to `pioneers`. Update the key, the label, and the path:

```ts
  collections: {
    pioneers: collection({
      label: 'Pioneers',
      slugField: 'title',
      path: 'src/content/pioneers/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),
  },
```

### 4.4 Update `src/content.config.ts`

Replace the whole file with:

```ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Keystatic "Pioneers" collection, stored as src/content/pioneers/<slug>.mdoc.
// The entry id is the slug Keystatic generates from the title.
const pioneers = defineCollection({
  loader: glob({ pattern: '*.mdoc', base: './src/content/pioneers' }),
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = { pioneers };
```

Notice that `base: './src/content/pioneers'` matches the `path` in `keystatic.config.ts`. If they don't match, Keystatic saves files where Astro never looks.

### 4.5 Update the home page

In `src/pages/index.astro`, rename `posts` to `pioneers` in the code and change the link from `/posts/` to `/pioneers/`:

```astro
---
import { getCollection } from 'astro:content';

const pioneers = (await getCollection('pioneers')).sort((a, b) =>
	a.data.title.localeCompare(b.data.title),
);
---

<html lang="en">
	<head>
		<meta charset="utf-8" />
		<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
		<link rel="icon" href="/favicon.ico" />
		<meta name="viewport" content="width=device-width" />
		<meta name="generator" content={Astro.generator} />
		<title>Web Pioneers</title>
	</head>
	<body>
		<h1>Web Pioneers</h1>

		{
			pioneers.length > 0 ? (
				<ul>
					{pioneers.map((pioneer) => (
						<li>
							<a href={`/pioneers/${pioneer.id}`}>{pioneer.data.title}</a>
						</li>
					))}
				</ul>
			) : (
				<p>
					No pioneers yet. Add one in <a href="/keystatic">Keystatic</a>.
				</p>
			)
		}
	</body>
</html>
```

**What's happening here?**

- `getCollection('pioneers')` loads every pioneer file.
- `.sort(...)` puts them in A–Z order by title.
- `pioneers.map(...)` loops over the list and makes one `<li>` for each pioneer.
- `condition ? (A) : (B)` shows `A` if there are pioneers and `B` if there aren't.

### 4.6 Update the pioneer page

In `src/pages/pioneers/[slug].astro`, rename `posts`/`post` to `pioneers`/`pioneer`:

```astro
---
import { getCollection, render } from 'astro:content';

// One static page per pioneer, at /pioneers/<slug>.
export async function getStaticPaths() {
	const pioneers = await getCollection('pioneers');
	return pioneers.map((pioneer) => ({
		params: { slug: pioneer.id },
		props: { pioneer },
	}));
}

const { pioneer } = Astro.props;
const { Content } = await render(pioneer);
---

<html lang="en">
	<head>
		<meta charset="utf-8" />
		<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
		<link rel="icon" href="/favicon.ico" />
		<meta name="viewport" content="width=device-width" />
		<meta name="generator" content={Astro.generator} />
		<title>{pioneer.data.title}</title>
	</head>
	<body>
		<p><a href="/">← All pioneers</a></p>
		<h1>{pioneer.data.title}</h1>
		<Content />
	</body>
</html>
```

**What's happening here?**

- `getStaticPaths()` returns one entry per pioneer. Astro builds one page for each.
- `params: { slug: pioneer.id }` fills in the `[slug]` part of the URL.
- `props: { pioneer }` hands that pioneer's data to the page as `Astro.props`.
- `render(pioneer)` turns the body of the `.mdoc` file into a `<Content />` component.

### 4.7 Restart the dev server

You renamed a collection, so restart the server to be safe. In the terminal running the server, press `Ctrl` + `C`, then run:

```bash
npm run dev
```

### ✅ Check it

- The home page says **Web Pioneers** and "No pioneers yet."
- `/keystatic` shows **Pioneers** instead of **Posts**.
- The terminal may show yellow warnings like `The collection "pioneers" does not exist or is empty`. That's expected, because you have no pioneers yet. The warnings go away after Phase 6.

### 💾 Commit

```bash
git add -A
```

```bash
git commit -m "Rename posts collection to pioneers"
```

---

## Phase 5: Add fields for image, intro, and homepage

**Goal:** Give each pioneer a photo, a short intro, and a homepage link.

Remember the big idea from Phase 2: you'll change **both** schema files.

### 5.1 Add the fields to Keystatic

In `keystatic.config.ts`, add three fields between `title` and `content`:

```ts
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        // Saved to public/images/pioneers/<slug>/image.<ext>, served from /images/pioneers/<slug>/.
        image: fields.image({
          label: 'Image',
          directory: 'public/images/pioneers',
          publicPath: '/images/pioneers/',
        }),
        intro: fields.text({ label: 'Intro', multiline: true }),
        homepage: fields.url({ label: 'Homepage' }),
        content: fields.markdoc({ label: 'Content' }),
      },
```

| Field | Keystatic type | What it shows in the editor |
| :--- | :--- | :--- |
| `image` | `fields.image` | An upload button. `directory` is where the file is saved. `publicPath` is the URL used to show it. |
| `intro` | `fields.text` with `multiline: true` | A text box with several lines |
| `homepage` | `fields.url` | A text box that only accepts URLs |

Images go in `public/` because Astro serves anything in that folder at the same path. A file at `public/images/pioneers/tim-berners-lee/image.jpg` shows up at `/images/pioneers/tim-berners-lee/image.jpg`.

### 5.2 Add the fields to Astro

In `src/content.config.ts`, add the same three fields to the schema:

```ts
  schema: z.object({
    title: z.string(),
    // Public URL of the pioneer's image, e.g. "/images/pioneers/<slug>/image.jpg".
    image: z.string().optional(),
    // Short bio shown on the pioneer's page.
    intro: z.string().optional(),
    // Link to the pioneer's site (Keystatic writes null when it's left empty).
    homepage: z.url().nullish(),
  }),
```

**What do these mean?**

- `z.string()` means "this must be text."
- `.optional()` means "this field can be missing."
- `z.url()` means "this must be a valid URL."
- `.nullish()` means "this can be missing **or** `null`." Keystatic saves an empty URL field as `homepage: null`, so `.optional()` alone would cause an error.

### ✅ Check it

Open `/keystatic`, click **Pioneers**, then **Add**. You should see **Title**, **Image**, **Intro**, **Homepage**, and **Content** fields. Don't save anything yet.

### 💾 Commit

```bash
git add -A
```

```bash
git commit -m "Add image, intro, and homepage fields"
```

---

## Phase 6: Add pioneers in the Keystatic editor

**Goal:** Add three pioneers using the editor, and see how Keystatic turns your form into files.

### 6.1 Gather your content

For each pioneer you need:

- A **photo**. Look on [Wikimedia Commons](https://commons.wikimedia.org) and check that the license lets you reuse it. A square image around 400×400 px works well.
- A one- or two-sentence **intro**.
- A **homepage** URL.
- Two to four paragraphs of **bio**, written in your own words.

The finished site uses Tim Berners-Lee, Jeffrey Zeldman, and Molly Holzschlag. You can use them or pick your own pioneers.

### 6.2 Add your first pioneer

1. Go to `/keystatic` → **Pioneers** → **Add**.
2. **Title:** type the person's name, for example `Tim Berners-Lee`. Keystatic fills in the slug (`tim-berners-lee`) for you.
3. **Image:** upload the photo.
4. **Intro:** type the short intro.
5. **Homepage:** paste the URL, including `https://`.
6. **Content:** write the bio. Try the toolbar: add a heading (`##`) and a bulleted list.
7. Click **Create**.

### 6.3 Look at what Keystatic saved

Go back to VS Code. Keystatic created two new files:

- `src/content/pioneers/tim-berners-lee.mdoc`
- `public/images/pioneers/tim-berners-lee/image.jpg`

Open the `.mdoc` file. It looks something like this:

```markdown
---
title: Tim Berners-Lee
image: /images/pioneers/tim-berners-lee/image.jpg
intro: >-
  Invented the World Wide Web at CERN in 1989, creating HTML, URLs and HTTP.
  Founded the W3C in 1994 and co-founded the Open Data Institute.
homepage: https://www.w3.org/People/Berners-Lee/
---
Tim Berners-Lee was born in London in 1955...

## Keeping the web open

- **1994:** Founded the World Wide Web Consortium (W3C) at MIT...
```

The form fields went into the **frontmatter** between the `---` lines. The **Content** field became the body below it. You could write this file by hand and get the same result. Keystatic is just a friendlier way to do it.

### 6.4 Add two more pioneers

Repeat 6.2 for two more people.

### ✅ Check it

- The home page lists all three pioneers in A–Z order.
- Clicking a name opens its page with the name and bio.
- The photo, intro, and homepage **don't** show yet. You'll fix that next.

### 💾 Commit

Keystatic only writes files. It doesn't commit them, so you need to:

```bash
git add -A
```

```bash
git commit -m "Add pioneer content"
```

---

## Phase 7: Show the new fields on each pioneer page

**Goal:** Display the photo, intro, and homepage link on each pioneer's page.

### 7.1 Make a nicer homepage label

In `src/pages/pioneers/[slug].astro`, add these lines at the end of the component frontmatter, just above the closing `---`:

```ts
const { homepage } = pioneer.data;
// Show the homepage as "zeldman.com" rather than "https://zeldman.com/".
const homepageLabel = homepage?.replace(/^https?:\/\//, '').replace(/\/$/, '');
```

- `const { homepage } = pioneer.data;` pulls `homepage` out of the data so you can type `homepage` instead of `pioneer.data.homepage`.
- `homepage?.` means "only do this if `homepage` exists." Without the `?`, a pioneer with no homepage would crash the page.
- The first `.replace(...)` removes `http://` or `https://` from the start. The second removes a `/` from the end.

### 7.2 Add the fields to the HTML

Replace the `<body>` with:

```astro
	<body>
		<p><a href="/">← All pioneers</a></p>

		<h1>{pioneer.data.title}</h1>

		{pioneer.data.image && <img src={pioneer.data.image} alt={pioneer.data.title} />}

		{pioneer.data.intro && <p>{pioneer.data.intro}</p>}

		{homepage && (
			<p>
				<a href={homepage}>{homepageLabel}</a>
			</p>
		)}

		<Content />
	</body>
```

**What does `&&` do here?** `{something && <tag />}` means "show the tag only if `something` has a value." All three new fields are optional, so the page still works for a pioneer who has no image, intro, or homepage.

**Why `alt={pioneer.data.title}`?** Screen readers read the `alt` text aloud. Every `<img>` needs one.

### ✅ Check it

Open each pioneer's page. You should see the photo, the intro, and a link like `www.w3.org/People/Berners-Lee`. Click the link to make sure it works.

### 💾 Commit

```bash
git add -A
```

```bash
git commit -m "Show image, intro, and homepage on pioneer pages"
```

---

## Phase 8: Share code with a layout

**Goal:** Stop repeating the same `<head>` on every page, and put the site title in one place.

Look at `index.astro` and `[slug].astro` side by side. The whole `<html>`, `<head>`, and `<body>` setup is copied in both. If you wanted to change the favicon or add a stylesheet, you'd have to edit every page. A **layout** fixes that.

### 8.1 Store the site title in one place

Create a new file, `src/consts.ts`:

```ts
// Site-wide values. Import these wherever you need them.
export const SITE_TITLE = 'Web Pioneers';
```

Now if the site's name ever changes, you change it here once.

### 8.2 Create the layout

Create a new folder `src/layouts/` and a file inside it named `BaseLayout.astro`:

```astro
---
import { SITE_TITLE } from '../consts';

interface Props {
	// Page-specific title. Omit it on the home page to show just the site title.
	title?: string;
}

const { title } = Astro.props;
const pageTitle = title ? `${title} | ${SITE_TITLE}` : SITE_TITLE;
---

<html lang="en">
	<head>
		<meta charset="utf-8" />
		<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
		<link rel="icon" href="/favicon.ico" />
		<meta name="viewport" content="width=device-width" />
		<meta name="generator" content={Astro.generator} />
		<title>{pageTitle}</title>
	</head>
	<body>
		<slot />

		<footer>Thank you to all the { SITE_TITLE }</footer>
	</body>
</html>
```

**What's happening here?**

- `interface Props` lists what a page can pass into the layout. `title?` has a `?`, so it's optional.
- `pageTitle` becomes `"Tim Berners-Lee | Web Pioneers"` on a pioneer page, or just `"Web Pioneers"` on the home page.
- `<slot />` is a placeholder. Whatever a page puts inside `<BaseLayout>...</BaseLayout>` appears here.
- The `<footer>` now shows on every page, because every page uses this layout.

### 8.3 Use the layout on the home page

Replace `src/pages/index.astro` with:

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../layouts/BaseLayout.astro';
import { SITE_TITLE } from '../consts';

const pioneers = (await getCollection('pioneers')).sort((a, b) =>
	a.data.title.localeCompare(b.data.title),
);
---

<BaseLayout>
	<h1>{SITE_TITLE}</h1>

	{
		pioneers.length > 0 ? (
			<ul>
				{pioneers.map((pioneer) => (
					<li>
						<a href={`/pioneers/${pioneer.id}`}>{pioneer.data.title}</a>
					</li>
				))}
			</ul>
		) : (
			<p>
				No pioneers yet. Add one in <a href="/keystatic">Keystatic</a>.
			</p>
		)
	}
</BaseLayout>
```

The `<html>`, `<head>`, and `<body>` tags are gone. `<BaseLayout>` provides them now. The home page doesn't pass a `title`, so the browser tab shows just "Web Pioneers."

### 8.4 Use the layout on the pioneer page

Replace `src/pages/pioneers/[slug].astro` with:

```astro
---
import { getCollection, render } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';

// One static page per pioneer, at /pioneers/<slug>.
export async function getStaticPaths() {
	const pioneers = await getCollection('pioneers');
	return pioneers.map((pioneer) => ({
		params: { slug: pioneer.id },
		props: { pioneer },
	}));
}

const { pioneer } = Astro.props;
const { Content } = await render(pioneer);
const { homepage } = pioneer.data;
// Show the homepage as "zeldman.com" rather than "https://zeldman.com/".
const homepageLabel = homepage?.replace(/^https?:\/\//, '').replace(/\/$/, '');
---

<BaseLayout title={pioneer.data.title}>
	<p><a href="/">← All pioneers</a></p>

	<h1>{pioneer.data.title}</h1>

	{pioneer.data.image && <img src={pioneer.data.image} alt={pioneer.data.title} />}

	{pioneer.data.intro && <p>{pioneer.data.intro}</p>}

	{homepage && (
		<p>
			<a href={homepage}>{homepageLabel}</a>
		</p>
	)}

	<Content />
</BaseLayout>
```

Two things to notice:

- The import path is `../../layouts/` (two levels up), because this file is one folder deeper than `index.astro`.
- `title={pioneer.data.title}` passes the pioneer's name into the layout's `title` prop.

### ✅ Check it

- Both pages look the same as before, plus a footer that says "Thank you to all the Web Pioneers."
- The browser tab on a pioneer page says something like **Tim Berners-Lee | Web Pioneers**.
- The browser tab on the home page says **Web Pioneers**.

### 💾 Commit

```bash
git add -A
```

```bash
git commit -m "Add BaseLayout and SITE_TITLE"
```

---

## Phase 9: Give the site its own favicon

**Goal:** Replace the Astro logo in the browser tab with a globe icon.

The layout links two icon files: `favicon.svg` for modern browsers and `favicon.ico` for older ones.

### 9.1 Replace `public/favicon.svg`

Replace everything in `public/favicon.svg` with:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none" stroke="#2563eb" stroke-width="2">
	<circle cx="16" cy="16" r="14" />
	<ellipse cx="16" cy="16" rx="6" ry="14" />
	<path d="M2 16h28M4.5 9h23M4.5 23h23" />
</svg>
```

This draws a blue globe: a circle, an oval for the curved line down the middle, and three straight lines across it.

### 9.2 Replace `public/favicon.ico`

`.ico` is an image format, not text, so you can't type it in. Do one of these:

- Download [`favicon.ico` from the finished repo](https://github.com/ewuweblab/web-pioneers-the-client/blob/main/public/favicon.ico) and save it over `public/favicon.ico`, **or**
- Turn your `favicon.svg` into an `.ico` with any online favicon generator.

### ✅ Check it

Reload the page. Browsers hold on to old favicons, so if you still see the Astro logo, do a hard refresh (`Cmd` + `Shift` + `R` on Mac, `Ctrl` + `Shift` + `R` on Windows).

### 💾 Commit

```bash
git add -A
```

```bash
git commit -m "Add globe favicon"
```

---

## Phase 10: Build, check, and push

**Goal:** Make sure the finished site builds for production, then put your work on GitHub.

### 10.1 Build the site

Stop the dev server (`Ctrl` + `C`), then run:

```bash
npm run build
```

Near the end of the output, you should see one line per page, like this:

```text
 prerendering static routes
  ├─ /pioneers/jeffrey-zeldman/index.html
  ├─ /pioneers/molly-holzschlag/index.html
  ├─ /pioneers/tim-berners-lee/index.html
  ├─ /index.html
✓ Completed
```

You may see yellow `[WARN]` lines about sourcemaps or chunk size. Those are normal for this starter and you can ignore them. Red errors are not okay. See [Troubleshooting](#troubleshooting).

### 10.2 Preview the build

```bash
npm run preview
```

Open the URL it prints and click through every page. This is what visitors would see.

### 10.3 Push to GitHub

```bash
git push
```

Open your repo on GitHub. Your commits and your `src/content/pioneers/` files should all be there.

### 🎉 You're done

Compare your project with the [finished repo](https://github.com/ewuweblab/web-pioneers-the-client). Your bios and photos will be different, but the code files should match closely.

**Want to keep going?** Try one of these:

- Add a fourth pioneer using only Keystatic.
- Add a `born` year field. Remember to change **both** schema files.
- Show each pioneer's photo next to their name on the home page.
- Add a `<style>` block to `BaseLayout.astro` so every page gets the same styling.
- Deploy to Cloudflare. The "One-time Keystatic Cloud setup" section in `README.md` explains how.

---

## Troubleshooting

**"The collection 'pioneers' does not exist" or types look wrong after a rename**
Stop the dev server and start it again with `npm run dev`. Astro caches information about your collections in the `.astro/` folder, and a restart rebuilds it.

**"data does not match collection schema … homepage: Expected type "string", received "object""**
A pioneer has an empty homepage, which Keystatic saves as `homepage: null`, and your `src/content.config.ts` uses `.optional()` for `homepage`. Change it to `z.url().nullish()`, as shown in [Phase 5.2](#52-add-the-fields-to-astro).

**I saved a pioneer in Keystatic but it's not on the home page**
Check that the `path` in `keystatic.config.ts` (`src/content/pioneers/*`) and the `base` in `src/content.config.ts` (`./src/content/pioneers`) point to the same folder.

**The image is broken**
Open the pioneer's `.mdoc` file and look at the `image:` line. Then check that a file exists at `public` + that path. For example, `/images/pioneers/tim-berners-lee/image.jpg` should be at `public/images/pioneers/tim-berners-lee/image.jpg`.

**"Cannot find module '../layouts/BaseLayout.astro'"**
The import path is relative to the file you're in. Use `../layouts/` from `src/pages/index.astro` and `../../layouts/` from `src/pages/pioneers/[slug].astro`.

**Port 4321 is already in use**
Another dev server is still running. Find that terminal and press `Ctrl` + `C`, or use the new port Astro suggests.

**I broke everything**
Go back to your last commit. This throws away every change to files that were already in that commit. New files you created stay, so delete those yourself if needed:

```bash
git restore .
```
