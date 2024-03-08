import { useQuery } from "@tanstack/react-query";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { getAllGenres, getArchiveGenres } from "../services/genres";

const useReadGenre = () => {
  return useQuery({
    queryFn: getAllGenres,
    queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.GENRE],

    refetchOnWindowFocus: false,
  });
};

const useReadArchiveGenre = () => {
  return useQuery({
    queryFn: getArchiveGenres,
    queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.ARCHIVE_GENRE],

    refetchOnWindowFocus: false,
  });
};
export { useReadGenre, useReadArchiveGenre };
