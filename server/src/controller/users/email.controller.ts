import { Request, Response } from "express";
import { EmailReturnedService } from "../../service/email-returned.service";

const createReturnEmail = async (req: Request, res: Response) => {
  try {
    const newUsers = await EmailReturnedService.sendEmailReturned({
      ...req.body,
    });

    return res.json({
      data: newUsers,
      status: "You have send an email already!",
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({
        error: err.message,
      });
    }
  }
};

const createReturnOVerdueEmail = async (req: Request, res: Response) => {
  try {
    const newUsers = await EmailReturnedService.sendOverdueEmailReturned({
      ...req.body,
    });

    return res.json({
      data: newUsers,
      status: "You have send an email already!",
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({
        error: err.message,
      });
    }
  }
};

const createRequestedEmail = async (req: Request, res: Response) => {
  try {
    const newUsers = await EmailReturnedService.sendRequestedEmail({
      ...req.body,
    });

    return res.json({
      data: newUsers,
      status: "You have send an email already!",
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({
        error: err.message,
      });
    }
  }
};

const createRequestedBook = async (req: Request, res: Response) => {
  try {
    const newUsers = await EmailReturnedService.sendRequestedBook({
      ...req.body,
    });

    return res.json({
      data: newUsers,
      status: "You have send an email already!",
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({
        error: err.message,
      });
    }
  }
};
const createEmailReturnedWithPendingPayment = async (
  req: Request,
  res: Response
) => {
  try {
    const newUsers =
      await EmailReturnedService.sendEmailReturnedWithPendingPayment({
        ...req.body,
      });

    return res.json({
      data: newUsers,
      status: "You have send an email already!",
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({
        error: err.message,
      });
    }
  }
};
export const EmailReturnedController = {
  createReturnEmail,
  createReturnOVerdueEmail,
  createRequestedEmail,
  createRequestedBook,
  createEmailReturnedWithPendingPayment,
};
