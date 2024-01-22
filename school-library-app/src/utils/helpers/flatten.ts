/* eslint-disable @typescript-eslint/no-explicit-any */
export function flatten(
  object: Record<string, any>,
  addToList: Record<string, any>,
  prefix: unknown
) {
  Object.keys(object).map((key) => {
    if (object[key] === null) {
      addToList[prefix + key] = "";
    } else if (object[key] instanceof Array) {
      for (const i in object[key]) {
        flatten(object[key][i], addToList, prefix + key + "." + i + ".");
      }
    } else if (
      typeof object[key] == "object" &&
      !object[key].toLocaleDateString
    ) {
      flatten(object[key], addToList, prefix + key + ".");
    } else {
      addToList[prefix + key] = object[key];
    }
  });
  return addToList;
}
