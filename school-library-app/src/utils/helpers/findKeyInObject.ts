function findKeyInObject(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: Record<string, any>,
  targetKey: string
): number | undefined {
  for (const key of Object.keys(obj)) {
    if (key === targetKey) {
      return obj[key];
    }
  }
  return undefined;
}

export default findKeyInObject;
