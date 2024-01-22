import * as fs from "fs";
import * as path from "path";

import { MIN_SIZE_STUDENT_NUMBER } from "../constant";
import { File } from "buffer";

export function imageToBlob(filePath: string): Promise<Blob> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const extension = path.extname(filePath).slice(1); // Get file extension
        const mimeTypes: Record<string, string> = {
          png: "image/png",
          jpg: "image/jpeg",
          jpeg: "image/jpeg",
          gif: "image/gif",
        };

        const blob = new Blob([data], {
          type: mimeTypes[extension] || "application/octet-stream",
        });
        resolve(blob);
      }
    });
  });
}

export function blobToFile(blob: Blob, fileName: string): File {
  const file = new File([blob], fileName, { type: blob.type });
  return file;
}

export function generateStudentNumber(numVal: number) {
  // const startValue = 0;
  const currentYear = new Date().getFullYear();
  let newNum = numVal.toString();

  for (let num = newNum.length; num < MIN_SIZE_STUDENT_NUMBER; num++) {
    newNum = "0" + newNum;
  }

  const incrementNum = `B${currentYear}-${newNum}`;

  return incrementNum;
}

export function makeUserName(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export function randomizeString(inputString: string): string {
  // Convert the string to an array of characters
  const characters: string[] = inputString.split("");

  // Shuffle the array of characters randomly
  for (let i = characters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [characters[i], characters[j]] = [characters[j], characters[i]];
  }

  // Join the array back into a string
  const randomizedString: string = characters.join("");

  return randomizedString;
}
