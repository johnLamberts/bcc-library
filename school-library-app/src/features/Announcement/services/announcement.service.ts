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
} from "firebase/firestore";
import { firestore } from "src/shared/firebase/firebase";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { IBooks } from "@features/Catalogue/models/books.interface";
import { ANNOUNCEMENT_PAGE_SIZE } from "src/shared/constant";

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
  filterByType?: string,
  filterByGenre?: string
) => {
  const booksCollectionRef = collection(
    firestore,
    FIRESTORE_COLLECTION_QUERY_KEY.NEWS_ANNOUNCEMENT
  );

  let queryBooks = query(
    booksCollectionRef,
    orderBy("createdAt", "desc"),
    limit(ANNOUNCEMENT_PAGE_SIZE)
  );

  // if (filterByType) {
  //   queryBooks = query(
  //     booksCollectionRef,
  //     where("bookType", "==", filterByType)
  //   );
  // }

  // if (filterByGenre) {
  //   queryBooks = query(
  //     booksCollectionRef,
  //     where("genres", "array-contains", filterByGenre)
  //   );
  // }

  if (page > 1) {
    for (let i = 0; i < page - 1; i++) {
      const booksSnapshot = await getDocs(queryBooks);
      if (booksSnapshot.empty) {
        return { booksData: [], count: 0, hasMore: false }; // No more documents
      }
      const lastVisible = booksSnapshot.docs[booksSnapshot.docs.length - 1];
      queryBooks = query(
        booksCollectionRef,
        orderBy("createdAt", "desc"),
        startAfter(lastVisible),
        limit(ANNOUNCEMENT_PAGE_SIZE)
      );
    }
  }

  const booksSnapshot = await getDocs(queryBooks);
  const newsData = booksSnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as IBooks)
  );

  // Calculate accurate count from the initial query without limit
  const countSnapshot = await getDocs(
    query(booksCollectionRef, orderBy("createdAt", "desc"))
  );
  const totalCount = countSnapshot.size;

  let count;
  if (filterByType !== "" || filterByGenre !== "") {
    count = booksSnapshot.size; // If filtered, use the count of filtered documents
  } else {
    count = totalCount; // If not filtered, use the total count of all documents
  }

  return {
    newsData,
    count,
    hasMore: !booksSnapshot.empty,
  };
};
export {
  addAnnouncement,
  updateAnnouncement,
  getAllNewsAnnouncement,
  getAnnouncement,
};
