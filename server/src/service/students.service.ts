import * as admin from "firebase-admin";
import { TStudents } from "../types/users";
import {
  generateStudentNumber,
  makeUserName,
  randomizeString,
} from "../helper/utils";

const getAllStudents = async () => {
  const snapshot = await admin.firestore().collection("students").get();

  return snapshot.docs.map((docs) => {
    return {
      id: docs.id,
      ...docs.data(),
    };
  });
};

const createStudent = async (student: TStudents) => {
  const studentNumberSnapshot = await admin
    .firestore()
    .collection("students")
    .where("studentNumber", "==", student.studentNumber)
    .get();

  if (studentNumberSnapshot.size) {
    throw new Error("Student Number were already existed.");
  }

  const userRef = await admin.auth().createUser({
    email: student.email,
    emailVerified: false,
    displayName: randomizeString(
      `${student.firstName} ${student.middleName} ${student.lastName}`
    ),
    password: student.password,
    photoURL: student.studentImage,
    disabled: false,
  });
  const usersDoc = await admin
    .firestore()
    .collection("users")
    .add({
      firstName: student.firstName,
      lastName: student.lastName,
      middleName: student.middleName,
      email: student.email,
      password: student.password,
      displayName: randomizeString(
        `${student.firstName} ${student.middleName} ${student.lastName}`
      ),
      avatarImage: student.studentImage,
      userRole: "Student",
      userUID: userRef.uid,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      isArchived: false,
      isEnabled: true,
    });
  return await admin
    .firestore()
    .collection("students")
    .add({
      ...student,
      gradeSection: student.gradeSection || "",
      gradeLevel: student.gradeLevel || "",
      academicCourse: student.academicCourse || "",
      studentImage: student.studentImage,
      displayName: randomizeString(
        `${student.firstName} ${student.middleName} ${student.lastName}`
      ),
      userUID: userRef.uid,
      userDocID: usersDoc.id,
      userRole: "Student",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      isArchived: false,
      isEnabled: true,
    });
};

const importStudents = async (students: TStudents[]) => {
  let defaultPassword = "LMS2023";

  for (const student of students) {
    if (student.password === "" || !student.password) {
      student.password = defaultPassword;
    }
    const studentNumberSnapshot = await admin
      .firestore()
      .collection("students")
      .where("studentNumber", "==", student.studentNumber)
      .get();

    if (studentNumberSnapshot.size) {
      throw new Error("Student Number were already existed.");
    }

    const userRef = await admin.auth().createUser({
      email: student.email,
      emailVerified: false,
      displayName: makeUserName(7),
      password: student.password,
      photoURL: student.studentImage,
      disabled: false,
    });

    const usersDoc = await admin
      .firestore()
      .collection("users")
      .add({
        firstName: student.firstName,
        lastName: student.lastName,
        middleName: student.middleName,

        email: student.email,
        password: student.password,
        displayName: makeUserName(7),

        avatarImage: student.studentImage,
        userRole: "Student",
        userUID: userRef.uid,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        isArchived: false,
        isEnabled: true,
      });

    await admin
      .firestore()
      .collection("students")
      .add({
        ...student,
        // studentEntry: Number(student.studentEntry),
        studentImage: student.studentImage,
        userUID: userRef.uid,
        userDocID: usersDoc.id,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        isArchived: false,
        isEnabled: true,
      });
  }
};

const updateStudent = async ({
  userDocID,
  userUID,
  id: docId,
  ...student
}: TStudents) => {
  await admin
    .firestore()
    .doc(`students/${docId}`)
    .update({
      ...student,
      studentImage: student.studentImage,
      modifiedAt: admin.firestore.FieldValue.serverTimestamp(),
      isArchived: false,
    });

  await admin.auth().updateUser(userUID as string, {
    email: student.email,
    emailVerified: false,
    password: student.password,
    photoURL: student.studentImage,
    disabled: false,
  });

  return await admin.firestore().doc(`users/${userDocID}`).update({
    firstName: student.firstName,
    lastName: student.lastName,
    middleName: student.middleName,

    email: student.email,
    password: student.password,
    displayName: student.displayName,

    avatarImage: student.studentImage,
    userRole: "Student",
    modifiedAt: admin.firestore.FieldValue.serverTimestamp(),
    isArchived: false,
  });
};

const updateStudentStatus = async (
  status: boolean,
  userUID: string,
  userId: string,
  studentId: string
) => {
  // console.log(users);
  await admin.auth().updateUser(userUID, {
    disabled: status,
  });

  await admin.firestore().doc(`users/${userId}`).update({
    isEnabled: status,
    modifiedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  return await admin.firestore().doc(`students/${studentId}`).update({
    isEnabled: status,
    modifiedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
};

export const StudentService = {
  createStudent,
  getAllStudents,
  updateStudent,
  importStudents,
  updateStudentStatus,
};
