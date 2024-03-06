import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { firestore } from "src/shared/firebase/firebase";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import ILevelOfEducation from "./level-of-education.interface";

const getAllLevelOfEducation = async (): Promise<ILevelOfEducation[]> => {
  const bookTypeDocs = await getDocs(
    query(
      collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.LEVEL_OF_EDUCATION),
      orderBy("createdAt", "asc")
    )
  );

  return bookTypeDocs.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as ILevelOfEducation[];
};

const addLevelOfEducation = async (payload: Partial<ILevelOfEducation>) => {
  try {
    const querySnapshot = await getDocs(
      query(
        collection(
          firestore,
          FIRESTORE_COLLECTION_QUERY_KEY.LEVEL_OF_EDUCATION
        ),
        where("levelOfEducation", "==", payload.levelOfEducation)
      )
    );

    if (querySnapshot.size) {
      throw new Error(
        "Sorry, but it looks like the information you're trying to add already exists"
      );
    }

    await addDoc(
      collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.LEVEL_OF_EDUCATION),
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
const updateLevelOfducation = async (
  payload: Partial<ILevelOfEducation>,
  docId?: string | undefined
) => {
  try {
    await updateDoc(
      doc(
        firestore,
        FIRESTORE_COLLECTION_QUERY_KEY.LEVEL_OF_EDUCATION,
        docId as string
      ),
      {
        ...payload,
        updatedAt: serverTimestamp(),
      }
    );
  } catch (err) {
    throw new Error(`${err}`);
  }
};

export { getAllLevelOfEducation, addLevelOfEducation, updateLevelOfducation };
