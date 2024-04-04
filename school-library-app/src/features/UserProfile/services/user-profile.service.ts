import { IStudents } from "@features/Student/models/student.interface";
import { FirebaseError } from "firebase/app";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { firestore } from "src/shared/firebase/firebase";

const currentUserProfile = async (
  userRole: string | undefined,
  userUID: string | undefined
) => {
  try {
    if (userRole === "Student") {
      const studentRef = await getDocs(
        query(
          collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.STUDENT),
          where("userUID", "==", userUID)
        )
      );

      return studentRef.docs
        .map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as IStudents)
        )
        .at(0);
    }
  } catch (err) {
    throw new Error(`${(err as FirebaseError).message}`);
  }
};

const usersFavoriteCheck = async (userId: string, booksId: string) => {
  const favoriteRef = await getDocs(
    query(
      collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.ADD_TO_FAVORITES),
      where("userId", "==", userId),
      where("booksId", "==", booksId)
    )
  );

  return favoriteRef.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
};

const usersRemoveFavoriteCheck = async (userId: string, booksId: string) => {
  const favoriteRef = await getDocs(
    query(
      collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.ADD_TO_FAVORITES),
      where("userId", "==", userId),
      where("booksId", "==", booksId)
    )
  );

  return favoriteRef.docs.forEach(
    async (docId) =>
      await deleteDoc(
        doc(
          firestore,
          FIRESTORE_COLLECTION_QUERY_KEY.ADD_TO_FAVORITES,
          docId.id as string
        )
      )
  );
};

export { currentUserProfile, usersFavoriteCheck, usersRemoveFavoriteCheck };
