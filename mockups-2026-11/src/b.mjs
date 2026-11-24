// Direction B — "Signal Path". Clean, editorial, technical.
// A light page of figures and tables; the music and film sit on storm-dark plates.

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
import { esc, pad, portrait, icon, viaLine, head, slot, image, ytLite } from "./lib.mjs";
import { incidentPlate, mappingPlate } from "./plates.mjs";

const [telugu] = albums;
const sentence = (text) => text.charAt(0).toUpperCase() + text.slice(1);

// Figures are numbered in reading order.
let figure = 0;
const fig = () => `Fig. ${++figure}`;

const arrow = `<svg class="path-arrow" viewBox="0 0 64 12" aria-hidden="true" focusable="false"><path d="M0 6h58M53 1.5 58 6l-5 4.5" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="3" cy="6" r="2.5" fill="currentColor"/></svg>`;

const platformLinks = () =>
  artist.platforms
    .map((p) =>
      p.href
        ? `<li><a class="btn" href="${esc(p.href)}" rel="noreferrer">${esc(p.label)} ${icon.arrowUpRight({ size: 14 })}</a></li>`
        : `<li><span class="btn btn-pending">${esc(p.label)} <i>${esc(p.pending)}</i></span></li>`,
    )
    .join("");

/* —— Music & Film —— */

const sheet = (album) => `<article class="sheet" id="album-${album.id}" data-album>
      <div class="sheet-top">
        <figure class="sheet-cover">
          ${image({ src: album.cover, alt: `${album.title}: album cover`, w: 2000, h: 2000 })}
        </figure>
        <dl class="spec">
          <div><dt>Album</dt><dd>${album.chapter}</dd></div>
          <div><dt>Language</dt><dd>${esc(album.language)}</dd></div>
          <div><dt>Songs</dt><dd>${album.count}</dd></div>
          <div><dt>Release</dt><dd>${esc(album.date)}</dd></div>
          <div><dt>Status</dt><dd><b class="out">${esc(album.out)}</b></dd></div>
          <div><dt>Listen</dt><dd>${artist.releaseDayStores.map(esc).join(" · ")}</dd></div>
          <div><dt>Pre-save</dt><dd><span class="pending">${esc(artist.preSave)}</span></dd></div>
        </dl>
      </div>

      <h3>${esc(album.title)}</h3>
      <p class="sheet-meaning">“${esc(sentence(album.meaning))}.”</p>
      <p class="sheet-line">${esc(album.short)}${album.detail ? ` ${esc(album.detail)}` : ""}</p>

      <details class="tl" open>
        <summary><span>Tracklist</span><span>${pad(album.count)} songs</span></summary>
        <ol>
          ${album.tracks
            .map(
              (t, i) => `<li>
            <span class="tl-n">${pad(i + 1)}</span>
            ${image({ src: t.art, alt: "", w: 2000, h: 2000 })}
            <span class="tl-title">${esc(t.title)}</span>
            ${t.credit ? `<span class="tl-credit">${esc(t.credit)}</span>` : ""}
          </li>`,
            )
            .join("\n          ")}
        </ol>
      </details>

      <figure class="loops">
        <div class="loops-row" style="--n:${album.count}">
          ${album.tracks
            .map(
              (t, i) =>
                `<span class="loops-cell" data-loop><video data-src="${t.loop}" poster="${t.still}" muted loop playsinline preload="none" aria-label="Loop for track ${pad(i + 1)}"></video><i>${pad(i + 1)}</i></span>`,
            )
            .join("")}
        </div>
        <figcaption><span>${fig()}</span> Loops, one per track. Silent; each plays under the pointer, or on a tap.</figcaption>
      </figure>
    </article>`;

const shortCard = (s) => `<li class="short" data-short>
        <div class="short-frame">
          <video data-src="${s.src}" poster="${s.still}" muted loop playsinline preload="none" aria-label="${esc(s.title)}: vertical Short"></video>
        </div>
        <p class="cap"><span>${s.n} · ${esc(s.album)}</span>${esc(s.title)}</p>
      </li>`;

const filmCard = (f) => `<article class="film">
        ${ytLite({ id: f.id, title: f.title, poster: f.poster, play: icon.play({ size: 20 }) })}
        <p class="cap"><span>${fig()}</span>${f.year} · ${f.length} · ${esc(f.role)}</p>
        <h4>${esc(f.title)}</h4>
        <p class="film-logline">${esc(f.logline)}</p>
        <a class="link" href="${yt.watch(f.id)}" rel="noreferrer">Watch on YouTube ${icon.arrowUpRight({ size: 14 })}</a>
      </article>`;

/* —— Work —— */

const study = (chapter, plate, caption) => `<article class="study" id="case-${chapter.id}">
      <dl class="study-meta">
        <div><dt>Client</dt><dd>${esc(chapter.client)}</dd></div>
        <div><dt>Dates</dt><dd>${esc(chapter.dates)}</dd></div>
        ${chapter.via ? `<div><dt>Via</dt><dd>${esc(chapter.via)}</dd></div>` : ""}
        <div><dt>Role</dt><dd>${esc(chapter.role)}</dd></div>
        <div><dt>Environment</dt><dd>${esc(chapter.env)}</dd></div>
      </dl>
      <div class="study-body">
        <h3>${esc(chapter.program)}</h3>
        <ul>${chapter.bullets.slice(0, 4).map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
      </div>
      <figure class="study-fig">
        <div class="plate">${plate}</div>
        <figcaption><span>${fig()}</span> ${esc(caption)}</figcaption>
        <dl class="metrics">${chapter.metrics.map((m) => `<div><dt>${esc(m.value)}</dt><dd>${esc(m.label)}</dd></div>`).join("")}</dl>
      </figure>
    </article>`;

const brief = (chapter) => `<article class="brief">
      <p class="cap"><span>${esc(chapter.dates)}</span>${esc(viaLine(chapter))}</p>
      <h3>${esc(chapter.client)}</h3>
      <p class="brief-role">${esc(chapter.role)}</p>
      <p class="brief-program">${esc(chapter.program)}</p>
      <ul>${chapter.bullets.slice(0, 3).map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
      <p class="brief-env">${esc(chapter.env)}</p>
    </article>`;

// Start year of every engagement on one axis. Years and codes come from the live site.
function yearAxis() {
  const from = 2006;
  const to = 2026;
  const x = (y) => 40 + ((y - from) / (to - from)) * 1120;
  const seen = new Map();
  const marks = career
    .map((c) => {
      const y = Number(c.year);
      const level = seen.get(y) ?? 0;
      seen.set(y, level + 1);
      return `<g class="axis-mark"><line x1="${x(y)}" y1="${64 - level * 30}" x2="${x(y)}" y2="92"/><circle cx="${x(y)}" cy="${64 - level * 30}" r="4"/><text x="${x(y)}" y="${52 - level * 30}" text-anchor="middle">${esc(c.tick)}</text></g>`;
    })
    .join("");
  const ticks = Array.from({ length: to - from + 1 }, (_, i) => {
    const y = from + i;
    const major = y % 5 === 0 || y === from;
    return `<g class="axis-tick"><line x1="${x(y)}" y1="92" x2="${x(y)}" y2="${major ? 102 : 97}"/>${major ? `<text x="${x(y)}" y="118" text-anchor="middle">${y}</text>` : ""}</g>`;
  }).join("");
  return `<svg class="axis" viewBox="0 0 1200 128" role="img" aria-label="Start year of each of the ${career.length} engagements, from 2006 to 2025.">
  <line class="axis-line" x1="40" y1="92" x2="1160" y2="92"/>
  ${ticks}
  ${marks}
</svg>`;
}

const sectionHead = ({ n, label, title, aside }) => `<header class="sec-head">
    <p class="kicker"><span>${n}</span><span>${esc(label)}</span></p>
    <h2>${title}</h2>
    <div class="sec-aside">${aside}</div>
  </header>`;

export function render() {
  figure = 0;
  const [verizon, circana, thermo, cvs] = career;

  const heroVideo = fig();
  const heroCover = fig();

  return `${head({
    title: "Direction B — Signal Path · Srikanth Bellary",
    description: "Mockup. Clean editorial and technical direction for srikanthbellary.com.",
    css: "styles.css",
    fonts: ["geist-latin-wght-normal.woff2", "geist-mono-latin-wght-normal.woff2", "instrument-serif-latin-400-italic.woff2"],
  })}
<body>
<a class="skip" href="#work">Skip to work</a>

<header class="bar" data-bar>
  <a class="bar-id" href="#top">${esc(person.name)}</a>
  <nav class="bar-nav" id="b-nav" aria-label="Primary">
    <a href="#music"><i>01</i>Music &amp; Film</a>
    <a href="#work"><i>02</i>Work</a>
    <a href="#stack"><i>03</i>Stack</a>
    <a href="#experience"><i>04</i>Experience</a>
    <a href="#contact"><i>05</i>Contact</a>
  </nav>
  <a class="btn btn-ink bar-cta" href="mailto:${esc(person.email)}">Write me ${icon.arrowUpRight({ size: 14 })}</a>
  <button class="bar-menu" type="button" aria-expanded="false" aria-controls="b-nav" data-menu>Menu</button>
</header>

<main id="top">

<section class="hero" id="intro" aria-label="Introduction">
  <p class="hero-meta">
    <span>Profile · ${year}</span>
    <span>${esc(person.location)}</span>
    <span>Now: ${esc(positioning.now.role)}, ${esc(positioning.now.client)} via ${esc(positioning.now.via)}</span>
  </p>

  <div class="hero-grid">
    <div class="hero-copy">
      <p class="statement">${positioning.roles[0].replace("Engineer", "engineer")} and ${positioning.roles[1].replace("AI ", "").toLowerCase()}. <em>${esc(positioning.alsoLine)}.</em></p>

      <div class="byline">
        <figure class="byline-portrait">
          ${portrait({ sizes: "(max-width: 900px) 72px, 96px" })}
        </figure>
        <div class="byline-text">
          <h1>${esc(person.name)}</h1>
          <p>${esc(positioning.overview)}</p>
          <p>${esc(positioning.bridge)}</p>
        </div>
      </div>

      <ul class="chips">
        <li>${esc(person.years)} years</li>
        <li>${esc(person.degree)}</li>
        <li>${esc(person.cert)}</li>
      </ul>
    </div>

    <div class="hero-plate" data-area="music">
      <figure class="plate-video">
        ${ytLite({ id: featuredVideo.id, title: `${featuredVideo.title}: ${featuredVideo.kind.toLowerCase()}`, poster: banner, w: 2000, h: 857, eager: true, play: `${icon.play({ size: 18 })}<span>Watch the title-track video</span>` })}
        <figcaption><span>${heroVideo}</span> ${esc(featuredVideo.title)}, ${esc(featuredVideo.kind.toLowerCase())}. Plays from YouTube.</figcaption>
      </figure>

      <figure class="plate-cover">
        <a href="#album-${telugu.id}">${image({ src: telugu.cover, alt: `${telugu.title}: album cover`, w: 2000, h: 2000, eager: true })}</a>
        <figcaption><span>${heroCover}</span> Album ${telugu.chapter}, ${esc(telugu.language)}</figcaption>
      </figure>

      <table class="releases">
        <caption>Releases and film</caption>
        <tbody>
          ${albums
            .map(
              (a) => `<tr>
            <th scope="row"><a href="#album-${a.id}">${esc(a.title)}</a></th>
            <td>${esc(a.language)}, ${a.count} songs</td>
            <td><b class="out">${esc(a.out)}</b></td>
          </tr>`,
            )
            .join("\n          ")}
          <tr class="is-rose">
            <th scope="row"><a href="#coming-2027">${esc(teaser.title)}</a></th>
            <td>${esc(teaser.arc)}</td>
            <td><b class="out">${esc(teaser.status)}</b></td>
          </tr>
          <tr>
            <th scope="row"><a href="#film">Three short films</a></th>
            <td>${esc(films[0].role)}</td>
            <td>${films[0].year}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <nav class="contents" aria-label="On this page">
    <a href="#music"><i>01</i><b>Music &amp; Film</b><span>Two albums, a featured video, Shorts, and three short films.</span></a>
    <a href="#work"><i>02</i><b>Work</b><span>Agents, retrieval, mapping, and data platforms.</span></a>
    <a href="#stack"><i>03</i><b>Stack</b><span>${esc(copy.stackKicker)}, from model gateways to generative media.</span></a>
    <a href="#experience"><i>04</i><b>Experience</b><span>${career.length} engagements, 2006 to now.</span></a>
    <a href="#contact"><i>05</i><b>Contact</b><span>${esc(copy.contactTitle)}</span></a>
  </nav>
</section>

<section class="mf" id="music" data-area="music">
  <div class="mf-inner">
    <header class="mf-head">
      <p class="kicker"><span>01</span><span>Music &amp; Film</span></p>
      <h2>Music <em>&amp;</em> film</h2>
      <div class="mf-aside">
        <p class="mf-name">${esc(artist.name)}, recording artist and filmmaker</p>
        <p class="mf-bio">${esc(artist.bio)}</p>
        <ul class="platforms">${platformLinks()}</ul>
      </div>
    </header>

    <figure class="mf-banner" data-reveal>
      ${image({ src: banner, alt: "A storm over a sea wall at dusk; a man with a guitar stands at the left edge, seen from behind", w: 2000, h: 857 })}
      <figcaption><span>${fig()}</span> The world of both albums: a storm coast at dusk.</figcaption>
    </figure>

    <div class="path" data-reveal>
      <p class="path-line">${esc(artist.story)}</p>
      <ol class="path-steps">
        ${albums
          .map(
            (a) => `<li>
          <a href="#album-${a.id}">
            ${image({ src: a.cover, alt: "", w: 2000, h: 2000 })}
            <span class="cap"><span>${a.chapter}</span>${esc(a.arc)}</span>
            <b>${esc(a.title)}</b>
            <i class="out">${esc(a.out)}</i>
          </a>
          ${arrow}
        </li>`,
          )
          .join("\n        ")}
        <li class="is-rose">
          <a href="#coming-2027">
            ${image({ src: teaser.cover, alt: "", w: 2000, h: 2000 })}
            <span class="cap"><span>${teaser.chapter}</span>${esc(teaser.arc)}</span>
            <b>${esc(teaser.title)}</b>
            <i class="out">${esc(teaser.status)}</i>
          </a>
        </li>
      </ol>
    </div>

    <div class="disco" data-reveal>
    ${albumsNewestFirst.map(sheet).join("\n    ")}
    </div>

    <div class="mf-video" id="video" data-reveal>
      <figure class="mf-video-main">
        ${ytLite({ id: featuredVideo.id, title: `${featuredVideo.title}: ${featuredVideo.kind.toLowerCase()}`, poster: featuredVideo.poster, w: 1999, h: 1121, play: icon.play({ size: 30 }) })}
        <figcaption><span>${fig()}</span> ${esc(featuredVideo.title)}, ${esc(featuredVideo.kind.toLowerCase())}. <a class="link" href="${featuredVideo.url}" rel="noreferrer">Watch on YouTube ${icon.arrowUpRight({ size: 13 })}</a></figcaption>
      </figure>
      <aside class="mf-video-side">
        <p class="kicker"><span>Featured video</span></p>
        <p class="pull">${esc(artist.madeWith)}</p>
        <figure class="pending-video">
          <div class="pending-frame">${slot(pendingVideo.label)}</div>
          <figcaption><span>Next</span> ${esc(pendingVideo.title)}, ${esc(pendingVideo.kind.toLowerCase())}.</figcaption>
        </figure>
      </aside>
    </div>

    <div class="mf-shorts" id="shorts" data-reveal>
      <div class="sub-head">
        <h3>Shorts</h3>
        <p>Six vertical cuts, three from each album. Muted; each plays under the pointer, or on a tap.</p>
      </div>
      <ul class="shorts-row">
      ${shorts.map(shortCard).join("\n      ")}
      </ul>
    </div>

    <article class="coming" id="coming-2027" data-reveal>
      <div class="coming-art">
        ${image({ src: teaser.cover, alt: `${teaser.title}: cover art`, w: 2000, h: 2000 })}
      </div>
      <div class="coming-copy">
        <p class="coming-tag">${esc(teaser.status)}</p>
        <h3>${esc(teaser.title)}</h3>
        <p class="coming-line">${esc(teaser.short)}</p>
        <p class="cap"><span>Album ${teaser.chapter}</span>${esc(teaser.arc)}</p>
      </div>
    </article>

    <div class="mf-films" id="film" data-reveal>
      <div class="sub-head">
        <h3>Short films</h3>
        <p>Three shorts from ${films[0].year}. Press play to watch here, or open them on YouTube.</p>
      </div>
      <div class="films-row">
      ${films.map(filmCard).join("\n      ")}
      </div>
    </div>
  </div>
</section>

<section class="sec" id="work">
  ${sectionHead({
    n: "02",
    label: "Work",
    title: "AI engineering <em>&amp;</em> architecture",
    aside: `<p class="lead">${esc(copy.workTitle)}</p><p>${esc(copy.workLede)}</p>`,
  })}

  <div class="studies">
    ${study(verizon, incidentPlate(verizon), "Incident path. Signals in, five agents, a person on the last step.")}
    ${study(circana, mappingPlate(), "Attribute map. Every proposed map is scored; the low ones wait for review.")}
  </div>

  <div class="briefs" data-reveal>
    ${brief(thermo)}
    ${brief(cvs)}
  </div>

  <div class="block" data-reveal>
    <div class="sub-head">
      <h3>${esc(copy.lanesTitle)}</h3>
      <p>${esc(copy.lanesLede)}</p>
    </div>
    <table class="lanes">
      <thead><tr><th scope="col">Lane</th><th scope="col">What I do</th><th scope="col">On record</th></tr></thead>
      <tbody>
        ${lanes
          .map(
            (lane, i) => `<tr>
          <th scope="row"><i>${pad(i + 1)}</i>${esc(lane.title)}</th>
          <td>${esc(lane.line)}</td>
          <td><b>${esc(lane.metric.value)}</b><span>${esc(lane.metric.label)}</span></td>
        </tr>`,
          )
          .join("\n        ")}
      </tbody>
    </table>
  </div>

  <div class="notes" data-reveal>
    ${buildNotes
      .map(
        (note) => `<article>
      <p class="note-value">${esc(note.value)}</p>
      <p class="cap"><span>${esc(note.title)}</span>${esc(note.label)}</p>
      <p class="note-line">${esc(note.line)}</p>
    </article>`,
      )
      .join("\n    ")}
  </div>

  <div class="block" data-reveal>
    <div class="sub-head">
      <h3>${esc(copy.projectsTitle)}</h3>
      <p>${esc(copy.projectsKicker)}.</p>
    </div>
    <div class="built">
      ${projects
        .map(
          (project) => `<article class="project">
        <p class="cap"><span>${project.num}</span>${esc(project.kicker)}</p>
        <h4>${esc(project.name)}</h4>
        <p class="project-lede">${esc(project.lede)}</p>
        <p class="project-body">${esc(project.body)}</p>
        <ul class="project-links">${project.hrefs
          .map((link) => `<li><a class="link" href="${esc(link.href)}" rel="noreferrer">${esc(link.label)} ${icon.arrowUpRight({ size: 13 })}</a></li>`)
          .join("")}</ul>
        <ul class="tags">${project.tags.map((tag) => `<li>${esc(tag)}</li>`).join("")}</ul>
      </article>`,
        )
        .join("\n      ")}
    </div>
  </div>
</section>

<section class="sec" id="stack">
  ${sectionHead({
    n: "03",
    label: "Stack",
    title: "Skills <em>&amp;</em> stack",
    aside: `<p class="lead">${esc(copy.stackKicker)}.</p><p>The engineering stack, and the generative media practice behind the music and film.</p>`,
  })}

  <dl class="groups" data-reveal>
    ${[stackGroups[0], mediaStack, ...stackGroups.slice(1)]
      .map(
        (group, i) => `<div class="group${group.id === "media" ? " group-media" : ""}">
      <dt><i>${pad(i + 1)}</i>${esc(group.title)}</dt>
      <dd>${group.items.map((item) => `<span>${esc(item)}</span>`).join("")}</dd>
    </div>`,
      )
      .join("\n    ")}
  </dl>

  <ul class="creds" data-reveal>
    ${education.map((e) => `<li><span class="cap"><span>Education</span>${e.year}</span><b>${esc(e.label)}</b></li>`).join("")}
    <li><span class="cap"><span>Certification</span></span><b>${esc(person.cert)}</b></li>
    <li><span class="cap"><span>Experience</span></span><b>${esc(person.years)} years in production systems</b></li>
  </ul>
</section>

<section class="sec" id="experience">
  ${sectionHead({
    n: "04",
    label: "Experience",
    title: "The <em>record</em>",
    aside: `<p class="lead">Client projects, newest first.</p><p>${career.length} engagements, 2006 to now. Staffing firms appear as “via”.</p>`,
  })}

  <figure class="axis-fig" data-reveal>
    <div class="axis-scroll" data-axis>${yearAxis()}</div>
    <figcaption><span>${fig()}</span> The year each engagement began.<i class="axis-hint"> Swipe back to 2006.</i></figcaption>
  </figure>

  <table class="record" data-reveal>
    <thead><tr><th scope="col">Dates</th><th scope="col">Client</th><th scope="col">Role</th><th scope="col">Program</th><th scope="col">Via, city</th></tr></thead>
    <tbody>
      ${career
        .map(
          (c) => `<tr>
        <td class="record-dates">${esc(c.dates)}</td>
        <th scope="row"><i>${esc(c.tick)}</i>${esc(c.client)}</th>
        <td>${esc(c.role)}</td>
        <td class="record-program">${esc(c.program)}</td>
        <td class="record-via">${esc(viaLine(c))}</td>
      </tr>`,
        )
        .join("\n      ")}
    </tbody>
  </table>
</section>

<section class="sec sec-contact" id="contact">
  <header class="sec-head">
    <p class="kicker"><span>05</span><span>Contact</span></p>
    <h2>Write me <em>directly.</em></h2>
    <div class="sec-aside"><p>${esc(copy.contactLede)}</p></div>
  </header>

  <a class="mail" href="mailto:${esc(person.email)}"><span>${esc(person.email)}</span>${icon.arrowUpRight({ size: 40 })}</a>

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
      <p class="kicker"><span>${esc(copy.chatTitle)}</span></p>
      <p class="ask-note">${esc(copy.chatPreface)}</p>
      <div class="ask-field">
        <label class="sr" for="b-ask">Your question</label>
        <input id="b-ask" type="text" placeholder="${esc(copy.chatField)}" autocomplete="off" data-off="${esc(copy.chatOff)}">
        <button type="submit" aria-label="Send">${icon.send({ size: 18 })}</button>
      </div>
      <p class="ask-privacy">${esc(copy.chatPrivacy)} <a href="#contact">Privacy</a></p>
    </form>
  </div>

  <footer class="foot">
    <span>© ${year} ${esc(person.name)}</span>
    <a href="#contact">Privacy</a>
    <span>srikanthbellary.com</span>
    <a href="#top">Back to top ${icon.arrowUpRight({ size: 13 })}</a>
  </footer>
</section>

</main>

<script src="script.js" defer></script>
</body>
</html>
`;
}
