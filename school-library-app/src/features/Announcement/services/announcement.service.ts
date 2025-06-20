import { downloadUrl, uploadFileOrImage } from "src/shared/services/storage";
import IPost from "../models/post.interface";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  startAfter,
  updateDoc,
  where,
} from "firebase/firestore";
import { firestore } from "src/shared/firebase/firebase";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { IBooks } from "@features/Catalogue/models/books.interface";
import { ANNOUNCEMENT_PAGE_SIZE } from "src/shared/constant";
import { FirebaseError } from "firebase/app";

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

const updateAnnouncement = async (payload: Partial<IPost>) => {
  try {
    console.log(payload);
    const uploadResultImage = await uploadFileOrImage(payload.thumbnail);
    const imagePathUrl = uploadResultImage
      ? await downloadUrl(uploadResultImage!.ref)
      : payload.thumbnail;

    return await updateDoc(
      doc(
        firestore,
        FIRESTORE_COLLECTION_QUERY_KEY.NEWS_ANNOUNCEMENT,
        payload.id as string
      ),
      {
        ...payload,
        thumbnail: imagePathUrl,
        modifiedAt: serverTimestamp(),
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
    query(
      collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.NEWS_ANNOUNCEMENT),
      orderBy("createdAt", "desc")
    )
  );

  return booksCatalogueSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as IPost[];
};

const getAnnouncement = async (
  page: number,
  q?: string,
  fq?: string,
  act?: string
) => {
  const newsCollectionRef = collection(
    firestore,
    FIRESTORE_COLLECTION_QUERY_KEY.NEWS_ANNOUNCEMENT
  );

  let queryBooks = query(
    newsCollectionRef,
    orderBy("createdAt", "desc"),
    limit(ANNOUNCEMENT_PAGE_SIZE)
  );

  if (q) {
    queryBooks = query(newsCollectionRef, where("title", "==", q.trim()));
  }

  if (fq && act) {
    // Apply both filters
    queryBooks = query(
      newsCollectionRef,
      where("newsCategory", "==", fq.trim()),
      where("status", "==", act.trim())
    );
  } else {
    if (fq) {
      // Filter by news category
      queryBooks = query(
        newsCollectionRef,
        where("newsCategory", "==", fq.trim())
      );
    }

    if (act) {
      // Filter by status
      queryBooks = query(newsCollectionRef, where("status", "==", act.trim()));
    }
  }

  console.log(q, fq, act);

  if (page > 1) {
    for (let i = 0; i < page - 1; i++) {
      const booksSnapshot = await getDocs(queryBooks);
      if (booksSnapshot.empty) {
        return { booksData: [], count: 0, hasMore: false }; // No more documents
      }
      const lastVisible = booksSnapshot.docs[booksSnapshot.docs.length - 1];
      queryBooks = query(
        newsCollectionRef,
        orderBy("createdAt", "desc"),
        startAfter(lastVisible),
        limit(ANNOUNCEMENT_PAGE_SIZE)
      );
    }
  }

  const booksSnapshot = await getDocs(queryBooks);
  const newsData = booksSnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as IPost)
  );

  const countSnapshot = await getDocs(
    query(newsCollectionRef, orderBy("createdAt", "desc"))
  );
  const totalCount = countSnapshot.size;

  let count;
  if (q !== "" || fq !== "" || act !== "") {
    count = booksSnapshot.size; // If filtered, use the count of filtered documents
  } else {
    count = totalCount; // If not filtered, use the total count of all documents
  }

  return { newsData, count, hasMore: !booksSnapshot.empty };
};

const modifyNewsStatus = async (payload: Partial<IPost>) => {
  try {
    return await updateDoc(
      doc(
        firestore,
        FIRESTORE_COLLECTION_QUERY_KEY.NEWS_ANNOUNCEMENT,
        payload.id as string
      ),
      {
        status: payload.status === "Active" ? "Inactive" : "Active",
        modifiedAt: serverTimestamp(),
      }
    );
  } catch (err) {
    if (err instanceof FirebaseError) {
      throw new Error(err.message);
    }
  }
};
export {
  addAnnouncement,
  updateAnnouncement,
  getAllNewsAnnouncement,
  getAnnouncement,
  modifyNewsStatus,
};
