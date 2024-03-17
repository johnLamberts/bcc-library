/* eslint-disable @typescript-eslint/no-explicit-any */
import { getStorage, uploadBytes, ref, getDownloadURL } from "firebase/storage";

export default class MyUploadAdapter {
  loader: any;
  constructor(loader: any) {
    this.loader = loader;
  }
  // Starts the upload process.
  upload() {
    return this.loader.file.then(
      (file: Blob | Uint8Array | ArrayBuffer) =>
        new Promise((resolve, reject) => {
          const storage = getStorage();
          uploadBytes(
            ref(storage, `/${"Dial & Dine"}/${new Date().getTime()}`),
            file
          )
            .then((snapshot) => {
              const url = getDownloadURL(snapshot.ref);
              console.log(url);
              return url;
            })
            .then((downloadURL) => {
              resolve({
                default: downloadURL,
              });
            })
            .catch((error) => {
              reject(error.message);
            });
        })
    );
  }
}

export function FirebaseDownloadAdapterPlugin(editor: any) {
  editor.plugins.get("FileRepository").createDownloadAdapter = (
    downloader: any
  ) => {
    return new MyUploadAdapter(downloader);
  };
}
