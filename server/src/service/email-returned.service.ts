import dotenv from "dotenv";
import sgMail from "@sendgrid/mail";

dotenv.config();

sgMail.setApiKey(process.env.VITE_SENDGRID_API_KEY as string);

const sendEmailReturned = async (snapshot: Record<string, any>) => {
  const msg = {
    to: snapshot.borrowersEmail,
    subject: "",
    from: "librsystem.e@gmail.com",
    templateId: process.env.VITE_RETURNED_TEMPLATE_ID,
    dynamic_template_data: {
      fullName: snapshot.borrowersName,
    },
  };

  return await sgMail.send(msg as any);
};

const sendOverdueEmailReturned = async (snapshot: Record<string, any>) => {
  const expiryDate = new Date(snapshot.expiryTime).toLocaleString();
  const msg = {
    to: snapshot.borrowersEmail,
    from: "librsystem.e@gmail.com",
    templateId: process.env.VITE_RETURNED_OVERDUE_TEMPLATE_ID,
    dynamic_template_data: {
      fullName: snapshot.borrowersName,
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
    from: "librsystem.e@gmail.com",
    templateId: process.env.VITE_REQUESTED_BOOK,
    dynamic_template_data: {
      fullName: snapshot.borrowersName,
      bookTitle: snapshot.bookTitle,
    },
  };

  return await sgMail.send(msg as any);
};

const sendRequestedBook = async (snapshot: Record<string, any>) => {
  const msg = {
    to: snapshot.borrowersEmail,
    subject: "",
    from: "librsystem.e@gmail.com",
    templateId: process.env.VITE_REQUEST_BOOK,
    dynamic_template_data: {
      fullName: snapshot.borrowersName,
      bookTitle: snapshot.bookTitle,
    },
  };

  return await sgMail.send(msg as any);
};

export const EmailReturnedService = {
  sendEmailReturned,
  sendOverdueEmailReturned,
  sendRequestedEmail, sendRequestedBook
};
