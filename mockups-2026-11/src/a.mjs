// Direction A — "Screening Room". Dark, cinematic, creative-studio.

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
  shorts,
  films,
  yt,
  education,
  stackGroups,
  mediaStack,
  buildNotes,
  copy,
  contactLinks,
  year,
} from "./data.mjs";
import { esc, pad, portrait, icon, viaLine, head, rainTile, slot, image, ytLite, loop } from "./lib.mjs";
import { incidentPlate, mappingPlate } from "./plates.mjs";

const [telugu] = albums;
const sentence = (text) => text.charAt(0).toUpperCase() + text.slice(1);

/* —— Music & Film —— */

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
        <video data-src="${s.src}" poster="${s.still}" muted loop playsinline preload="none" aria-label="${esc(s.title)}: vertical Short"></video>
        <span class="short-play" aria-hidden="true">${icon.play({ size: 16 })}</span>
      </div>
      <p class="label"><span>Short ${s.n}</span><span>${esc(s.album)}</span></p>
      <h4>${esc(s.title)}</h4>
    </li>`;

const filmCard = (f) => `<article class="film">
      ${ytLite({ id: f.id, title: f.title, poster: f.poster, play: icon.play({ size: 24 }) })}
      <p class="label"><span>${f.year}</span><span>${f.length}</span><span>${esc(f.role)}</span></p>
      <h4>${esc(f.title)}</h4>
      <p class="film-logline">${esc(f.logline)}</p>
      <a class="text-link" href="${yt.watch(f.id)}" rel="noreferrer">Watch on YouTube ${icon.arrowUpRight({ size: 14 })}</a>
    </article>`;

/* —— Work —— */

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

const sectionHead = ({ n, id, title, aside }) => `<header class="sec-head">
  <p class="sec-n"><span>${n}</span><span>${esc(id)}</span></p>
  <h2>${title}</h2>
  <div class="sec-aside">${aside}</div>
</header>`;

export function render() {
  const [verizon, circana, thermo, cvs] = career;

  return `${head({
    title: "Direction A — Screening Room · Srikanth Bellary",
    description: "Mockup. Dark cinematic direction for srikanthbellary.com.",
    css: "styles.css",
    fonts: [
      "sofia-sans-extra-condensed-latin-wght-normal.woff2",
      "instrument-sans-latin-wdth-normal.woff2",
      "jetbrains-mono-latin-wght-normal.woff2",
    ],
    extra: `<style>:root{--rain-near:${rainTile(11, { size: 420, count: 26, min: 26, max: 64 })};--rain-far:${rainTile(23, { size: 300, count: 40, min: 10, max: 26 })}}</style>`,
  })}
<body>

<a class="skip" href="#work">Skip to work</a>

<header class="bar" data-bar>
  <a class="bar-id" href="#top" aria-label="Srikanth Bellary, home">
    <span class="bar-mark">SB</span>
    <span class="bar-name">${esc(person.name)}</span>
  </a>
  <nav class="bar-nav" id="a-nav" aria-label="Primary">
    <a href="#music">Music &amp; Film</a>
    <a href="#work">Work</a>
    <a href="#stack">Stack</a>
    <a href="#experience">Experience</a>
    <a href="#contact">Contact</a>
  </nav>
  <a class="bar-cta" href="mailto:${esc(person.email)}">Write me ${icon.arrowUpRight({ size: 16 })}</a>
  <button class="bar-menu" type="button" aria-expanded="false" aria-controls="a-nav" data-menu>Menu</button>
</header>

<main id="top">

<section class="hero" id="intro" aria-label="Introduction">
  <p class="id-meta">
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
    <p>${esc(positioning.bridge)}</p>
    <ul class="chips">
      <li>${esc(person.years)} years</li>
      <li>${esc(person.degree)}</li>
      <li>${esc(person.cert)}</li>
    </ul>
  </div>

  <div class="screen" data-area="music">
    <div class="screen-bg" aria-hidden="true">
      ${image({ src: banner, alt: "", w: 2000, h: 857, eager: true })}
      <div class="screen-flash"></div>
      <div class="screen-rain"></div>
      <div class="screen-scrim"></div>
    </div>

    <div class="screen-hud">
      <p><span class="rec" aria-hidden="true"></span>Now showing <b>${esc(positioning.alsoLine)}</b></p>
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
          <a class="btn btn-ghost" href="#music">Albums, Shorts &amp; film ${icon.arrowDown({ size: 14 })}</a>
        </div>
      </div>

      <a class="record" href="#album-${telugu.id}">
        ${image({ src: telugu.cover, alt: `${telugu.title}: album cover`, w: 2000, h: 2000, eager: true })}
        <span class="record-tag">${esc(telugu.out)}</span>
      </a>
    </div>
  </div>

  <nav class="rail" aria-label="Releases and film" data-area="music">
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

<section class="sec music" id="music" data-area="music">
  ${sectionHead({
    n: "01",
    id: "Music & Film",
    title: "Music <em>&amp;</em> film",
    aside: `<p class="lead">${esc(artist.bio)}</p><ul class="platforms">${platformLinks()}</ul>`,
  })}

  <div class="story" data-reveal>
    <p class="story-line">${esc(artist.story)}</p>
    <ol class="arc">
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
        .join("\n      ")}
      <li class="arc-rose">
        <a href="#coming-2027">
          ${image({ src: teaser.cover, alt: "", w: 2000, h: 2000 })}
          <span class="label">${teaser.chapter} · ${esc(teaser.arc)}</span>
          <b>${esc(teaser.title)}</b>
          <i>${esc(teaser.status)}</i>
        </a>
      </li>
    </ol>
  </div>

  <div class="albums">
  ${albumsNewestFirst.map(albumCard).join("\n  ")}
  </div>

  <div class="feature" id="video" data-reveal>
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

  <div class="shorts" id="shorts" data-reveal>
    <div class="sub-head">
      <h3>Shorts</h3>
      <p>Vertical cuts from both albums. Muted; they play when you point at them.</p>
    </div>
    <ul class="shorts-row">
    ${shorts.map(shortCard).join("\n    ")}
    </ul>
  </div>

  <article class="coming" id="coming-2027" data-reveal>
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

  <div class="films" id="film" data-reveal>
    <div class="sub-head">
      <h3>Short films</h3>
      <p>Three shorts from ${films[0].year}. Press play to watch here, or open them on YouTube.</p>
    </div>
    <div class="films-row">
    ${films.map(filmCard).join("\n    ")}
    </div>
  </div>
</section>

<section class="sec work" id="work">
  ${sectionHead({
    n: "02",
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

<section class="sec stack" id="stack">
  ${sectionHead({
    n: "03",
    id: "Stack",
    title: "Skills <em>&amp;</em> stack",
    aside: `<p class="lead">${esc(copy.stackKicker)}.</p><p>The engineering stack, and the generative media practice behind the music and film.</p>`,
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

<section class="sec exp" id="experience">
  ${sectionHead({
    n: "04",
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

<section class="sec contact" id="contact">
  <div class="contact-top">
    <p class="sec-n"><span>05</span><span>Contact</span></p>
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
      ${artist.platforms
        .filter((p) => p.href)
        .map((p) => `<div><dt>${esc(p.label)}</dt><dd><a href="${esc(p.href)}" rel="noreferrer">${esc(artist.name)}, artist</a></dd></div>`)
        .join("")}
      <div><dt>Studio</dt><dd>${esc(person.location)}</dd></div>
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

  <footer class="foot">
    <span>© ${year} ${esc(person.name)}</span>
    <a href="#contact">Privacy</a>
    <span>srikanthbellary.com</span>
    <a href="#top" class="foot-top">Back to top ${icon.arrowUpRight({ size: 14 })}</a>
  </footer>
</section>

</main>

<dialog class="theater" data-theater-dialog aria-label="Video">
  <form method="dialog"><button class="theater-close" aria-label="Close video">Close ${icon.plus({ size: 16 })}</button></form>
  <div class="theater-frame" data-theater-frame></div>
  <p class="theater-title" data-theater-title></p>
</dialog>

<script src="script.js" defer></script>
</body>
</html>
`;
}
