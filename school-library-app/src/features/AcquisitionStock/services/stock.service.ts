import {
  FirestoreError,
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { firestore } from "src/shared/firebase/firebase";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addStockCatalogueBook = async (books: Partial<Record<string, any>>) => {
  console.log(books);
  const {
    title,
    callNumber,
    bookISBN,
    qty,
    reason,
    bookStatus,
    numberOfBooksAvailable_QUANTITY,
  } = books;

  try {
    await addDoc(
      collection(
        firestore,
        FIRESTORE_COLLECTION_QUERY_KEY.STOCK_QTY_ACQUISITION
      ),
      {
        reason: reason,
        title,
        bookISBN,
        stockAdded: qty,
        callNumber,
        createdAt: serverTimestamp(),
      }
    );

    return await updateDoc(
      doc(
        firestore,
        FIRESTORE_COLLECTION_QUERY_KEY.CATALOGUE,
        books.id as string
      ),
      {
        numberOfBooksAvailable_QUANTITY:
          numberOfBooksAvailable_QUANTITY + Number(qty),

        bookStatus: bookStatus === "Out of Stock" ? "Active" : bookStatus,
      }
    );
  } catch (err) {
    if (err instanceof FirestoreError) {
      throw new Error(err.message);
    }
  }
};

export { addStockCatalogueBook };
