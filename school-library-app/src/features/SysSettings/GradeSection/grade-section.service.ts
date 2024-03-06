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
import IGradeSection from "./grade-section.interface";

const getAllGradeSection = async (): Promise<IGradeSection[]> => {
  const bookTypeDocs = await getDocs(
    query(
      collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.GRADE_SECTION),
      orderBy("createdAt", "asc")
    )
  );

  return bookTypeDocs.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as IGradeSection[];
};

const addGradeSection = async (payload: Partial<IGradeSection>) => {
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
const updateGradeSection = async (
  payload: Partial<IGradeSection>,
  docId?: string | undefined
) => {
  console.log(payload);
  try {
    const batch = writeBatch(firestore);

    const teachersRef = await getDocs(
      query(
        collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.TEACHER),
        where("gradeSection", "==", payload.section)
      )
    );

    const studentsRef = await getDocs(
      query(
        collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.STUDENT),
        where("gradeSection", "==", payload.section)
      )
    );

    studentsRef.docs.forEach((docs) =>
      batch.update(
        doc(firestore, FIRESTORE_COLLECTION_QUERY_KEY.STUDENT, docs.id),
        {
          gradeSection: payload.gradeSection,
        }
      )
    );

    teachersRef.docs.forEach((docs) =>
      batch.update(
        doc(firestore, FIRESTORE_COLLECTION_QUERY_KEY.TEACHER, docs.id),
        {
          gradeSection: payload.gradeSection,
        }
      )
    );

    batch.update(
      doc(
        firestore,
        FIRESTORE_COLLECTION_QUERY_KEY.GRADE_SECTION,
        docId as string
      ),
      {
        gradeLevel: payload.gradeLevel,
        gradeSection: payload.gradeSection,
        updatedAt: serverTimestamp(),
      }
    );

    batch.commit();

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

export { getAllGradeSection, addGradeSection, updateGradeSection };
