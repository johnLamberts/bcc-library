/* eslint-disable @typescript-eslint/no-explicit-any */
import { useReadBookType } from "@features/SysSettings/BookType/hooks/useReadBookType";
import { Flex, Box, Text } from "@mantine/core";
import { format } from "date-fns";

import {
  MRT_ColumnDef,
  useMantineReactTable,
  MRT_ToggleGlobalFilterButton,
  MRT_ToggleDensePaddingButton,
  MantineReactTable,
} from "mantine-react-table";
import { useMemo } from "react";
import useBorrowersHistory from "./hooks/useBorrowersHistory";
import classes from "./history.module.css";
const History = () => {
  const { isLoading, userHistory = [] } = useBorrowersHistory();

  const { data: bookType, isLoading: isBookType } = useReadBookType();

  const customColumns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "bookType",
        header: "Book Type",
        filterVariant: "select",
        mantineFilterSelectProps: {
          data: bookType?.map((type) => type.bookType),
        },
      },
      {
        accessorKey: "bookTitle",
        header: "Title",
      },
      {
        accessorKey: "bookCondition",
        header: "Book Condition",
      },
      {
        accessorKey: "totalFee",
        header: "Total Fee",
      },
      {
        accessorKey: "paymentStatus",
        header: "Payment Status",
      },
      {
        accessorFn: (originalRow) =>
          new Date(
            originalRow.createdAt?.seconds * 1000 +
              originalRow.createdAt?.nanoseconds / 1000
          ),
        header: "Date Borrowed",
        Cell: ({ row }) => {
          const date = format(
            new Date(
              row.original.createdAt.seconds * 1000 +
                row.original.createdAt.nanoseconds / 1000
            ),
            "MMMM dd yyyy"
          );

          return <Text>{date}</Text>;
        },
      },
    ],
    [bookType]
  );
  const table = useMantineReactTable({
    data: userHistory,
    columns: customColumns,
    mantineTableContainerProps: {
      style: {
        height: "100%",
      },
    },

    state: {
      isLoading: isLoading || isBookType,
      showProgressBars: isLoading,

      showLoadingOverlay: isLoading,
    },

    initialState: {
      pagination: { pageIndex: 0, pageSize: 5 },
      columnVisibility: {
        id: false,
      },
      showColumnFilters: true,
      columnPinning: {
        left: ["Date Created"],
      },
    },

    renderToolbarInternalActions: ({ table }) => {
      return (
        <Flex gap="xs" align="center">
          <MRT_ToggleGlobalFilterButton table={table} />{" "}
          <MRT_ToggleDensePaddingButton table={table} />
        </Flex>
      );
    },
  });

  return (
    <>
      <Box className={classes.table__history}>
        <Box mt={"xs"}>
          <MantineReactTable table={table} />
        </Box>
      </Box>
    </>
  );
};
export default History;
