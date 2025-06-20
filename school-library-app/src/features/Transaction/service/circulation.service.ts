/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  or,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { ICirculation } from "../models/circulation.interface";
import { firestore } from "src/shared/firebase/firebase";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import axios from "axios";

// Directly borrow a books
const addBorrowTransaction = async (borrow: ICirculation) => {
  const borrowTransactionRef = await addDoc(
    collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.BORROW_TRANSACTION),
    {
      ...borrow,
      status: "Active",
      expiryTime: borrow.timeDuration + new Date().getTime(),
      dateBorrowed: serverTimestamp(),
    }
  );

  await addDoc(
    collection(
      firestore,
      FIRESTORE_COLLECTION_QUERY_KEY.AVAILABILITY_TRANSACTION
    ),
    {
      ...borrow,
      expiryTime: borrow.timeDuration + new Date().getTime(),
      booksBorrowedId: borrowTransactionRef.id,
      status: "Active",
    }
  );

  await addDoc(
    collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.ALL_BOOKS_TRANSACTION),
    {
      booksBorrowedId: borrowTransactionRef.id,
      expiryTime: borrow.timeDuration! + new Date().getTime(),
      booksId: borrow.booksId,
      bookTitle: borrow.bookTitle,
      bookISBN: borrow.bookISBN,
      borrowers: borrow.borrowers,
      borrowersId: borrow.borrowersId,
      bookType: borrow.bookType,
      borrowersEmail: borrow.borrowersEmail,
      firstName: borrow.firstName,
      middleName: borrow.middleName,
      lastName: borrow.lastName,
      borrowersNumber: borrow.borrowersNumber,
      booksPrice: borrow.bookPrice,
      status: "Active",
      createdAt: serverTimestamp(),
    }
  );

  await updateDoc(
    doc(firestore, FIRESTORE_COLLECTION_QUERY_KEY.CATALOGUE, borrow.booksId),
    {
      numberOfBooksAvailable_QUANTITY:
        borrow.numberOfBooksAvailable_QUANTITY - 1,
    }
  );
};

// Request a book
const addRequestTransaction = async (request: ICirculation) => {
  const requestRef = await addDoc(
    collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.REQUEST_BOOK),
    {
      ...request,
      status: "Request",
      createdAt: serverTimestamp(),
    }
  );

  await addDoc(
    collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.ALL_BOOKS_TRANSACTION),
    {
      requestId: requestRef.id,
      booksId: request.booksId,
      bookTitle: request.bookTitle,
      bookISBN: request.bookISBN,
      borrowers: request.borrowers,
      borrowersId: request.borrowersId,
      bookType: request.bookType,
      borrowersEmail: request.borrowersEmail,
      firstName: request.firstName,
      middleName: request.middleName,
      lastName: request.lastName,
      borrowersNumber: request.borrowersNumber,
      booksPrice: request.bookPrice,
      status: "Request",
      createdAt: serverTimestamp(),
    }
  );
  const fullName = `${request.firstName} ${request.middleName} ${request.lastName}`;

  return axios({
    method: "POST",
    url: `${import.meta.env.VITE_SERVER_URL}api/v1/email/request-email`,
    data: {
      fullName,
      borrowersEmail: request.borrowersEmail,
      bookTitle: request.bookTitle,
    },
  });
};

// Approved requested book
const addApproveRequestedBook = async (approve: ICirculation) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete (approve as any).requesting;

  const { id, ...otherValues } = approve;

  const bookRef = await getDoc(
    doc(
      firestore,
      FIRESTORE_COLLECTION_QUERY_KEY.CATALOGUE,
      approve.booksId as string
    )
  );

  if (bookRef.data()?.numberOfBooksAvailable_QUANTITY === 0) {
    throw new Error(
      "Sorry, the item you're attempting to borrow is currently unavailable"
    );
  }

  const reservedRef = await addDoc(
    collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.RESERVED_BOOK),
    {
      ...otherValues,
      status: "Reserved",
      createdAt: serverTimestamp(),
    }
  );

  const booksRefs = await getDocs(
    query(
      collection(
        firestore,
        FIRESTORE_COLLECTION_QUERY_KEY.ALL_BOOKS_TRANSACTION
      ),
      where("requestId", "==", approve.id)
    )
  );

  booksRefs.docs.map(async (docRef) => {
    await deleteDoc(
      doc(
        firestore,
        FIRESTORE_COLLECTION_QUERY_KEY.ALL_BOOKS_TRANSACTION,
        docRef.id as string
      )
    );
  });

  await updateDoc(
    doc(
      firestore,
      FIRESTORE_COLLECTION_QUERY_KEY.CATALOGUE,
      approve.booksId as string
    ),
    {
      numberOfBooksAvailable_QUANTITY:
        approve.numberOfBooksAvailable_QUANTITY - 1,
    }
  );

  await deleteDoc(
    doc(
      firestore,
      FIRESTORE_COLLECTION_QUERY_KEY.REQUEST_BOOK,
      approve.id as string
    )
  );

  await addDoc(
    collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.ALL_BOOKS_TRANSACTION),
    {
      ...otherValues,
      status: "Reserved",
      reservedId: reservedRef.id,
      createdAt: serverTimestamp(),
    }
  );
  const fullName = `${approve.firstName} ${approve.middleName} ${approve.lastName}`;

  return axios({
    method: "POST",
    url: `${import.meta.env.VITE_SERVER_URL}api/v1/email/requested-email`,
    data: {
      fullName,
      borrowersEmail: approve.borrowersEmail,
      bookTitle: approve.bookTitle,
    },
  });
};

// Claimed
const addClaimedReservedBook = async (reserved: ICirculation) => {
  const { id: reservedId, ...otherValues } = reserved;

  console.log(otherValues);

  const borrowTransactionRef = await addDoc(
    collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.BORROW_TRANSACTION),
    {
      ...otherValues,
      status: "Active",
      expiryTime: otherValues.timeDuration + new Date().getTime(),
      dateBorrowed: serverTimestamp(),
    }
  );

  await addDoc(
    collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.ALL_BOOKS_TRANSACTION),
    {
      booksBorrowedId: borrowTransactionRef.id,
      expiryTime: otherValues.timeDuration! + new Date().getTime(),
      booksId: otherValues.booksId,
      bookTitle: otherValues.bookTitle,
      bookISBN: otherValues.bookISBN,
      borrowers: otherValues.borrowers,
      borrowersId: otherValues.borrowersId,
      bookType: otherValues.bookType,
      borrowersEmail: otherValues.borrowersEmail,
      firstName: otherValues.firstName,
      middleName: otherValues.middleName,
      lastName: otherValues.lastName,
      booksPrice: otherValues.bookPrice,
      status: "Active",
      createdAt: serverTimestamp(),
    }
  );

  await addDoc(
    collection(
      firestore,
      FIRESTORE_COLLECTION_QUERY_KEY.AVAILABILITY_TRANSACTION
    ),
    {
      ...otherValues,
      booksBorrowedId: borrowTransactionRef.id,
      expiryTime: otherValues.timeDuration + new Date().getTime(),
      status: "Active",
    }
  );

  await deleteDoc(
    doc(
      firestore,
      FIRESTORE_COLLECTION_QUERY_KEY.RESERVED_BOOK,
      reservedId as string
    )
  );

  const bookdsRef = await getDocs(
    query(
      collection(
        firestore,
        FIRESTORE_COLLECTION_QUERY_KEY.ALL_BOOKS_TRANSACTION
      ),
      where("reservedId", "==", reservedId)
    )
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bookdsRef.docs.forEach(async (bookDoc) => {
    const docRef = doc(
      firestore,
      FIRESTORE_COLLECTION_QUERY_KEY.ALL_BOOKS_TRANSACTION,
      bookDoc.id
    );
    await deleteDoc(docRef);
  });
};

// Walk-in reserved
const addWalkinReservedBook = async (reserved: ICirculation) => {
  const bookRef = await getDoc(
    doc(
      firestore,
      FIRESTORE_COLLECTION_QUERY_KEY.CATALOGUE,
      reserved.booksId as string
    )
  );

  if (bookRef.data()?.numberOfBooksAvailable_QUANTITY === 0) {
    throw new Error(
      "Sorry, the item you're attempting to borrow is currently unavailable"
    );
  }

  const reservedRef = await addDoc(
    collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.RESERVED_BOOK),
    {
      ...reserved,
      status: "Reserved",
      createdAt: serverTimestamp(),
    }
  );

  await updateDoc(
    doc(
      firestore,
      FIRESTORE_COLLECTION_QUERY_KEY.CATALOGUE,
      reserved.booksId as string
    ),
    {
      numberOfBooksAvailable_QUANTITY:
        reserved.numberOfBooksAvailable_QUANTITY - 1,
    }
  );

  await addDoc(
    collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.ALL_BOOKS_TRANSACTION),
    {
      ...reserved,
      status: "Reserved",
      reservedId: reservedRef.id,
      createdAt: serverTimestamp(),
    }
  );
  const fullName = `${reserved.firstName} ${reserved.middleName} ${reserved.lastName}`;

  return axios({
    method: "POST",
    url: `${import.meta.env.VITE_SERVER_URL}api/v1/email/requested-email`,
    data: {
      fullName,
      bookTitle: reserved.bookTitle,
      borrowersEmail: reserved.borrowersEmail,
    },
  });
};

// Returned
const addReturnedBook = async (returns: Partial<ICirculation>) => {
  const {
    bookCondition,
    bookISBN,
    bookTitle,
    booksId,
    borrowers,
    borrowersEmail,
    firstName,
    middleName,
    lastName,

    borrowersId,
    status,
    booksBorrowedId,
    bookType,
  } = returns;

  if (returns.status === "Active") {
    const availabilityRef = await getDocs(
      query(
        collection(
          firestore,
          FIRESTORE_COLLECTION_QUERY_KEY.AVAILABILITY_TRANSACTION
        ),
        where("booksBorrowedId", "==", booksBorrowedId)
      )
    );

    availabilityRef.docs.map(
      async (docId) =>
        await deleteDoc(
          doc(
            firestore,
            FIRESTORE_COLLECTION_QUERY_KEY.AVAILABILITY_TRANSACTION,
            docId.id
          )
        )
    );
  }

  // * DELETE `borrow-transaction`
  await deleteDoc(
    doc(
      firestore,
      FIRESTORE_COLLECTION_QUERY_KEY.BORROW_TRANSACTION,
      booksBorrowedId as string
    )
  );

  // * UPDATE quantity in` books-catalogue`
  await updateDoc(
    doc(
      firestore,
      FIRESTORE_COLLECTION_QUERY_KEY.CATALOGUE,
      returns.booksId as string
    ),
    {
      numberOfBooksAvailable_QUANTITY: 1,
    }
  );

  // * UPDATE status in `books-transaction`
  const transactionRef = await getDocs(
    query(
      collection(
        firestore,
        FIRESTORE_COLLECTION_QUERY_KEY.ALL_BOOKS_TRANSACTION
      ),
      where("booksBorrowedId", "==", returns.booksBorrowedId)
    )
  );

  transactionRef.docs.map(async (docId) => {
    return await updateDoc(
      doc(
        firestore,
        FIRESTORE_COLLECTION_QUERY_KEY.ALL_BOOKS_TRANSACTION,
        docId.id
      ),
      {
        bookCondition,
        bookISBN,
        bookTitle,
        booksId,
        borrowers,
        borrowersEmail,
        firstName,
        middleName,
        lastName,

        booksBorrowedId,
        bookType,
        status: "Returned",
        modifiedAt: serverTimestamp(),
      }
    );
  });

  // * ADD book item condition after return transaction
  await addDoc(
    collection(
      firestore,
      FIRESTORE_COLLECTION_QUERY_KEY.BOOKS_RETURN_CONDITION
    ),
    {
      bookTitle,
      bookType,
      bookISBN,
      bookCondition,
      booksId,
      booksBorrowedId,
      dateReturned: serverTimestamp(),
    }
  );

  // * ADD borrower history in `transaction`
  await addDoc(
    collection(
      firestore,
      FIRESTORE_COLLECTION_QUERY_KEY.BORROWERS_HISTORY_TRANSACTION
    ),
    {
      bookTitle,
      bookType,
      bookCondition,
      booksId,
      booksBorrowedId,

      borrowersEmail,
      borrowersId,
      borrowers,
      firstName,
      middleName,
      lastName,

      status,
      createdAt: serverTimestamp(),
    }
  );

  // * ADD borrower history in `transaction`

  return axios({
    method: "POST",
    url: `${import.meta.env.VITE_SERVER_URL}api/v1/email/return-email`,
    data: {
      ...returns,
    },
  });
};

const addCompletePaymentTransaction = async (
  payment: Partial<ICirculation>
) => {
  const {
    fee,
    categoryFee,
    conditionFee,
    totalFee,
    booksBorrowedId,
    bookType,
    expiryTime,
    bookCondition,
    bookTitle,
    borrowersEmail,
    firstName,
    middleName,
    lastName,
    borrowersId,
  } = payment;

  await addDoc(
    collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.COMPLETE_PAYMENT),
    {
      fee,
      categoryFee,
      conditionFee,
      totalFee,
      booksBorrowedId,
      bookType,
      expiryTime,
      bookCondition,
      bookTitle,
      borrowersEmail,
      firstName,
      middleName,
      lastName,
      borrowersId,
      createdAt: serverTimestamp(),
      paymentStatus: "Paid",
    }
  );
  const fullName = `${firstName} ${middleName} ${lastName}`;

  return axios({
    method: "POST",
    url: `${import.meta.env.VITE_SERVER_URL}api/v1/email/completed-transaction`,
    data: {
      fullName,
      bookTitle,
      borrowersEmail,
    },
  });
};

const addPatrialPaymentTransaction = async (partial: Partial<ICirculation>) => {
  const {
    fee,
    categoryFee,
    conditionFee,
    totalFee,
    booksBorrowedId,
    bookType,
    expiryTime,
    bookCondition,
    bookTitle,
    borrowersEmail,
    firstName,
    middleName,
    lastName,
    borrowersId,
    descriptionOrNotes,
    conditionCategory,

    bookISBN,
    booksId,
    borrowers,

    status,
  } = partial;

  const partialRef = await addDoc(
    collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.PARTIAL_PAYMENT),
    {
      fee,
      categoryFee,
      conditionFee,
      totalFee,
      booksBorrowedId,
      bookType,
      expiryTime,
      bookCondition,
      bookTitle,
      borrowersEmail,
      firstName,
      middleName,
      lastName,
      borrowersId,
      descriptionOrNotes,
      conditionCategory,
      createdAt: serverTimestamp(),
      paymentStatus: "With Balance",
    }
  );

  await addDoc(
    collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.COMPLETE_PAYMENT),
    {
      pendingId: partialRef.id,
      fee,
      categoryFee,
      conditionFee,
      totalFee,
      booksBorrowedId,
      bookType,
      expiryTime,
      bookCondition,
      bookTitle,
      borrowersEmail,
      firstName,
      middleName,
      lastName,
      borrowersId,
      descriptionOrNotes,
      conditionCategory,
      createdAt: serverTimestamp(),
      paymentStatus: "With Balance",
    }
  );

  if (status === "Active") {
    const availabilityRef = await getDocs(
      query(
        collection(
          firestore,
          FIRESTORE_COLLECTION_QUERY_KEY.AVAILABILITY_TRANSACTION
        ),
        where("booksBorrowedId", "==", booksBorrowedId)
      )
    );

    availabilityRef.docs.map(
      async (docId) =>
        await deleteDoc(
          doc(
            firestore,
            FIRESTORE_COLLECTION_QUERY_KEY.AVAILABILITY_TRANSACTION,
            docId.id
          )
        )
    );
  }

  // * DELETE `borrow-transaction`
  await deleteDoc(
    doc(
      firestore,
      FIRESTORE_COLLECTION_QUERY_KEY.BORROW_TRANSACTION,
      booksBorrowedId as string
    )
  );

  // * UPDATE quantity in` books-catalogue`
  await updateDoc(
    doc(firestore, FIRESTORE_COLLECTION_QUERY_KEY.CATALOGUE, booksId as string),
    {
      numberOfBooksAvailable_QUANTITY: 1,
    }
  );

  // * UPDATE status in `books-transaction`
  const transactionRef = await getDocs(
    query(
      collection(
        firestore,
        FIRESTORE_COLLECTION_QUERY_KEY.ALL_BOOKS_TRANSACTION
      ),
      where("booksBorrowedId", "==", booksBorrowedId)
    )
  );

  transactionRef.docs.map(async (docId) => {
    return await updateDoc(
      doc(
        firestore,
        FIRESTORE_COLLECTION_QUERY_KEY.ALL_BOOKS_TRANSACTION,
        docId.id
      ),
      {
        bookCondition,
        bookISBN,
        bookTitle,
        booksId,
        borrowers,
        borrowersEmail,
        firstName,
        middleName,
        lastName,

        booksBorrowedId,
        bookType,
        status: "Returned",
        modifiedAt: serverTimestamp(),
      }
    );
  });

  // * ADD book item condition after return transaction
  await addDoc(
    collection(
      firestore,
      FIRESTORE_COLLECTION_QUERY_KEY.BOOKS_RETURN_CONDITION
    ),
    {
      bookTitle,
      bookType,
      bookISBN,
      bookCondition,
      booksId,
      booksBorrowedId,
      dateReturned: serverTimestamp(),
    }
  );

  // * ADD borrower history in `transaction`
  await addDoc(
    collection(
      firestore,
      FIRESTORE_COLLECTION_QUERY_KEY.BORROWERS_HISTORY_TRANSACTION
    ),
    {
      bookTitle,
      bookType,
      bookCondition,
      booksId,
      booksBorrowedId,

      borrowersEmail,
      borrowersId,

      borrowers,
      firstName,
      middleName,
      lastName,

      status,
      createdAt: serverTimestamp(),
    }
  );

  // * ADD borrower history in `transaction`

  const fullName = `${firstName} ${middleName} ${lastName}`;

  if (!bookCondition?.toLowerCase().includes("return")) {
    return axios({
      method: "POST",
      url: `${
        import.meta.env.VITE_SERVER_URL
      }api/v1/email/returned-pending-payment`,
      data: {
        fullName,
        bookTitle,
        totalFee,
        borrowersEmail,
      },
    });
  } else {
    return axios({
      method: "POST",
      url: `${import.meta.env.VITE_SERVER_URL}api/v1/email/return-email`,
      data: {
        fullName,
        borrowersEmail,
      },
    });
  }
};

const addUpdatePaymentTransaction = async (payment: Partial<ICirculation>) => {
  const { id, firstName, lastName, borrowersEmail, middleName, bookTitle } =
    payment;

  const transactionRef = await getDocs(
    query(
      collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.COMPLETE_PAYMENT),
      where("pendingId", "==", id)
    )
  );

  transactionRef.docs.map(
    async (docId) =>
      await updateDoc(
        doc(
          firestore,
          FIRESTORE_COLLECTION_QUERY_KEY.COMPLETE_PAYMENT,
          docId.id as string
        ),
        {
          paymentStatus: "Paid",
          modifiedAt: serverTimestamp(),
        }
      )
  );

  await deleteDoc(
    doc(firestore, FIRESTORE_COLLECTION_QUERY_KEY.PARTIAL_PAYMENT, id as string)
  );

  const fullName = `${firstName} ${middleName} ${lastName}`;
  return axios({
    method: "POST",
    url: `${import.meta.env.VITE_SERVER_URL}api/v1/email/completed-transaction`,
    data: {
      fullName,
      bookTitle,
      borrowersEmail,
    },
  });
};

// const returnOverdueCirculation = async (returnBook: Partial<ICirculation>) => {
//   const transactionRef = await getDocs(
//     query(
//       collection(
//         firestore,
//         FIRESTORE_COLLECTION_QUERY_KEY.ALL_BOOKS_TRANSACTION
//       ),
//       where("booksBorrowedId", "==", returnBook.booksBorrowedId)
//     )
//   );

//   transactionRef.docs.map(
//     async (docId) =>
//       await setDoc(
//         doc(
//           firestore,
//           FIRESTORE_COLLECTION_QUERY_KEY.ALL_BOOKS_TRANSACTION,
//           docId.id
//         ),
//         {
//           ...returnBook,
//           returnStatus: "Returned",
//           createdAt: serverTimestamp(),
//         }
//       )
//   );
//   await deleteDoc(
//     doc(
//       firestore,
//       FIRESTORE_COLLECTION_QUERY_KEY.BORROW_TRANSACTION,
//       returnBook.booksBorrowedId as string
//     )
//   );

//   const overdueRef = await getDocs(
//     query(
//       collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.BOOKS_OVERDUE),
//       where("booksBorrowedId", "==", returnBook.booksBorrowedId)
//     )
//   );

//   overdueRef.docs.map(
//     async (docId) =>
//       await deleteDoc(
//         doc(firestore, FIRESTORE_COLLECTION_QUERY_KEY.BOOKS_OVERDUE, docId.id)
//       )
//   );

//   return axios({
//     method: "POST",
//     url: `${import.meta.env.VITE_SERVER_URL}api/v1/email/return-overdue-email`,
//     data: {
//       ...returnBook,
//     },
//   });
// };

// const returnDueCirculation = async (returnBook: Partial<ICirculation>) => {
//   await deleteDoc(
//     doc(
//       firestore,
//       FIRESTORE_COLLECTION_QUERY_KEY.BORROW_TRANSACTION,
//       returnBook.id as string
//     )
//   );

//   const transactionRef = await getDocs(
//     query(
//       collection(
//         firestore,
//         FIRESTORE_COLLECTION_QUERY_KEY.ALL_BOOKS_TRANSACTION
//       ),
//       where("booksBorrowedId", "==", returnBook.id as string)
//     )
//   );

//   transactionRef.docs.map(async (docId) =>
//     setDoc(
//       doc(
//         firestore,
//         FIRESTORE_COLLECTION_QUERY_KEY.ALL_BOOKS_TRANSACTION,
//         docId.id
//       ),
//       { ...returnBook, returnStatus: "Returned", createdAt: serverTimestamp() }
//     )
//   );

//   const availabilityRef = await getDocs(
//     query(
//       collection(
//         firestore,
//         FIRESTORE_COLLECTION_QUERY_KEY.AVAILABILITY_TRANSACTION
//       ),
//       where("booksBorrowedId", "==", returnBook.id)
//     )
//   );
//   availabilityRef.docs.map(
//     async (docId) =>
//       await deleteDoc(
//         doc(
//           firestore,
//           FIRESTORE_COLLECTION_QUERY_KEY.AVAILABILITY_TRANSACTION,
//           docId.id
//         )
//       )
//   );
//   return axios({
//     method: "POST",
//     url: `${import.meta.env.VITE_SERVER_URL}api/v1/email/return-email`,
//     data: {
//       ...returnBook,
//     },
//   });
// };

const getBooksTransaction = async () => {
  const booksTransactionRef = await getDocs(
    query(
      collection(
        firestore,
        FIRESTORE_COLLECTION_QUERY_KEY.ALL_BOOKS_TRANSACTION
      ),
      where("status", "in", ["Active", "Overdue", "Request", "Reserved"])
      // orderBy("createdAt", "desc")
    )
  );

  return booksTransactionRef.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as ICirculation[];
};

const getReturnsTransaction = async () => {
  const booksTransactionRef = await getDocs(
    query(
      collection(
        firestore,
        FIRESTORE_COLLECTION_QUERY_KEY.ALL_BOOKS_TRANSACTION
      ),
      or(where("status", "==", "Active"), where("status", "==", "Overdue"))
    )
  );

  return booksTransactionRef.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as ICirculation[];
};

const getBooksReturned = async () => {
  const booksTransactionRef = await getDocs(
    query(
      collection(
        firestore,
        FIRESTORE_COLLECTION_QUERY_KEY.ALL_BOOKS_TRANSACTION
      ),
      or(where("status", "==", "Active"), where("status", "==", "Overdue"))
    )
  );

  return booksTransactionRef.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as ICirculation[];
};

const getBooksRequested = async () => {
  const bookRequestedRef = await getDocs(
    query(collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.REQUEST_BOOK))
  );

  return bookRequestedRef.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as ICirculation[];
};

const getBooksReserved = async () => {
  const bookRequestedRef = await getDocs(
    query(
      collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.RESERVED_BOOK),
      orderBy("createdAt", "asc")
    )
  );

  return bookRequestedRef.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as ICirculation[];
};

const getPartialPayment = async () => {
  const booksTransactionRef = await getDocs(
    query(
      collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.PARTIAL_PAYMENT),
      where("paymentStatus", "==", "With Balance")
    )
  );

  return booksTransactionRef.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as ICirculation[];
};

export {
  // addBorrowCirculation,
  //* NOTE: New implementation of Borrow Transaction. Simplified.
  addBorrowTransaction,
  addRequestTransaction,
  addApproveRequestedBook,
  addClaimedReservedBook,
  addReturnedBook,
  addWalkinReservedBook,
  addCompletePaymentTransaction,
  addPatrialPaymentTransaction,
  addUpdatePaymentTransaction,
  /**
   **  NOTE: Read all books Transaction
   **  whereas STATUS can be `returned`,
   **  `active`, `overdue`, and `request`
   *
   */
  getBooksTransaction,
  getBooksReturned,
  getBooksRequested,
  getBooksReserved,
  getReturnsTransaction,
  getPartialPayment,
};
