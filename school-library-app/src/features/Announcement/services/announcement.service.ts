import { downloadUrl, uploadFileOrImage } from "src/shared/services/storage";
import IPost from "../models/post.interface";
import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { firestore } from "src/shared/firebase/firebase";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";

const addAnnouncement = async (payload: Partial<Record<string, unknown>>) => {
  try {
    const defaultImageUrl =
      "https://firebasestorage.googleapis.com/v0/b/zidel-posev.appspot.com/o/user.png?alt=media&token=883b6c53-4b75-4f60-a741-abe99f992fb7";

    payload.thumbnail = payload.thumbnail || defaultImageUrl;

    const uploadResultImage = await uploadFileOrImage(
      payload.thumbnail as File | string
    );

    const imagePathUrl = uploadResultImage
      ? await downloadUrl(uploadResultImage.ref)
      : defaultImageUrl;

    return await addDoc(
      collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.NEWS_ANNOUNCEMENT),
      {
        ...payload,
        thumbnail: imagePathUrl,
        createdAt: serverTimestamp(),
        status: "Active",
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

const getAllNewsAnnouncement = async () => {
  const booksCatalogueSnapshot = await getDocs(
    collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.NEWS_ANNOUNCEMENT)
  );

  return booksCatalogueSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as IPost[];
};

export { addAnnouncement, getAllNewsAnnouncement };
