import { useQuery } from "@tanstack/react-query";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { getUsers } from "../service/admin-dashboard.service";

function useCountUsers() {
  return useQuery({
    queryFn: getUsers,
    queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.ADMIN_USERS],

    refetchOnWindowFocus: false,
  });
}

export default useCountUsers;
