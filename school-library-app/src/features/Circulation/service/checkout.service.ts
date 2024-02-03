import { collection, getDocs, query, where } from "firebase/firestore";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { firestore } from "src/shared/firebase/firebase";
import { ICirculation } from "../models/circulation.interface";

const getAllActiveDue = async () => {
  const activeDue = await getDocs(
    query(
      collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.BORROW_TRANSACTION),
      where("borrowStatus", "==", "Active")
    )
  );

  return activeDue.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as ICirculation[];
};

export { getAllActiveDue };
