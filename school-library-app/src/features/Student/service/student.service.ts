import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { firestore } from "src/shared/firebase/firebase";
import { IStudents } from "../models/student.interface";
import axios from "axios";
import { uploadFileOrImage, downloadUrl } from "src/shared/services/storage";
import generateRandomPassword from "src/utils/helpers/generateRandomPassword";
import { generateStudentNumber } from "src/utils/helpers/generateStudentNumber";

const addStudent = async (student: Partial<IStudents>) => {
  try {
    if (student.studentImage === null || student.studentImage === undefined) {
      return await axios({
        method: "POST",
        url: `${import.meta.env.VITE_SERVER_URL}api/v1/students/new`,
        data: {
          ...student,
          studentImage:
            "https://firebasestorage.googleapis.com/v0/b/zidel-posev.appspot.com/o/user.png?alt=media&token=883b6c53-4b75-4f60-a741-abe99f992fb7",

          studentNumber: generateStudentNumber(student.studentEntry!, "B"),
          password: generateRandomPassword(8),
        },
      });
    } else {
      const uploadResult = await uploadFileOrImage(student.studentImage);
      const pathUrl = await downloadUrl(uploadResult!.ref);
      return await axios({
        method: "POST",
        url: `${import.meta.env.VITE_SERVER_URL}api/v1/students/new`,
        data: {
          ...student,
          studentImage: pathUrl,
          studentNumber: generateStudentNumber(student.studentEntry!, "B"),
          password: generateRandomPassword(8),
        },
      });
    }
    // else {

    // }
  } catch (err) {
    if (err instanceof axios.AxiosError) {
      console.log(err.response?.data.error);
      throw new Error(`${err.response?.data.error}`);
    }
  }
};

const getLatestStudent = async () => {
  const studentNumberSnapshot = await getDocs(
    query(
      collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.STUDENT),
      orderBy("createdAt", "asc")
    )
  );

  return studentNumberSnapshot.docs.map((doc) => doc.data());
};

const getStudents = async () => {
  try {
    const querySnapshot = await getDocs(
      query(collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.STUDENT))
    );

    return querySnapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    }) as IStudents[];
  } catch (err) {
    throw new Error(`${err}`);
  }
};

const updateStudentStatus = async ({
  isEnabled,
  userUID,
  userDocID,
  id: userId,
}: Partial<IStudents>) => {
  try {
    const status = isEnabled === false ? true : false;

    return await axios({
      method: "PUT",
      url: `${
        import.meta.env.VITE_SERVER_URL
      }api/v1/students/modify-status/${userId}`,
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

const updateStudent = async ({
  id,
  userDocID,
  userUID,
  ...student
}: Partial<IStudents>) => {
  try {
    if (
      student.studentImage
        ?.toString()
        .startsWith("https://firebasestorage.googleapis.com")
    ) {
      return await axios({
        method: "PUT",
        url: `${import.meta.env.VITE_SERVER_URL}api/v1/students/modify/${id}`,
        data: {
          ...student,
          id,
          userUID,
          userDocID,
        },
      });
    } else {
      const uploadResult = await uploadFileOrImage(student.studentImage);
      const pathUrl = await downloadUrl(uploadResult!.ref);
      return await axios({
        method: "PUT",
        url: `${import.meta.env.VITE_SERVER_URL}api/v1/students/modify/${id}`,
        data: {
          ...student,
          id,
          userUID,
          userDocID,
          studentImage: pathUrl,
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
  addStudent,
  getLatestStudent,
  getStudents,
  updateStudentStatus,
  updateStudent,
};
