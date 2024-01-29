import {
  DocumentData,
  QuerySnapshot,
  collection,
  getDocs,
  query,
} from "firebase/firestore";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { firestore } from "src/shared/firebase/firebase";
import { ICirculation } from "../models/circulation.interface";

const getAllOverdues = async () => {
  const overdues = await getDocs(
    query(collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.BOOKS_OVERDUE))
  );

  return overdues.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export { getAllOverdues };
