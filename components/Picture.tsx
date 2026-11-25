import type { Art } from "@/lib/music";

type PictureProps = {
  art: Art;
  /** How wide the image is shown, in CSS `sizes` terms. */
  sizes: string;
  alt: string;
  className?: string;
  /** Above the fold: load now, ahead of everything else. */
  eager?: boolean;
};

// WebP at the widths the page asks for, with a JPEG fallback. Files come from scripts/prepare-media.mjs.
export function Picture({ art, sizes, alt, className, eager = false }: PictureProps) {
  const set = (ext: string) => art.widths.map((w) => `${art.base}-${w}.${ext} ${w}w`).join(", ");
  return (
    <picture>
      <source type="image/webp" srcSet={set("webp")} sizes={sizes} />
      <img
        className={className}
        src={`${art.base}-${art.widths[art.widths.length - 1]}.jpg`}
        srcSet={set("jpg")}
        sizes={sizes}
        width={art.width}
        height={art.height}
        alt={alt}
        decoding="async"
        loading={eager ? undefined : "lazy"}
        fetchPriority={eager ? "high" : undefined}
      />
    </picture>
  );
}

// Track art is one small square: 128 px for a 42 px slot.
export function Thumb({ base, className }: { base: string; className?: string }) {
  return (
    <picture>
      <source type="image/webp" srcSet={`${base}.webp`} />
      <img className={className} src={`${base}.jpg`} width={128} height={128} alt="" decoding="async" loading="lazy" />
    </picture>
  );
}

// The portrait. Professional page only: the brief keeps the face off the films and music.
export function Portrait({ sizes, eager = false }: { sizes: string; eager?: boolean }) {
  return (
    <picture>
      <source
        type="image/webp"
        srcSet="/srikanth-bellary.webp 512w, /srikanth-bellary-2x.webp 1024w"
        sizes={sizes}
      />
      <img
        src="/srikanth-bellary.jpg"
        srcSet="/srikanth-bellary.jpg 512w, /srikanth-bellary-2x.jpg 1024w"
        sizes={sizes}
        width={1024}
        height={1024}
        alt="Srikanth Bellary"
        decoding="async"
        loading={eager ? undefined : "lazy"}
        fetchPriority={eager ? "high" : undefined}
      />
    </picture>
  );
}
