// eslint-disable-next-line @typescript-eslint/ban-types
export function pickObject<Obj extends object, Keys extends keyof Obj>(obj: Obj, keys: Keys[]) {
  const result: Partial<Pick<Obj, Keys>> = {};
  keys.forEach((key) => (result[key] = obj[key]));
  return result as Pick<Obj, Keys>;
}
