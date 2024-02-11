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
import IDamagedCategory from "../model/damaged-category.interface";

const getAllDamagedCategory = async (): Promise<IDamagedCategory[]> => {
  const categorySectionDocs = await getDocs(
    collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.DAMAGE_CATEGORY)
  );

  return categorySectionDocs.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as IDamagedCategory[];
};

const addDamagedCategory = async (damaged: IDamagedCategory) => {
  try {
    const querySnapshot = await getDocs(
      query(
        collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.DAMAGE_CATEGORY),
        where("damagedCategory", "==", damaged.damagedCategory)
      )
    );

    if (querySnapshot.size) {
      throw new Error(
        "Sorry, but it looks like the information you're trying to add already exists"
      );
    }

    await addDoc(
      collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.DAMAGE_CATEGORY),
      {
        ...damaged,
        isArchived: false,
        createdAt: serverTimestamp(),
      }
    );
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const updateDmagedCategory = async (
  payload: Partial<IDamagedCategory>,
  docId: string | undefined
) => {
  try {
    await updateDoc(
      doc(
        firestore,
        FIRESTORE_COLLECTION_QUERY_KEY.DAMAGE_CATEGORY,
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

export { addDamagedCategory, getAllDamagedCategory, updateDmagedCategory };
