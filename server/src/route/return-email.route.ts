import express from "express";
import { EmailReturnedController } from "../controller/users/email-returned.controller";

const router = express.Router();

router.post("/return-email", EmailReturnedController.createReturnEmail);
router.post(
  "/return-overdue-email",
  EmailReturnedController.createReturnOVerdueEmail
);
export const EmailReturnedRoute = router;
