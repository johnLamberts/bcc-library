import { IUser } from "@features/Users/models/user.interface";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { auth, firestore } from "src/shared/firebase/firebase";

const login = async (email: string, password: string) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);

    const userRef = await getDocs(
      query(
        collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.USERS),
        where("userUID", "==", user.uid)
      )
    );

    return userRef.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      } as IUser;
    });
  } catch (err) {
    if (err instanceof FirebaseError) {
      throw new Error(err.message);
    }
  }
};

const getCurrentUser = async () => {
  const userRef = await getDocs(
    query(
      collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.USERS),
      where("userUID", "==", auth.currentUser!.uid)
    )
  );

  return userRef.docs.map(async (doc) => {
    //     const userRole = doc.data().userRole;

    //     if (userRole === "Student") {
    //       const studentRef = await getDocs(
    //         query(
    //           collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.STUDENT),
    //           where("userUID", "==", auth.currentUser!.uid)
    //         )
    //       );

    //       return studentRef.docs.map(
    //         (docStudent) =>
    //           ({
    //             id: docStudent.id,
    //             ...docStudent.data(),
    //           } as IStudents)
    //       );
    //     } else if (userRole === "Teacher") {
    //       const teacherRef = await getDocs(
    //         query(
    //           collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.TEACHER),
    //           where("userUID", "==", auth.currentUser!.uid)
    //         )
    //       );

    //       return teacherRef.docs.map(
    //         (docTeacher) =>
    //           ({
    //             id: docTeacher.id,
    //             ...docTeacher.data(),
    //           } as ITeacher)
    //       );
    //     } else {
    return {
      id: doc.id,
      ...doc.data(),
    } as IUser;
    //     }
  })[0];
};

const logout = async () => {
  return await auth.signOut();
};

export { login, getCurrentUser, logout };
