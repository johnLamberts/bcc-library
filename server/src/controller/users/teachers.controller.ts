import { Request, Response } from "express";
import { TeacherService } from "../../service/teacher.service";

const getAllTeachers = async (req: Request, res: Response) => {
  try {
    const teachers = await TeacherService.getAllTeachers();

    return res.json({
      data: teachers,
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

const createTeacher = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const newTeacher = await TeacherService.createTeacher({ ...req.body });

    return res.json({
      data: newTeacher,
      status: "New Teacher has been successfully added.",
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({
        error: err.message,
      });
    }
  }
};

const modifyTeacher = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const { teacherId } = req.params;

    const updateTeacher = await TeacherService.updateTeacher({
      userDocID: req.body.userDocID,
      userUID: req.body.userUID,
      id: teacherId,
      ...req.body,
    });

    return res.json({
      data: updateTeacher,
      status: "Updating Teacher has been successfully done.",
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({
        error: err.message,
      });
    }
  }
};

const importTeachers = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const students = await TeacherService.importTeachers(data);

    res.send({
      students,
      status:
        "Authentication and Students Collection has been successfully migrated.",
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({
        error: err.message,
      });
    }
  }
};

const updateTeacherStatus = async (req: Request, res: Response) => {
  try {
    const { teacherId } = req.params;

    const updateTeacher = await TeacherService.updateTeacherStatus(
      req.body.isEnabled,
      req.body.userUID,
      req.body.userDocID,
      teacherId
    );

    return res.json({
      data: updateTeacher,
      status: "Updating Teacher's status has been successfully done.",
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({
        error: err.message,
      });
    }
  }
};

export const TeachersController = {
  createTeacher,
  getAllTeachers,
  modifyTeacher,
  importTeachers,
  updateTeacherStatus,
};
