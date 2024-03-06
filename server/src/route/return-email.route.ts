import express from "express";
import { EmailReturnedController } from "../controller/users/email.controller";

const router = express.Router();

router.post("/return-email", EmailReturnedController.createReturnEmail);
router.post("/requested-email", EmailReturnedController.createRequestedEmail);
router.post("/request-email", EmailReturnedController.createRequestedBook);
router.post(
  "/returned-pending-payment",
  EmailReturnedController.createEmailReturnedWithPendingPayment
);
router.post(
  "/return-overdue-email",
  EmailReturnedController.createReturnOVerdueEmail
);
export const EmailReturnedRoute = router;
