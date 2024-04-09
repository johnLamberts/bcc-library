import {
  Timestamp,
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { firestore } from "src/shared/firebase/firebase";
import IAuditTrail from "../audit-trail.interface";
import { endOfDay, startOfDay } from "date-fns";

const getAllLogs = async (dateBy?: Date) => {
  // Get the start of today (midnight)

  const startOfToday = startOfDay((dateBy as Date) || new Date());

  // Get the end of today (23:59:59.999)
  const endOfToday = endOfDay((dateBy as Date) || new Date());

  // Reference to your Firestore collection (replace 'transactions' with your actual collection name)
  const transactionsCollection = collection(
    firestore,
    FIRESTORE_COLLECTION_QUERY_KEY.ACTIVITY_LOGS
  );

  console.log(startOfToday, endOfToday);

  // Query transactions for today
  const q = query(
    transactionsCollection,
    orderBy("createdAt", "desc"),
    where("createdAt", ">=", Timestamp.fromDate(startOfToday)), // Filter transactions after start of today
    where("createdAt", "<=", Timestamp.fromDate(endOfToday)) // Filter transactions before end of today
  );

  // Execute the query
  const querySnapshot = await getDocs(q);

  // Iterate through the query snapshot to get the transactions
  const todayTransactions = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    createdAt: doc.data().createdAt.toDate(),
    id: doc.id,
  })) as IAuditTrail[];

  // Return the transactions
  return todayTransactions;
};

export { getAllLogs };
