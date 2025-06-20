import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { firestore } from "src/shared/firebase/firebase";
import { ITeacher } from "../models/teacher.interface";
import axios from "axios";
import { uploadFileOrImage, downloadUrl } from "src/shared/services/storage";
import generateRandomPassword from "src/utils/helpers/generateRandomPassword";

const addTeacher = async (teacher: Partial<ITeacher>) => {
  try {
    if (teacher.teacherImage === null || teacher.teacherImage === undefined) {
      return await axios({
        method: "POST",
        url: `${import.meta.env.VITE_SERVER_URL}api/v1/teachers/new`,
        data: {
          ...teacher,
          teacherImage:
            "https://firebasestorage.googleapis.com/v0/b/library-management-syste-fb3e9.appspot.com/o/def_user.png?alt=media&token=b3ea39b4-cba7-4095-8e6c-6996848f0391",

          password: generateRandomPassword(8),
        },
      });
    } else {
      const uploadResult = await uploadFileOrImage(teacher.teacherImage);
      const pathUrl = await downloadUrl(uploadResult!.ref);
      return await axios({
        method: "POST",
        url: `${import.meta.env.VITE_SERVER_URL}api/v1/teachers/new`,
        data: {
          ...teacher,
          teacherImage: pathUrl,
          password: generateRandomPassword(8),
        },
      });
    }
  } catch (err) {
    if (err instanceof axios.AxiosError) {
      console.log(err.response?.data.error);
      throw new Error(`${err.response?.data.error}`);
    }
  }
};

const getLatestTeacher = async () => {
  const teacherNumberSnapshot = await getDocs(
    query(
      collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.TEACHER),
      orderBy("createdAt", "desc")
    )
  );

  return teacherNumberSnapshot.docs.map((doc) => doc.data());
};

const getTeachers = async (): Promise<ITeacher[]> => {
  try {
    const querySnapshot = await getDocs(
      query(
        collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.TEACHER),
        orderBy("createdAt", "desc")
      )
    );

    return querySnapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    }) as ITeacher[];
  } catch (err) {
    throw new Error(`${err}`);
  }
};

const updateTeacherStatus = async ({
  isEnabled,
  userUID,
  userDocID,
  id: userId,
}: Partial<ITeacher>) => {
  try {
    const status = isEnabled === false ? true : false;

    return await axios({
      method: "PUT",
      url: `${
        import.meta.env.VITE_SERVER_URL
      }api/v1/teachers/modify-status/${userId}`,
      data: {
        isEnabled: status,
        userId,
        userUID,
        userDocID,
      },
    });
  } catch (err) {
    if (err instanceof axios.AxiosError) {
      console.log(err?.response?.data.error);
      throw new Error(`${err?.response?.data.error}`);
    }
  }
};

const updateTeacher = async ({
  id,
  userDocID,
  userUID,
  ...teacher
}: Partial<ITeacher>) => {
  try {
    if (
      teacher.teacherImage
        ?.toString()
        .startsWith("https://firebasestorage.googleapis.com")
    ) {
      return await axios({
        method: "PUT",
        url: `${import.meta.env.VITE_SERVER_URL}api/v1/teachers/modify/${id}`,
        data: {
          ...teacher,
          id,
          userUID,
          userDocID,
        },
      });
    } else {
      const uploadResult = await uploadFileOrImage(teacher.teacherImage);
      const pathUrl = await downloadUrl(uploadResult!.ref);
      return await axios({
        method: "PUT",
        url: `${import.meta.env.VITE_SERVER_URL}api/v1/teachers/modify/${id}`,
        data: {
          ...teacher,
          id,
          userUID,
          userDocID,
          teacherImage: pathUrl,
        },
      });
    }
  } catch (err) {
    if (err instanceof axios.AxiosError) {
      console.log(err.response?.data.error);
      throw new Error(`${err.response?.data.error}`);
    }
  }
};

export {
  addTeacher,
  getLatestTeacher,
  getTeachers,
  updateTeacherStatus,
  updateTeacher,
};
