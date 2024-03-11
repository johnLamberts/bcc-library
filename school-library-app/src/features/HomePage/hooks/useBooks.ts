import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { getAllBooks } from "../services/books.service";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "src/shared/constant";

const useBooks = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const filterType = !searchParams.get("bookType")
    ? ""
    : searchParams.get("bookType");
  const filterGenre = !searchParams.get("genre")
    ? ""
    : searchParams.get("genre");

  const { data: books, isLoading } = useQuery({
    queryFn: () =>
      getAllBooks(page, filterType as string, filterGenre as string),
    queryKey: [
      FIRESTORE_COLLECTION_QUERY_KEY.BOOKS_CATALOGUE,
      page,
      filterType,
      filterGenre,
    ],

    refetchOnWindowFocus: false,
  });

  const pageCount = Math.ceil((books?.count as number) / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: [
        FIRESTORE_COLLECTION_QUERY_KEY.BOOKS_CATALOGUE,
        page + 1,
        filterType,
        filterGenre,
      ],
      queryFn: () =>
        getAllBooks(page + 1, filterType as string, filterGenre as string),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: [
        FIRESTORE_COLLECTION_QUERY_KEY.BOOKS_CATALOGUE,
        page - 1,
        filterType,
        filterGenre,
      ],
      queryFn: () =>
        getAllBooks(page - 1, filterType as string, filterGenre as string),
    });

  //   const pageCount = Math.ceil(books!.count / PAGE_SIZE);

  return { booksData: books?.booksData, count: books?.count, isLoading };
};
export default useBooks;
