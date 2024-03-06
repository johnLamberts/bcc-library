import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  where,
  writeBatch,
} from "firebase/firestore";
import { firestore } from "src/shared/firebase/firebase";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import IBookType from "../models/book-type.interface";

const getAllBookType = async (): Promise<IBookType[]> => {
  const bookTypeDocs = await getDocs(
    collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.BOOK_TYPE)
  );

  return bookTypeDocs.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as IBookType[];
};

const addBookType = async (payload: Partial<IBookType>) => {
  try {
    const querySnapshot = await getDocs(
      query(
        collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.BOOK_TYPE),
        where("bookType", "==", payload.bookType)
      )
    );

    if (querySnapshot.size) {
      throw new Error(
        "Sorry, but it looks like the information you're trying to add already exists"
      );
    }

    await addDoc(
      collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.BOOK_TYPE),
      {
        ...payload,
        isArchived: false,
        createdAt: serverTimestamp(),
      }
    );
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const updateBookType = async (
  payload: Partial<IBookType>,
  docId?: string | undefined
) => {
  try {
    const booksRef = await getDocs(
      query(
        collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.CATALOGUE),
        where("bookType", "==", payload.types)
      )
    );

    const borrowsRef = await getDocs(
      query(
        collection(
          firestore,
          FIRESTORE_COLLECTION_QUERY_KEY.BORROW_TRANSACTION
        ),
        where("bookType", "==", payload.types)
      )
    );

    const requestRef = await getDocs(
      query(
        collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.REQUEST_BOOK),
        where("bookType", "==", payload.types)
      )
    );

    const reservedRef = await getDocs(
      query(
        collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.RESERVED_BOOK),
        where("bookType", "==", payload.types)
      )
    );

    const pendingPaymentRef = await getDocs(
      query(
        collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.PARTIAL_PAYMENT),
        where("bookType", "==", payload.types)
      )
    );

    if (
      pendingPaymentRef.size ||
      reservedRef.size ||
      requestRef.size ||
      borrowsRef.size
    ) {
      throw new Error(
        "We've noticed that there are still active data in our system.\n To ensure the integrity and accuracy of our records, we kindly request you to refrain from updating this data for now."
      );
    }

    const allTransactionRef = await getDocs(
      query(
        collection(
          firestore,
          FIRESTORE_COLLECTION_QUERY_KEY.ALL_BOOKS_TRANSACTION
        ),
        where("bookType", "==", payload.types),
        where("status", "==", "Returned")
      )
    );
    const completePaymentRef = await getDocs(
      query(
        collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.COMPLETE_PAYMENT),
        where("bookType", "==", payload.types),
        where("paymentStatus", "==", "Paid")
      )
    );

    const bookConditionRef = await getDocs(
      query(
        collection(
          firestore,
          FIRESTORE_COLLECTION_QUERY_KEY.BOOKS_RETURN_CONDITION
        ),
        where("bookType", "==", payload.types)
      )
    );
    const borowwersRef = await getDocs(
      query(
        collection(
          firestore,
          FIRESTORE_COLLECTION_QUERY_KEY.BORROWERS_HISTORY_TRANSACTION
        ),
        where("bookType", "==", payload.types)
      )
    );
    console.log(
      allTransactionRef.size,
      bookConditionRef.size,
      completePaymentRef.size,
      booksRef.size
    );

    const batch = writeBatch(firestore);

    batch.update(
      doc(firestore, FIRESTORE_COLLECTION_QUERY_KEY.BOOK_TYPE, docId as string),
      {
        ...payload,
        modifiedAt: serverTimestamp(),
      }
    );

    allTransactionRef.docs.forEach((docsId) =>
      batch.update(
        doc(
          firestore,
          FIRESTORE_COLLECTION_QUERY_KEY.ALL_BOOKS_TRANSACTION,
          docsId.id
        ),
        {
          bookType: payload.bookType,
        }
      )
    );

    completePaymentRef.docs.forEach((docsId) =>
      batch.update(
        doc(
          firestore,
          FIRESTORE_COLLECTION_QUERY_KEY.COMPLETE_PAYMENT,
          docsId.id
        ),
        {
          bookType: payload.bookType,
        }
      )
    );

    bookConditionRef.docs.forEach((docsId) =>
      batch.update(
        doc(
          firestore,
          FIRESTORE_COLLECTION_QUERY_KEY.BOOKS_RETURN_CONDITION,
          docsId.id
        ),
        {
          bookType: payload.bookType,
        }
      )
    );

    borowwersRef.docs.forEach((docsId) =>
      batch.update(
        doc(
          firestore,
          FIRESTORE_COLLECTION_QUERY_KEY.BORROWERS_HISTORY_TRANSACTION,
          docsId.id
        ),
        {
          bookType: payload.bookType,
        }
      )
    );

    booksRef.docs.forEach((docsId) =>
      batch.update(
        doc(firestore, FIRESTORE_COLLECTION_QUERY_KEY.CATALOGUE, docsId.id),
        {
          bookType: payload.bookType,
        }
      )
    );

    batch.commit();
  } catch (err) {
    throw new Error(`${err}`);
  }
};

export { getAllBookType, addBookType, updateBookType };
