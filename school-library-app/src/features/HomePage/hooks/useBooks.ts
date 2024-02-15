import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { getAllBooks } from "../services/books.service";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "src/shared/constant";
import { count } from "firebase/firestore";

const useBooks = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  console.log(page);
  const { data: books } = useQuery({
    queryFn: () => getAllBooks(page),
    queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.BOOKS_CATALOGUE, page],

    refetchOnWindowFocus: false,
  });

  const pageCount = Math.ceil((books?.count as number) / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.BOOKS_CATALOGUE, page + 1],
      queryFn: () => getAllBooks(page + 1),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.BOOKS_CATALOGUE, page - 1],
      queryFn: () => getAllBooks(page - 1),
    });

  //   const pageCount = Math.ceil(books!.count / PAGE_SIZE);

  return { booksData: books?.booksData, count: books?.count };
};
export default useBooks;
