import { Request, Response } from "express";
import { UserService } from "../../service/users.service";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserService.getAllUsers();

    return res.json({
      data: users,
      status: "Success",
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({
        error: err.message,
      });
    }
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    console.log({ ...req.body });
    const newUsers = await UserService.createUser({ ...req.body });

    return res.json({
      data: newUsers,
      status: "New User has been successfully added.",
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({
        error: err.message,
      });
    }
  }
};

const importUsers = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const dummy = await UserService.importUsers(data);

    res.send({
      dummy,
      status:
        "Authentication and Users Collection has been successfully migrated.",
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({
        error: err.message,
      });
    }
  }
};

const modifyUser = async (req: Request, res: Response) => {
  try {
    // console.log({ ...req.body });
    const { userId } = req.params;

    const updateUser = await UserService.updateUser(
      { ...req.body },
      req.body.userUID,
      userId
    );

    return res.json({
      data: updateUser,
      status: "Updating User has been successfully done.",
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({
        error: err.message,
      });
    }
  }
};

const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const updateUser = await UserService.updateUserStatus(
      req.body.isEnabled,
      req.body.userUID,
      userId
    );

    return res.json({
      data: updateUser,
      status: "Updating User's status has been successfully done.",
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({
        error: err.message,
      });
    }
  }
};

export const UsersController = {
  getAllUsers,
  createUser,
  modifyUser,
  importUsers,
  updateUserStatus,
};
