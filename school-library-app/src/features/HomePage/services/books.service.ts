import { IBooks } from "@features/Catalogue/models/books.interface";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { PAGE_SIZE } from "src/shared/constant";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { firestore } from "src/shared/firebase/firebase";

const getBook = async (
  bookId: string | undefined
): Promise<IBooks | undefined> => {
  const bookRef = await getDoc(
    doc(firestore, FIRESTORE_COLLECTION_QUERY_KEY.CATALOGUE, bookId as string)
  );

  if (bookRef.exists()) {
    return {
      id: bookRef.id,
      ...bookRef.data(),
    } as IBooks;
  } else {
    throw new Error(
      "Oops! It seems that the document you're looking for doesn't exist in our database. Please double-check the document name or try searching for a different one"
    );
  }
};

const getAllBooks = async (page: number) => {
  const booksCollectionRef = collection(
    firestore,
    FIRESTORE_COLLECTION_QUERY_KEY.CATALOGUE
  );

  let queryBooks = query(
    booksCollectionRef,
    orderBy("createdAt", "desc"),
    limit(PAGE_SIZE)
  );

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
        limit(PAGE_SIZE)
      );
    }
  }

  const booksSnapshot = await getDocs(queryBooks);
  const booksData = booksSnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as IBooks)
  );

  // Calculate accurate count from the initial query without limit
  const countSnapshot = await getDocs(
    query(booksCollectionRef, orderBy("createdAt", "desc"))
  );
  const count = countSnapshot.size;

  return { booksData, count, hasMore: !booksSnapshot.empty };
};

export { getBook, getAllBooks };
