import { person } from "@/lib/content";
import {
  albums,
  albumsNewestFirst,
  featuredVideo,
  films,
  maker,
  nextVideo,
  pending,
  shorts,
  teaser,
  telugu,
  youtube,
  type Album,
} from "@/lib/music";
import { StormBackdrop } from "./Backdrops";
import { ArrowDown, ArrowUpRight, Play } from "./icons";
import { AlbumTracks, ShortsStrip } from "./Loops";
import { Countdown } from "./Motion";
import { Picture } from "./Picture";
import { LiteYouTube, TheaterButton } from "./Video";

// The Personal page: Films & Music, made with AI, and nothing else.
// It links home and never to the other page, and it does not mention that page's content.
// From lib/content.ts it takes only the name and the location.
// How he is described and credited is fixed in lib/music.ts (see the rules at the top of that file).

function Labels({ items }: { items: readonly string[] }) {
  return (
    <p className="label label-row">
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </p>
  );
}

function SectionHead({ n, id, title, children }: { n: string; id: string; title: React.ReactNode; children: React.ReactNode }) {
  return (
    <header className="sec-head">
      <p className="sec-n">
        <span>{n}</span>
        <span>{id}</span>
      </p>
      <h2>{title}</h2>
      <div className="sec-aside">{children}</div>
    </header>
  );
}

/* —— Hero: Films & Music, then what is showing now —— */

export function PersonalHero() {
  return (
    <section className="hero hero-per" id="intro" aria-label="Introduction" data-area="music">
      <p className="id-meta">
        <span>{person.name}</span>
        <span>{person.location}</span>
        <span>
          Next release <b>{telugu.date}</b>
        </span>
      </p>

      <div className="id id-plain">
        <div className="id-name">
          <h1>
            Films <em>&amp;</em> Music
          </h1>
          <p className="id-roles">
            <span>{maker.mark}</span>
          </p>
        </div>
      </div>

      <div className="id-about">
        <p>{maker.intro}</p>
        <ul className="platforms">
          <li>
            <a className="btn btn-ghost" href={maker.spotify} rel="noreferrer">
              Spotify <ArrowUpRight size={14} />
            </a>
          </li>
          <li>
            <a className="btn btn-ghost" href={maker.appleMusic} rel="noreferrer">
              Apple Music <ArrowUpRight size={14} />
            </a>
          </li>
          <li>
            {pending.youtubeChannelUrl ? (
              <a className="btn btn-ghost" href={pending.youtubeChannelUrl} rel="noreferrer">
                YouTube <ArrowUpRight size={14} />
              </a>
            ) : (
              <span className="btn btn-pending">
                YouTube <i>link to come</i>
              </span>
            )}
          </li>
        </ul>
      </div>

      <div className="screen">
        <div className="screen-bg" aria-hidden="true">
          <StormBackdrop sizes="100vw" eager />
        </div>

        <div className="screen-hud">
          <p>
            <span className="rec" aria-hidden="true" />
            Now showing <b>Album {telugu.chapter}</b>
          </p>
          <p>
            {telugu.date} <Countdown iso={telugu.iso} />
          </p>
        </div>

        <div className="screen-main">
          <div className="title-card">
            <Labels items={[`Album ${telugu.chapter}`, telugu.language, telugu.out]} />
            <h2>{telugu.title}</h2>
            <p className="title-meaning">“{telugu.meaning}.”</p>
            <p className="title-line">{telugu.short}</p>
            <div className="title-cta">
              <TheaterButton className="btn btn-solid" id={featuredVideo.id} title={featuredVideo.title}>
                <Play size={16} /> Watch the title-track video
              </TheaterButton>
              <a className="btn btn-ghost" href="#music">
                Albums, Shorts &amp; films <ArrowDown size={14} />
              </a>
            </div>
          </div>

          <a className="record" href={`#album-${telugu.id}`}>
            <Picture art={telugu.cover} sizes="(max-width: 900px) 132px, 290px" alt={`${telugu.title}: album cover`} eager />
            <span className="record-tag">{telugu.out}</span>
          </a>
        </div>
      </div>

      <nav className="rail" aria-label="Releases and films">
        {albums.map((album) => (
          <a className="rail-item" href={`#album-${album.id}`} key={album.id}>
            <span className="rail-n">{album.chapter}</span>
            <b>{album.title}</b>
            <i>
              {album.language} · {album.out}
            </i>
          </a>
        ))}
        <a className="rail-item rail-rose" href="#coming-2027">
          <span className="rail-n">{teaser.chapter}</span>
          <b>{teaser.title}</b>
          <i>{teaser.status}</i>
        </a>
        <a className="rail-item rail-film" href="#film">
          <span className="rail-n">Film</span>
          <b>Short films</b>
          <i>
            {films[0].year} · {maker.mark}
          </i>
          <span className="rail-posters">
            {films.map((film) => (
              <Picture art={film.poster} sizes="60px" alt="" key={film.id} />
            ))}
          </span>
        </a>
      </nav>
    </section>
  );
}

/* —— The albums —— */

function AlbumCard({ album }: { album: Album }) {
  const stores = maker.releaseDayStores;
  const preSave = pending.preSave[album.id];

  return (
    <article className="album" id={`album-${album.id}`} data-reveal>
      <div className="album-cover">
        <Picture art={album.cover} sizes="(max-width: 900px) 92vw, 34vw" alt={`${album.title}: album cover`} />
        <p className="album-out">{album.out}</p>
      </div>

      <AlbumTracks album={album} note={maker.mark}>
        <Labels items={[`Album ${album.chapter}`, album.language, album.date]} />
        <h3>{album.title}</h3>
        <p className="album-meaning">“{album.meaning}.”</p>
        <p className="album-line">
          {album.short}
          {album.detail ? <span> {album.detail}</span> : null}
        </p>
        <p className="credit">
          <b>{maker.mark}</b>
          <span>{maker.name}</span>
          <i>{maker.musicCredit}</i>
        </p>

        <div className="listen">
          <p>
            <b>{album.out}</b> on {stores.slice(0, -1).join(", ")} and {stores[stores.length - 1]}.
          </p>
          {preSave ? (
            <a className="text-link" href={preSave} rel="noreferrer">
              Pre-save <ArrowUpRight size={14} />
            </a>
          ) : null}
        </div>
      </AlbumTracks>
    </article>
  );
}

export function Music() {
  return (
    <section className="sec music" id="music" data-spy data-area="music">
      <SectionHead
        n="01"
        id="Music"
        title={
          <>
            The <em>albums</em>
          </>
        }
      >
        <p className="lead">{maker.story}</p>
        <p>{maker.credits}</p>
      </SectionHead>

      <ol className="arc" data-reveal>
        {albums.map((album) => (
          <li key={album.id}>
            <a href={`#album-${album.id}`}>
              <Picture art={album.cover} sizes="92px" alt="" />
              <span className="label">
                {album.chapter} · {album.arc}
              </span>
              <b>{album.title}</b>
              <i>{album.out}</i>
            </a>
          </li>
        ))}
        <li className="arc-rose">
          <a href="#coming-2027">
            <Picture art={teaser.cover} sizes="92px" alt="" />
            <span className="label">
              {teaser.chapter} · {teaser.arc}
            </span>
            <b>{teaser.title}</b>
            <i>{teaser.status}</i>
          </a>
        </li>
      </ol>

      <div className="albums">
        {albumsNewestFirst.map((album) => (
          <AlbumCard album={album} key={album.id} />
        ))}
      </div>
    </section>
  );
}

/* —— Featured video —— */

export function FeaturedVideo() {
  return (
    <section className="sec-cont" id="video" data-spy data-area="music">
      <div className="feature" data-reveal>
        <div className="feature-main">
          <LiteYouTube
            id={featuredVideo.id}
            title={`${featuredVideo.title}: ${featuredVideo.kind.toLowerCase()}`}
            play={<Play size={34} />}
          >
            <Picture
              art={featuredVideo.poster}
              sizes="(max-width: 900px) 92vw, 66vw"
              alt={`${featuredVideo.title}: ${featuredVideo.kind.toLowerCase()}, video still`}
            />
          </LiteYouTube>
          <div className="feature-cap">
            <Labels items={["Featured video", featuredVideo.kind, maker.mark]} />
            <h3>{featuredVideo.title}</h3>
            <a className="text-link" href={youtube.watch(featuredVideo.id)} rel="noreferrer">
              Watch on YouTube <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        <aside className="feature-side">
          <p className="label">How it is made</p>
          <p className="made">{maker.madeWith}</p>
          {pending.hindiVideoId ? (
            <LiteYouTube id={pending.hindiVideoId} title={`${nextVideo.title}: ${nextVideo.kind.toLowerCase()}`} play={<Play size={24} />}>
              <Picture art={albums[1].cover} sizes="(max-width: 900px) 92vw, 26vw" alt={`${nextVideo.title}: video still`} />
            </LiteYouTube>
          ) : (
            <div className="pending-video">
              <span className="slot">
                <i aria-hidden="true" />
                <i aria-hidden="true" />
                <i aria-hidden="true" />
                <i aria-hidden="true" />
                <b>To come</b>
              </span>
            </div>
          )}
          <Labels items={["Next video", nextVideo.title]} />
        </aside>
      </div>
    </section>
  );
}

/* —— Shorts —— */

export function Shorts() {
  return (
    <section className="sec-cont" id="shorts" data-spy data-area="music">
      <div className="shorts" data-reveal>
        <div className="sub-head">
          <h3>Shorts</h3>
          <p>Vertical cuts from both albums. Silent; they play when you point at them or tap them.</p>
        </div>
        <ShortsStrip shorts={shorts} />
      </div>
    </section>
  );
}

/* —— Coming 2027: the name, the line and the art, nothing else —— */

export function Coming() {
  return (
    <section className="sec-cont" id="coming-2027" data-spy data-area="music">
      <article className="coming" data-reveal>
        <div className="coming-copy">
          <p className="coming-tag">{teaser.status}</p>
          <h3>{teaser.title}</h3>
          <p className="coming-line">{teaser.short}</p>
          <p className="coming-note">
            <span>Album {teaser.chapter}</span>
            <span>{teaser.arc}</span>
          </p>
        </div>
        <div className="coming-art">
          <Picture art={teaser.wide} sizes="(max-width: 900px) 92vw, 54vw" alt={`${teaser.title}: cover art`} />
        </div>
      </article>
    </section>
  );
}

/* —— Short films —— */

export function Films() {
  return (
    <section className="sec films" id="film" data-spy data-area="music">
      <SectionHead
        n="02"
        id="Film"
        title={
          <>
            Short <em>films</em>
          </>
        }
      >
        <p className="lead">Three short films from {films[0].year}, made with AI.</p>
        <p>
          Press play to watch here, or open them on YouTube. Nothing loads from YouTube until you press play.
        </p>
      </SectionHead>

      <div className="films-row" data-reveal>
        {films.map((film) => (
          <article className="film" key={film.id}>
            <LiteYouTube id={film.id} title={film.title} play={<Play size={24} />}>
              <Picture art={film.poster} sizes="(max-width: 900px) 92vw, 30vw" alt={`${film.title}: video still`} />
            </LiteYouTube>
            <Labels items={[film.year, film.length, maker.mark]} />
            <h4>{film.title}</h4>
            <p className="film-credit">{maker.filmCredit}</p>
            <p className="film-logline">{film.logline}</p>
            <a className="text-link" href={youtube.watch(film.id)} rel="noreferrer">
              Watch on YouTube <ArrowUpRight size={14} />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
