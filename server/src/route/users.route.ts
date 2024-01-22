import express from "express";
import { UsersController } from "../controller/users/users.controller";

const router = express.Router();

router.get("/all", UsersController.getAllUsers);
router.post("/new", UsersController.createUser);
router.put("/modify/:userId", UsersController.modifyUser);
router.put("/modify-status/:userId", UsersController.updateUserStatus);
router.post("/import-users", UsersController.importUsers);
// router.post("/modify", UsersController.importUsers);

export const UsersRoute = router;
