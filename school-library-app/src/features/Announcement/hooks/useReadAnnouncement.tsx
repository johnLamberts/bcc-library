import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { getAnnouncement } from "../services/announcement.service";
import { useSearchParams } from "react-router-dom";
import { ANNOUNCEMENT_PAGE_SIZE } from "src/shared/constant";

const useReadAnnouncement = () => {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const q = !searchParams.get("q") ? "" : searchParams.get("q");
  const fq = !searchParams.get("fq") ? "" : searchParams.get("fq");
  const act = !searchParams.get("act") ? "" : searchParams.get("act");

  const { data: news, isLoading } = useQuery({
    queryFn: () =>
      getAnnouncement(page, q as string, fq as string, act as string),
    queryKey: [
      FIRESTORE_COLLECTION_QUERY_KEY.NEWS_ANNOUNCEMENT,
      page,
      q,
      fq,
      act,
    ],

    refetchOnWindowFocus: false,
  });

  const pageCount = Math.ceil((news?.count as number) / ANNOUNCEMENT_PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: [
        FIRESTORE_COLLECTION_QUERY_KEY.NEWS_ANNOUNCEMENT,
        page + 1,
        q,
        fq,
        act,
      ],
      queryFn: () =>
        getAnnouncement(page + 1, q as string, fq as string, act as string),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: [
        FIRESTORE_COLLECTION_QUERY_KEY.NEWS_ANNOUNCEMENT,
        page - 1,
        q,
        fq,
        act,
      ],
      queryFn: () =>
        getAnnouncement(page - 1, q as string, fq as string, act as string),
    });

  //   const pageCount = Math.ceil(books!.count / ANNOUNCEMENT_PAGE_SIZE);

  return { newsData: news?.newsData, count: news?.count, isLoading };
};

export default useReadAnnouncement;
