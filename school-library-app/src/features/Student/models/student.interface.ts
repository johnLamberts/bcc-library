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

  sex: string | null;
  academicCourse: string | null;
  gradeLevel: string | null;
  gradeSection: string | null;
  levelOfEducation: string | null;

  userUID?: string;
  userDocID?: string;

  isEnabled?: boolean;

  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
}
