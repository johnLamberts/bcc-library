import { StudentService } from "../../service/students.service";
import { Request, Response } from "express";

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const students = await StudentService.getAllStudents();

    return res.json({
      data: students,
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

const createStudent = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const newStudent = await StudentService.createStudent({ ...req.body });

    return res.json({
      data: newStudent,
      status: "New Student has been successfully added.",
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({
        error: err.message,
      });
    }
  }
};

const modifyStudent = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const { studentId } = req.params;

    const updateStudent = await StudentService.updateStudent({
      userDocID: req.body.userDocID,
      userUID: req.body.userUID,
      id: studentId,
      ...req.body,
    });

    return res.json({
      data: updateStudent,
      status: "Updating Student has been successfully done.",
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({
        error: err.message,
      });
    }
  }
};

const importStudents = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    let progress = 0;

    // Function to emit progress updates
    const progressCallback = (currentProgress: number) => {
      if (currentProgress > progress) {
        progress = currentProgress;
        // Emit progress update to the client (optional)
        console.log(`Progress: ${progress}%`);
      }
    };

    const students = await StudentService.importStudents(data);

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

const updateStudentStatus = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    const updateUser = await StudentService.updateStudentStatus(
      req.body.isEnabled,
      req.body.userUID,
      req.body.userDocID,
      studentId
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

export const StudentsController = {
  createStudent,
  getAllStudents,
  modifyStudent,
  importStudents,
  updateStudentStatus,
};
