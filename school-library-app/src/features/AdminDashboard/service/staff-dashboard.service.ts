/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  and,
  collection,
  getDocs,
  or,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { firestore } from "src/shared/firebase/firebase";

const readAllRecentlyAddedBorrowers = async () => {
  const transactionsCollection = collection(
    firestore,
    FIRESTORE_COLLECTION_QUERY_KEY.USERS
  );

  // Query transactions for today
  const q = query(
    transactionsCollection,
    or(where("userRole", "==", "Student"), where("userRole", "==", "Teacher")) // Filter transactions after start of today
  );

  const querySnapshot = await getDocs(q);

  const borrowers = querySnapshot.docs.map((doc) => {
    //  console.log(    doc.data().createdAt.toDate(),
    // )
    return {
      ...doc.data(),
      id: doc.id,
    };
  }) as Record<string, any>[];
  return borrowers;
};

export { readAllRecentlyAddedBorrowers };
