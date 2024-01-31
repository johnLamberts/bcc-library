import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import IReturnCondition from "../model/return-condition.interface";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { firestore } from "src/shared/firebase/firebase";

const addReturnCondition = async (condition: IReturnCondition) => {
  return await addDoc(
    collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.RETURNED_CONDITION),
    {
      ...condition,
      createdAt: serverTimestamp(),
    }
  );
};

const getReturnConditions = async () => {
  const returnConditionRef = await getDocs(
    query(
      collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.RETURNED_CONDITION)
    )
  );

  return returnConditionRef.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as IReturnCondition[];
};

const updateReturnCondition = async (condition: IReturnCondition) => {
  return await updateDoc(
    doc(
      firestore,
      FIRESTORE_COLLECTION_QUERY_KEY.RETURNED_CONDITION,
      condition.id as string
    ),
    {
      ...condition,
      modifiedAt: serverTimestamp(),
    }
  );
};

export { addReturnCondition, getReturnConditions, updateReturnCondition };
