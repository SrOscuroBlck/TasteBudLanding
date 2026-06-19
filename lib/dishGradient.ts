// Deterministic warm gradient seeded by a dish's cuisine + name — same algorithm
// the product app uses (tastebud-pal/src/components/DishTile.tsx) so demo cards
// on the marketing site look identical to real recommendations.

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function dishGradient(name: string, cuisine?: string): string {
  const seed = hashString(`${cuisine || ""}:${name}`);
  const hue = 4 + (seed % 48); // warm band: deep red → gold
  const hue2 = hue + 18 + (seed % 14);
  return `linear-gradient(135deg, hsla(${hue}, 85%, 42%, 0.55) 0%, hsla(${hue2}, 75%, 28%, 0.25) 100%)`;
}
