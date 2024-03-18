import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { getAnnouncement } from "../services/announcement.service";
import { getAllBooks } from "@features/HomePage/services/books.service";
import { useSearchParams } from "react-router-dom";
import { ANNOUNCEMENT_PAGE_SIZE } from "src/shared/constant";

const useReadAnnouncement = () => {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // const filterType = !searchParams.get("bookType")
  //   ? ""
  //   : searchParams.get("bookType");
  // const filterGenre = !searchParams.get("genre")
  //   ? ""
  //   : searchParams.get("genre");

  const { data: news, isLoading } = useQuery({
    queryFn: () => getAnnouncement(page),
    queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.NEWS_ANNOUNCEMENT, page],

    refetchOnWindowFocus: false,
  });

  const pageCount = Math.ceil((news?.count as number) / ANNOUNCEMENT_PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.NEWS_ANNOUNCEMENT, page + 1],
      queryFn: () => getAllBooks(page + 1),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.NEWS_ANNOUNCEMENT, page - 1],
      queryFn: () => getAllBooks(page - 1),
    });

  //   const pageCount = Math.ceil(books!.count / ANNOUNCEMENT_PAGE_SIZE);

  return { newsData: news?.newsData, count: news?.count, isLoading };
};

export default useReadAnnouncement;
