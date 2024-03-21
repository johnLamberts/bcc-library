import * as admin from "firebase-admin";
import { TUsers } from "../types/users";
import { makeUserName } from "../helper/utils";

const getAllUsers = async () => {
  const snapshot = await admin
    .firestore()
    .collection("users")
    .orderBy("createdAt", "desc")
    .get();

  return snapshot.docs.map((docs) => {
    return {
      id: docs.id,
      ...docs.data(),
    };
  });
};

const createUser = async (users: TUsers) => {
  const userRef = await admin.auth().createUser({
    email: users.email,
    emailVerified: false,
    password: users.password,
    photoURL: users.avatarImage,
    disabled: false,
  });
  return await admin
    .firestore()
    .collection("users")
    .add({
      ...users,
      avatarImage: users.avatarImage,
      userUID: userRef.uid,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      isArchived: false,
      isEnabled: true,
    });
};

const updateUser = async (users: TUsers, userUID: string, userId: string) => {
  // console.log(users);
  await admin.auth().updateUser(userUID, {
    email: users.email,
    emailVerified: false,
    password: users.password,
    photoURL: users.avatarImage || "",
    disabled: false,
  });

  return await admin
    .firestore()
    .doc(`users/${userId}`)
    .update({
      ...users,
      avatarImage: users.avatarImage,
      modifiedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
};

const importUsers = async (users: TUsers[]) => {
  let defaultPassword = "LMS2023";

  for (const user of users) {
    if (user.password === "" || !user.password) {
      user.password = defaultPassword;
    }
    const userRef = await admin.auth().createUser({
      email: user.email,
      emailVerified: false,
      displayName: makeUserName(7),
      password: user.password,
      photoURL: user.avatarImage,
      disabled: false,
    });
    await admin
      .firestore()
      .collection("users")
      .add({
        ...user,
        avatarImage: user.avatarImage,
        displayName: makeUserName(7),
        userUID: userRef.uid,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        isArchived: false,
        isEnabled: true,
      });
  }
};

const updateUserStatus = async (
  status: boolean,
  userUID: string,
  userId: string
) => {
  const getStudents = await admin
    .firestore()
    .collection(`students`)
    .where("userUID", "==", userUID)
    .get();

  const getTeachers = await admin
    .firestore()
    .collection(`teachers`)
    .where("userUID", "==", userUID)
    .get();

  console.log(status);
  await admin.auth().updateUser(userUID, {
    disabled: status,
  });

  getStudents.docs.map(async (data) => {
    return await admin.firestore().doc(`students/${data.id}`).update({
      isEnabled: status,
      modifiedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  });

  getTeachers.docs.map(async (data) => {
    return await admin.firestore().doc(`teachers/${data.id}`).update({
      isEnabled: status,
      modifiedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  });

  return await admin.firestore().doc(`users/${userId}`).update({
    isEnabled: status,
    modifiedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
};

export const UserService = {
  getAllUsers,
  createUser,
  importUsers,
  updateUser,
  updateUserStatus,
};
