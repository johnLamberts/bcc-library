import { ICirculation } from "@features/Transaction/models/circulation.interface";
import { getDocs, query, collection } from "firebase/firestore";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { firestore } from "src/shared/firebase/firebase";

const getBooksReportTransaction = async () => {
  const booksTransactionRef = await getDocs(
    query(
      collection(
        firestore,
        FIRESTORE_COLLECTION_QUERY_KEY.ALL_BOOKS_TRANSACTION
      )
    )
  );

  return booksTransactionRef.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as ICirculation[];
};

export { getBooksReportTransaction };
