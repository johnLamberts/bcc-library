import dotenv from "dotenv";
import sgMail from "@sendgrid/mail";
import * as admin from "firebase-admin";

dotenv.config();

sgMail.setApiKey(process.env.VITE_SENDGRID_API_KEY as string);

const sendEmailReturned = async (snapshot: Record<string, any>) => {
  const msg = {
    to: snapshot.borrowersEmail,
    subject: "",
    from: "kuwago@bcc-opac-library.site",
    templateId: process.env.VITE_RETURNED_TEMPLATE_ID,
    dynamic_template_data: {
      fullName: snapshot.fullName,
    },
  };

  await admin
    .firestore()
    .collection("activity-logs-timeline")
    .add({
      actionType: "Automatic Return Email Notification",
      actions: `kuwago@bcc-opac-library.site sent  An email confirmation has been sent to ${snapshot.borrowersEmail} for the successful return of book`,
      createdAt: admin.firestore.Timestamp.now(),
      currentUser: `kuwago@bcc-opac-library.site mailer-sender`,
      image:
        "https://firebasestorage.googleapis.com/v0/b/library-management-syste-fb3e9.appspot.com/o/def_user.png?alt=media&token=b3ea39b4-cba7-4095-8e6c-6996848f0391",
    });

  return await sgMail.send(msg as any);
};

const sendEmailReturnedWithPendingPayment = async (
  snapshot: Record<string, any>
) => {
  const msg = {
    to: snapshot.borrowersEmail,
    subject: "",
    from: "kuwago@bcc-opac-library.site",
    templateId: process.env.VITE_RETURNED_WITH_PENDING_PAYMENT,
    dynamic_template_data: {
      fullName: snapshot.fullName,
      bookTitle: snapshot.bookTitle,
      totalFee: snapshot.totalFee,
    },
  };

  await admin
    .firestore()
    .collection("activity-logs-timeline")
    .add({
      actionType: "Automatic Return with Pending Payments Email Notification",
      actions: `kuwago@bcc-opac-library.site sent  An email confirmation has been sent to ${snapshot.borrowersEmail} for the successful return of book but with pending payments on ${snapshot.bookTitle}`,
      createdAt: admin.firestore.Timestamp.now(),
      currentUser: `kuwago@bcc-opac-library.site mailer-sender`,
      image:
        "https://firebasestorage.googleapis.com/v0/b/library-management-syste-fb3e9.appspot.com/o/def_user.png?alt=media&token=b3ea39b4-cba7-4095-8e6c-6996848f0391",
    });

  return await sgMail.send(msg as any);
};

const sendEmailCompletedTransaction = async (snapshot: Record<string, any>) => {
  const msg = {
    to: snapshot.borrowersEmail,
    subject: "",
    from: "kuwago@bcc-opac-library.site",
    templateId: process.env.VITE_COMPLETED_TRANSACTION,
    dynamic_template_data: {
      fullName: snapshot.fullName,
      bookTitle: snapshot.bookTitle,
    },
  };

  await admin
    .firestore()
    .collection("activity-logs-timeline")
    .add({
      actionType:
        "Automatic Complete Transaction with Pending Payments Email Notification",
      actions: `kuwago@bcc-opac-library.site sent  An email confirmation has been sent to ${snapshot.borrowersEmail} for the completion of transaction  with pending payments on ${snapshot.bookTitle}`,
      createdAt: admin.firestore.Timestamp.now(),
      currentUser: `kuwago@bcc-opac-library.site mailer-sender`,
      image:
        "https://firebasestorage.googleapis.com/v0/b/library-management-syste-fb3e9.appspot.com/o/def_user.png?alt=media&token=b3ea39b4-cba7-4095-8e6c-6996848f0391",
    });

  return await sgMail.send(msg as any);
};

const sendOverdueEmailReturned = async (snapshot: Record<string, any>) => {
  const expiryDate = new Date(snapshot.expiryTime).toLocaleString();
  const msg = {
    to: snapshot.borrowersEmail,
    from: "kuwago@bcc-opac-library.site",
    templateId: process.env.VITE_RETURNED_OVERDUE_TEMPLATE_ID,
    dynamic_template_data: {
      fullName: snapshot.fullName,
      bookTitle: snapshot.bookTitle,
      expiryTime: expiryDate,
      totalFee: `₱${snapshot.totalFee}`,
      returnCondition: snapshot.returnCondition,
    },
  };

  await admin
    .firestore()
    .collection("activity-logs-timeline")
    .add({
      actionType: "Automatic Pending Payments Email Notification",
      actions: `kuwago@bcc-opac-library.site sent  An email confirmation has been sent to ${snapshot.borrowersEmail} for the pending payments on ${snapshot.bookTitle}`,
      createdAt: admin.firestore.Timestamp.now(),
      currentUser: `kuwago@bcc-opac-library.site mailer-sender`,
      image:
        "https://firebasestorage.googleapis.com/v0/b/library-management-syste-fb3e9.appspot.com/o/def_user.png?alt=media&token=b3ea39b4-cba7-4095-8e6c-6996848f0391",
    });

  return await sgMail.send(msg as any);
};

const sendRequestedEmail = async (snapshot: Record<string, any>) => {
  const msg = {
    to: snapshot.borrowersEmail,
    subject: "",
    from: "kuwago@bcc-opac-library.site",
    templateId: process.env.VITE_REQUESTED_BOOK,
    dynamic_template_data: {
      fullName: snapshot.fullName,
      bookTitle: snapshot.bookTitle,
    },
  };

  await admin
    .firestore()
    .collection("activity-logs-timeline")
    .add({
      actionType: "Automatic Approve Requested Books Email Notification",
      actions: `kuwago@bcc-opac-library.site sent  An email confirmation has been sent to ${snapshot.borrowersEmail} for approving requested book on ${snapshot.bookTitle}`,
      createdAt: admin.firestore.Timestamp.now(),
      currentUser: `kuwago@bcc-opac-library.site mailer-sender`,
      image:
        "https://firebasestorage.googleapis.com/v0/b/library-management-syste-fb3e9.appspot.com/o/def_user.png?alt=media&token=b3ea39b4-cba7-4095-8e6c-6996848f0391",
    });

  return await sgMail.send(msg as any);
};

const sendRequestedBook = async (snapshot: Record<string, any>) => {
  const msg = {
    to: snapshot.borrowersEmail,
    subject: "",
    from: "kuwago@bcc-opac-library.site",
    templateId: process.env.VITE_REQUEST_BOOK,
    dynamic_template_data: {
      fullName: snapshot.fullName,
      bookTitle: snapshot.bookTitle,
    },
  };

  await admin
    .firestore()
    .collection("activity-logs-timeline")
    .add({
      actionType: "Automatic Request Books Email Notification",
      actions: `kuwago@bcc-opac-library.site sent  An email confirmation has been sent to ${snapshot.borrowersEmail} for requesting book on ${snapshot.bookTitle}`,
      createdAt: admin.firestore.Timestamp.now(),
      currentUser: `kuwago@bcc-opac-library.site mailer-sender`,
      image:
        "https://firebasestorage.googleapis.com/v0/b/library-management-syste-fb3e9.appspot.com/o/def_user.png?alt=media&token=b3ea39b4-cba7-4095-8e6c-6996848f0391",
    });

  return await sgMail.send(msg as any);
};

const sendCancelledRequestedBook = async (snapshot: Record<string, any>) => {
  const msg = {
    to: snapshot.borrowersEmail,
    subject: "",
    from: "kuwago@bcc-opac-library.site",
    templateId: process.env.VITE_CANCELLED_REQUESTED_BOOK,
    dynamic_template_data: {
      fullName: snapshot.fullName,
      bookTitle: snapshot.bookTitle,
      reasons: snapshot.reasons,
    },
  };

  await admin
    .firestore()
    .collection("activity-logs-timeline")
    .add({
      actionType: "Automatic Canceled Requested Books Email Notification",
      actions: `kuwago@bcc-opac-library.site sent  An email confirmation has been sent to ${snapshot.borrowersEmail} for declining/canceling requested book on ${snapshot.bookTitle}`,
      createdAt: admin.firestore.Timestamp.now(),
      currentUser: `kuwago@bcc-opac-library.site mailer-sender`,
      image:
        "https://firebasestorage.googleapis.com/v0/b/library-management-syste-fb3e9.appspot.com/o/def_user.png?alt=media&token=b3ea39b4-cba7-4095-8e6c-6996848f0391",
    });

  return await sgMail.send(msg as any);
};

const sendSuccessfullyBorrowedBook = async (snapshot: Record<string, any>) => {
  const msg = {
    to: snapshot.borrowersEmail,
    subject: "",
    from: "kuwago@bcc-opac-library.site",
    templateId: process.env.VITE_BORROWED_BOOK,
    dynamic_template_data: {
      fullName: snapshot.fullName,
      bookTitle: snapshot.bookTitle,
    },
  };

  await admin
    .firestore()
    .collection("activity-logs-timeline")
    .add({
      actionType: "Automatic Successfully Borrowed Books Email Notification",
      actions: `kuwago@bcc-opac-library.site sent  An email confirmation has been sent to ${snapshot.borrowersEmail} for declining/canceling requested book on ${snapshot.bookTitle}`,
      createdAt: admin.firestore.Timestamp.now(),
      currentUser: `kuwago@bcc-opac-library.site mailer-sender`,
      image:
        "https://firebasestorage.googleapis.com/v0/b/library-management-syste-fb3e9.appspot.com/o/def_user.png?alt=media&token=b3ea39b4-cba7-4095-8e6c-6996848f0391",
    });

  return await sgMail.send(msg as any);
};

export const EmailReturnedService = {
  sendEmailReturned,
  sendOverdueEmailReturned,
  sendRequestedEmail,
  sendEmailCompletedTransaction,
  sendRequestedBook,
  sendEmailReturnedWithPendingPayment,
  sendCancelledRequestedBook,
  sendSuccessfullyBorrowedBook,
};
