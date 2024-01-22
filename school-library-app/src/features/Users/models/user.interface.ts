export interface IUser {
  id?: string;
  firstName: string;
  lastName: string;
  middleName: string;

  email: string;
  password?: string;

  createdAt: {
    _seconds: number;
    _nanoseconds: number;
  };

  avatarImage?: string | File;

  userUID?: string;

  isEnabled?: boolean | false;

  userRole: string;
}
