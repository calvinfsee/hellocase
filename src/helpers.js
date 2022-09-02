export function randomSpot () {
  const x = Math.floor(Math.random() * (6 + 6) - 6);
  const y = Math.floor(Math.random() * (6 + 6) - 6);
  return { x, y };
}