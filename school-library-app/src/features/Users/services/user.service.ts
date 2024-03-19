import axios from "axios";
import { IUser } from "../models/user.interface";

import {
  deleteFileOrImage,
  downloadUrl,
  uploadFileOrImage,
} from "src/shared/services/storage";
import { UploadResult } from "firebase/storage";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { firestore } from "src/shared/firebase/firebase";
import { IBooks } from "@features/Catalogue/models/books.interface";
import { PAGE_SIZE } from "src/shared/constant";

const addUser = async (user: Partial<IUser>) => {
  let uploadResult: UploadResult | undefined;

  try {
    if (user.avatarImage === null || user.avatarImage === undefined) {
      return await axios({
        method: "POST",
        url: `${import.meta.env.VITE_SERVER_URL}api/v1/users/new`,
        data: {
          ...user,
          avatarImage:
            "https://firebasestorage.googleapis.com/v0/b/zidel-posev.appspot.com/o/user.png?alt=media&token=883b6c53-4b75-4f60-a741-abe99f992fb7",
        },
      });
    } else {
      uploadResult = await uploadFileOrImage(user.avatarImage);
      const pathUrl = await downloadUrl(uploadResult!.ref);
      return await axios({
        method: "POST",
        url: `${import.meta.env.VITE_SERVER_URL}api/v1/users/new`,
        data: {
          ...user,
          avatarImage: pathUrl,
        },
      });
    }
  } catch (err) {
    if (err instanceof axios.AxiosError) {
      throw new Error(`${err.response?.data.error}`);
    }

    if (uploadResult && uploadResult.ref)
      await deleteFileOrImage(uploadResult.ref.fullPath);
  }
};

const getAllUsers = async () => {
  try {
    return await axios({
      url: `${import.meta.env.VITE_SERVER_URL}api/v1/users/all`,
      method: "GET",
    });
  } catch (error) {
    if (error instanceof axios.AxiosError) {
      throw new Error(`${error.response?.data.error}`);
    }
  }
};

const getMemoizedAllUsers = async (page: number, usr?: string) => {
  try {
    const studentCollectionRef = collection(
      firestore,
      FIRESTORE_COLLECTION_QUERY_KEY.USERS
    );

    let queryBooks = query(
      studentCollectionRef,
      orderBy("createdAt", "desc"),
      limit(PAGE_SIZE)
    );

    if (usr) {
      queryBooks = query(
        studentCollectionRef,
        where("userRole", "==", usr.trim())
      );
    }

    if (page > 1) {
      for (let i = 0; i < page - 1; i++) {
        const booksSnapshot = await getDocs(queryBooks);
        if (booksSnapshot.empty) {
          return { booksData: [], count: 0, hasMore: false }; // No more documents
        }
        const lastVisible = booksSnapshot.docs[booksSnapshot.docs.length - 1];
        queryBooks = query(
          studentCollectionRef,
          orderBy("createdAt", "desc"),
          startAfter(lastVisible),
          limit(PAGE_SIZE)
        );
      }
    }

    const booksSnapshot = await getDocs(queryBooks);
    const usersData = booksSnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as IBooks)
    );

    const countSnapshot = await getDocs(
      query(studentCollectionRef, orderBy("createdAt", "desc"))
    );
    const totalCount = countSnapshot.size;

    let count;
    if (usr !== "") {
      count = booksSnapshot.size; // If filtered, use the count of filtered documents
    } else {
      count = totalCount; // If not filtered, use the total count of all documents
    }

    return { usersData, count, hasMore: !booksSnapshot.empty };
  } catch (error) {
    if (error instanceof axios.AxiosError) {
      throw new Error(`${error.response?.data.error}`);
    }
  }
};

const updateUser = async (user: Partial<IUser>, userId: string) => {
  try {
    if (
      user.avatarImage
        ?.toString()
        .startsWith("https://firebasestorage.googleapis.com")
    ) {
      return await axios({
        method: "PUT",
        url: `${import.meta.env.VITE_SERVER_URL}api/v1/users/modify/${userId}`,
        data: {
          ...user,
          userId,
          userUID: user.userUID,
        },
      });
    } else {
      const uploadResult = await uploadFileOrImage(user.avatarImage);
      const pathUrl = await downloadUrl(uploadResult!.ref);
      return await axios({
        method: "PUT",
        url: `${import.meta.env.VITE_SERVER_URL}api/v1/users/modify/${userId}`,
        data: {
          ...user,
          avatarImage: pathUrl,
        },
      });
    }
  } catch (err) {
    if (err instanceof axios.AxiosError) {
      throw new Error(`${err?.response?.data.error}`);
    }
  }
};

const updateUserStatus = async ({
  isEnabled,
  userUID,
  id: userId,
}: Partial<IUser>) => {
  try {
    const status = isEnabled === false ? true : false;

    return await axios({
      method: "PUT",
      url: `${
        import.meta.env.VITE_SERVER_URL
      }api/v1/users/modify-status/${userId}`,
      data: {
        isEnabled: status,
        userId,
        userUID: userUID,
      },
    });
  } catch (err) {
    if (err instanceof axios.AxiosError) {
      console.log(err?.response?.data.error);
      throw new Error(`${err?.response?.data.error}`);
    }
  }
};

export {
  addUser,
  getAllUsers,
  updateUser,
  updateUserStatus,
  getMemoizedAllUsers,
};
