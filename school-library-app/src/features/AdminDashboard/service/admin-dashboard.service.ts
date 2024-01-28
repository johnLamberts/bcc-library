import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { firestore } from "src/shared/firebase/firebase";

const getAllRecentOverdue = async () => {
  const getAllDocs = await getDocs(
    query(
      collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.BOOKS_OVERDUE),
      orderBy("createdAt", "desc"),
      limit(5)
    )
  );

  return getAllDocs.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export { getAllRecentOverdue };
