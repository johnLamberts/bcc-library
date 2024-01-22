import { useQuery } from "@tanstack/react-query";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { getAllUserRole } from "../services/user-role.service";

const useReadUserRole = () => {
  return useQuery({
    queryFn: getAllUserRole,
    queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.USER_ROLE],

    refetchOnWindowFocus: false,
  });
};
export default useReadUserRole;
