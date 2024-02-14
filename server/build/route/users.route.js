"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRoute = void 0;
var express_1 = __importDefault(require("express"));
var users_controller_1 = require("../controller/users/users.controller");
var router = express_1.default.Router();
router.get("/all", users_controller_1.UsersController.getAllUsers);
router.post("/new", users_controller_1.UsersController.createUser);
router.put("/modify/:userId", users_controller_1.UsersController.modifyUser);
router.put("/modify-status/:userId", users_controller_1.UsersController.updateUserStatus);
router.post("/import-users", users_controller_1.UsersController.importUsers);
// router.post("/modify", UsersController.importUsers);
exports.UsersRoute = router;
