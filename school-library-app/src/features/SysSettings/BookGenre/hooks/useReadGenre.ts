import { useQuery } from "@tanstack/react-query";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { getAllGenres,  } from "../services/genres";

const useReadGenre = () => {
  return useQuery({
    queryFn: getAllGenres,
    queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.GENRE],

    refetchOnWindowFocus: false,
  });
};
export default useReadGenre;
