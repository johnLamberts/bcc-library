import { useQuery } from "@tanstack/react-query";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { getTotalTransactionsByDateRange } from "../service/admin-dashboard.service";

function getStartOfWeek(): Date {
  const today = new Date();
  const dayOfWeek = today.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
  const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Adjust for Sunday
  return new Date(today.setDate(diff));
}

// Function to get the end date (Sunday) of the current week
function getEndOfWeek(): Date {
  const startOfWeek = getStartOfWeek();
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  return endOfWeek;
}

const useReadWeeklyReports = () => {
  return useQuery({
    queryFn: async () =>
      await getTotalTransactionsByDateRange(getStartOfWeek(), getEndOfWeek()),

    queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.ADMIN_WEEKLY_REPORTS],

    refetchOnWindowFocus: false,
  });
};

export default useReadWeeklyReports;
