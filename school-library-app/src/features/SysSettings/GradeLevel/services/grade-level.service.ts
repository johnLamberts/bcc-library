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
import IGradeLevel from "../grade-level.interface";

const getAllGradeLevel = async (): Promise<IGradeLevel[]> => {
  const GradeLevelDocs = await getDocs(
    query(
      collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.GRADE_LEVEL),
      orderBy("createdAt", "asc")
    )
  );

  return GradeLevelDocs.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as IGradeLevel[];
};

const addGradeLevel = async (payload: Partial<IGradeLevel>) => {
  try {
    const querySnapshot = await getDocs(
      query(
        collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.GRADE_LEVEL),
        where("gradeLevel", "==", payload.gradeLevel)
      )
    );

    if (querySnapshot.size) {
      throw new Error(
        "Sorry, but it looks like the information you're trying to add already exists"
      );
    }

    await addDoc(
      collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.GRADE_LEVEL),
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
const updateGradeLevel = async (
  payload: Partial<IGradeLevel>,
  docId?: string | undefined
) => {
  try {
    await updateDoc(
      doc(
        firestore,
        FIRESTORE_COLLECTION_QUERY_KEY.GRADE_LEVEL,
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

export { getAllGradeLevel, addGradeLevel, updateGradeLevel };
