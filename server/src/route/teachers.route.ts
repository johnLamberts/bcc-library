import express from "express";
import { TeachersController } from "../controller/users/teachers.controller";

const router = express.Router();

router.get("/all", TeachersController.getAllTeachers);
router.post("/new", TeachersController.createTeacher);
router.put("/modify/:teacherId", TeachersController.modifyTeacher);
router.put("/modify-status/:teacherId", TeachersController.updateTeacherStatus);
router.post("/import-students", TeachersController.importTeachers);

export const TeachersRoute = router;
