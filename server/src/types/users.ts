import { File } from "buffer";

export type TUsers = {
  firstName: string;
  lastName: string;
  middleName: string;

  email: string;
  password: string;
  displayName: string;

  avatarImage: string;
  userRole: string;
  isEnabled: boolean;
};

export type TStudents = {
  firstName: string;
  lastName: string;
  middleName: string;

  email: string;
  password: string;
  displayName: string;
  studentImage: string;

  studentNumber: string;

  studentEntry: number;
  currentYear: number;
  userRole: string;

  sex: string;
  academicCourse: string;
  gradeLevel: string;
  levelOfEducation: string;
  gradeSection: string;

  contactNumber?: string;
  userUID?: string;
  userDocID?: string;
  id?: string;

  isEnabled?: boolean;
};

export type TTeacher = {
  firstName: string;
  lastName: string;
  middleName: string;

  email: string;
  password: string;
  displayName: string;
  teacherImage: string;

  teacherNumber: string;

  teacherEntry: number;
  currentYear: number;
  userRole: string;

  sex: string;
  academicCourse: string;
  gradeLevel: string;
  levelOfEducation: string;
  gradeSection: string;

  contactNumber?: string;
  userUID?: string;
  userDocID?: string;
  id?: string;

  isEnabled?: boolean;
};
