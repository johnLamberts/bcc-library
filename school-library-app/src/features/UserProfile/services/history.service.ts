import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { firestore } from "src/shared/firebase/firebase";

const getHistory = async (userId?: string) => {
  console.log("userId in service " + userId);
  const borrowersHistoryRef = await getDocs(
    query(
      collection(
        firestore,
        FIRESTORE_COLLECTION_QUERY_KEY.BORROWERS_HISTORY_TRANSACTION
      ),
      where("borrowersId", "==", userId)
    )
  );

  return borrowersHistoryRef.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export { getHistory };
