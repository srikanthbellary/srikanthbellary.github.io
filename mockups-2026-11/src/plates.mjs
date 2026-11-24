// Diagrams for the two lead case files. Every label comes from the live site:
// the Verizon bullets and environment line, and the Circana figure.

import { esc } from "./lib.mjs";

// Verizon: the incident path, redrawn from the bullets on the live site.
export function incidentPlate(chapter) {
  const inputs = ["Telemetry", "Tickets", "Runbooks", "Call graph"];
  const agents = ["SRE Recommendation", "Remediation Insights MCP", "Auto Failover", "Correction of Errors", "Confluence"];
  const inY = (i) => 54 + i * 50;
  const agY = (i) => 44 + i * 40;
  const wires = inputs.map((_, i) => `<path class="wire" d="M132 ${inY(i)} C 170 ${inY(i)}, 172 134, 210 134"/>`).join("");
  return `<svg class="plate-svg" viewBox="0 0 560 300" role="img" aria-label="Incident path: telemetry, tickets, runbooks, and the call graph feed five agents; a person keeps the last step.">
  <g class="plate-cols"><text x="24" y="22">Signals</text><text x="210" y="22">Agents · RAG · MCP</text><text x="452" y="22">Last step</text></g>
  ${wires}
  <path class="wire wire-hot" d="M400 134 H 452"/>
  ${inputs.map((label, i) => `<g class="node"><rect x="24" y="${inY(i) - 16}" width="108" height="32" rx="3"/><text x="38" y="${inY(i) + 4}">${label}</text></g>`).join("")}
  <rect class="cluster" x="210" y="34" width="190" height="212" rx="4"/>
  ${agents.map((label, i) => `<g class="agent"><circle cx="228" cy="${agY(i) + 16}" r="3"/><text x="240" y="${agY(i) + 20}">${label}</text></g>`).join("")}
  <g class="human"><rect x="452" y="104" width="86" height="60" rx="3"/><text x="495" y="130" text-anchor="middle">Human</text><text class="human-sub" x="495" y="148" text-anchor="middle">evidence attached</text></g>
  <circle class="pulse-dot" r="3.5"><animateMotion dur="4.8s" repeatCount="indefinite" path="M132 54 C 170 54, 172 134, 210 134 H 452"/></circle>
  <g class="plate-foot"><text x="24" y="282">${esc(chapter.env)}</text></g>
</svg>`;
}

// Circana: propose, score, review. Field names come from the figure on the live site.
export function mappingPlate() {
  const left = ["cat_id", "attr_nm", "uom_cd", "brand", "promo"];
  const right = ["item_key", "facet", "unit", "maker", "offer"];
  const bar = [0.92, 0.78, 0.86, 0.34, 0.7];
  const rows = left
    .map((name, i) => {
      const y = 58 + i * 40;
      const review = i === 3;
      return `<g class="map-row${review ? " is-review" : ""}">
    <rect class="map-cell" x="24" y="${y - 15}" width="118" height="30" rx="3"/><text x="38" y="${y + 4}">${name}</text>
    <path class="wire${review ? " wire-dash" : ""}" d="M142 ${y} H 300"/>
    <rect class="score-track" x="186" y="${y - 3}" width="70" height="6" rx="3"/>
    <rect class="score-fill" x="186" y="${y - 3}" width="${(70 * bar[i]).toFixed(0)}" height="6" rx="3"/>
    <rect class="map-cell map-cell-out" x="300" y="${y - 15}" width="118" height="30" rx="3"/><text x="314" y="${y + 4}">${right[i]}</text>
    ${review ? `<g class="review-tag"><rect x="432" y="${y - 13}" width="104" height="26" rx="13"/><text x="484" y="${y + 4}" text-anchor="middle">Review queue</text></g>` : `<path class="tick" d="M440 ${y} l5 5 9-10"/>`}
  </g>`;
    })
    .join("");
  return `<svg class="plate-svg" viewBox="0 0 560 300" role="img" aria-label="Attribute mapping: each proposed map carries a confidence score; low-confidence maps go to a review queue.">
  <g class="plate-cols"><text x="24" y="22">Source</text><text x="186" y="22">Confidence</text><text x="300" y="22">Target</text><text x="432" y="22">Decision</text></g>
  ${rows}
  <g class="plate-foot"><text x="24" y="282">Propose · score · review</text></g>
</svg>`;
}
