import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { firestore } from "src/shared/firebase/firebase";

const getAllRecentOverdue = async () => {
  const transactionRef = await getDocs(
    query(
      collection(
        firestore,
        FIRESTORE_COLLECTION_QUERY_KEY.ALL_BOOKS_TRANSACTION
      ),
      where("status", "==", "Overdue"),
      orderBy("createdAt", "asc"),
      limit(5)
    )
  );

  return transactionRef.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

const getAllTransaction = async () => {
  const getAllDocs = await getDocs(
    query(
      collection(
        firestore,
        FIRESTORE_COLLECTION_QUERY_KEY.ALL_BOOKS_TRANSACTION
      )
    )
  );

  return getAllDocs.size;
};

const getStudents = async () => {
  try {
    const querySnapshot = await getDocs(
      query(collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.STUDENT))
    );

    return querySnapshot.size;
  } catch (err) {
    throw new Error(`${err}`);
  }
};

const getTeachers = async () => {
  try {
    const querySnapshot = await getDocs(
      query(collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.TEACHER))
    );

    return querySnapshot.size;
  } catch (err) {
    throw new Error(`${err}`);
  }
};

export { getAllRecentOverdue, getTeachers, getStudents, getAllTransaction };
