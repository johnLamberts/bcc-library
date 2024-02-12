export interface IBooks {
  id?: string;
  bookType: string;
  title: string;
  genres: string[];
  authors: string[];
  bookPrice?: number;
  bookISBN: string;
  callNumber: string;
  bookSection: string;
  bookLocation: string;
  publicationDetails: string;
  publisher: string;
  publicationDate: string;
  edition: string;

  bookDescription?: string;

  timeUnit: string;
  timeSpecifier?: string;
  milliseconds: number;

  bookImageCover: string | File | null;
  bookFile: File | string | null;

  numberOfBooksAvailable_QUANTITY?: number;
}
