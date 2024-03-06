import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  where,
  writeBatch,
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
    const batch = writeBatch(firestore);

    const teachersRef = await getDocs(
      query(
        collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.TEACHER),
        where("levelOfEducation", "==", payload.education)
      )
    );

    const studentsRef = await getDocs(
      query(
        collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.STUDENT),
        where("levelOfEducation", "==", payload.education)
      )
    );

    studentsRef.docs.forEach((docs) =>
      batch.update(
        doc(firestore, FIRESTORE_COLLECTION_QUERY_KEY.STUDENT, docs.id),
        {
          levelOfEducation: payload.levelOfEducation,
        }
      )
    );

    teachersRef.docs.forEach((docs) =>
      batch.update(
        doc(firestore, FIRESTORE_COLLECTION_QUERY_KEY.TEACHER, docs.id),
        {
          levelOfEducation: payload.levelOfEducation,
        }
      )
    );

    batch.update(
      doc(
        firestore,
        FIRESTORE_COLLECTION_QUERY_KEY.LEVEL_OF_EDUCATION,
        docId as string
      ),
      {
        levelOfEducation: payload.levelOfEducation,
        updatedAt: serverTimestamp(),
      }
    );

    batch.commit();
  } catch (err) {
    throw new Error(`${err}`);
  }
};

export { getAllLevelOfEducation, addLevelOfEducation, updateLevelOfducation };
