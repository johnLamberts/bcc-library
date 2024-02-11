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
import ICategorySection from "../models/category-section.interface";

const getAllCategorySection = async (): Promise<ICategorySection[]> => {
  const categorySectionDocs = await getDocs(
    collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.CATEGORY_SECTION)
  );

  return categorySectionDocs.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as ICategorySection[];
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
    await updateDoc(
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
  } catch (err) {
    throw new Error(`${err}`);
  }
};

export { getAllCategorySection, addCategorySection, updateCategorySection };
