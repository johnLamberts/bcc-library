import { ICirculation } from "@features/Transaction/models/circulation.interface";
import {
  Timestamp,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { firestore } from "src/shared/firebase/firebase";

const getAllRecentOverdue = async () => {
  const transactionRef = await getDocs(
    query(
      collection(
        firestore,
        FIRESTORE_COLLECTION_QUERY_KEY.ALL_BOOKS_TRANSACTION
      ),
      where("status", "==", "Overdue")
    )
  );

  return transactionRef.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as ICirculation[];
};

const getAllTransaction = async () => {
  const getAllDocs = await getDocs(
    query(
      collection(
        firestore,
        FIRESTORE_COLLECTION_QUERY_KEY.ALL_BOOKS_TRANSACTION
      )
    )
  );

  return getAllDocs.size;
};

const getStudents = async () => {
  try {
    const querySnapshot = await getDocs(
      query(collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.STUDENT))
    );

    return querySnapshot.size;
  } catch (err) {
    throw new Error(`${err}`);
  }
};

const getTeachers = async () => {
  try {
    const querySnapshot = await getDocs(
      query(collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.TEACHER))
    );

    return querySnapshot.size;
  } catch (err) {
    throw new Error(`${err}`);
  }
};

const getWeeklyReports = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const transactionRef = await getDocs(
    query(
      collection(
        firestore,
        FIRESTORE_COLLECTION_QUERY_KEY.ALL_BOOKS_TRANSACTION
      ),
      where("createdAt", ">=", today),
      where("createdAt", "<", new Date(today.getTime() + 24 * 60 * 60 * 1000))
    )
  );

  return transactionRef.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// async function getTotalTransactionsByDateRange(startDate: Date, endDate: Date) {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const totalTransactionsByDay: any[] = [];
//   // Iterate over each day in the date range
//   const currentDate = new Date(startDate);

//   while (currentDate <= endDate) {
//     const startOfDay = new Date(currentDate);

//     startOfDay.setHours(0, 0, 0, 0); // Set time to start of the day
//     const endOfDay = new Date(currentDate);
//     endOfDay.setHours(23, 59, 59, 999); // Set time to end of the day

//     const startTimestamp = Timestamp.fromDate(startOfDay);
//     const endTimestamp = Timestamp.fromDate(endOfDay);

//     // Query transactions for the current day
//     const transactionRef = await getDocs(
//       query(
//         collection(
//           firestore,
//           FIRESTORE_COLLECTION_QUERY_KEY.ALL_BOOKS_TRANSACTION
//         ),
//         where("createdAt", ">=", startTimestamp),
//         where("createdAt", "<=", endTimestamp)
//       )
//     );
//     const dayName = currentDate.toLocaleDateString("en-US", {
//       weekday: "long",
//     });
//     // Store the total transactions for the current day
//     totalTransactionsByDay.push({
//       name: dayName,
//       total: transactionRef.size,
//     });

//     // Move to the next day
//     currentDate.setDate(currentDate.getDate() + 1);
//   }

//   return totalTransactionsByDay;
// }

async function getTotalTransactionsByDateRange(startDate: Date, endDate: Date) {
  // Create an object to store total transactions for each day
  const totalTransactionsByDay = [];

  // Iterate over each day in the date range
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const startOfDay = new Date(currentDate);
    startOfDay.setHours(0, 0, 0, 0); // Set time to start of the day
    const endOfDay = new Date(currentDate);
    endOfDay.setHours(23, 59, 59, 999); // Set time to end of the day

    const startTimestamp = Timestamp.fromDate(startOfDay);
    const endTimestamp = Timestamp.fromDate(endOfDay);

    // Query transactions for the current day
    const transactionRef = await getDocs(
      query(
        collection(
          firestore,
          FIRESTORE_COLLECTION_QUERY_KEY.ALL_BOOKS_TRANSACTION
        ),
        where("createdAt", ">=", startTimestamp),
        where("createdAt", "<=", endTimestamp)
      )
    );

    const dayName = currentDate.toLocaleDateString("en-US", {
      weekday: "long",
    });
    // Store the total transactions for the current day

    // Accumulate transactions for the current day
    totalTransactionsByDay.push({
      name: dayName,
      total: transactionRef.size,
    });

    // Move to the next day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return totalTransactionsByDay;
}

export {
  getAllRecentOverdue,
  getTeachers,
  getStudents,
  getAllTransaction,
  getWeeklyReports,
  getTotalTransactionsByDateRange,
};
