// Direction C — "Multitrack". Bold, experimental, motion-forward.
// One person, several tracks: the hero is a session where every song is a moving slice.

import {
  person,
  lanes,
  stack,
  projects,
  career,
  positioning,
  artist,
  albums,
  albumsNewestFirst,
  teaser,
  featuredVideo,
  pendingVideo,
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
import { esc, pad, portrait, icon, viaLine, head, rainTile, slot, image, ytLite } from "./lib.mjs";
import { incidentPlate, mappingPlate } from "./plates.mjs";

const [telugu] = albums;
const sentence = (text) => text.charAt(0).toUpperCase() + text.slice(1);
const star = icon.spark({ size: 18, cls: "star" });

// Every letter of the name rides the width axis on its own delay.
const letters = (word, offset) =>
  [...word].map((ch, i) => `<i style="--i:${offset + i}">${ch}</i>`).join("");

const marquee = (items, { cls = "", repeat = 2 } = {}) => {
  const run = items.map((item) => `<span>${item}</span>${star}`).join("");
  return `<div class="marquee${cls ? ` ${cls}` : ""}" aria-hidden="true"><div class="marquee-track">${Array.from({ length: repeat }, () => `<div class="marquee-run">${run}</div>`).join("")}</div></div>`;
};

/* —— Hero session —— */

const slice = (t, i, album, on = false) => `<li class="slice slice-${album.id}${on ? " is-on" : ""}" data-slice data-now="${pad(i + 1)} · ${esc(t.title)}" data-href="#album-${album.id}" tabindex="0">
          <video ${on ? `src="${t.loop}" autoplay` : `data-src="${t.loop}"`} poster="${t.still}" muted loop playsinline preload="none" aria-hidden="true"></video>
          <span class="slice-n">${pad(i + 1)}</span>
          <span class="slice-info"><b>${esc(t.title)}</b><i>Album ${album.chapter} · ${esc(album.language)} · ${esc(album.out)}</i></span>
        </li>`;

// The posters carry their own titles, so each tile only adds a small chip.
const reel = ({ id, title, poster, meta }) => `<button class="reel" type="button" data-theater="${id}" data-title="${esc(title)}" aria-label="Play ${esc(title)}">
        ${image({ src: poster, alt: "", w: 1280, h: 720, eager: true })}
        <span class="reel-chip">${icon.play({ size: 11 })}${esc(meta)}</span>
      </button>`;

/* —— Music & Film —— */

const platformLinks = () =>
  artist.platforms
    .map((p) =>
      p.href
        ? `<li><a class="pill" href="${esc(p.href)}" rel="noreferrer">${esc(p.label)} ${icon.arrowUpRight({ size: 14 })}</a></li>`
        : `<li><span class="pill pill-pending">${esc(p.label)} <i>${esc(p.pending)}</i></span></li>`,
    )
    .join("");

const deck = (album) => `<article class="deck" id="album-${album.id}" data-reveal>
    <div class="deck-side">
      <div class="deck-cover">
        ${image({ src: album.cover, alt: `${album.title}: album cover`, w: 2000, h: 2000 })}
        <p class="stamp">${esc(album.out)}</p>
      </div>
      <figure class="monitor" data-monitor>
        <video data-src="${album.tracks[0].loop}" poster="${album.tracks[0].still}" muted loop playsinline preload="none" aria-label="${esc(album.title)}: silent loop for the selected song"></video>
        <figcaption><i class="monitor-led"></i><span>Loop</span><b data-monitor-label>01 · ${esc(album.tracks[0].title)}</b></figcaption>
      </figure>
    </div>
    <div class="deck-body">
      <p class="tag"><span>Album ${album.chapter}</span><span>${esc(album.language)}</span><span>${esc(album.date)}</span></p>
      <h3>${esc(album.title)}</h3>
      <p class="deck-meaning">“${esc(sentence(album.meaning))}.”</p>
      <p class="deck-line">${esc(album.short)}${album.detail ? ` ${esc(album.detail)}` : ""}</p>
      <p class="deck-listen"><b>${esc(album.out)}</b> on ${artist.releaseDayStores.slice(0, -1).map(esc).join(", ")} and ${esc(artist.releaseDayStores.at(-1))}. <span class="pending">${esc(artist.preSave)}</span></p>

      <details class="rows" open>
        <summary><span>Tracklist</span><span>${esc(album.countWord)}</span></summary>
        <ol>
          ${album.tracks
            .map(
              (t, i) => `<li class="row${i === 0 ? " is-on" : ""}" tabindex="0" data-peek="${t.loop}" data-still="${t.still}" data-label="${pad(i + 1)} · ${esc(t.title)}">
            <span class="row-n">${pad(i + 1)}</span>
            <span class="row-title">${esc(t.title)}</span>
            ${t.credit ? `<span class="row-credit">${esc(t.credit)}</span>` : ""}
            ${image({ src: t.wide, alt: "", w: 2000, h: t.wide === t.art ? 2000 : 1125, cls: "row-art" })}
          </li>`,
            )
            .join("\n          ")}
        </ol>
      </details>
    </div>
  </article>`;

const shortCard = (s) => `<li class="short" data-short>
      <div class="short-frame">
        <video data-src="${s.src}" poster="${s.still}" muted loop playsinline preload="none" aria-label="${esc(s.title)}: vertical Short"></video>
      </div>
      <p class="tag"><span>Short ${s.n}</span><span>${esc(s.album)}</span></p>
      <h4>${esc(s.title)}</h4>
    </li>`;

const filmCard = (f, i) => `<article class="film">
      ${ytLite({ id: f.id, title: f.title, poster: f.poster, play: icon.play({ size: 22 }) })}
      <div class="film-meta">
        <p class="film-len">${f.length}</p>
        <div>
          <p class="tag"><span>Film ${pad(i + 1)}</span><span>${f.year}</span><span>${esc(f.role)}</span></p>
          <h4>${esc(f.title)}</h4>
        </div>
      </div>
      <p class="film-logline">${esc(f.logline)}</p>
      <a class="arrow-link" href="${yt.watch(f.id)}" rel="noreferrer">Watch on YouTube ${icon.arrowUpRight({ size: 14 })}</a>
    </article>`;

/* —— Work —— */

const job = (chapter, i, plate) => `<article class="job" id="case-${chapter.id}">
    <div class="job-head">
      <p class="tag"><span>Case ${pad(i + 1)}</span><span>${esc(chapter.dates)}</span>${chapter.via ? `<span>via ${esc(chapter.via)}</span>` : ""}</p>
      <h3>${esc(chapter.client)}</h3>
      <p class="job-role">${esc(chapter.role)}</p>
    </div>
    <div class="job-body">
      <p class="job-program">${esc(chapter.program)}</p>
      <ul>${chapter.bullets.slice(0, 4).map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
      <p class="job-env">${esc(chapter.env)}</p>
    </div>
    <figure class="job-plate">${plate}</figure>
    <dl class="job-metrics">${chapter.metrics.map((m) => `<div><dt>${esc(m.value)}</dt><dd>${esc(m.label)}</dd></div>`).join("")}</dl>
  </article>`;

const jobMini = (chapter) => `<article class="mini">
    <p class="tag"><span>${esc(chapter.dates)}</span>${viaLine(chapter) ? `<span>${esc(viaLine(chapter))}</span>` : ""}</p>
    <h3>${esc(chapter.client)}</h3>
    <p class="job-role">${esc(chapter.role)}</p>
    <p class="mini-program">${esc(chapter.program)}</p>
    <ul>${chapter.bullets.slice(0, 3).map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
    <p class="job-env">${esc(chapter.env)}</p>
  </article>`;

export function render() {
  const [verizon, circana, thermo, cvs] = career;

  return `${head({
    title: "Direction C — Multitrack · Srikanth Bellary",
    description: "Mockup. Bold, motion-forward direction for srikanthbellary.com.",
    css: "styles.css",
    fonts: ["anybody-latin-wdth-normal.woff2", "martian-mono-latin-wdth-normal.woff2"],
    extra: `<style>:root{--rain-near:${rainTile(31, { size: 420, count: 22, min: 26, max: 60 })};--rain-far:${rainTile(47, { size: 300, count: 34, min: 10, max: 24 })}}</style>`,
  })}
<body>
<a class="skip" href="#work">Skip to work</a>
<div class="progress" aria-hidden="true"><span></span></div>

<header class="bar" data-bar>
  <a class="bar-id" href="#top" aria-label="Srikanth Bellary, home"><b>SB</b><span>${esc(person.name)}</span></a>
  <nav class="bar-nav" id="c-nav" aria-label="Primary">
    <a href="#music">Music &amp; Film</a>
    <a href="#work">Work</a>
    <a href="#stack">Stack</a>
    <a href="#experience">Experience</a>
    <a href="#contact">Contact</a>
  </nav>
  <a class="bar-cta" href="mailto:${esc(person.email)}">Write me ${icon.arrowUpRight({ size: 15 })}</a>
  <button class="bar-menu" type="button" aria-expanded="false" aria-controls="c-nav" data-menu>Menu</button>
</header>

<main id="top">

<section class="hero" id="intro" aria-label="Introduction">
  <div class="hero-rain" aria-hidden="true"></div>

  <div class="hero-top">
    <h1 class="name" aria-label="${esc(person.name)}">
      <span class="name-line" aria-hidden="true">${letters("Srikanth", 0)}</span>
      <span class="name-line" aria-hidden="true">${letters("Bellary", 8)}</span>
    </h1>

    <div class="who">
      <div class="who-id">
        <figure class="who-portrait">
          ${portrait({ sizes: "(max-width: 900px) 76px, 104px" })}
        </figure>
        <p class="who-roles">${positioning.roles.map((r) => `<span>${esc(r)}</span>`).join("")}</p>
        <p class="who-also">${esc(positioning.alsoLine)}</p>
      </div>
      <div class="who-text">
        <p>${esc(positioning.overview)}</p>
        <p>${esc(positioning.bridge)}</p>
      </div>
      <ul class="chips">
        <li>${esc(person.years)} years</li>
        <li>${esc(person.degree)}</li>
        <li>${esc(person.cert)}</li>
        <li>${esc(person.location)}</li>
      </ul>
    </div>
  </div>

  <div class="session" data-area="music" data-session>
    <div class="transport">
      <button class="transport-btn" type="button" data-session-toggle aria-pressed="true" aria-label="Pause the session">
        <span class="ico-pause">${icon.pause({ size: 16 })}</span><span class="ico-play">${icon.play({ size: 16 })}</span>
      </button>
      <p class="transport-cell transport-name"><span>Session</span><b>${esc(sentence(telugu.meaning))}</b></p>
      <p class="transport-cell transport-now"><span>Now</span><b data-now>01 · ${esc(telugu.tracks[0].title)}</b></p>
      <p class="transport-cell transport-out"><span>${esc(telugu.out)}</span><b data-countdown="${telugu.iso}">${esc(telugu.date)}</b></p>
      <a class="transport-cta" href="#music">All music &amp; film ${icon.arrowDown({ size: 14 })}</a>
    </div>

    <div class="lane lane-songs">
      <p class="lane-tag"><b>A</b>Songs</p>
      <ul class="legend">
        ${albums.map((a) => `<li class="legend-${a.id}"><i></i><b>${esc(a.title)}</b><span>${pad(a.count)} songs · ${esc(a.out)}</span></li>`).join("")}
        <li class="legend-rose"><i></i><b>${esc(teaser.title)}</b><span>${esc(teaser.status)}</span></li>
      </ul>
      <ol class="slices" data-slices>
        ${telugu.tracks.map((t, i) => slice(t, i, telugu, i === 0)).join("\n        ")}
        ${albums[1].tracks.map((t, i) => slice(t, i, albums[1])).join("\n        ")}
        <li class="slice slice-rose" data-slice data-now="${esc(teaser.title)} · ${esc(teaser.status)}" data-href="#coming-2027" tabindex="0">
          ${image({ src: teaser.cover, alt: "", w: 2000, h: 2000, eager: true })}
          <span class="slice-n">2027</span>
          <span class="slice-info"><b>${esc(teaser.title)}</b><i>Album ${teaser.chapter} · ${esc(teaser.status)}</i></span>
        </li>
      </ol>
    </div>

    <div class="lane lane-film">
      <p class="lane-tag"><b>V</b>Film</p>
      <div class="reels">
      ${reel({ id: featuredVideo.id, title: featuredVideo.title, poster: featuredVideo.poster, meta: featuredVideo.kind })}
      ${films.map((f) => reel({ id: f.id, title: f.title, poster: f.poster, meta: `Short film · ${f.length}` })).join("\n      ")}
      </div>
    </div>
  </div>
</section>

<section class="blk blk-storm" id="music" data-area="music">
  ${marquee(["Music &amp; film", "Music &amp; film", "Music &amp; film"], { cls: "marquee-xl" })}

  <header class="blk-head">
    <p class="blk-n"><span>01</span><span>Music &amp; Film</span></p>
    <h2 class="sr">Music &amp; film</h2>
    <p class="bio">${esc(artist.bio)}</p>
    <div class="blk-aside">
      <p>${esc(artist.madeWith)}</p>
      <ul class="platforms">${platformLinks()}</ul>
    </div>
  </header>

  <div class="chapters" data-reveal>
    <p class="chapters-line">${esc(artist.story)}</p>
    <ol>
      ${albums
        .map(
          (a) => `<li>
        <a href="#album-${a.id}">
          <span class="chapter-n">${a.chapter}</span>
          <span class="chapter-text"><i>${esc(a.arc)}</i><b>${esc(a.title)}</b><em>${esc(a.out)}</em></span>
          ${image({ src: a.cover, alt: "", w: 2000, h: 2000 })}
        </a>
      </li>`,
        )
        .join("\n      ")}
      <li class="chapter-rose">
        <a href="#coming-2027">
          <span class="chapter-n">${teaser.chapter}</span>
          <span class="chapter-text"><i>${esc(teaser.arc)}</i><b>${esc(teaser.title)}</b><em>${esc(teaser.status)}</em></span>
          ${image({ src: teaser.cover, alt: "", w: 2000, h: 2000 })}
        </a>
      </li>
    </ol>
  </div>

  <div class="decks">
  ${albumsNewestFirst.map(deck).join("\n  ")}
  </div>

  <div class="bigvideo" id="video" data-reveal>
    ${ytLite({ id: featuredVideo.id, title: `${featuredVideo.title}: ${featuredVideo.kind.toLowerCase()}`, poster: featuredVideo.poster, w: 1999, h: 1121, play: `${icon.play({ size: 30 })}<span>Play</span>` })}
    <div class="bigvideo-cap">
      <p class="tag"><span>Featured video</span><span>${esc(featuredVideo.kind)}</span></p>
      <h3>${esc(featuredVideo.title)}</h3>
      <a class="arrow-link" href="${featuredVideo.url}" rel="noreferrer">Watch on YouTube ${icon.arrowUpRight({ size: 14 })}</a>
    </div>
    <div class="bigvideo-next">
      <div class="pending-video">${slot(pendingVideo.label)}</div>
      <p class="tag"><span>Next video</span><span>${esc(pendingVideo.title)}</span></p>
    </div>
  </div>

  <div class="shorts" id="shorts" data-reveal>
    <div class="sub">
      <h3>Shorts</h3>
      <p>Six vertical cuts, three from each album. Muted; point at one, or tap it, and it plays.</p>
    </div>
    <ul class="shorts-row">
    ${shorts.map(shortCard).join("\n    ")}
    </ul>
  </div>
</section>

<section class="blk blk-rose" id="coming-2027" data-area="music">
  <div class="coming">
    <div class="coming-art" data-reveal>
      ${image({ src: teaser.wide, alt: `${teaser.title}: cover art`, w: 2000, h: 1125 })}
    </div>
    <div class="coming-copy">
      <p class="coming-tag">${esc(teaser.status)}</p>
      <h2>${esc(teaser.title)}</h2>
      <p class="coming-line">${esc(teaser.short)}</p>
      <p class="tag"><span>Album ${teaser.chapter}</span><span>${esc(teaser.arc)}</span></p>
    </div>
  </div>
  ${marquee([esc(teaser.status), esc(teaser.title), esc(teaser.status), esc(teaser.title)], { cls: "marquee-rose" })}
</section>

<section class="blk blk-storm blk-film" id="film" data-area="music">
  <header class="blk-head">
    <p class="blk-n"><span>Film</span><span>${films[0].year}</span></p>
    <h2>Short films</h2>
    <div class="blk-aside"><p>Three shorts from ${films[0].year}. Press play to watch here, or open them on YouTube.</p></div>
  </header>
  <div class="films-row" data-reveal>
  ${films.map(filmCard).join("\n  ")}
  </div>
</section>

<section class="blk blk-fog" id="work">
  <header class="blk-head">
    <p class="blk-n"><span>02</span><span>Work</span></p>
    <h2>AI engineering <em>&amp;</em> architecture</h2>
    <div class="blk-aside"><p class="lead">${esc(copy.workTitle)}</p><p>${esc(copy.workLede)}</p></div>
  </header>

  ${job(verizon, 0, incidentPlate(verizon))}
  ${job(circana, 1, mappingPlate())}

  <div class="minis" data-reveal>
    ${jobMini(thermo)}
    ${jobMini(cvs)}
  </div>

  <div class="lanes-block" data-reveal>
    <div class="sub">
      <h3>${esc(copy.lanesTitle)}</h3>
      <p>${esc(copy.lanesLede)}</p>
    </div>
    <ol class="lanes">
      ${lanes
        .map(
          (lane, i) => `<li>
        <span class="lane-n">${pad(i + 1)}</span>
        <h4>${esc(lane.title)}</h4>
        <p>${esc(lane.line)}</p>
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
      <p class="tag"><span>${esc(note.title)}</span><span>${esc(note.label)}</span></p>
      <p class="note-line">${esc(note.line)}</p>
    </article>`,
      )
      .join("\n    ")}
  </div>

  <div class="built-block" data-reveal>
    <div class="sub">
      <h3>${esc(copy.projectsTitle)}</h3>
      <p>${esc(copy.projectsKicker)}.</p>
    </div>
    <div class="built">
      ${projects
        .map(
          (project) => `<article class="project">
        <p class="tag"><span>${project.num}</span><span>${esc(project.kicker)}</span></p>
        <h4>${esc(project.name)}</h4>
        <p class="project-lede">${esc(project.lede)}</p>
        <p class="project-body">${esc(project.body)}</p>
        <ul class="project-links">${project.hrefs
          .map((link) => `<li><a class="arrow-link" href="${esc(link.href)}" rel="noreferrer">${esc(link.label)} ${icon.arrowUpRight({ size: 14 })}</a></li>`)
          .join("")}</ul>
        <ul class="tags">${project.tags.map((tag) => `<li>${esc(tag)}</li>`).join("")}</ul>
      </article>`,
        )
        .join("\n      ")}
    </div>
  </div>
</section>

<section class="blk blk-storm" id="stack">
  <header class="blk-head">
    <p class="blk-n"><span>03</span><span>Stack</span></p>
    <h2>Skills <em>&amp;</em> stack</h2>
    <div class="blk-aside"><p class="lead">${esc(copy.stackKicker)}.</p><p>The engineering stack, and the generative media practice behind the music and film.</p></div>
  </header>

  <dl class="groups" data-reveal>
    ${[stackGroups[0], mediaStack, ...stackGroups.slice(1)]
      .map(
        (group, i) => `<div class="group${group.id === "media" ? " group-media" : ""}">
      <dt><span>${pad(i + 1)}</span>${esc(group.title)}</dt>
      <dd>${group.items.map((item) => `<span>${esc(item)}</span>`).join("")}</dd>
    </div>`,
      )
      .join("\n    ")}
  </dl>

  <ul class="creds" data-reveal>
    ${education.map((e) => `<li><span class="tag"><span>Education</span><span>${e.year}</span></span><b>${esc(e.label)}</b></li>`).join("")}
    <li><span class="tag"><span>Certification</span></span><b>${esc(person.cert)}</b></li>
    <li><span class="tag"><span>Experience</span></span><b>${esc(person.years).replace("+", '<span class="plus">+</span>')} years in production systems</b></li>
  </ul>

  ${marquee(stack.map(esc), { cls: "marquee-stack" })}
</section>

<section class="blk blk-fog" id="experience">
  <header class="blk-head">
    <p class="blk-n"><span>04</span><span>Experience</span></p>
    <h2>The record</h2>
    <div class="blk-aside"><p class="lead">Client projects, newest first.</p><p>${career.length} engagements, 2006 to now. Staffing firms appear as “via”.</p></div>
  </header>

  <ol class="gigs" data-reveal>
    ${career
      .map(
        (c) => `<li class="gig">
      <span class="gig-year">${esc(c.year)}</span>
      <h3>${esc(c.client)}</h3>
      <p class="gig-role">${esc(c.role)}</p>
      <p class="gig-program">${esc(c.program)}</p>
      <span class="gig-dates">${esc(c.dates)}${viaLine(c) ? `<i>${esc(viaLine(c))}</i>` : ""}</span>
    </li>`,
      )
      .join("\n    ")}
  </ol>
</section>

<section class="blk blk-ember" id="contact">
  <header class="blk-head">
    <p class="blk-n"><span>05</span><span>Contact</span></p>
    <h2>Write me directly.</h2>
    <div class="blk-aside"><p>${esc(copy.contactLede)}</p></div>
  </header>

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
      <p class="tag"><span>${esc(copy.chatTitle)}</span></p>
      <p class="ask-note">${esc(copy.chatPreface)}</p>
      <div class="ask-field">
        <label class="sr" for="c-ask">Your question</label>
        <input id="c-ask" type="text" placeholder="${esc(copy.chatField)}" autocomplete="off" data-off="${esc(copy.chatOff)}">
        <button type="submit" aria-label="Send">${icon.send({ size: 20 })}</button>
      </div>
      <p class="ask-privacy">${esc(copy.chatPrivacy)} <a href="#contact">Privacy</a></p>
    </form>
  </div>

  <footer class="foot">
    <span>© ${year} ${esc(person.name)}</span>
    <a href="#contact">Privacy</a>
    <span>srikanthbellary.com</span>
    <a href="#top">Back to top ${icon.arrowUpRight({ size: 14 })}</a>
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
