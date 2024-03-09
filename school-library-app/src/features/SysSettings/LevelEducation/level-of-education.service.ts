import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
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
      where("isArchived", "==", false)
    )
  );

  return bookTypeDocs.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as ILevelOfEducation[];
};

const getArchivedLevelOfEducation = async (): Promise<ILevelOfEducation[]> => {
  const bookTypeDocs = await getDocs(
    query(
      collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.LEVEL_OF_EDUCATION),
      where("isArchived", "==", true)
    )
  );

  return bookTypeDocs.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as ILevelOfEducation[];
};

const createArchiveLevelOfEducation = async (payload: ILevelOfEducation) => {
  const { isArchived, id } = payload;

  const levelOfEducationRef = doc(
    firestore,
    FIRESTORE_COLLECTION_QUERY_KEY.LEVEL_OF_EDUCATION,
    id as string
  );

  await updateDoc(levelOfEducationRef, {
    isArchived: isArchived ? false : true,
  });
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

const updateLevelOfducation = async (
  payload: Partial<ILevelOfEducation>,
  docId?: string | undefined
) => {
  console.log(payload);
  try {
    const batch = writeBatch(firestore);

    // Teachers
    const teachersRef = await getDocs(
      query(
        collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.TEACHER),
        where("levelOfEducation", "==", payload.education)
      )
    );

    // Students
    const studentsRef = await getDocs(
      query(
        collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.STUDENT),
        where("levelOfEducation", "==", payload.education)
      )
    );

    // Grade Level
    const gradeLevelRef = await getDocs(
      query(
        collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.GRADE_LEVEL),
        where("levelOfEducation", "==", payload.education)
      )
    );

    // Academic Course
    const academicCourseRef = await getDocs(
      query(
        collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.ACADEMIC_COURSE),
        where("levelOfEducation", "==", payload.education)
      )
    );

    gradeLevelRef.docs.forEach(
      async (docs) =>
        await updateDoc(
          doc(firestore, FIRESTORE_COLLECTION_QUERY_KEY.GRADE_LEVEL, docs.id),
          {
            levelOfEducation: payload.levelOfEducation,
          }
        )
    );

    academicCourseRef.docs.forEach(
      async (docs) =>
        await updateDoc(
          doc(
            firestore,
            FIRESTORE_COLLECTION_QUERY_KEY.ACADEMIC_COURSE,
            docs.id
          ),
          {
            levelOfEducation: payload.levelOfEducation,
          }
        )
    );

    studentsRef.docs.forEach(
      async (docs) =>
        await updateDoc(
          doc(firestore, FIRESTORE_COLLECTION_QUERY_KEY.STUDENT, docs.id),
          {
            levelOfEducation: payload.levelOfEducation,
          }
        )
    );

    teachersRef.docs.forEach(
      async (docs) =>
        await updateDoc(
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

export {
  getAllLevelOfEducation,
  addLevelOfEducation,
  updateLevelOfducation,
  getArchivedLevelOfEducation,
  createArchiveLevelOfEducation,
};
