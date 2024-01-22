import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
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

//
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateBookType = async (
  payload: Partial<IBookType>,
  docId?: string | undefined
) => {
  try {
    await updateDoc(
      doc(firestore, FIRESTORE_COLLECTION_QUERY_KEY.BOOK_TYPE, docId as string),
      {
        ...payload,
        updatedAt: serverTimestamp(),
      }
    );
  } catch (err) {
    throw new Error(`${err}`);
  }
};

export { getAllBookType, addBookType, updateBookType };
