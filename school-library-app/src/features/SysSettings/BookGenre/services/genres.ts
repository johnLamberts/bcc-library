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
import IGenre from "../models/genres";
import { firestore } from "src/shared/firebase/firebase";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";

const getAllGenres = async (): Promise<IGenre[]> => {
  const userRoleDocs = await getDocs(
    collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.GENRE)
  );

  return userRoleDocs.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as IGenre[];
};

const addGenre = async (payload: Partial<IGenre>) => {
  try {
    const querySnapshot = await getDocs(
      query(
        collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.GENRE),
        where("genres", "==", payload.genres)
      )
    );

    if (querySnapshot.size) {
      throw new Error(
        "Sorry, but it looks like the information you're trying to add already exists"
      );
    }

    await addDoc(collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.GENRE), {
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
const updateGenre = async (
  payload: Partial<IGenre>,
  docId?: string | undefined
) => {
  try {
    // await updateDoc(
    //   doc(firestore, FIRESTORE_COLLECTION_QUERY_KEY.GENRE, docId as string),
    //   {
    //     ...payload,
    //     updatedAt: serverTimestamp(),
    //   }
    // );

    console.log(payload, docId);
  } catch (err) {
    throw new Error(`${err}`);
  }
};

export { getAllGenres, addGenre, updateGenre };
