// Direction A — "Screening Room". Dark, cinematic, creative-studio.
//
// Three pages share one stylesheet and one script:
//   index.html         the gateway: two screens, Professional and Personal
//   professional.html  the IT / AI engineering side
//   personal.html      Films & Music

import {
  person,
  lanes,
  projects,
  career,
  positioning,
  artist,
  albums,
  albumsNewestFirst,
  teaser,
  featuredVideo,
  pendingVideo,
  banner,
  shortsStrip,
  films,
  yt,
  education,
  stackGroups,
  mediaStack,
  buildNotes,
  copy,
  contactLinks,
  sides,
  year,
} from "./data.mjs";
import { esc, pad, portrait, icon, viaLine, head, rainTile, slot, image, ytLite, loop } from "./lib.mjs";
import { incidentPlate, mappingPlate } from "./plates.mjs";

const [telugu] = albums;
const [verizon, circana, thermo, cvs] = career;
const sentence = (text) => text.charAt(0).toUpperCase() + text.slice(1);
const spotify = artist.platforms.find((p) => p.id === "spotify");

const HOME = "./";
const PRO = sides.professional;
const PER = sides.personal;

/* —— Shared page furniture —— */

const pageHead = ({ title, description }) =>
  head({
    title,
    description,
    css: "styles.css",
    fonts: [
      "sofia-sans-extra-condensed-latin-wght-normal.woff2",
      "instrument-sans-latin-wdth-normal.woff2",
      "jetbrains-mono-latin-wght-normal.woff2",
    ],
    // Rain tiles for the storm, and a hint to prerender a side once the pointer rests on its link.
    extra: `<style>:root{--rain-near:${rainTile(11, { size: 420, count: 26, min: 26, max: 64 })};--rain-far:${rainTile(23, { size: 300, count: 40, min: 10, max: 26 })}}</style>
<script type="speculationrules">{"prerender":[{"where":{"selector_matches":"[data-side-link]"},"eagerness":"moderate"}]}</script>`,
  });

const stormBg = ({ eager = false } = {}) => `${image({ src: banner, alt: "", w: 2000, h: 857, eager })}
      <div class="screen-flash"></div>
      <div class="screen-rain"></div>
      <div class="screen-scrim"></div>`;

const blueprintBg = () => `<div class="bp">${incidentPlate(verizon)}</div>
      <div class="screen-scrim"></div>`;

const bar = (page) => {
  const pro = page === "professional";
  const other = pro ? PER : PRO;
  const links = pro
    ? [
        ["#work", "Work"],
        ["#stack", "Stack"],
        ["#experience", "Experience"],
        ["#contact", "Contact"],
      ]
    : [
        ["#music", "Albums"],
        ["#video", "Video"],
        ["#shorts", "Shorts"],
        ["#coming-2027", "2027"],
        ["#film", "Short films"],
      ];
  return `<header class="bar" data-bar>
  <div class="bar-left">
    <a class="bar-id" href="${HOME}" data-side-link aria-label="${esc(person.name)}: home, choose Professional or Personal">
      <span class="bar-mark">SB</span>
      <span class="bar-name">${esc(person.name)}</span>
    </a>
    <nav class="switch" aria-label="Sides">
      <a href="${PRO.href}"${pro ? ' aria-current="page"' : " data-side-link"}>${esc(PRO.label)}</a>
      <a href="${PER.href}"${pro ? " data-side-link" : ' aria-current="page"'}>${esc(PER.label)}</a>
    </nav>
  </div>
  <nav class="bar-nav" id="a-nav" aria-label="On this page">
    ${links.map(([href, label]) => `<a href="${href}">${esc(label)}</a>`).join("\n    ")}
    <a class="bar-nav-more" href="${HOME}">${icon.arrowLeft({ size: 14 })} Home</a>
    <a class="bar-nav-more" href="${other.href}">${esc(other.label)} ${icon.arrowRight({ size: 14 })}</a>
  </nav>
  ${
    pro
      ? `<a class="bar-cta" href="mailto:${esc(person.email)}">Write me ${icon.arrowUpRight({ size: 16 })}</a>`
      : `<a class="bar-cta" href="${esc(spotify.href)}" rel="noreferrer">Listen ${icon.arrowUpRight({ size: 16 })}</a>`
  }
  <button class="bar-menu" type="button" aria-expanded="false" aria-controls="a-nav" data-menu>Menu</button>
</header>`;
};

// The way across: the other side as one wide door, and the way back to the gateway.
const crossover = (page) => {
  const to = page === "professional" ? PER : PRO;
  const storm = to.key === "personal";
  return `<section class="cross" aria-label="The other side">
  <a class="cross-door cross-${storm ? "per" : "pro"}" href="${to.href}" data-side-link${storm ? ' data-area="music"' : ""}>
    <div class="door-bg${storm ? " screen-bg" : ""}" aria-hidden="true">
      ${storm ? stormBg() : blueprintBg()}
    </div>
    <div class="cross-head">
      <p class="label"><span>Screen ${to.n}</span><span>The other side</span></p>
      <h2>${esc(to.label)}</h2>
      <p class="door-sub">${to.sub.map((s) => `<span>${esc(s)}</span>`).join('<i aria-hidden="true"></i>')}</p>
    </div>
    <div class="cross-side">
      <p>${esc(to.line)}</p>
      <span class="door-enter">Enter ${esc(to.label)} ${icon.arrowRight({ size: 16 })}</span>
    </div>
  </a>
  <a class="cross-home" href="${HOME}" data-side-link>${icon.arrowLeft({ size: 16 })} <b>Home</b> <span>Both sides, side by side</span></a>
</section>`;
};

const foot = (page) => {
  const to = page === "professional" ? PER : PRO;
  return `<footer class="foot">
  <span>© ${year} ${esc(person.name)}</span>
  <a href="${HOME}">Home</a>
  <a href="${to.href}">${esc(to.label)}</a>
  ${page === "professional" ? '<a href="#contact">Privacy</a>' : ""}
  <span>srikanthbellary.com</span>
  <a href="#top" class="foot-top">Back to top ${icon.arrowUpRight({ size: 14 })}</a>
</footer>`;
};

const theater = () => `<dialog class="theater" data-theater-dialog aria-label="Video">
  <form method="dialog"><button class="theater-close" aria-label="Close video">Close ${icon.plus({ size: 16 })}</button></form>
  <div class="theater-frame" data-theater-frame></div>
  <p class="theater-title" data-theater-title></p>
</dialog>`;

const sectionHead = ({ n, id, title, aside }) => `<header class="sec-head">
  <p class="sec-n"><span>${n}</span><span>${esc(id)}</span></p>
  <h2>${title}</h2>
  <div class="sec-aside">${aside}</div>
</header>`;

/* —— Gateway —— */

const door = (side) => {
  const pro = side.key === "professional";
  const summary = `${side.label}: ${side.sub.join(", ")}. ${side.contents.map((c) => c.label).join(", ")}.`;
  return `<a class="door door-${pro ? "pro" : "per"}" href="${side.href}" data-door="${side.key}" data-side-link${pro ? "" : ' data-area="music"'} aria-label="${esc(summary)}">
    <div class="door-bg${pro ? "" : " screen-bg"}" aria-hidden="true">
      ${pro ? '<div class="screen-scrim"></div>' : stormBg({ eager: true })}
    </div>
    <span class="door-mast" aria-hidden="true">${pro ? "Srikanth" : "Bellary"}</span>
    <div class="door-head">
      <p class="door-n"><span>Screen ${side.n}</span><em>${esc(side.tagline)}</em></p>
      <h2>${esc(side.label)}</h2>
      <p class="door-sub">${side.sub.map((s) => `<span>${esc(s)}</span>`).join('<i aria-hidden="true"></i>')}</p>
    </div>
    <div class="door-stage">
      ${
        pro
          ? `<figure class="door-inset">${portrait({ sizes: "(max-width: 900px) 100px, 220px" })}</figure>
      <div class="door-plate" aria-hidden="true">${incidentPlate(verizon)}</div>`
          : `<figure class="door-inset">${image({ src: telugu.cover, alt: "", w: 2000, h: 2000, eager: true })}<span class="record-tag">${esc(telugu.out)}</span></figure>`
      }
    </div>
    <div class="door-foot">
      <p class="door-line">${esc(side.line)}</p>
      <ul class="door-list">
        ${side.contents.map((c) => `<li><b>${esc(c.label)}</b><span>${esc(c.note)}</span></li>`).join("\n        ")}
      </ul>
      <span class="door-enter">Enter ${esc(side.label)} ${icon.arrowRight({ size: 16 })}</span>
    </div>
  </a>`;
};

export function renderGateway() {
  return `${pageHead({
    title: "Direction A — Screening Room · Gateway · Srikanth Bellary",
    description: "Mockup. The gateway of the dark cinematic direction: Professional or Personal.",
  })}
<body data-page="gateway">

<header class="bar" data-bar>
  <a class="bar-id" href="${HOME}" aria-current="page" aria-label="${esc(person.name)}">
    <span class="bar-mark">SB</span>
    <span class="bar-name">${esc(person.name)}</span>
  </a>
  <p class="bar-note"><span>${esc(person.location)}</span><span>${year}</span></p>
</header>

<main class="gate" id="top" data-gate>
  <h1 class="sr">${esc(person.name)}. Choose a side: Professional or Personal.</h1>
  ${door(PRO)}
  ${door(PER)}
  <p class="gate-hint" aria-hidden="true"><kbd>←</kbd><kbd>→</kbd><span>to preview</span><kbd>Enter</kbd><span>to open</span></p>
</main>

<script src="script.js" defer></script>
</body>
</html>
`;
}

/* —— Personal: Films & Music —— */

const platformLinks = () =>
  artist.platforms
    .map((p) =>
      p.href
        ? `<li><a class="btn btn-ghost" href="${esc(p.href)}" rel="noreferrer">${esc(p.label)} ${icon.arrowUpRight({ size: 14 })}</a></li>`
        : `<li><span class="btn btn-pending">${esc(p.label)} <i>${esc(p.pending)}</i></span></li>`,
    )
    .join("");

const trackRow = (t, i) => `<li class="trk${i === 0 ? " is-on" : ""}" tabindex="0" data-loop="${t.loop}" data-still="${t.still}" data-label="${pad(i + 1)} ${esc(t.title)}">
          ${image({ src: t.art, alt: "", w: 2000, h: 2000, cls: "trk-art" })}
          <span class="trk-n">${pad(i + 1)}</span>
          <span class="trk-title">${esc(t.title)}</span>
          ${t.credit ? `<span class="trk-credit">${esc(t.credit)}</span>` : ""}
        </li>`;

const albumCard = (album) => `<article class="album" id="album-${album.id}" data-album data-reveal>
    <div class="album-cover">
      ${image({ src: album.cover, alt: `${album.title}: album cover`, w: 2000, h: 2000 })}
      <p class="album-out">${esc(album.out)}</p>
    </div>

    <div class="album-body">
      <p class="label"><span>Album ${album.chapter}</span><span>${esc(album.language)}</span><span>${esc(album.date)}</span></p>
      <h3>${esc(album.title)}</h3>
      <p class="album-meaning">“${esc(sentence(album.meaning))}.”</p>
      <p class="album-line">${esc(album.short)}${album.detail ? ` <span>${esc(album.detail)}</span>` : ""}</p>

      <div class="listen">
        <p><b>${esc(album.out)}</b> on ${artist.releaseDayStores.slice(0, -1).map(esc).join(", ")} and ${esc(artist.releaseDayStores.at(-1))}.</p>
        <span class="pending">${esc(artist.preSave)}</span>
      </div>

      <details class="tracks" open>
        <summary><span>Tracklist</span><span>${esc(album.countWord)}</span></summary>
        <ol>
        ${album.tracks.map(trackRow).join("\n        ")}
        </ol>
      </details>
    </div>

    <figure class="canvas">
      <div class="canvas-frame">
        ${loop({ src: album.tracks[0].loop, still: album.tracks[0].still, label: `${album.title}: looping clip` })}
      </div>
      <figcaption><span>Loop</span><b data-canvas-label>${pad(1)} ${esc(album.tracks[0].title)}</b></figcaption>
    </figure>
  </article>`;

const shortCard = (s) => `<li class="short" data-short>
      <div class="short-frame">
        <video data-src="${s.src}" poster="${s.still}" muted loop playsinline preload="none" aria-label="${esc(s.title)}: ${esc(s.kind)}"></video>
        <span class="short-play" aria-hidden="true">${icon.play({ size: 16 })}</span>
      </div>
      <p class="label"><span>${s.n}</span><span>${esc(s.album)}</span></p>
      <h4>${esc(s.title)}</h4>
    </li>`;

const filmCard = (f) => `<article class="film">
      ${ytLite({ id: f.id, title: f.title, poster: f.poster, play: icon.play({ size: 24 }) })}
      <p class="label"><span>${f.year}</span><span>${f.length}</span><span>${esc(f.role)}</span></p>
      <h4>${esc(f.title)}</h4>
      <p class="film-logline">${esc(f.logline)}</p>
      <a class="text-link" href="${yt.watch(f.id)}" rel="noreferrer">Watch on YouTube ${icon.arrowUpRight({ size: 14 })}</a>
    </article>`;

export function renderPersonal() {
  return `${pageHead({
    title: "Direction A — Screening Room · Personal · Srikanth Bellary",
    description: "Mockup. Films & Music, the personal side of the dark cinematic direction.",
  })}
<body data-page="personal">

<a class="skip" href="#music">Skip to the albums</a>

${bar("personal")}

<main id="top">

<section class="hero hero-per" id="intro" aria-label="Introduction" data-area="music">
  <p class="id-meta">
    <a class="back" href="${HOME}" data-side-link>${icon.arrowLeft({ size: 13 })} Home</a>
    <span>${esc(person.name)}</span>
    <span>${esc(person.location)}</span>
    <span>Next release <b>${esc(telugu.date)}</b></span>
  </p>
  <div class="id id-plain">
    <div class="id-name">
      <h1>Films <em>&amp;</em> Music</h1>
      <p class="id-roles">${positioning.also.map((r) => `<span>${esc(r)}</span>`).join('<i aria-hidden="true"></i>')}</p>
    </div>
  </div>

  <div class="id-about">
    <p>${esc(artist.bio)}</p>
    <ul class="platforms">${platformLinks()}</ul>
  </div>

  <div class="screen">
    <div class="screen-bg" aria-hidden="true">
      ${stormBg({ eager: true })}
    </div>

    <div class="screen-hud">
      <p><span class="rec" aria-hidden="true"></span>Now showing <b>Album ${telugu.chapter}</b></p>
      <p>${esc(telugu.date)} <b data-countdown="${telugu.iso}"></b></p>
    </div>

    <div class="screen-main">
      <div class="title-card">
        <p class="label"><span>Album ${telugu.chapter}</span><span>${esc(telugu.language)}</span><span>${esc(telugu.out)}</span></p>
        <h2>${esc(telugu.title)}</h2>
        <p class="title-meaning">“${esc(sentence(telugu.meaning))}.”</p>
        <p class="title-line">${esc(telugu.short)}</p>
        <div class="title-cta">
          <button class="btn btn-solid" type="button" data-theater="${featuredVideo.id}" data-title="${esc(featuredVideo.title)}">${icon.play({ size: 16 })} Watch the title-track video</button>
          <a class="btn btn-ghost" href="#music">Albums, Shorts &amp; films ${icon.arrowDown({ size: 14 })}</a>
        </div>
      </div>

      <a class="record" href="#album-${telugu.id}">
        ${image({ src: telugu.cover, alt: `${telugu.title}: album cover`, w: 2000, h: 2000, eager: true })}
        <span class="record-tag">${esc(telugu.out)}</span>
      </a>
    </div>
  </div>

  <nav class="rail" aria-label="Releases and films">
    ${albums
      .map(
        (a) => `<a class="rail-item" href="#album-${a.id}">
      <span class="rail-n">${a.chapter}</span>
      <b>${esc(a.title)}</b>
      <i>${esc(a.language)} · ${esc(a.out)}</i>
    </a>`,
      )
      .join("\n    ")}
    <a class="rail-item rail-rose" href="#coming-2027">
      <span class="rail-n">${teaser.chapter}</span>
      <b>${esc(teaser.title)}</b>
      <i>${esc(teaser.status)}</i>
    </a>
    <a class="rail-item rail-film" href="#film">
      <span class="rail-n">Film</span>
      <b>Short films</b>
      <i>${films[0].year} · ${esc(films[0].role)}</i>
      <span class="rail-posters">${films.map((f) => image({ src: f.poster, alt: "", w: 1280, h: 720 })).join("")}</span>
    </a>
  </nav>
</section>

<section class="sec music" id="music" data-spy data-area="music">
  ${sectionHead({
    n: "01",
    id: "Music",
    title: "The <em>albums</em>",
    aside: `<p class="lead">${esc(artist.story)}</p>`,
  })}

  <ol class="arc" data-reveal>
    ${albums
      .map(
        (a) => `<li>
      <a href="#album-${a.id}">
        ${image({ src: a.cover, alt: "", w: 2000, h: 2000 })}
        <span class="label">${a.chapter} · ${esc(a.arc)}</span>
        <b>${esc(a.title)}</b>
        <i>${esc(a.out)}</i>
      </a>
    </li>`,
      )
      .join("\n    ")}
    <li class="arc-rose">
      <a href="#coming-2027">
        ${image({ src: teaser.cover, alt: "", w: 2000, h: 2000 })}
        <span class="label">${teaser.chapter} · ${esc(teaser.arc)}</span>
        <b>${esc(teaser.title)}</b>
        <i>${esc(teaser.status)}</i>
      </a>
    </li>
  </ol>

  <div class="albums">
  ${albumsNewestFirst.map(albumCard).join("\n  ")}
  </div>
</section>

<section class="sec-cont" id="video" data-spy data-area="music">
  <div class="feature" data-reveal>
    <div class="feature-main">
      ${ytLite({ id: featuredVideo.id, title: `${featuredVideo.title}: ${featuredVideo.kind.toLowerCase()}`, poster: featuredVideo.poster, w: 1999, h: 1121, play: icon.play({ size: 34 }) })}
      <div class="feature-cap">
        <p class="label"><span>Featured video</span><span>${esc(featuredVideo.kind)}</span></p>
        <h3>${esc(featuredVideo.title)}</h3>
        <a class="text-link" href="${featuredVideo.url}" rel="noreferrer">Watch on YouTube ${icon.arrowUpRight({ size: 14 })}</a>
      </div>
    </div>
    <aside class="feature-side">
      <p class="label">How it is made</p>
      <p class="made">${esc(artist.madeWith)}</p>
      <div class="pending-video">${slot(pendingVideo.label)}</div>
      <p class="label"><span>Next video</span><span>${esc(pendingVideo.title)}</span></p>
    </aside>
  </div>
</section>

<section class="sec-cont" id="shorts" data-spy data-area="music">
  <div class="shorts" data-reveal>
    <div class="sub-head">
      <h3>Shorts</h3>
      <p>Vertical cuts from both albums. Silent; they play when you point at them or tap them.</p>
    </div>
    <ul class="shorts-row">
    ${shortsStrip.map(shortCard).join("\n    ")}
    </ul>
  </div>
</section>

<section class="sec-cont" id="coming-2027" data-spy data-area="music">
  <article class="coming" data-reveal>
    <div class="coming-copy">
      <p class="coming-tag">${esc(teaser.status)}</p>
      <h3>${esc(teaser.title)}</h3>
      <p class="coming-line">${esc(teaser.short)}</p>
      <p class="coming-note"><span>Album ${teaser.chapter}</span><span>${esc(teaser.arc)}</span></p>
    </div>
    <div class="coming-art">
      ${image({ src: teaser.wide, alt: `${teaser.title}: cover art`, w: 2000, h: 1125 })}
    </div>
  </article>
</section>

<section class="sec films" id="film" data-spy data-area="music">
  ${sectionHead({
    n: "02",
    id: "Film",
    title: "Short <em>films</em>",
    aside: `<p class="lead">Three shorts from ${films[0].year}.</p><p>Press play to watch here, or open them on YouTube.</p>`,
  })}
  <div class="films-row" data-reveal>
    ${films.map(filmCard).join("\n    ")}
  </div>
</section>

${crossover("personal")}

${foot("personal")}

</main>

${theater()}

<script src="script.js" defer></script>
</body>
</html>
`;
}

/* —— Professional: the IT / AI engineering side —— */

const metrics = (chapter) =>
  chapter.metrics
    ? `<dl class="metrics">${chapter.metrics.map((m) => `<div><dt>${esc(m.value)}</dt><dd>${esc(m.label)}</dd></div>`).join("")}</dl>`
    : "";

const caseFile = (chapter, i, plate) => `<article class="case" id="case-${chapter.id}">
  <div class="case-meta">
    <p class="label">Case file ${pad(i + 1)}</p>
    <dl>
      <div><dt>Dates</dt><dd>${esc(chapter.dates)}</dd></div>
      ${chapter.via ? `<div><dt>Via</dt><dd>${esc(chapter.via)}</dd></div>` : ""}
      <div><dt>Role</dt><dd>${esc(chapter.role)}</dd></div>
      <div><dt>Environment</dt><dd>${esc(chapter.env)}</dd></div>
    </dl>
  </div>
  <div class="case-body">
    <h3>${esc(chapter.client)}</h3>
    <p class="case-program">${esc(chapter.program)}</p>
    <ul>${chapter.bullets.slice(0, 4).map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
  </div>
  <figure class="case-figure">
    <div class="plate">${plate}</div>
    ${metrics(chapter)}
  </figure>
</article>`;

const caseMini = (chapter) => `<article class="mini">
  <p class="label">${esc(chapter.dates)}${viaLine(chapter) ? ` · ${esc(viaLine(chapter))}` : ""}</p>
  <h3>${esc(chapter.client)}</h3>
  <p class="mini-role">${esc(chapter.role)}</p>
  <p class="mini-program">${esc(chapter.program)}</p>
  <ul>${chapter.bullets.slice(0, 3).map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
  <p class="mini-env">${esc(chapter.env)}</p>
</article>`;

export function renderProfessional() {
  const program = verizon.program.replace(/\.$/, "");

  return `${pageHead({
    title: "Direction A — Screening Room · Professional · Srikanth Bellary",
    description: "Mockup. The professional side of the dark cinematic direction: applied AI engineering and architecture.",
  })}
<body data-page="professional">

<a class="skip" href="#work">Skip to work</a>

${bar("professional")}

<main id="top">

<section class="hero hero-pro" id="intro" aria-label="Introduction">
  <p class="id-meta">
    <a class="back" href="${HOME}" data-side-link>${icon.arrowLeft({ size: 13 })} Home</a>
    <span>Profile · ${year}</span>
    <span>${esc(person.location)}</span>
    <span>Now <b>${esc(positioning.now.role)}, ${esc(positioning.now.client)} via ${esc(positioning.now.via)}</b></span>
  </p>
  <div class="id">
    <figure class="id-portrait">
      ${portrait({ sizes: "(max-width: 900px) 84px, 124px" })}
    </figure>
    <div class="id-name">
      <h1>${esc(person.name)}</h1>
      <p class="id-roles">${positioning.roles.map((r) => `<span>${esc(r)}</span>`).join('<i aria-hidden="true"></i>')}</p>
    </div>
  </div>

  <div class="id-about">
    <p>${esc(positioning.overview)}</p>
    <p>${esc(positioning.bridge)} <a class="inline-link" href="${PER.href}" data-side-link>Films &amp; Music ${icon.arrowRight({ size: 13 })}</a></p>
    <ul class="chips">
      <li>${esc(person.years)} years</li>
      <li>${esc(person.degree)}</li>
      <li>${esc(person.cert)}</li>
    </ul>
  </div>

  <div class="screen screen-pro">
    <div class="screen-bg" aria-hidden="true">
      ${blueprintBg()}
    </div>

    <div class="screen-hud">
      <p><span class="rec" aria-hidden="true"></span>Now showing <b>Case file 01</b></p>
      <p>${esc(verizon.dates)} <b>${esc(verizon.client)} via ${esc(verizon.via)}</b></p>
    </div>

    <div class="screen-main">
      <div class="title-card">
        <p class="label"><span>Case file 01</span><span>${esc(verizon.client)}</span><span>${esc(verizon.role)}</span></p>
        <h2>${esc(program).replace("multi-agent", '<span class="nb">multi-agent</span>')}</h2>
        <p class="title-line">${esc(verizon.bullets[3])}</p>
        <div class="title-cta">
          <a class="btn btn-solid" href="#case-${verizon.id}">Open the case file ${icon.arrowDown({ size: 14 })}</a>
          <a class="btn btn-ghost" href="mailto:${esc(person.email)}">Write me ${icon.arrowUpRight({ size: 14 })}</a>
        </div>
      </div>

      <a class="record record-plate" href="#case-${verizon.id}" aria-label="Case file 01: ${esc(verizon.client)}, the incident path">
        <span class="plate">${incidentPlate(verizon)}</span>
        <span class="record-tag">Case file 01</span>
      </a>
    </div>
  </div>

  <nav class="rail rail-pro" aria-label="On this page">
    <a class="rail-item" href="#work">
      <span class="rail-n">01</span>
      <b>Work</b>
      <i>Case files, newest first</i>
    </a>
    <a class="rail-item" href="#stack">
      <span class="rail-n">02</span>
      <b>Stack</b>
      <i>${esc(copy.stackKicker)}</i>
    </a>
    <a class="rail-item" href="#experience">
      <span class="rail-n">03</span>
      <b>Experience</b>
      <i>${career.length} engagements · 2006 to now</i>
    </a>
    <a class="rail-item" href="#contact">
      <span class="rail-n">04</span>
      <b>Contact</b>
      <i>Write me directly</i>
    </a>
  </nav>
</section>

<section class="sec work" id="work" data-spy>
  ${sectionHead({
    n: "01",
    id: "Work",
    title: "AI engineering <em>&amp;</em> architecture",
    aside: `<p class="lead">${esc(copy.workTitle)}</p><p>${esc(copy.workLede)}</p>`,
  })}

  <div class="cases">
    ${caseFile(verizon, 0, incidentPlate(verizon))}
    ${caseFile(circana, 1, mappingPlate())}
  </div>

  <div class="minis" data-reveal>
    ${caseMini(thermo)}
    ${caseMini(cvs)}
  </div>

  <div class="lanes-block" data-reveal>
    <div class="sub-head">
      <h3>${esc(copy.lanesTitle)}</h3>
      <p>${esc(copy.lanesLede)}</p>
    </div>
    <ol class="lanes">
      ${lanes
        .map(
          (lane, i) => `<li>
        <p class="label">Lane ${pad(i + 1)}</p>
        <h4>${esc(lane.title)}</h4>
        <p class="lane-line">${esc(lane.line)}</p>
        <p class="lane-metric"><b>${esc(lane.metric.value)}</b><span>${esc(lane.metric.label)}</span></p>
      </li>`,
        )
        .join("\n      ")}
    </ol>
  </div>

  <div class="notes" data-reveal>
    ${buildNotes
      .map(
        (note) => `<article>
      <p class="note-value">${esc(note.value)}</p>
      <p class="label">${esc(note.label)}</p>
      <p class="note-line">${esc(note.line)}</p>
    </article>`,
      )
      .join("\n    ")}
  </div>

  <div class="built" data-reveal>
    <div class="sub-head">
      <h3>${esc(copy.projectsTitle)}</h3>
      <p>${esc(copy.projectsKicker)}.</p>
    </div>
    <div class="built-row">
      ${projects
        .map(
          (project) => `<article class="project">
        <p class="label"><span>${project.num}</span><span>${esc(project.kicker)}</span></p>
        <h4>${esc(project.name)}</h4>
        <p class="project-lede">${esc(project.lede)}</p>
        <p class="project-body">${esc(project.body)}</p>
        <ul class="project-links">${project.hrefs
          .map((link) => `<li><a class="text-link" href="${esc(link.href)}" rel="noreferrer">${esc(link.label)} ${icon.arrowUpRight({ size: 14 })}</a></li>`)
          .join("")}</ul>
        <ul class="tags">${project.tags.map((tag) => `<li>${esc(tag)}</li>`).join("")}</ul>
      </article>`,
        )
        .join("\n      ")}
    </div>
  </div>
</section>

<section class="sec stack" id="stack" data-spy>
  ${sectionHead({
    n: "02",
    id: "Stack",
    title: "Skills <em>&amp;</em> stack",
    aside: `<p class="lead">${esc(copy.stackKicker)}.</p><p>The engineering stack, and the generative media practice behind the <a class="inline-link" href="${PER.href}" data-side-link>films and music ${icon.arrowRight({ size: 13 })}</a></p>`,
  })}

  <dl class="groups" data-reveal>
    ${[stackGroups[0], mediaStack, ...stackGroups.slice(1)]
      .map(
        (group) => `<div class="group${group.id === "media" ? " group-media" : ""}">
      <dt>${esc(group.title)}</dt>
      <dd>${group.items.map((item) => `<span>${esc(item)}</span>`).join("")}</dd>
    </div>`,
      )
      .join("\n    ")}
  </dl>

  <ul class="creds" data-reveal>
    ${education.map((e) => `<li><span class="label">Education · ${e.year}</span><b>${esc(e.label)}</b></li>`).join("")}
    <li><span class="label">Certification</span><b>${esc(person.cert)}</b></li>
    <li><span class="label">Experience</span><b>${esc(person.years)} years in production systems</b></li>
  </ul>
</section>

<section class="sec exp" id="experience" data-spy>
  ${sectionHead({
    n: "03",
    id: "Experience",
    title: "Credits",
    aside: `<p class="lead">Client projects, newest first.</p><p>${career.length} engagements, 2006 to now. Staffing firms appear as “via”.</p>`,
  })}

  <ol class="credits" data-reveal>
    ${career
      .map(
        (c, i) => `<li class="credit">
      <span class="credit-n">${pad(i + 1)}</span>
      <span class="credit-dates">${esc(c.dates)}</span>
      <h3 class="credit-client">${esc(c.client)}</h3>
      <p class="credit-role">${esc(c.role)}</p>
      <p class="credit-program">${esc(c.program)}</p>
      <span class="credit-via">${esc(viaLine(c))}</span>
    </li>`,
      )
      .join("\n    ")}
  </ol>
</section>

<section class="sec contact" id="contact" data-spy>
  <div class="contact-top">
    <p class="sec-n"><span>04</span><span>Contact</span></p>
    <h2>Write me <em>directly.</em></h2>
    <p class="contact-lede">${esc(copy.contactLede)}</p>
  </div>

  <a class="mail" href="mailto:${esc(person.email)}"><span>${esc(person.email)}</span>${icon.arrowUpRight({ size: 44 })}</a>

  <div class="contact-grid">
    <dl class="reach">
      ${contactLinks
        .filter((l) => l.id !== "email")
        .map((l) => `<div><dt>${esc(l.label)}</dt><dd><a href="${esc(l.href)}"${l.id === "phone" ? "" : ' rel="noreferrer"'}>${esc(l.text)}</a></dd></div>`)
        .join("")}
      <div><dt>Location</dt><dd>${esc(person.location)}</dd></div>
    </dl>

    <form class="ask" data-ask>
      <p class="label">${esc(copy.chatTitle)}</p>
      <p class="ask-note">${esc(copy.chatPreface)}</p>
      <div class="ask-field">
        <label class="sr" for="a-ask">Your question</label>
        <input id="a-ask" type="text" placeholder="${esc(copy.chatField)}" autocomplete="off" data-off="${esc(copy.chatOff)}">
        <button type="submit" aria-label="Send">${icon.send({ size: 20 })}</button>
      </div>
      <p class="ask-privacy">${esc(copy.chatPrivacy)} <a href="#contact">Privacy</a></p>
    </form>
  </div>
</section>

${crossover("professional")}

${foot("professional")}

</main>

<script src="script.js" defer></script>
</body>
</html>
`;
}

export const pages = [
  { file: "index.html", render: renderGateway },
  { file: "professional.html", render: renderProfessional },
  { file: "personal.html", render: renderPersonal },
];
