import { useQuery } from "@tanstack/react-query";
import { getAllLevelOfEducation } from "./level-of-education.service";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";

const useReadEducation = () => {
  return useQuery({
    queryFn: getAllLevelOfEducation,
    queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.LEVEL_OF_EDUCATION],

    refetchOnWindowFocus: false,
  });
};
export default useReadEducation;
