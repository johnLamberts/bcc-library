export interface IStudents {
  id?: string;
  firstName: string;
  lastName: string;
  middleName: string;

  email: string;
  password: string;
  displayName: string;
  studentImage?: string | File;

  studentNumber?: string;

  studentEntry: number;
  currentYear: number;
  userRole: string;

  sex: string;
  academicCourse: string;
  gradeLevel: string;
  gradeSection: string;
  levelOfEducation: string;

  userUID?: string;
  userDocID?: string;

  isEnabled?: boolean;

  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
}
