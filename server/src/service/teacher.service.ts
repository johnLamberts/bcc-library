import * as admin from "firebase-admin";
import { TStudents, TTeacher } from "../types/users";
import { makeUserName, randomizeString } from "../helper/utils";

const getAllTeachers = async () => {
  const snapshot = await admin
    .firestore()
    .collection("teachers")
    .orderBy("createdAt", "desc")
    .get();

  return snapshot.docs.map((docs) => {
    return {
      id: docs.id,
      ...docs.data(),
    };
  });
};

const createTeacher = async (teacher: TTeacher) => {
  const teacherNumberSnapshot = await admin
    .firestore()
    .collection("teachers")
    .where("teacherNumber", "==", teacher.teacherNumber)
    .get();

  if (teacherNumberSnapshot.size) {
    throw new Error("Teacher Number were already existed.");
  }

  const userRef = await admin.auth().createUser({
    email: teacher.email,
    emailVerified: false,
    displayName: randomizeString(
      `${teacher.firstName} ${teacher.middleName} ${teacher.lastName}`
    ),
    password: teacher.password,
    photoURL: teacher.teacherImage,
    disabled: false,
  });

  const usersDoc = await admin
    .firestore()
    .collection("users")
    .add({
      firstName: teacher.firstName,
      lastName: teacher.lastName,
      middleName: teacher.middleName,

      email: teacher.email,
      password: teacher.password,
      displayName: randomizeString(
        `${teacher.firstName} ${teacher.middleName} ${teacher.lastName}`
      ),

      avatarImage: teacher.teacherImage,
      userRole: "Teacher",
      userUID: userRef.uid,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      isArchived: false,
      isEnabled: true,
    });

  return await admin
    .firestore()
    .collection("teachers")
    .add({
      ...teacher,
      gradeSection: teacher.gradeSection || "",
      gradeLevel: teacher.gradeLevel || "",
      academicCourse: teacher.academicCourse || "",

      teacherImage: teacher.teacherImage,
      displayName: randomizeString(
        `${teacher.firstName} ${teacher.middleName} ${teacher.lastName}`
      ),
      userUID: userRef.uid,
      userDocID: usersDoc.id,
      userRole: "Teacher",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      isArchived: false,
      isEnabled: true,
    });
};

const importTeachers = async (students: TStudents[]) => {
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

    const studentEntrySnapshot = await admin
      .firestore()
      .collection("students")
      .where("studentEntry", "==", student.studentEntry)
      .get();

    if (studentEntrySnapshot.size) {
      throw new Error("Student Entry were already existed.");
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
        studentEntry: Number(student.studentEntry),
        studentImage: student.studentImage,
        userUID: userRef.uid,
        userDocID: usersDoc.id,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        isArchived: false,
        isEnabled: true,
      });
  }
};

const updateTeacher = async ({
  userDocID,
  userUID,
  id: docId,
  ...teacher
}: TTeacher) => {
  await admin
    .firestore()
    .doc(`teachers/${docId}`)
    .update({
      ...teacher,
      teacherImage: teacher.teacherImage,
      modifiedAt: admin.firestore.FieldValue.serverTimestamp(),
      isArchived: false,
    });

  await admin.auth().updateUser(userUID as string, {
    email: teacher.email,
    emailVerified: false,
    password: teacher.password,
    photoURL: teacher.teacherImage,
    disabled: false,
  });

  return await admin.firestore().doc(`users/${userDocID}`).update({
    firstName: teacher.firstName,
    lastName: teacher.lastName,
    middleName: teacher.middleName,

    email: teacher.email,
    password: teacher.password,
    displayName: teacher.displayName,

    teacherImage: teacher.teacherImage,
    modifiedAt: admin.firestore.FieldValue.serverTimestamp(),
    isArchived: false,
  });
};

const updateTeacherStatus = async (
  status: boolean,
  userUID: string,
  userId: string,
  teacherId: string
) => {
  // console.log(users);
  await admin.auth().updateUser(userUID, {
    disabled: status,
  });

  await admin.firestore().doc(`users/${userId}`).update({
    isEnabled: status,
    modifiedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  return await admin.firestore().doc(`teachers/${teacherId}`).update({
    isEnabled: status,
    modifiedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
};

export const TeacherService = {
  createTeacher,
  getAllTeachers,
  updateTeacher,
  importTeachers,
  updateTeacherStatus,
};
