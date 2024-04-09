import { Timestamp, addDoc, collection } from "firebase/firestore";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "../enums";
import { firestore } from "../firebase/firebase";
import { IUser } from "@features/Users/models/user.interface";

const activityLogs = async (
  actions: string,
  currentUser: Partial<IUser> | undefined,
  actionType: string
) => {
  // console.log(actions, currentUser, actionType);

  return await addDoc(
    collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.ACTIVITY_LOGS),
    {
      currentUser: `${currentUser?.firstName} ${currentUser?.middleName} ${currentUser?.lastName}`,
      actionType: actionType,
      actions: actions,
      createdAt: Timestamp.now(),
      image: currentUser?.avatarImage,
    }
  );
};

export default activityLogs;
