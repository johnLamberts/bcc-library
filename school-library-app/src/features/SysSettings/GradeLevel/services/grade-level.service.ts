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
  writeBatch,
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
    const batch = writeBatch(firestore);

    // Teachers
    const teachersRef = await getDocs(
      query(
        collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.TEACHER),
        where("gradeLevel", "==", payload.level)
      )
    );

    // Students
    const studentsRef = await getDocs(
      query(
        collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.STUDENT),
        where("gradeLevel", "==", payload.level)
      )
    );

    //Grade Section
    const gradeSectionRef = await getDocs(
      query(
        collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.GRADE_SECTION),
        where("gradeLevel", "==", payload.level)
      )
    );

    studentsRef.docs.forEach(
      async (docs) =>
        await updateDoc(
          doc(firestore, FIRESTORE_COLLECTION_QUERY_KEY.STUDENT, docs.id),
          {
            gradeLevel: payload.gradeLevel,
          }
        )
    );

    gradeSectionRef.docs.forEach(
      async (docs) =>
        await updateDoc(
          doc(firestore, FIRESTORE_COLLECTION_QUERY_KEY.GRADE_SECTION, docs.id),
          {
            gradeLevel: payload.gradeLevel,
          }
        )
    );

    teachersRef.docs.forEach(
      async (docs) =>
        await updateDoc(
          doc(firestore, FIRESTORE_COLLECTION_QUERY_KEY.TEACHER, docs.id),
          {
            gradeLevel: payload.gradeLevel,
          }
        )
    );

    batch.update(
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

    batch.commit();
  } catch (err) {
    throw new Error(`${err}`);
  }
};

export { getAllGradeLevel, addGradeLevel, updateGradeLevel };
