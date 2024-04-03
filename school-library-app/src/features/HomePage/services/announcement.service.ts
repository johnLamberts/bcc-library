/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { firestore } from "src/shared/firebase/firebase";

const topLatestAnnouncement = async () => {
  const newsRef = await getDocs(
    query(
      collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.NEWS_ANNOUNCEMENT),
      orderBy("createdAt", "desc"),
      limit(6)
    )
  );

  return newsRef.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as unknown[];
};

const otherAnnouncetment = async () => {
  const newsRef = await getDocs(
    query(
      collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.NEWS_ANNOUNCEMENT),
      orderBy("createdAt", "asc")
    )
  );

  return newsRef.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as unknown[];
};

const getNewsDetail = async (
  newsId: string | undefined
): Promise<any | undefined> => {
  const newsRef = await getDoc(
    doc(
      firestore,
      FIRESTORE_COLLECTION_QUERY_KEY.NEWS_ANNOUNCEMENT,
      newsId as string
    )
  );

  if (newsRef.exists()) {
    return {
      id: newsRef.id,
      ...newsRef.data(),
    } as any;
  } else {
    throw new Error(
      "Oops! It seems that the document you're looking for doesn't exist in our database. Please double-check the document name or try searching for a different one"
    );
  }
};

export { topLatestAnnouncement, otherAnnouncetment, getNewsDetail };
