import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
  writeBatch,
  FieldValue,
  arrayRemove,
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
    const batch = writeBatch(firestore);

    const booksRef = await getDocs(
      query(
        collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.CATALOGUE),
        where("authors", "array-contains-any", [payload.authorName])
      )
    );

    booksRef.docs.map((docs) => {
      const oldAuthors = docs
        .data()
        .authors.filter((item: string) => item !== payload.authorName);

      const newAuthors = [...oldAuthors, payload.bookAuthor];

      console.log(newAuthors);
      return batch.update(
        doc(firestore, FIRESTORE_COLLECTION_QUERY_KEY.CATALOGUE, docs.id),
        {
          authors: newAuthors,
        }
      );
    });

    batch.update(
      doc(firestore, FIRESTORE_COLLECTION_QUERY_KEY.AUTHOR, docId as string),
      {
        bookAuthor: payload.bookAuthor,
        updatedAt: serverTimestamp(),
      }
    );

    batch.commit();
  } catch (err) {
    throw new Error(`${err}`);
  }
};

export { getAllAuthor, addAuthor, updateAuthor };
