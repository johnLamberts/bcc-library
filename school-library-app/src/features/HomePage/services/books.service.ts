import { IBooks } from "@features/Catalogue/models/books.interface";
import { ICirculation } from "@features/Transaction/models/circulation.interface";
import axios from "axios";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  startAfter,
  where,
} from "firebase/firestore";
import { PAGE_SIZE } from "src/shared/constant";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { auth, firestore } from "src/shared/firebase/firebase";

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

const getAllBooks = async (
  page: number,
  filterByType?: string,
  filterByGenre?: string
) => {
  const booksCollectionRef = collection(
    firestore,
    FIRESTORE_COLLECTION_QUERY_KEY.CATALOGUE
  );

  let queryBooks = query(
    booksCollectionRef,
    orderBy("createdAt", "desc"),
    limit(PAGE_SIZE)
  );

  if (filterByType) {
    queryBooks = query(
      booksCollectionRef,
      where("bookType", "==", filterByType)
    );
  }

  if (filterByGenre) {
    queryBooks = query(
      booksCollectionRef,
      where("genres", "array-contains", filterByGenre)
    );
  }

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
  const totalCount = countSnapshot.size;

  let count;
  if (filterByType !== "" || filterByGenre !== "") {
    count = booksSnapshot.size; // If filtered, use the count of filtered documents
  } else {
    count = totalCount; // If not filtered, use the total count of all documents
  }

  return {
    booksData,
    count,
    hasMore: !booksSnapshot.empty,
  };
  // const booksCollectionRef = collection(
  //   firestore,
  //   FIRESTORE_COLLECTION_QUERY_KEY.CATALOGUE
  // );

  // let queryBooks = query(
  //   booksCollectionRef,
  //   orderBy("createdAt", "desc"),
  //   limit(PAGE_SIZE)
  // );

  // if (filterByType !== "") {
  //   queryBooks = query(
  //     booksCollectionRef,
  //     where("bookType", "==", filterByType),
  //     limit(PAGE_SIZE)
  //   );
  // }

  // if (filterByGenre !== "") {
  //   queryBooks = query(
  //     booksCollectionRef,
  //     where("genres", "array-contains", filterByGenre),
  //     limit(PAGE_SIZE)
  //   );
  // }

  // // Fetch count with the same filters applied for pagination
  // let countSnapshot = await getDocs(queryBooks);

  // // let hasMore = !countSnapshot.empty; // Check for initial empty result after applying filters
  // const count = countSnapshot.size;

  // if (page > 1) {
  //   for (let i = 0; i < page - 1; i++) {
  //     const booksSnapshot = await getDocs(queryBooks);
  //     if (booksSnapshot.empty) {
  //       return { booksData: [], count, hasMore: false }; // No more documents
  //     }
  //     const lastVisible = booksSnapshot.docs[booksSnapshot.docs.length - 1];

  //     // Create new query for pagination with filters (unchanged)
  //     queryBooks = query(
  //       booksCollectionRef,
  //       // where("genres", "array-contains", filterByGenre), // Maintain genre filter
  //       // where("bookType", "==", filterByType), // Maintain bookType filter
  //       orderBy("createdAt", "desc"),
  //       startAfter(lastVisible),
  //       limit(PAGE_SIZE)
  //     );
  //   }

  //   const booksSnapshot = await getDocs(queryBooks);
  //   if (booksSnapshot.empty) {
  //     return { booksData: [], count, hasMore: false }; // No more documents
  //   }

  //   countSnapshot = booksSnapshot;
  // }

  // const booksSnapshot = await getDocs(queryBooks);
  // const booksData = booksSnapshot.docs.map(
  //   (doc) => ({ id: doc.id, ...doc.data() } as IBooks)
  // );

  // // hasMore = page * PAGE_SIZE < count; // Update hasMore after pagination with filters

  // return { booksData, count, hasMore: !booksSnapshot.empty };
};

const borrowersRequestBook = async (request: Partial<ICirculation>) => {
  console.log(request);

  const requestRef = await addDoc(
    collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.REQUEST_BOOK),
    {
      ...request,
      status: "Request",
    }
  );

  await addDoc(
    collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.ALL_BOOKS_TRANSACTION),
    {
      requestId: requestRef.id,
      booksId: request.booksId,
      bookTitle: request.bookTitle,
      bookISBN: request.bookISBN,
      borrowers: request.borrowers,
      borrowersId: request.borrowersId,
      bookType: request.bookType,
      borrowersEmail: request.borrowersEmail,
      firstName: request.firstName,
      middleName: request.middleName,
      lastName: request.lastName,
      booksPrice: request.bookPrice,
      status: "Request",
      createdAt: serverTimestamp(),
    }
  );
  const fullName = `${request.firstName} ${request.middleName} ${request.lastName}`;

  return axios({
    method: "POST",
    url: `${import.meta.env.VITE_SERVER_URL}api/v1/email/request-email`,
    data: {
      fullName,
      borrowersEmail: request.borrowersEmail,
      bookTitle: request.bookTitle,
    },
  });
};

const checkTransactionBorrow = async (booksId: string | undefined) => {
  const transactionsRef = await getDocs(
    query(
      collection(
        firestore,
        FIRESTORE_COLLECTION_QUERY_KEY.ALL_BOOKS_TRANSACTION
      ),
      // where("status", "!=", "Returned"),
      where("booksId", "==", booksId),
      where("borrowersId", "==", auth.currentUser?.uid)
    )
  );

  return transactionsRef.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as ICirculation[];
};

export { getBook, getAllBooks, borrowersRequestBook, checkTransactionBorrow };
