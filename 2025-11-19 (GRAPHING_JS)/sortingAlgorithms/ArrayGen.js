export default function GenerateRandom(length) {
  const vals = Array.from({ length }, (_, i) => i + 1);

  for (let i = length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [vals[i], vals[rand]] = [vals[rand], vals[i]];
  }

  return vals;
}
