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
import ICategorySection from "../models/category-section.interface";

const getAllCategorySection = async (): Promise<ICategorySection[]> => {
  const categorySectionDocs = await getDocs(
    query(
      collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.CATEGORY_SECTION),
      where("isArchived", "==", false)
    )
  );

  return categorySectionDocs.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as ICategorySection[];
};

const getArchiveCategorySection = async (): Promise<ICategorySection[]> => {
  const categorySectionDocs = await getDocs(
    query(
      collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.CATEGORY_SECTION),
      where("isArchived", "==", true)
    )
  );

  return categorySectionDocs.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as ICategorySection[];
};

const createArchiveCategorySection = async (payload: ICategorySection) => {
  const { isArchived, id } = payload;

  const genresRef = doc(
    firestore,
    FIRESTORE_COLLECTION_QUERY_KEY.CATEGORY_SECTION,
    id as string
  );

  await updateDoc(genresRef, {
    isArchived: isArchived ? false : true,
  });
};

const addCategorySection = async (payload: Partial<ICategorySection>) => {
  try {
    const querySnapshot = await getDocs(
      query(
        collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.CATEGORY_SECTION),
        where("categorySection", "==", payload.categorySection)
      )
    );

    if (querySnapshot.size) {
      throw new Error(
        "Sorry, but it looks like the information you're trying to add already exists"
      );
    }

    await addDoc(
      collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.CATEGORY_SECTION),
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateCategorySection = async (
  payload: Partial<ICategorySection>,
  docId?: string | undefined
) => {
  try {
    const batch = writeBatch(firestore);

    const booksRef = await getDocs(
      query(
        collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.CATALOGUE),
        where("bookSection", "==", payload.categoryName)
      )
    );

    booksRef.docs.forEach((docs) =>
      batch.update(
        doc(firestore, FIRESTORE_COLLECTION_QUERY_KEY.CATALOGUE, docs.id),
        {
          bookSection: payload.categorySection,
        }
      )
    );

    batch.update(
      doc(
        firestore,
        FIRESTORE_COLLECTION_QUERY_KEY.CATEGORY_SECTION,
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

export {
  getAllCategorySection,
  getArchiveCategorySection,
  createArchiveCategorySection,
  addCategorySection,
  updateCategorySection,
};
