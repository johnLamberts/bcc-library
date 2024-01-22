import express from "express";
import { StudentsController } from "../controller/users/students.controller";

const router = express.Router();

router.get("/all", StudentsController.getAllStudents);
router.post("/new", StudentsController.createStudent);
router.put("/modify/:studentId", StudentsController.modifyStudent);
router.put("/modify-status/:studentId", StudentsController.updateStudentStatus);
router.post("/import-students", StudentsController.importStudents);

export const StudentsRoute = router;
