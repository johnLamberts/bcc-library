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
import IGradeSection from "./grade-level.interface";

const getAllLevelOfEducation = async (): Promise<IGradeSection[]> => {
  const bookTypeDocs = await getDocs(
    collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.GRADE_SECTION)
  );

  return bookTypeDocs.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as IGradeSection[];
};

const addLevelOfEducation = async (payload: Partial<IGradeSection>) => {
  try {
    const querySnapshot = await getDocs(
      query(
        collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.GRADE_SECTION),
        where("gradeSection", "==", payload.gradeSection)
      )
    );

    if (querySnapshot.size) {
      throw new Error(
        "Sorry, but it looks like the information you're trying to add already exists"
      );
    }

    await addDoc(
      collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.GRADE_SECTION),
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
  payload: Partial<IGradeSection>,
  docId?: string | undefined
) => {
  try {
    await updateDoc(
      doc(
        firestore,
        FIRESTORE_COLLECTION_QUERY_KEY.GRADE_SECTION,
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
