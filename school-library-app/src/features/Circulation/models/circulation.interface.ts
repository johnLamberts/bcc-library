import { ITeacher } from "@features/Teachers/models/teacher.interface";
import { IStudents } from "@features/Student/models/student.interface";
import { IBooks } from "@features/Catalogue/models/books.interface";

export type TCirculation = Partial<IBooks & ITeacher & IStudents>;

export interface ICirculation {
  bookISBN: string;

  bookLocation: string;

  bookSection: string;

  bookTitle: string;

  bookType: string;

  booksId: string;

  borrowers: string;

  borrowersEmail: string;

  borrowersId: string;

  borrowersName: string;

  borrowersNumber: string;

  callNumber: string;

  numberOfBooksAvailable_QUANTITY: number;

  timeDuration: number;

  expiryTime: number;

  createdAt: number;
}
