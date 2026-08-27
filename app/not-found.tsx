import { person } from "@/lib/content";

export default function NotFound() {
  return (
    <section className="fold" aria-labelledby="missing">
      <div className="wrap">
        <div className="fold-meta">
          <span>Missing</span>
          <span>{person.location}</span>
        </div>
        <hr className="hairline fold-rule" />
        <h1 id="missing">Page not found</h1>
        <p className="fold-line">
          That address is not on this profile. <a href="/">Return home</a>.
        </p>
      </div>
    </section>
  );
}
