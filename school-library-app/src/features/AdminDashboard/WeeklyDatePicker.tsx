import { useState } from "react";
import { startOfWeek, addDays, format } from "date-fns";
import { useSearchParams } from "react-router-dom";

const WeeklyDatePicker = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const [searchParams, setSearchParams] = useSearchParams();

  // Function to get the start and end dates of the week
  const getWeekRange = (date: Date) => {
    const weekStart = startOfWeek(date, { weekStartsOn: 1 });
    const weekEnd = addDays(weekStart, 6);
    return { start: weekStart, end: weekEnd };
  };

  const { start, end } = getWeekRange(currentDate);

  const handleNextWeek = () => {
    const nextDate = addDays(currentDate, 7);
    const { start: nextStart, end: nextEnd } = getWeekRange(nextDate);

    setCurrentDate(nextDate);

    searchParams.set("start", format(nextStart, "MM-dd-yyyy"));
    searchParams.set("end", format(nextEnd, "MM-dd-yyyy"));

    setSearchParams(searchParams);
  };

  const handlePreviousWeek = () => {
    const prevDate = addDays(currentDate, -7);
    const { start: prevStart, end: prevEnd } = getWeekRange(prevDate);

    setCurrentDate(prevDate);

    searchParams.set("start", format(prevStart, "MM-dd-yyyy"));
    searchParams.set("end", format(prevEnd, "MM-dd-yyyy"));

    setSearchParams(searchParams);
  };

  return (
    <div>
      <p>
        {searchParams.get("start") === null
          ? format(start, "MMMM dd, yyyy")
          : searchParams.get("start")}{" "}
        -{" "}
        {searchParams.get("end") === null
          ? format(end, "MMMM dd, yyyy")
          : searchParams.get("end")}
      </p>
      <button onClick={handlePreviousWeek}>Previous Week</button>
      <button onClick={handleNextWeek}>Next Week</button>
    </div>
  );
};
export default WeeklyDatePicker;
