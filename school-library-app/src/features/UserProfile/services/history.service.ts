import { collection, getDocs, query, where } from "firebase/firestore";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { firestore } from "src/shared/firebase/firebase";

const getHistory = async (userId?: string) => {
  const borrowersHistoryRef = await getDocs(
    query(
      collection(
        firestore,
        FIRESTORE_COLLECTION_QUERY_KEY.BORROWERS_HISTORY_TRANSACTION
      ),
      where("borrowersId", "==", userId)
    )
  );

  const paymentsRef = await getDocs(
    query(
      collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.COMPLETE_PAYMENT),
      where("borrowersId", "==", userId)
    )
  );

  const borrowers = borrowersHistoryRef.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const payments = paymentsRef.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return [...payments, ...borrowers];
};

export { getHistory };
