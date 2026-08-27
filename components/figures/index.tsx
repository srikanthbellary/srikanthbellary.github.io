import type { Offer } from "@/lib/content";
import { BlastRadius } from "./BlastRadius";
import { EstateFigure } from "./EstateFigure";
import { HarnessLoop } from "./HarnessLoop";
import { IncidentPath } from "./IncidentPath";
import { MappingFigure } from "./MappingFigure";

export function OfferFigure({ kind }: { kind: Offer["figure"] }) {
  switch (kind) {
    case "harness":
      return <HarnessLoop />;
    case "incident":
      return <IncidentPath />;
    case "graph":
      return <BlastRadius />;
    case "mapping":
      return <MappingFigure />;
    case "estate":
      return <EstateFigure />;
  }
}
