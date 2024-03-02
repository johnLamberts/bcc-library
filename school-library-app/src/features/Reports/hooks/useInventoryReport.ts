import { useQuery } from "@tanstack/react-query";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { getAllBooksByInventory } from "../services/inventory-report.service";

const useReadInventoryReport = () => {
  return useQuery({
    queryFn: getAllBooksByInventory,
    queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.CATALOGUE],

    refetchOnWindowFocus: false,
  });
};

export default useReadInventoryReport;
