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
import TUserRole from "../models/user-role.interface";
import { firestore } from "src/shared/firebase/firebase";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";

const getAllUserRole = async (): Promise<TUserRole[]> => {
  const userRoleDocs = await getDocs(
    collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.USER_ROLE)
  );

  return userRoleDocs.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as TUserRole[];
};

const addUserRole = async (payload: Partial<TUserRole>) => {
  try {
    const querySnapshot = await getDocs(
      query(
        collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.USER_ROLE),
        where("userRole", "==", payload.userRole)
      )
    );

    if (querySnapshot.size) {
      throw new Error(
        "Sorry, but it looks like the information you're trying to add already exists"
      );
    }

    await addDoc(
      collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.USER_ROLE),
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
const updateUserRole = async (
  payload: Partial<TUserRole>,
  docId?: string | undefined
) => {
  try {
    await updateDoc(
      doc(firestore, FIRESTORE_COLLECTION_QUERY_KEY.USER_ROLE, docId as string),
      {
        ...payload,
        updatedAt: serverTimestamp(),
      }
    );

    console.log(payload, docId);
  } catch (err) {
    throw new Error(`${err}`);
  }
};

export { getAllUserRole, addUserRole, updateUserRole };
