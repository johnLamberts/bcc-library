import { IBooks } from "@features/Catalogue/models/books.interface";
import {
  collection,
  doc,
  endBefore,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  startAt,
  where,
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

  const booksRef = await getDocs(
    query(booksCollectionRef, orderBy("createdAt", "asc"))
  );

  let queryBooks = query(
    booksCollectionRef,
    orderBy("createdAt", "desc"),
    limit(PAGE_SIZE)
  );

  if (page > 1) {
    const lastVisible = (await getDocs(queryBooks)).docs[PAGE_SIZE - 1].data()
      .createdAt;
    console.log("Last visible document:", lastVisible);
    queryBooks = query(
      booksCollectionRef,
      orderBy("createdAt", "desc"),
      startAfter(lastVisible),
      limit(PAGE_SIZE)
    );
  }

  const booksSnapshot = await getDocs(queryBooks);
  const booksData = booksSnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as IBooks)
  );

  return { booksData, count: booksRef.size }; // Use booksSnapshot.size for accurate count
};

export { getBook, getAllBooks };
