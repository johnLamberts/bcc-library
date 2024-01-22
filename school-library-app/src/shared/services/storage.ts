import { FirebaseError } from "firebase/app";
import {
  StorageReference,
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
  uploadString,
} from "firebase/storage";
import isString from "src/utils/validators/isString";
import { storage } from "../firebase/firebase";
import isBlobOrFile from "src/utils/validators/isBlobOrFile";
import { randomId } from "@mantine/hooks";

const fileOrImageRef = (pathRef: string | undefined) => {
  return ref(storage, pathRef);
};

const uploadFileOrImage = async (avatarImage: string | File | undefined) => {
  try {
    let userImageRef;
    let pathUrl;

    if (isString(avatarImage)) {
      const base64Data = avatarImage.split(",")[1];

      userImageRef = fileOrImageRef(
        `users/BCC_${base64Data.slice(5, 10)}-${randomId()}`
      );

      pathUrl = await uploadString(userImageRef, base64Data, "base64", {
        contentType: "image/jpeg",
      });
    } else if (isBlobOrFile(avatarImage)) {
      userImageRef = fileOrImageRef(`users/${avatarImage.name}`);

      pathUrl = await uploadBytes(userImageRef, avatarImage);
    } else {
      return;
    }

    return pathUrl;
  } catch (err) {
    if (err instanceof FirebaseError) {
      throw new Error(err.message);
    }
  }
};

const downloadUrl = async (ref: StorageReference) => {
  try {
    const url = await getDownloadURL(ref);

    return url;
  } catch (err) {
    if (err instanceof FirebaseError) {
      throw new Error(err.message);
    }
  }
};

const deleteFileOrImage = async (avatarImage: string) => {
  try {
    const userImageRef = fileOrImageRef(avatarImage);

    return await deleteObject(userImageRef);
  } catch (err) {
    if (err instanceof FirebaseError) {
      throw new Error(err.message);
    }
  }
};

export { uploadFileOrImage, downloadUrl, deleteFileOrImage };
