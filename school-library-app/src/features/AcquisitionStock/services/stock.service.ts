import { IBooks } from "@features/Catalogue/models/books.interface";
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

const addStockCatalogueBook = async (
  books: Partial<Record<string, unknown>>
) => {
  const { title, callNumber, bookISBN } = books;

  console.log(books.id);
  try {
    await addDoc(
      collection(
        firestore,
        FIRESTORE_COLLECTION_QUERY_KEY.STOCK_QTY_ACQUISITION
      ),
      {
        reasons: books.reasons,
        title,
        bookISBN,
        stockAdded: books.qty,
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
        numberOfBooksAvailable_QUANTITY: books.qty,

        status:
          books.bookStatus === "Out of stock" ? "Active" : books.bookStatus,
      }
    );

    console.log({
      status: books.bookStatus === "Out of stock" ? "Active" : books.bookStatus,
    });
  } catch (err) {
    if (err instanceof FirestoreError) {
      throw new Error(err.message);
    }
  }
};

export { addStockCatalogueBook };
