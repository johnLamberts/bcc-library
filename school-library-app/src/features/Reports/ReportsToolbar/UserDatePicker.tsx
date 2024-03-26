/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { format } from "date-fns";
import {
  MRT_Column,
  MRT_RowData,
  MRT_TableInstance,
} from "mantine-react-table";
import { useState } from "react";

interface DateRangeState {
  startDate: Date | null;
  endDate: Date | null;
}

const UserDateRangeReport = <TData extends MRT_RowData>({
  table,
  column,
}: {
  table: MRT_TableInstance<TData>;
  column?: MRT_Column<TData>;
}) => {
  const [dateRangeState, setDateRangeState] = useState<DateRangeState>({
    startDate: null,
    endDate: null,
  });

  const handleDateRangeChange = (dates: [Date | null, Date | null]) => {
    const [startDate, endDate] = dates;
    setDateRangeState({ startDate, endDate });
  };

  const handleFilter = () => {
    const { startDate, endDate } = dateRangeState;

    const startDateFormat = format(new Date(startDate as Date), "MMMM dd yyyy");

    const endDateFormat = format(new Date(endDate as Date), "MMMM dd yyyy");

    if (!startDate || !endDate) {
      return;
    }
    const filteredData = (table as any)
      ._getCoreRowModel()
      .flatRows.filter((row: any) => {
        const dateVal = format(
          new Date(
            row.original.createdAt._seconds * 1000 +
              row.original.createdAt._nanoseconds / 1000
          ),
          "MMMM dd yyyy"
        );

        return dateVal >= startDateFormat && dateVal <= endDateFormat;
      });

    const selectedValues = filteredData.map((row: any) =>
      format(
        new Date(
          row.original.createdAt._seconds * 1000 +
            row.original.createdAt._nanoseconds / 1000
        ),
        "MMMM dd yyyy"
      )
    );

    console.log(selectedValues);

    column?.setFilterValue(selectedValues.length ? selectedValues : undefined);
  };

  return (
    <>
      <DatePickerInput
        type="range"
        placeholder="Date Range"
        value={[dateRangeState.startDate, dateRangeState.endDate]}
        onChange={handleDateRangeChange}
      />

      <Button
        variant="outline"
        size="sm"
        style={{ marginLeft: 10 }}
        onClick={handleFilter}
      >
        Filter
      </Button>
    </>
  );
};

export default UserDateRangeReport;
