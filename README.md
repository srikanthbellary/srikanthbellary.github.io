# Srikanth Bellary

Personal profile site for [srikanthbellary.com](https://srikanthbellary.com) and [srikanthbellary.github.io](https://srikanthbellary.github.io).

First-person profile of a principal: Sr. Gen AI Solution Architect / Forward Deployment Engineer. It is not a company brochure.

## Theme C

Locked light palette, used exactly:

| Token | Hex | Use |
| --- | --- | --- |
| Field | `#F7F6F2` | Page |
| Surface | `#EEECE6` | Cards, plates |
| Ink | `#0A0E14` | Body type |
| Midnight | `#0E1A2B` | Nav, bars, chips |
| Gold | `#A8893D` | Rules, italics, metrics, hairlines |

Display face: Cormorant Garamond. Body: Source Serif 4. Both are self-hosted `woff2` files under `public/fonts/` (SIL OFL). No runtime font CDN.

## Stack

Next.js App Router, static export. GitHub Actions builds `out/` and deploys to GitHub Pages on push to `main`. Custom domain is `srikanthbellary.com` (`CNAME` in the repo root and `public/CNAME`).

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

`npm run check:voice` fails the build if forbidden names or invented company-site metrics appear in the source.
