export interface IBooks {
  id?: string;
  bookType: string | null;
  title: string | null;
  genres: string[];
  authors: string[];
  bookISBN: string;
  callNumber: string;
  bookSection: string;
  bookLocation: string;
  publicationDetails: string;
  publisher: string;
  publicationDate: string;
  edition: string;

  timeUnit: string;
  timeSpecifier?: string;
  milliseconds: number;

  bookImageCover: string | File | null;
  bookFile: File | string | null;

  numberOfBooksAvailable_QUANTITY?: number;
}
