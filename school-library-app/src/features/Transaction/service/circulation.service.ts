import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { ICirculation } from "../models/circulation.interface";
import { firestore } from "src/shared/firebase/firebase";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import axios from "axios";

const addBorrowCirculation = async (borrow: ICirculation) => {
  const borrowRef = await addDoc(
    collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.BORROW_TRANSACTION),
    {
      ...borrow,
      borrowStatus: "Active",
      expiryTime: borrow.timeDuration! + new Date().getTime(),
      returnStatus: "Due",
      createdAt: serverTimestamp(),
    }
  );

  await addDoc(
    collection(
      firestore,
      FIRESTORE_COLLECTION_QUERY_KEY.AVAILABILITY_TRANSACTION
    ),
    {
      booksBorrowedId: borrowRef.id,
      expiryTime: borrow.timeDuration + new Date().getTime(),
      booksId: borrow.booksId,
      bookTitle: borrow.bookTitle,
      bookISBN: borrow.bookISBN,
      borrowers: borrow.borrowers,
      bookType: borrow.bookType,
      borrowersId: borrow.borrowersId,
      borrowersEmail: borrow.borrowersEmail,
      borrowersName: borrow.borrowersName,
      borrowersNumber: borrow.borrowersNumber,
      returnStatus: "Due",
      borrowStatus: "Active",
    }
  );

  await addDoc(
    collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.ALL_BOOKS_TRANSACTION),
    {
      booksBorrowedId: borrowRef.id,
      expiryTime: borrow.timeDuration! + new Date().getTime(),
      booksId: borrow.booksId,
      bookTitle: borrow.bookTitle,
      bookISBN: borrow.bookISBN,
      borrowers: borrow.borrowers,
      borrowersId: borrow.borrowersId,
      bookType: borrow.bookType,
      borrowersEmail: borrow.borrowersEmail,
      borrowersName: borrow.borrowersName,
      borrowersNumber: borrow.borrowersNumber,
      returnStatus: "Due",
      borrowStatus: "Active",
      createdAt: serverTimestamp(),
    }
  );

  await updateDoc(
    doc(firestore, FIRESTORE_COLLECTION_QUERY_KEY.CATALOGUE, borrow.booksId),
    {
      numberOfBooksAvailable_QUANTITY:
        borrow.numberOfBooksAvailable_QUANTITY - 1,
    }
  );
};

const addBorrowTransaction = async (borrow: ICirculation) => {
  const borrowTransactionRef = await addDoc(
    collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.BORROW_TRANSACTION),
    {
      ...borrow,
      status: "Active",
      expiryTime: borrow.timeDuration + new Date().getTime(),
      dateBorrowed: serverTimestamp(),
    }
  );

  await addDoc(
    collection(
      firestore,
      FIRESTORE_COLLECTION_QUERY_KEY.AVAILABILITY_TRANSACTION
    ),
    {
      ...borrow,
      expiryTime: borrow.timeDuration + new Date().getTime(),
      booksBorrowedId: borrowTransactionRef.id,
      status: "Active",
    }
  );

  await addDoc(
    collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.ALL_BOOKS_TRANSACTION),
    {
      booksBorrowedId: borrowTransactionRef.id,
      expiryTime: borrow.timeDuration! + new Date().getTime(),
      booksId: borrow.booksId,
      bookTitle: borrow.bookTitle,
      bookISBN: borrow.bookISBN,
      borrowers: borrow.borrowers,
      borrowersId: borrow.borrowersId,
      bookType: borrow.bookType,
      borrowersEmail: borrow.borrowersEmail,
      borrowersName: borrow.borrowersName,
      borrowersNumber: borrow.borrowersNumber,
      booksPrice: borrow.bookPrice,
      status: "Active",
      createdAt: serverTimestamp(),
    }
  );

  await updateDoc(
    doc(firestore, FIRESTORE_COLLECTION_QUERY_KEY.CATALOGUE, borrow.booksId),
    {
      numberOfBooksAvailable_QUANTITY:
        borrow.numberOfBooksAvailable_QUANTITY - 1,
    }
  );
};

const returnOverdueCirculation = async (returnBook: Partial<ICirculation>) => {
  const transactionRef = await getDocs(
    query(
      collection(
        firestore,
        FIRESTORE_COLLECTION_QUERY_KEY.ALL_BOOKS_TRANSACTION
      ),
      where("booksBorrowedId", "==", returnBook.booksBorrowedId)
    )
  );

  transactionRef.docs.map(
    async (docId) =>
      await setDoc(
        doc(
          firestore,
          FIRESTORE_COLLECTION_QUERY_KEY.ALL_BOOKS_TRANSACTION,
          docId.id
        ),
        {
          ...returnBook,
          returnStatus: "Returned",
          createdAt: serverTimestamp(),
        }
      )
  );
  await deleteDoc(
    doc(
      firestore,
      FIRESTORE_COLLECTION_QUERY_KEY.BORROW_TRANSACTION,
      returnBook.booksBorrowedId as string
    )
  );

  const overdueRef = await getDocs(
    query(
      collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.BOOKS_OVERDUE),
      where("booksBorrowedId", "==", returnBook.booksBorrowedId)
    )
  );

  overdueRef.docs.map(
    async (docId) =>
      await deleteDoc(
        doc(firestore, FIRESTORE_COLLECTION_QUERY_KEY.BOOKS_OVERDUE, docId.id)
      )
  );

  return axios({
    method: "POST",
    url: `${import.meta.env.VITE_SERVER_URL}api/v1/email/return-overdue-email`,
    data: {
      ...returnBook,
    },
  });
};

const returnDueCirculation = async (returnBook: Partial<ICirculation>) => {
  await deleteDoc(
    doc(
      firestore,
      FIRESTORE_COLLECTION_QUERY_KEY.BORROW_TRANSACTION,
      returnBook.id as string
    )
  );

  const transactionRef = await getDocs(
    query(
      collection(
        firestore,
        FIRESTORE_COLLECTION_QUERY_KEY.ALL_BOOKS_TRANSACTION
      ),
      where("booksBorrowedId", "==", returnBook.id as string)
    )
  );

  transactionRef.docs.map(async (docId) =>
    setDoc(
      doc(
        firestore,
        FIRESTORE_COLLECTION_QUERY_KEY.ALL_BOOKS_TRANSACTION,
        docId.id
      ),
      { ...returnBook, returnStatus: "Returned", createdAt: serverTimestamp() }
    )
  );

  const availabilityRef = await getDocs(
    query(
      collection(
        firestore,
        FIRESTORE_COLLECTION_QUERY_KEY.AVAILABILITY_TRANSACTION
      ),
      where("booksBorrowedId", "==", returnBook.id)
    )
  );
  availabilityRef.docs.map(
    async (docId) =>
      await deleteDoc(
        doc(
          firestore,
          FIRESTORE_COLLECTION_QUERY_KEY.AVAILABILITY_TRANSACTION,
          docId.id
        )
      )
  );
  return axios({
    method: "POST",
    url: `${import.meta.env.VITE_SERVER_URL}api/v1/email/return-email`,
    data: {
      ...returnBook,
    },
  });
};

const getBooksTransaction = async () => {
  const booksTransactionRef = await getDocs(
    query(
      collection(
        firestore,
        FIRESTORE_COLLECTION_QUERY_KEY.ALL_BOOKS_TRANSACTION
      )
    )
  );

  return booksTransactionRef.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as ICirculation[];
};

const getBooksBorrowed = async () => {
  const booksTransactionRef = await getDocs(
    query(
      collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.BORROW_TRANSACTION)
    )
  );

  return booksTransactionRef.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as ICirculation[];
};

export {
  addBorrowCirculation,
  //* NOTE: New implementation of Borrow Transaction. Simplified.
  addBorrowTransaction,
  returnOverdueCirculation,
  returnDueCirculation,

  /**
   **  NOTE: Read all books Transaction
   **  whereas STATUS can be `returned`,
   **  `active`, `overdue`, and `request`
   *
   */
  getBooksTransaction,
  getBooksBorrowed,
};
