import { career } from "@/lib/content";
import { banner } from "@/lib/music";
import { IncidentPlate } from "./figures/Plates";
import { Picture } from "./Picture";

// The storm of the album art: the wide banner, a flash now and then, rain, and a scrim for the type.
// Personal side. The banner has no close-up: the figure is small and seen from behind.
export function StormBackdrop({ sizes, eager = false }: { sizes: string; eager?: boolean }) {
  return (
    <>
      <Picture art={banner} sizes={sizes} alt="" eager={eager} />
      <div className="screen-flash" />
      <div className="screen-rain" />
      <div className="screen-scrim" />
    </>
  );
}

// The drafting grid of the Professional side, with the incident path drawn on it as line work.
export function BlueprintBackdrop() {
  return (
    <>
      <div className="bp">
        <IncidentPlate chapter={career[0]} decorative />
      </div>
      <div className="screen-scrim" />
    </>
  );
}
