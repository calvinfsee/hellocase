export function randomSpot () {
  const x = Math.floor(Math.random() * (12 + 4) - 4);
  const y = Math.floor(Math.random() * (12 + 4) - 4);
  return { x, y };
}