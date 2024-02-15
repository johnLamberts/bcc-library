import { useQuery } from "@tanstack/react-query";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { getCurrentUser } from "../services/auth.service";

const useCurrentUser = () => {
  const { isLoading, data: user } = useQuery({
    queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.CURRENT_USER],
    queryFn: getCurrentUser,
  });

  return { isLoading, user };
};
export default useCurrentUser;
