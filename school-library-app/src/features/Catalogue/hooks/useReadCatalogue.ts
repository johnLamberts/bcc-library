import { useQuery } from "@tanstack/react-query";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import {
  getAllBooksCatalogue,
} from "../service/catalogue.service";

const useReadCatalogue = () => {
  return useQuery({
    queryFn: getAllBooksCatalogue,
    queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.CATALOGUE],

    refetchOnWindowFocus: false,
  });
};

export default useReadCatalogue;
