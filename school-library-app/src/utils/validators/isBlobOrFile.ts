export type ImageValue = Blob | File | string | undefined | null;

function isBlobOrFile(value: ImageValue): value is Blob | File {
  return value instanceof Blob && value instanceof File;
}

export default isBlobOrFile;
