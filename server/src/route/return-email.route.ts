import express from "express";
import { EmailReturnedController } from "../controller/users/email.controller";

const router = express.Router();

router.post("/return-email", EmailReturnedController.createReturnEmail);
router.post("/requested-email", EmailReturnedController.createRequestedEmail);
router.post(
  "/cancelled-requested-book-email",
  EmailReturnedController.createEmailCancelledRequestedBookTransaction
);
router.post("/request-email", EmailReturnedController.createRequestedBook);
router.post(
  "/completed-transaction",
  EmailReturnedController.createEmailCompletedTransaction
);
router.post(
  "/returned-pending-payment",
  EmailReturnedController.createEmailReturnedWithPendingPayment
);
router.post(
  "/return-overdue-email",
  EmailReturnedController.createReturnOVerdueEmail
);

router.post(
  "/borrowed-books",
  EmailReturnedController.createEmailForSuccessfullyBorrowedBookTransaction
);

export const EmailReturnedRoute = router;
