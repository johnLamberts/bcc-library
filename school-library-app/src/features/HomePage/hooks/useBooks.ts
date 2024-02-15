import { useQuery } from "@tanstack/react-query";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { getAllBooks } from "../services/books.service";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "src/shared/constant";

const useBooks = () => {
  const [searchParams] = useSearchParams();

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  console.log(page);
  const { data: books } = useQuery({
    queryFn: () => getAllBooks(page),
    queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.BOOKS_CATALOGUE, page],

    refetchOnWindowFocus: false,
  });

  //   const pageCount = Math.ceil(books!.count / PAGE_SIZE);

  return { booksData: books?.booksData, count: books?.count };
};
export default useBooks;
