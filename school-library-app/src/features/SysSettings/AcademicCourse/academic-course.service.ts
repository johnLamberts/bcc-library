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
import IAcademicCourse from "./academic-course.interface";

const getAllAcademicCourse = async (): Promise<IAcademicCourse[]> => {
  const AcademicCourseDocs = await getDocs(
    query(
      collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.ACADEMIC_COURSE),
      orderBy("createdAt", "asc")
    )
  );

  return AcademicCourseDocs.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as IAcademicCourse[];
};

const addAcademicCourse = async (payload: Partial<IAcademicCourse>) => {
  try {
    const querySnapshot = await getDocs(
      query(
        collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.ACADEMIC_COURSE),
        where("AcademicCourse", "==", payload.academicCourse)
      )
    );

    if (querySnapshot.size) {
      throw new Error(
        "Sorry, but it looks like the information you're trying to add already exists"
      );
    }

    await addDoc(
      collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.ACADEMIC_COURSE),
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
const updateAcademicCourse = async (
  payload: Partial<IAcademicCourse>,
  docId?: string | undefined
) => {
  try {
    await updateDoc(
      doc(
        firestore,
        FIRESTORE_COLLECTION_QUERY_KEY.ACADEMIC_COURSE,
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

export { getAllAcademicCourse, addAcademicCourse, updateAcademicCourse };
