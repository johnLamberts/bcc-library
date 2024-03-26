import { useState } from "react";
import { startOfWeek, addDays, format } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { Box, Button, Flex, Group, Text } from "@mantine/core";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

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
    <Box>
      <Flex direction={"column"} align={"left"} justify={"center"}>
        <Box>
          <Text ff={"Montserrat"}>
            {searchParams.get("start") === null
              ? format(start, "MMMM dd, yyyy")
              : searchParams.get("start")}{" "}
            -{" "}
            {searchParams.get("end") === null
              ? format(end, "MMMM dd, yyyy")
              : searchParams.get("end")}
          </Text>
        </Box>
        <Group gap={"xs"}>
          <Button
            variant="outline"
            onClick={handlePreviousWeek}
            style={{
              height: "1.8rem",
            }}
            leftSection={<IconArrowLeft stroke={1} size={"1.3rem"} />}
          >
            Previous Week
          </Button>{" "}
          <Button
            variant="outline"
            style={{
              height: "1.8rem",
            }}
            rightSection={<IconArrowRight stroke={1} size={"1.3rem"} />}
            onClick={handleNextWeek}
          >
            Next Week
          </Button>
        </Group>
      </Flex>
    </Box>
  );
};
export default WeeklyDatePicker;
