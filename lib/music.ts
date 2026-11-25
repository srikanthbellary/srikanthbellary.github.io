// Films & Music: the Personal page.
//
// The Personal page and the Professional page are strictly separate. Nothing in this file names the
// other page or its content, and nothing here is imported by it.
//
// Everything here comes from Srikanth's brief of Nov 24, 2026 ("Website Brief: Music & Film") and the
// asset delivery of the same day. Rules from that brief that this file has to keep:
//   - titles exactly as spelled here: romanized Telugu and Hindi, English letters only
//   - Srikanth Bellary is the artist on everything; Nikhil Yadav is credited as lyricist on "Teri Baatein" only
//   - no other artists or songs are named anywhere, including alt text
//   - no lyrics
//   - Her Mood Swings is shown as "Coming 2027" only: no tracklist, audio or titles
//   - music videos and films play from YouTube; only the silent loops and the images are hosted here
//
// Media lives in public/media/ and is built by scripts/prepare-media.mjs.

/* —— Open points: each is one value to change when Srikanth decides —— */

export const pending = {
  /** The YouTube channel. Paste the channel URL here; until then the button reads "link to come". */
  youtubeChannelUrl: null as string | null,

  /** The Hindi music video. Paste the YouTube id here once it is published; until then its slot reads "to come". */
  hindiVideoId: null as string | null,

  /** Pre-save links, if he sets them up. Shown beside "Out Dec 11" / "Out Dec 18" when present. */
  preSave: { ikm: null, akbh: null } as Record<string, string | null>,

  /**
   * The delivered Shorts carry lyric lines as burned-in captions, and the brief allows no lyrics.
   * While this is true, the Shorts strip plays the silent loops of the same six songs.
   * To use the Shorts: put the files in public/media/shorts/, list them in `shortFiles` below, set this to false.
   */
  shortsUseLoops: true,

  /**
   * Track 3 of the Telugu album is spelled "Mounamga Unna" in the brief; its cover art reads "MOUNANGA UNNAA".
   * The title below follows the brief. The cover (public/media/tracks/ikm-03) is shown only as a 42 px thumbnail.
   */
};

/* —— Images —— */

export type Art = { base: string; widths: readonly number[]; width: number; height: number };

const art = (base: string, widths: readonly number[], width: number, height: number): Art => ({
  base: `/media/${base}`,
  widths,
  width,
  height,
});

export const banner = art("storm/banner", [800, 1280, 2000], 2000, 857);

/* —— The artist —— */

export const artist = {
  name: "Srikanth Bellary",
  roles: ["Recording artist", "Filmmaker"],
  // The brief's one-line bio opens with "Engineer by day, storyteller always:". That half points at the
  // other page, so it is left off here; the rest is the brief's sentence, word for word.
  bio: "Srikanth Bellary writes cinematic songs in Telugu and Hindi and turns them into music videos.",
  story:
    "The albums are one connected story. A love that ended without an ending, told in Telugu, answered by her side of the story in Hindi, then a whole album in her voice.",
  madeWith:
    "Songs written by Srikanth and produced with AI music tools. The music videos are AI-generated, with Srikanth himself as the on-screen subject.",
  spotify: "https://open.spotify.com/artist/12F3zpzFJ7BmmNTMiIDfwQ",
  appleMusic: "https://music.apple.com/us/artist/srikanth-bellary/6836423172",
  // Album links arrive on release day. Until then each album card names the stores.
  releaseDayStores: ["Spotify", "Apple Music", "YouTube Music", "JioSaavn", "Amazon Music"],
} as const;

/* —— Albums —— */

export type Track = {
  n: string;
  title: string;
  /** Square art, 128 px. */
  art: string;
  /** Silent vertical loop and its first frame. */
  loop: string;
  still: string;
  credit?: string;
};

export type Album = {
  id: "ikm" | "akbh";
  chapter: string;
  title: string;
  language: string;
  countWord: string;
  date: string;
  iso: string;
  out: string;
  meaning: string;
  short: string;
  detail?: string;
  arc: string;
  cover: Art;
  tracks: Track[];
};

const tracks = (album: Album["id"], titles: readonly (string | { title: string; credit: string })[]): Track[] =>
  titles.map((entry, index) => {
    const n = String(index + 1).padStart(2, "0");
    const item = typeof entry === "string" ? { title: entry } : entry;
    return {
      n,
      ...item,
      art: `/media/tracks/${album}-${n}`,
      loop: `/media/loops/${album}-${n}.mp4`,
      still: `/media/loops/${album}-${n}.jpg`,
    };
  });

export const albums: Album[] = [
  {
    id: "ikm",
    chapter: "01",
    title: "Inkaa Kadha Migilundhi",
    language: "Telugu",
    countWord: "Ten songs",
    date: "Fri Dec 11, 2026",
    iso: "2026-12-11",
    out: "Out Dec 11",
    meaning: "The story isn’t over yet",
    short: "A love that ended without an ending. Ten songs, one story.",
    detail: "A cinematic rock album. It closes with her reply in Hindi.",
    arc: "Told in Telugu",
    cover: art("albums/ikm-cover", [320, 640, 1200], 1200, 1200),
    tracks: tracks("ikm", [
      "Inkaa Kadha Migilundhi",
      "Nuvvu Cheppina Maatale",
      "Mounamga Unna",
      "Inkaa Kadha Migilundhi (Electric)",
      "Ennaallaina Marchipolenu",
      "Inkaa Kadha Migilundhi (Beats)",
      "Nuvvu Cheppina Maatale (Mashup)",
      "Inkaa Kadha Migilundhi (Extended)",
      "Tum Samjhe Main Bhool Gayi (Her Response)",
      "Inkaa Kadha Migilundhi (Her Version)",
    ]),
  },
  {
    id: "akbh",
    chapter: "02",
    title: "Abhi Kahani Baaki Hai",
    language: "Hindi",
    countWord: "Eight songs",
    date: "Fri Dec 18, 2026",
    iso: "2026-12-18",
    out: "Out Dec 18",
    meaning: "The story still remains",
    short: "The story continues, in Hindi, with her side finally heard.",
    arc: "Answered in Hindi",
    cover: art("albums/akbh-cover", [320, 640, 1200], 1200, 1200),
    tracks: tracks("akbh", [
      "Abhi Kahani Baaki Hai",
      "Sach Saamne Aa Jaayega",
      "Bhool Nahi Paaya",
      // Credited as lyricist only, never as an artist.
      { title: "Teri Baatein", credit: "Lyrics: Nikhil Yadav" },
      "Tum Samjhe Main Bhool Gayi (Her Response)",
      "Abhi Kahani Baaki Hai (Her Version)",
      "Abhi Kahani Baaki Hai (Acoustic)",
      "Tum Samjhe Main Bhool Gayi (Acoustic)",
    ]),
  },
];

export const [telugu, hindi] = albums;

// The album cards run newest first, as the brief asks.
export const albumsNewestFirst = [...albums].sort((a, b) => b.iso.localeCompare(a.iso));

// "Coming 2027" only: no tracklist, audio or song titles.
export const teaser = {
  chapter: "03",
  title: "Her Mood Swings",
  status: "Coming 2027",
  short: "Twelve moods, one woman’s world.",
  arc: "In her voice",
  cover: art("albums/hms-cover", [320, 640], 640, 640),
  wide: art("albums/hms-wide", [800, 1280, 2000], 2000, 1125),
} as const;

/* —— Video —— */

// Embedded from YouTube, never hosted here. The 16:9 album poster is its still.
export const featuredVideo = {
  id: "TzhspZLw6_k",
  title: "Inkaa Kadha Migilundhi",
  kind: "Title-track music video",
  poster: art("video/ikm-poster", [640, 960, 1600], 1600, 897),
} as const;

export const nextVideo = {
  title: hindi.title,
  kind: "Music video",
} as const;

export const youtube = {
  watch: (id: string) => `https://youtu.be/${id}`,
  embed: (id: string) => `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`,
};

/* —— Shorts strip —— */

export type Short = { n: string; album: string; title: string; src: string; still: string; kind: string };

// For when the Shorts themselves are used (see pending.shortsUseLoops): file base names in public/media/shorts/.
const shortFiles: { album: string; title: string; file: string }[] = [];

const loopStandIns: [Album, number][] = [
  [telugu, 0],
  [telugu, 3],
  [telugu, 8],
  [hindi, 0],
  [hindi, 1],
  [hindi, 2],
];

export const shorts: Short[] = pending.shortsUseLoops
  ? loopStandIns.map(([album, index], i) => ({
      n: String(i + 1).padStart(2, "0"),
      album: album.language,
      title: album.tracks[index].title,
      src: album.tracks[index].loop,
      still: album.tracks[index].still,
      kind: "silent loop",
    }))
  : shortFiles.map((item, i) => ({
      n: String(i + 1).padStart(2, "0"),
      album: item.album,
      title: item.title,
      src: `/media/shorts/${item.file}.mp4`,
      still: `/media/shorts/${item.file}.jpg`,
      kind: "vertical Short",
    }));

/* —— Film —— */

export const films = [
  {
    id: "0DP5xM08-BY",
    poster: art("films/apocalyptic-roulette", [640, 1280], 1280, 720),
    title: "Apocalyptic Roulette",
    year: "2024",
    length: "4:07",
    role: "Producer",
    logline:
      "What if every catastrophe struck at once, one after another, like a casino where every odd is stacked against us?",
  },
  {
    id: "nPKHiBuatT0",
    poster: art("films/no-planet-for-humans", [640, 1280], 1280, 720),
    title: "No Planet for Humans",
    year: "2024",
    length: "2:02",
    role: "Producer",
    logline: "When the singularity arrives and AI takes over, humans are left living like animals under its rule.",
  },
  {
    id: "44SAZqUQStQ",
    poster: art("films/arcane-legacy", [640, 1280], 1280, 717),
    title: "Arcane Legacy",
    year: "2024",
    length: "1:30",
    role: "Producer",
    logline:
      "A medieval king glimpses the future, world wars and atomic bombs, in a crystal ball, goes mad, and wages war on every kingdom around him.",
  },
] as const;
