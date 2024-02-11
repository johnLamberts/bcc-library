import {
  getDocs,
  query,
  collection,
  where,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
} from "firebase/firestore";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { firestore } from "src/shared/firebase/firebase";
import IMissingCategory from "../model/missing-category.interface";

const getAllMissingCategory = async (): Promise<IMissingCategory[]> => {
  const categorySectionDocs = await getDocs(
    collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.MISSING_CATEGORY)
  );

  return categorySectionDocs.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as IMissingCategory[];
};

const addMissingCategory = async (missing: IMissingCategory) => {
  try {
    const querySnapshot = await getDocs(
      query(
        collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.MISSING_CATEGORY),
        where("missingCategory", "==", missing.missingCategory)
      )
    );

    if (querySnapshot.size) {
      throw new Error(
        "Sorry, but it looks like the information you're trying to add already exists"
      );
    }

    await addDoc(
      collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.MISSING_CATEGORY),
      {
        ...missing,
        isArchived: false,
        createdAt: serverTimestamp(),
      }
    );
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const updateMissingCategory = async (
  payload: Partial<IMissingCategory>,
  docId: string | undefined
) => {
  try {
    await updateDoc(
      doc(
        firestore,
        FIRESTORE_COLLECTION_QUERY_KEY.MISSING_CATEGORY,
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

export { addMissingCategory, getAllMissingCategory, updateMissingCategory };
