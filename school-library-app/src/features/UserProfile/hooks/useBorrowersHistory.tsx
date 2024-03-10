import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { getHistory } from "../services/history.service";

const useBorrowersHistory = () => {
  const { manageProfileId } = useParams();

  const sanitizeUrl = manageProfileId?.split("_");

  console.log(manageProfileId);

  const { isLoading, data: userHistory } = useQuery({
    queryFn: () => getHistory(sanitizeUrl?.[0]),
    queryKey: [
      FIRESTORE_COLLECTION_QUERY_KEY.CURRENT_USERS_HISTORY_TRANSACTION,
    ],
  });

  return { isLoading, userHistory };
};
export default useBorrowersHistory;
