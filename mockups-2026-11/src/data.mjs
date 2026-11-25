// Content for the three mockups.
//
// Professional facts are imported straight from the live site's content file,
// so the mockups cannot drift from what is already published.
//
// Music and film content comes from Srikanth's brief of Nov 24, 2026
// ("Website Brief: Music & Film for srikanthbellary.com"). Titles are kept in
// the exact romanized spellings of that brief.
//
// Images and loops are the web-sized assets he sent the same day. They sit in
// assets/media/ under the paths of that delivery's manifest; the per-track
// mapping below follows the manifest, not the filename numbers.

import { person, lanes, stack, projects, career } from "../../lib/content.ts";

export { person, lanes, stack, projects, career };

/* —— Positioning —— */

export const positioning = {
  roles: ["Applied AI Engineer", "AI Solutions Architect"],
  also: ["Recording artist", "Filmmaker"],
  alsoLine: "Also a recording artist and filmmaker",
  // The existing bio line, then the two lines that link the engineer and the artist.
  overview: "I have spent 15+ years in production systems: agents, retrieval, and data platforms.",
  bridge:
    "Engineer by day, storyteller always. I write cinematic songs in Telugu and Hindi and turn them into AI-generated music videos.",
  home: "I live in Wellington, Florida.",
  now: { role: career[0].role, client: career[0].client, via: career[0].via, dates: career[0].dates },
};

/* —— Music (brief) —— */

export const artist = {
  name: "Srikanth Bellary",
  bio: "Engineer by day, storyteller always: Srikanth Bellary writes cinematic songs in Telugu and Hindi and turns them into music videos.",
  story:
    "The albums are one connected story. A love that ended without an ending, told in Telugu, answered by her side of the story in Hindi, then a whole album in her voice.",
  madeWith:
    "Songs written by Srikanth and produced with AI music tools. The music videos are AI-generated, with Srikanth himself as the on-screen subject.",
  platforms: [
    { id: "spotify", label: "Spotify", href: "https://open.spotify.com/artist/12F3zpzFJ7BmmNTMiIDfwQ" },
    { id: "apple", label: "Apple Music", href: "https://music.apple.com/us/artist/srikanth-bellary/6836423172" },
    { id: "youtube", label: "YouTube", href: null, pending: "[YouTube channel URL]" },
  ],
  // Album links arrive on release day; until then the cards say "Out Dec 11" / "Out Dec 18".
  releaseDayStores: ["Spotify", "Apple Music", "YouTube Music", "JioSaavn", "Amazon Music"],
  preSave: "[Pre-save link]",
};

const M = "../assets/media";
const S = "../assets/stills";

// One entry per track: square art, 16:9 art, and the silent vertical loop with a still from it.
const track = (title, art, loop, extra = {}) => ({
  title,
  art: `${M}/${art}_3000.jpg`,
  wide: `${M}/${art}_16x9.jpg`,
  loop: `${M}/${loop}.mp4`,
  still: `${S}/${loop}.jpg`,
  ...extra,
});

const TE = "telugu/song_covers";
const HI = "hindi/song_art";
const teluguCover = `${M}/telugu/album_cover/ALBUM_COVER_Inkaa_Kadha_Migilundhi_3000_v3_side.jpg`;

export const albums = [
  {
    id: "ikm",
    chapter: "01",
    title: "Inkaa Kadha Migilundhi",
    language: "Telugu",
    count: 10,
    countWord: "Ten songs",
    date: "Fri Dec 11, 2026",
    iso: "2026-12-11",
    out: "Out Dec 11",
    meaning: "the story isn’t over yet",
    line: "Inkaa Kadha Migilundhi: a love that ended without an ending. Ten songs, one story.",
    short: "A love that ended without an ending. Ten songs, one story.",
    detail: "A cinematic rock album. It closes with her reply in Hindi.",
    arc: "Told in Telugu",
    cover: teluguCover,
    video: { id: "TzhspZLw6_k", label: "Title-track music video" },
    tracks: [
      // The title track has no song cover of its own: the square album cover stands in.
      {
        title: "Inkaa Kadha Migilundhi",
        art: teluguCover,
        wide: teluguCover,
        loop: `${M}/telugu/canvas/01_Inkaa_Kadha_Migilundhi.mp4`,
        still: `${S}/telugu/canvas/01_Inkaa_Kadha_Migilundhi.jpg`,
      },
      track("Nuvvu Cheppina Maatale", `${TE}/05_Nuvvu_Cheppina_Maatale_ORIGINAL_COVER`, "telugu/canvas/02_Nuvvu_Cheppina_Maatale"),
      track("Mounamga Unna", `${TE}/07_Mounanga_Unnaa_ORIGINAL_COVER`, "telugu/canvas/03_Mounamga_Unna"),
      track("Inkaa Kadha Migilundhi (Electric)", `${TE}/02_Inkaa_Kadha_Migilundhi_ELECTRIC_COVER`, "telugu/canvas/04_Electric"),
      track("Ennaallaina Marchipolenu", `${TE}/04_Ennaallaina_Marchipolenu_ALT_COVER`, "telugu/canvas/05_Ennaallaina_Marchipolenu"),
      track("Inkaa Kadha Migilundhi (Beats)", `${TE}/01_Inkaa_Kadha_Migilundhi_BEATS_COVER`, "telugu/canvas/06_Beats"),
      track("Nuvvu Cheppina Maatale (Mashup)", `${TE}/06_Nuvvu_Cheppina_Maatale_MASHUP_COVER`, "telugu/canvas/07_Mashup"),
      track("Inkaa Kadha Migilundhi (Extended)", `${TE}/03_Inkaa_Kadha_Migilundhi_EXTENDED_COVER`, "telugu/canvas/08_Extended"),
      track(
        "Tum Samjhe Main Bhool Gayi (Her Response)",
        `${TE}/10_Tum_Samjhe_Main_Bhool_Gayi_HER_RESPONSE_COVER`,
        "telugu/canvas/09_Tum_Samjhe_Main_Bhool_Gayi_Her_Response",
      ),
      track("Inkaa Kadha Migilundhi (Her Version)", `${TE}/08_Inkaa_Kadha_Migilundhi_HER_VERSION_COVER`, "telugu/canvas/10_Her_Version"),
    ],
  },
  {
    id: "akbh",
    chapter: "02",
    title: "Abhi Kahani Baaki Hai",
    language: "Hindi",
    count: 8,
    countWord: "Eight songs",
    date: "Fri Dec 18, 2026",
    iso: "2026-12-18",
    out: "Out Dec 18",
    meaning: "the story still remains",
    line: "Abhi Kahani Baaki Hai: the story continues, in Hindi, with her side finally heard.",
    short: "The story continues, in Hindi, with her side finally heard.",
    detail: "",
    arc: "Answered in Hindi",
    cover: `${M}/hindi/album_cover/EP_COVER_Abhi_Kahani_Baaki_Hai_3000.jpg`,
    video: { id: null, label: "Music video" },
    tracks: [
      track("Abhi Kahani Baaki Hai", `${HI}/01_Abhi_Kahani_Baaki_Hai_COVER`, "hindi/canvas/01_Abhi_Kahani_Baaki_Hai"),
      track("Sach Saamne Aa Jaayega", `${HI}/02_Sach_Saamne_Aa_Jaayega_COVER`, "hindi/canvas/02_Sach_Saamne_Aa_Jaayega"),
      track("Bhool Nahi Paaya", `${HI}/03_Bhool_Nahi_Paaya_COVER`, "hindi/canvas/03_Bhool_Nahi_Paaya"),
      // Credited as lyricist only, never as an artist.
      track("Teri Baatein", `${HI}/04_Teri_Baatein_COVER`, "hindi/canvas/04_Teri_Baatein", { credit: "Lyrics: Nikhil Yadav" }),
      track(
        "Tum Samjhe Main Bhool Gayi (Her Response)",
        `${HI}/05_Tum_Samjhe_Main_Bhool_Gayi_HER_RESPONSE_COVER`,
        "hindi/canvas/05_Tum_Samjhe_Main_Bhool_Gayi_Her_Response",
      ),
      track(
        "Abhi Kahani Baaki Hai (Her Version)",
        `${HI}/06_Abhi_Kahani_Baaki_Hai_HER_VERSION_COVER`,
        "hindi/canvas/06_Abhi_Kahani_Baaki_Hai_Her_Version",
      ),
      track(
        "Abhi Kahani Baaki Hai (Acoustic)",
        `${HI}/07_Abhi_Kahani_Baaki_Hai_ACOUSTIC_COVER`,
        "hindi/canvas/07_Abhi_Kahani_Baaki_Hai_Acoustic",
      ),
      track(
        "Tum Samjhe Main Bhool Gayi (Acoustic)",
        `${HI}/08_Tum_Samjhe_Main_Bhool_Gayi_ACOUSTIC_COVER`,
        "hindi/canvas/08_Tum_Samjhe_Main_Bhool_Gayi_Acoustic",
      ),
    ],
  },
];

// Newest first, as the brief asks for the album cards.
export const albumsNewestFirst = [...albums].sort((a, b) => b.iso.localeCompare(a.iso));

// Shown as "Coming 2027" only: no tracklist, audio, or song titles.
export const teaser = {
  id: "hms",
  chapter: "03",
  title: "Her Mood Swings",
  status: "Coming 2027",
  line: "Her Mood Swings: twelve moods, one woman’s world. Coming 2027.",
  short: "Twelve moods, one woman’s world.",
  arc: "In her voice",
  cover: `${M}/her-mood-swings/HER_MOOD_SWINGS_COVER_3000.jpg`,
  wide: `${M}/her-mood-swings/HER_MOOD_SWINGS_COVER_16x9.jpg`,
};

// Embedded from YouTube, never self-hosted. The 16:9 album poster is its still.
export const featuredVideo = {
  id: "TzhspZLw6_k",
  title: "Inkaa Kadha Migilundhi",
  kind: "Title-track music video",
  url: "https://youtu.be/TzhspZLw6_k",
  poster: `${M}/telugu/poster/POSTER_Inkaa_Kadha_Migilundhi.jpg`,
};

// Link to come: the slot stays a labeled placeholder.
export const pendingVideo = {
  title: "Abhi Kahani Baaki Hai",
  kind: "Music video",
  label: "[Hindi music video — YouTube link to come]",
};

export const banner = `${M}/telugu/banner/SPOTIFY_HEADER_A_rampart_headroom_3840x1646.jpg`;

// Vertical Shorts: muted, first 15 seconds. Stills are cut at the title card, before any caption.
const short = (album, file, title) => ({
  album,
  title,
  src: `${M}/${file}.mp4`,
  still: `${S}/${file}.jpg`,
});

export const shortsAll = [
  short("Telugu", "telugu/shorts/03_INKAA_CHORUS_v2", "Inkaa Kadha Migilundhi"),
  short("Telugu", "telugu/shorts/05_ELECTRIC_v2", "Inkaa Kadha Migilundhi (Electric)"),
  short("Telugu", "telugu/shorts/04_BEATS_v2", "Inkaa Kadha Migilundhi (Beats)"),
  short("Telugu", "telugu/shorts/01_TUM_SAMJHE_MAIN_BHOOL_GAYI_v2", "Tum Samjhe Main Bhool Gayi (Her Response)"),
  short("Telugu", "telugu/shorts/06_ALBUM_ANNOUNCE_v2", "Inkaa Kadha Migilundhi: the album"),
  short("Hindi", "hindi/shorts/H2_ABHI_KAHANI_BAAKI_HAI", "Abhi Kahani Baaki Hai"),
  short("Hindi", "hindi/shorts/H3_SACH_SAAMNE_AA_JAAYEGA", "Sach Saamne Aa Jaayega"),
  short("Hindi", "hindi/shorts/H4_BHOOL_NAHI_PAAYA", "Bhool Nahi Paaya"),
  short("Hindi", "hindi/shorts/H5_TERI_BAATEIN", "Teri Baatein"),
  short("Hindi", "hindi/shorts/H1_TUM_SAMJHE_MAIN_BHOOL_GAYI", "Tum Samjhe Main Bhool Gayi (Her Response)"),
  short("Hindi", "hindi/shorts/H7_ABHI_KAHANI_BAAKI_HAI_ACOUSTIC", "Abhi Kahani Baaki Hai (Acoustic)"),
  short("Hindi", "hindi/shorts/H8_TUM_SAMJHE_MAIN_BHOOL_GAYI_ACOUSTIC", "Tum Samjhe Main Bhool Gayi (Acoustic)"),
  short("Hindi", "hindi/shorts/H6_ALBUM_ANNOUNCE", "Abhi Kahani Baaki Hai: the album"),
];

// The strip shows six: three per album, landscapes and wide shots first.
const pick = (file) => shortsAll.find((item) => item.src.includes(file));
export const shorts = [
  pick("03_INKAA_CHORUS_v2"),
  pick("05_ELECTRIC_v2"),
  pick("telugu/shorts/01_TUM"),
  pick("H2_ABHI"),
  pick("H3_SACH"),
  pick("H4_BHOOL"),
].map((item, i) => ({ ...item, n: String(i + 1).padStart(2, "0") }));

// Open point: the delivered Shorts carry burned-in lyric captions from their first second, and the brief allows
// no lyrics on the site. Until Srikanth decides, the strip plays the silent loops of the same six songs.
// To put the Shorts back, set `shortsUseLoops` to false.
export const shortsUseLoops = true;
export const shortsStrip = shortsUseLoops
  ? [
      [0, 0],
      [0, 3],
      [0, 8],
      [1, 0],
      [1, 1],
      [1, 2],
    ].map(([album, track], i) => ({
      album: albums[album].language,
      title: albums[album].tracks[track].title,
      src: albums[album].tracks[track].loop,
      still: albums[album].tracks[track].still,
      n: String(i + 1).padStart(2, "0"),
      kind: "silent loop",
    }))
  : shorts.map((item) => ({ ...item, kind: "vertical Short" }));

/* —— Film (brief) —— */

export const films = [
  {
    id: "0DP5xM08-BY",
    poster: `${M}/film/Apocalyptic_Roulette_YT_Poster.jpg`,
    title: "Apocalyptic Roulette",
    year: "2024",
    length: "4:07",
    role: "Producer",
    logline:
      "What if every catastrophe struck at once, one after another, like a casino where every odd is stacked against us?",
  },
  {
    id: "nPKHiBuatT0",
    poster: `${M}/film/No_Planet_for_Humans_Poster_With_Title_1.jpg`,
    title: "No Planet for Humans",
    year: "2024",
    length: "2:02",
    role: "Producer",
    logline: "When the singularity arrives and AI takes over, humans are left living like animals under its rule.",
  },
  {
    id: "44SAZqUQStQ",
    poster: `${M}/film/Arcane_Legacy_poster_resized.jpg`,
    title: "Arcane Legacy",
    year: "2024",
    length: "1:30",
    role: "Producer",
    logline:
      "A medieval king glimpses the future, world wars and atomic bombs, in a crystal ball, goes mad, and wages war on every kingdom around him.",
  },
];

export const yt = {
  watch: (id) => `https://youtu.be/${id}`,
  embed: (id) => `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`,
};

/* —— Professional (repo) —— */

// From chat-api/prompt/context.md (the fact sheet behind "Ask about my work").
export const education = [
  { label: "MS Software Engineering", year: "2009" },
  { label: "BTech Mechanical", year: "2007" },
];

export const stackGroups = [
  {
    id: "agents",
    title: "GenAI and agents",
    items: [
      "Workflow-specific harnesses",
      "Multi-agent systems",
      "RAG",
      "GraphRAG",
      "MCP",
      "In-network model gateways",
      "Evaluation and refusal",
    ],
  },
  { id: "languages", title: "Languages and data", items: ["Python", "SQL", "Scala", "Java / Spring", "Spark / PySpark", "PL/SQL"] },
  { id: "cloud", title: "Cloud", items: ["AWS", "GCP (Vertex, BigQuery)", "Azure", "Snowflake"] },
  { id: "platforms", title: "Data platforms", items: ["Hadoop", "Cloudera", "OpenSearch", "S3 data lakes", "Kafka"] },
  { id: "graphs", title: "Graphs", items: ["Neo4j", "Amazon Neptune"] },
  { id: "ml", title: "ML / documents", items: ["OCR", "NER", "NLP", "Spark ML"] },
  { id: "interchange", title: "Healthcare interchange", items: ["EDI 837 / 835"] },
  { id: "mainframe", title: "Mainframe-class data", items: ["VSAM / ISAM", "COBOL-to-SQL"] },
  {
    id: "quality",
    title: "Quality and delivery",
    items: ["GxP / GAMP writing", "Hash-locked artifacts", "CI/CD", "Serving-layer RBAC", "Multi-cloud"],
  },
];

// What the brief says about how the music and video are made. It names no tools, so none are listed.
export const mediaStack = {
  id: "media",
  title: "Generative media",
  items: ["Songwriting in Telugu and Hindi", "AI music production", "AI-generated music video", "Short film"],
};

export const stackNote = "Estate inventory I still cite: 63 services, 236 controllers, 506 REST endpoints.";

export const buildNotes = [
  {
    id: "coding-agent",
    title: "Coding agent",
    line: "A coding agent I built is a single-file Python program, about 1,100 lines, standard library only.",
    value: "~1,100",
    label: "lines · stdlib only",
  },
  {
    id: "rewrite",
    title: "12-step rewrite",
    line: "A 12-step LLM pipeline rewrites a Java / Spring service in about 2.5 minutes against about 7.5 hours by hand.",
    value: "2.5 min",
    label: "vs 7.5 hours by hand",
  },
  {
    id: "estate",
    title: "Estate inventory",
    line: "AST inventory of a Java / Spring estate: 63 services, 236 controllers, 506 REST endpoints.",
    value: "63 / 236 / 506",
    label: "services · controllers · endpoints",
  },
];

// Copy already on the live site, reused as-is.
export const copy = {
  workTitle: "Work I can put a name on.",
  workLede:
    "Newest first. Client, dates, the firm I came through when that is how the seat was staffed, and what I built. This is the record.",
  lanesTitle: "A few lanes I keep current.",
  lanesLede:
    "Not the inventory. The high-end work I still take: agents, retrieval, data platforms, mapping, and regulated quality.",
  projectsKicker: "Things I ship under my own name",
  projectsTitle: "Open source, a pitch, and a firm",
  stackKicker: "A compact stack",
  contactTitle: "Write me directly.",
  contactLede: "I am in Wellington, Florida. Email is the surest path. The record above is the work I can discuss.",
  chatTitle: "Ask about my work",
  chatPreface:
    "I can speak to the work on this page — the career chapters, the stack, and the things I built under my own name.",
  chatPrivacy: "Questions you send are used to write a reply.",
  chatField: "A question about the work.",
  chatOff: "chat is not connected yet",
};

export const contactLinks = [
  { id: "email", label: "Email", text: person.email, href: `mailto:${person.email}` },
  { id: "phone", label: "Phone", text: person.phone, href: person.phoneHref },
  { id: "linkedin", label: "LinkedIn", text: "linkedin.com/in/srikanth-bellary", href: person.linkedin },
  { id: "github", label: "GitHub", text: "github.com/srikanthbellary", href: person.github },
  { id: "medium", label: "Medium", text: "medium.com/@srikanthbellary01", href: person.medium },
];

// The two sides of the site. The gateway offers them as two doors; each destination links to the other.
export const sides = {
  professional: {
    key: "professional",
    n: "01",
    href: "professional.html",
    label: "Professional",
    tagline: "Engineer by day,",
    sub: positioning.roles,
    line: positioning.overview,
    contents: [
      { label: "Work", note: career.slice(0, 4).map((c) => c.client).join(", ") },
      { label: "Stack", note: "Agents, retrieval, data platforms" },
      { label: "Experience", note: `${career.length} engagements, 2006 to now` },
      { label: "Contact", note: "Write me directly" },
    ],
  },
  personal: {
    key: "personal",
    n: "02",
    href: "personal.html",
    label: "Personal",
    tagline: "storyteller always.",
    sub: ["Films & Music"],
    line: "I write cinematic songs in Telugu and Hindi and turn them into AI-generated music videos.",
    contents: [
      { label: "Albums", note: albums.map((a) => a.title).join(" · ") },
      { label: "Featured video", note: featuredVideo.kind },
      { label: "Shorts", note: "Vertical cuts from both albums" },
      { label: teaser.status, note: teaser.title },
      { label: "Short films", note: `Three from ${films[0].year}` },
    ],
  },
};

export const year = 2026;
