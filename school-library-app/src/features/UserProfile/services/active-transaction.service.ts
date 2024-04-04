import { ICirculation } from "@features/Transaction/models/circulation.interface";
import { collection, getDocs, query, where } from "firebase/firestore";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { firestore } from "src/shared/firebase/firebase";

const getActiveTransaction = async (userUID: string) => {
  const activeTransactionRef = await getDocs(
    query(
      collection(
        firestore,
        FIRESTORE_COLLECTION_QUERY_KEY.ALL_BOOKS_TRANSACTION
      ),

      where("borrowersId", "==", userUID)
    )
  );

  return activeTransactionRef.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as ICirculation[];
};

export { getActiveTransaction };
