import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../services/user.service";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";

const useReadUsers = () => {
  return useQuery({
    queryFn: getAllUsers,
    queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.USERS],

    refetchOnWindowFocus: false,
  });
};

export default useReadUsers;
