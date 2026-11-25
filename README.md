# Srikanth Bellary

Personal profile site for [srikanthbellary.com](https://srikanthbellary.com) and [srikanthbellary.github.io](https://srikanthbellary.github.io).

Three pages, strictly separate:

- **Home** (`/`): the name and two buttons, PROFESSIONAL and PERSONAL. Nothing else is on it, and it does not scroll.
- **Professional** (`/professional/`): the IT and AI engineering work. A first-person resume with dates, client names and project detail: work, stack, experience, contact. It is not a capabilities brochure.
- **Personal** (`/personal/`): Films & Music. The albums, the featured video, the Shorts strip, Coming 2027 and the short films.

Rules that hold across the site:

- Only a click on a Home button leads to a page. Home shows no previews, photos, lists or hints.
- Neither page links to the other or mentions the other's content, in the page or in its metadata. The only way across is the Home link, then the other button.
- The portrait is used on the Professional page only.

## Screening Room

Dark and cinematic, in the storm palette of the album art:

| Token | Hex | Use |
| --- | --- | --- |
| Storm | `#07090D` | Page |
| Panel | `#10151C` | Cards, plates |
| Slate | `#9AA1AB` | Secondary type |
| Bone | `#E8E5DC` | Type |
| Ember | `#EC7440` | The one accent: rules, numbers, links |
| Blush, Rose | `#F1D6CC`, `#D8577C` | Her Mood Swings only |

Display face: Sofia Sans Extra Condensed. Body: Instrument Sans. Labels: JetBrains Mono. All three are self-hosted `woff2` files under `public/fonts/` (SIL OFL). No runtime font CDN.

## Content

- `lib/content.ts`: the professional record. The chat fact sheet in `chat-api/prompt/context.md` mirrors it.
- `lib/music.ts`: films and music, from the brief of Nov 24, 2026. The rules of that brief are listed at the top of the file.
- `lib/seo.ts`: titles, descriptions and share images, one set per page.

Open points are single values in `pending` at the top of `lib/music.ts`: the YouTube channel URL, the Hindi music video, the pre-save links, and whether the Shorts strip plays the Shorts or the silent loops.

## Media

`public/media/` is built from the web-sized asset delivery by a script, and committed:

```bash
node scripts/prepare-media.mjs <path-to-assets-web>
```

It writes images at the widths the pages ask for (WebP with a JPEG fallback) and copies the silent loops. It is not part of the site build. Music videos and films are never hosted here: they play from YouTube, and nothing is requested from YouTube until play is pressed.

The share images (`public/og.jpg`, `og-professional.jpg`, `og-personal.jpg`, 1200 × 630) are stills of each page's first screen. They leave out what does not belong in a still: the day countdown, the pending YouTube label and the floating Ask button.

## Stack

Next.js App Router, static export: three documents (`/`, `/professional/`, `/personal/`) plus `/privacy/`, which belongs to the Professional page. Links between them are ordinary links. Where the browser supports it, a page is prepared while the pointer rests on a link to it and the change of page is a cross-fade (speculation rules and view transitions); nothing navigates until the link is pressed. GitHub Actions builds `out/` and deploys to GitHub Pages on push to `main`. Custom domain is `srikanthbellary.com` (`CNAME` in the repo root and `public/CNAME`).

```bash
npm install
npm run dev
npm run build
```

Repo settings: Pages → Source → GitHub Actions.

The static export talks to chat only through `NEXT_PUBLIC_CHAT_API_URL` (the public URL of the Vercel function). If that variable is unset, the widget still renders and says the chat is not connected yet.

To wire it after the function is deployed, set the GitHub Actions variable `NEXT_PUBLIC_CHAT_API_URL` to that URL (for example `https://example.vercel.app/api/chat`).

## Chat function

`chat-api/` is a separate Node project. Deploy that directory as its own Vercel project (Root Directory: `chat-api`). Do not add App Router API routes to this Next site.

On the Vercel project, set the environment variable named `NOVITA_API_KEY`. Do not put a key, token, or secret in this repository.

```bash
npm run check:chat
```

## Voice check

`npm run check:voice` fails the build if forbidden names or invented company-site metrics appear in the source. Binary files (images, fonts, video) are skipped.
