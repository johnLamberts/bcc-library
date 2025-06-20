import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { getMemoizedAllUsers } from "../services/user.service";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "src/shared/constant";

const useReadCardUsers = () => {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const usr = !searchParams.get("usr") ? "" : searchParams.get("usr");
  const q = !searchParams.get("q") ? "" : searchParams.get("q");
  const act = !searchParams.get("act") ? "" : searchParams.get("act");

  const { data: news, isLoading } = useQuery({
    queryFn: () =>
      getMemoizedAllUsers(page, usr as string, q as string, act as string),
    queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.USERS, page, usr, q, act],

    refetchOnWindowFocus: false,
  });

  const pageCount = Math.ceil((news?.count as number) / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.USERS, page + 1, usr, q, act],
      queryFn: () =>
        getMemoizedAllUsers(
          page + 1,
          usr as string,
          q as string,
          act as string
        ),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.USERS, page - 1, usr, q, act],
      queryFn: () =>
        getMemoizedAllUsers(
          page - 1,
          usr as string,
          q as string,
          act as string
        ),
    });

  //   const pageCount = Math.ceil(books!.count / ANNOUNCEMENT_PAGE_SIZE);

  return { usersData: news?.usersData, count: news?.count, isLoading };
};

export default useReadCardUsers;
