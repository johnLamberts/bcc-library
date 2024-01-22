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
import IAuthor from "../models/book-author.interface";

const getAllAuthor = async (): Promise<IAuthor[]> => {
  const bookTypeDocs = await getDocs(
    collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.AUTHOR)
  );

  return bookTypeDocs.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as IAuthor[];
};

const addAuthor = async (payload: Partial<IAuthor>) => {
  try {
    const querySnapshot = await getDocs(
      query(
        collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.AUTHOR),
        where("bookAuthor", "==", payload.bookAuthor)
      )
    );

    if (querySnapshot.size) {
      throw new Error(
        "Sorry, but it looks like the information you're trying to add already exists"
      );
    }

    await addDoc(collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.AUTHOR), {
      ...payload,
      isArchived: false,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    throw new Error(`${error}`);
  }
};

//
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateAuthor = async (
  payload: Partial<IAuthor>,
  docId?: string | undefined
) => {
  try {
    await updateDoc(
      doc(firestore, FIRESTORE_COLLECTION_QUERY_KEY.AUTHOR, docId as string),
      {
        ...payload,
        updatedAt: serverTimestamp(),
      }
    );
  } catch (err) {
    throw new Error(`${err}`);
  }
};

export { getAllAuthor, addAuthor, updateAuthor };
