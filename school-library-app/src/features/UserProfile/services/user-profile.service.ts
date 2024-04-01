import { IStudents } from "@features/Student/models/student.interface";
import { FirebaseError } from "firebase/app";
import { collection, getDocs, query, where } from "firebase/firestore";
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

export { currentUserProfile };
