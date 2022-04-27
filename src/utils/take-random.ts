export function takeRandom<T>(arr: T[]): T {
  if (!arr.length) {
    throw new Error('have no items');
  }
  return arr[Math.floor(Math.random() * arr.length)];
}
