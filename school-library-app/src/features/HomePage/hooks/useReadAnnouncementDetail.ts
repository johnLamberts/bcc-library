import { useParams } from "react-router-dom";
import { getNewsDetail } from "../services/announcement.service";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { useQuery } from "@tanstack/react-query";

const useNewsDetail = () => {
  const { postId } = useParams();

  const {
    isLoading,
    data: news,
    error,
  } = useQuery({
    queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.NEWS_ANNOUNCEMENT, postId],
    queryFn: () => getNewsDetail(postId),
  });

  return {
    isLoading,
    news,
    error,
  };
};
export default useNewsDetail;
