import { IBooks } from "@features/Catalogue/models/books.interface";
import { getDocs, collection, query, orderBy } from "firebase/firestore";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { firestore } from "src/shared/firebase/firebase";

const getAllBooksByInventory = async () => {
  const booksCatalogueSnapshot = await getDocs(
    query(
      collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.CATALOGUE),
      orderBy("createdAt", "asc")
    )
  );

  return booksCatalogueSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as IBooks[];
};

export { getAllBooksByInventory };
