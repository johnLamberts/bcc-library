import { useQuery } from "@tanstack/react-query";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { getTotalTransactionsByDateRange } from "../service/admin-dashboard.service";
import { useSearchParams } from "react-router-dom";

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
  const [searchParams] = useSearchParams();

  // const startDate = searchParams.get("start") || getStartOfWeek();
  // const endDate = searchParams.get("end") || getEndOfWeek();

  const startDate =
    new Date(searchParams.get("start") as string) || getStartOfWeek();
  const endDate = new Date(searchParams.get("end") as string) || getEndOfWeek();

  const { data: weekly, isLoading } = useQuery({
    queryFn: async () =>
      await getTotalTransactionsByDateRange(startDate, endDate),

    queryKey: [
      FIRESTORE_COLLECTION_QUERY_KEY.ADMIN_WEEKLY_REPORTS,
      startDate,
      // endDate,
    ],

    refetchOnWindowFocus: false,
  });

  return { weekly, isLoading };
};

export default useReadWeeklyReports;
