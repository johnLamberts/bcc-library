import { ImageValue } from "./isBlobOrFile";

function isString(value: ImageValue): value is string {
  return typeof value === "string";
}

export function isImageCoverUrl(url: string): url is string {
  return url?.startsWith("https://firebasestorage.googleapis.com");
}

export default isString;
