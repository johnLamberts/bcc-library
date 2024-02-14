"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeachersRoute = void 0;
var express_1 = __importDefault(require("express"));
var teachers_controller_1 = require("../controller/users/teachers.controller");
var router = express_1.default.Router();
router.get("/all", teachers_controller_1.TeachersController.getAllTeachers);
router.post("/new", teachers_controller_1.TeachersController.createTeacher);
router.put("/modify/:teacherId", teachers_controller_1.TeachersController.modifyTeacher);
router.put("/modify-status/:teacherId", teachers_controller_1.TeachersController.updateTeacherStatus);
router.post("/import-students", teachers_controller_1.TeachersController.importTeachers);
exports.TeachersRoute = router;
