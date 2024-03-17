import { useQuery } from "@tanstack/react-query";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { getAllNewsAnnouncement } from "../services/announcement.service";

const useReadAnnouncement = () => {
  return useQuery({
    queryFn: getAllNewsAnnouncement,
    queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.NEWS_ANNOUNCEMENT],

    refetchOnWindowFocus: false,
  });
};

export default useReadAnnouncement;
