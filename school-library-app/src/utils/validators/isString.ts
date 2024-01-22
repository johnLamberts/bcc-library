import { ImageValue } from "./isBlobOrFile";

function isString(value: ImageValue): value is string {
  return typeof value === "string";
}

export default isString;
