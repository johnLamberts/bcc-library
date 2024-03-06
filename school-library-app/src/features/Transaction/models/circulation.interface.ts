import { ITeacher } from "@features/Teachers/models/teacher.interface";
import { IStudents } from "@features/Student/models/student.interface";
import { IBooks } from "@features/Catalogue/models/books.interface";

export type TCirculation = Partial<IBooks & ITeacher & IStudents>;

export interface ICirculation {
  id?: string;
  bookISBN?: string;

  bookLocation: string;

  bookSection: string;

  bookTitle: string;

  bookType: string;

  booksId: string;

  borrowers: string;

  borrowersEmail: string;

  borrowersId: string;

  firstName?: string;
  middleName?: string;
  lastName?: string;

  borrowersNumber: string;

  callNumber: string;

  numberOfBooksAvailable_QUANTITY: number;

  timeDuration: number;

  expiryTime: number;

  createdAt: {
    seconds: number;
    nanoseconds: number;
  };

  dateReturned: {
    seconds: number;
    nanoseconds: number;
  };

  borrowStatus?: string;

  totalFee?: number;
  bookPrice?: number;
  returnCondition?: string;
  booksBorrowedId?: string;

  bookCondition?: string;

  status?: string;

  booksPrice?: number;

  fee?: number;
  categoryFee?: number | string;
  conditionFee?: number | string;

  descriptionOrNotes?: string;
  conditionCategory?: string;
  damageCategory?: string;
}
