import dotenv from "dotenv";
import sgMail from "@sendgrid/mail";

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
};
