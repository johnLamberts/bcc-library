import { ICirculation } from "@features/Transaction/models/circulation.interface";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { firestore } from "src/shared/firebase/firebase";

const getAllCompletePaymentReport = async () => {
  const conditionRef = await getDocs(
    query(
      collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.COMPLETE_PAYMENT),
      orderBy("createdAt", "asc")
    )
  );

  return conditionRef.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as ICirculation[];
};

export { getAllCompletePaymentReport };
