"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentsRoute = void 0;
var express_1 = __importDefault(require("express"));
var students_controller_1 = require("../controller/users/students.controller");
var router = express_1.default.Router();
router.get("/all", students_controller_1.StudentsController.getAllStudents);
router.post("/new", students_controller_1.StudentsController.createStudent);
router.put("/modify/:studentId", students_controller_1.StudentsController.modifyStudent);
router.put("/modify-status/:studentId", students_controller_1.StudentsController.updateStudentStatus);
router.post("/import-students", students_controller_1.StudentsController.importStudents);
exports.StudentsRoute = router;
