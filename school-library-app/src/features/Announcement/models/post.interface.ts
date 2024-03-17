export default interface IPost {
  id?: string;

  firstName?: string;
  lastName?: string;
  middleName?: string;
  authorImage?: string;
  title?: string;

  content?: string;

  createdAt?: {
    seconds: number;
    nanoseconds: number;
  };

  thumbnail?: string;

  newsCategory?: string;

  status?: string;
}
