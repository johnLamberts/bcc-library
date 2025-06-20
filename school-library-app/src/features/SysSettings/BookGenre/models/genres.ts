export default interface IGenre {
  id?: string | number;
  bookType: string;
  genres: string;

  genresName?: string;
  isArchived?: boolean;
}
