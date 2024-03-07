import { IUser } from "@features/Users/models/user.interface";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "../enums";
import { firestore } from "../firebase/firebase";

const activityLogs = async (
  user: IUser,
  action: string,
  action_type: string
) => {
  return await addDoc(
    collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.ACTIVITY_LOGS),
    {
      name: `${user.firstName} ${user.middleName} ${user.lastName}`,
      action_type: action_type,
      action: action,
      createdAt: serverTimestamp(),
    }
  );
};

export default activityLogs;
