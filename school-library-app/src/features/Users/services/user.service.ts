import axios from "axios";
import { IUser } from "../models/user.interface";

import {
  deleteFileOrImage,
  downloadUrl,
  uploadFileOrImage,
} from "src/shared/services/storage";
import { UploadResult } from "firebase/storage";

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

export { addUser, getAllUsers, updateUser, updateUserStatus };
