import {
  addDoc,
  collection,
  doc,
  getDocs,
  or,
  query,
  serverTimestamp,
  where,
  writeBatch,
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
    const batch = writeBatch(firestore);

    const bookRef = await getDocs(
      query(
        collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.CATALOGUE),
        where("genres", "!=", [])
      )
    );

    bookRef.docs.map((docs) => {
      const oldAuthors = docs
        .data()
        .genres.filter((item: string) => item !== payload.genresName);

      const newAuthors = [...oldAuthors, payload.genres];

      return batch.update(
        doc(firestore, FIRESTORE_COLLECTION_QUERY_KEY.CATALOGUE, docs.id),
        {
          genres: newAuthors,
        }
      );
    });
    batch.update(
      doc(firestore, FIRESTORE_COLLECTION_QUERY_KEY.GENRE, docId as string),
      {
        genres: payload.genres,
        bookType: payload.bookType,
        updatedAt: serverTimestamp(),
      }
    );

    batch.commit();
  } catch (err) {
    throw new Error(`${err}`);
  }
};

export { getAllGenres, addGenre, updateGenre };
