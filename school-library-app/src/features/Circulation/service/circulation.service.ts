import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { ICirculation } from "../models/circulation.interface";
import { firestore } from "src/shared/firebase/firebase";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";

const addBorrowCirculation = async (borrow: ICirculation) => {
  const borrowRef = await addDoc(
    collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.BORROW_TRANSACTION),
    {
      ...borrow,
      borrowStatus: "Check out",
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
      borrowersId: borrow.borrowersId,
      borrowersEmail: borrow.borrowersEmail,
      borrowersName: borrow.borrowersName,
      borrowersNumber: borrow.borrowersNumber,
      borrowStatus: "active",
    }
  );

  await addDoc(
    collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.ALL_BOOKS_TRANSACTION),
    {
      booksBorrowedId: borrowRef.id,
      expiryTime: borrow.timeDuration + new Date().getTime(),
      booksId: borrow.booksId,
      bookTitle: borrow.bookTitle,
      bookISBN: borrow.bookISBN,
      borrowers: borrow.borrowers,
      borrowersId: borrow.borrowersId,
      borrowersEmail: borrow.borrowersEmail,
      borrowersName: borrow.borrowersName,
      borrowersNumber: borrow.borrowersNumber,
      borrowStatus: "Check out",
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

export { addBorrowCirculation };
