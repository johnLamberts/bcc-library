export interface ITeacher {
  id?: string;
  firstName: string;
  lastName: string;
  middleName: string;

  email: string;
  password: string;
  displayName: string;
  teacherImage?: string | File;

  teacherNumber: string;

  teacherEntry: number;
  currentYear: number;
  userRole: string;

  sex: string;
  academicCourse: string;
  gradeLevel: string;
  section: string;
  levelOfEducation: string;

  userUID?: string;
  userDocID?: string;

  isEnabled?: boolean;
}
