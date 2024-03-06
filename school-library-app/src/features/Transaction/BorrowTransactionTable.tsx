import {
  Group,
  Box,
  Button,
  Flex,
  Stack,
  ScrollArea,
  Text,
  Badge,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import {
  MRT_ColumnDef,
  MRT_ShowHideColumnsButton,
  MRT_TableOptions,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleGlobalFilterButton,
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";
import { useMemo } from "react";

import CirculationForm from "./CirculationForm";
import { useCreateBorrow } from "./hooks/useCreateBorrow";
import { ICirculation } from "./models/circulation.interface";
import classes from "@pages/styles/user.module.css";
import useReadTransactionList from "./hooks/useReadTransactionList";
import { format, formatDistance, isAfter, isToday } from "date-fns";
import { formatDistanceFromNow } from "src/utils/helpers/formatDistanceFromNow";
import { useCreateRequestTransaction } from "./hooks/useRequestTransaction";
import { useCreateWalkinReservedBook } from "./hooks/useCreateWalkinReservedBook";

const BorrowTransactionTable = () => {
  const { isCreatingBorrowingTransaction, createBorrowTransaction } =
    useCreateBorrow();

  const { isRequestingBook, createRequestTransaction } =
    useCreateRequestTransaction();

  const { isCreatingWalkingReserved, createWalkinReserved } =
    useCreateWalkinReservedBook();

  const {
    data: transactionList = [],
    isLoading: isTransactionLoading,
    isFetching: isTransactionFetching,
  } = useReadTransactionList();

  const customColumns = useMemo<MRT_ColumnDef<ICirculation>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableEditing: false,
        enableColumnFilter: false,
        size: 80,
      },
      {
        accessorKey: "bookType",
        header: "Book",
      },
      {
        accessorKey: "bookTitle",
        header: "Book Title",
      },
      {
        accessorKey: "borrowers",
        header: "Borrower",
      },
      {
        accessorKey: "firstName",
        header: "First Name",
      },
      {
        accessorKey: "middleName",
        header: "Middle Name",
      },
      {
        accessorKey: "lastName",
        header: "Last Name",
      },
      {
        accessorKey: "borrowersEmail",
        header: "Borrower Email",
      },
      {
        accessorKey: "expiryTime",
        header: "Due Date",
        enableColumnFilter: false,
        Cell: ({ row }) => {
          console.log(row.getValue("expiryTime"));
          if (row.getValue("expiryTime") === undefined) return <>-</>;
          const time = new Date(row.getValue("expiryTime"));

          return isToday(time) ? (
            <>
              <Badge variant="light" color="#FFA903" tt={"inherit"}>
                {isAfter(time, new Date())
                  ? format(time, "h:mm a")
                  : formatDistance(time, new Date(), {
                      addSuffix: true,
                      includeSeconds: true,
                    })}
              </Badge>
            </>
          ) : (
            <Badge color="gray" tt={"inherit"}>
              {formatDistanceFromNow(time.toISOString())}
            </Badge>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        filterVariant: "multi-select",
        mantineFilterMultiSelectProps: {
          data: ["Active", "Overdue", "Returned", "Request"],
        },
        Cell: ({ row }) => {
          const status = row.getValue("status");

          switch (status) {
            case "Active":
              return (
                <Badge
                  color="#0CAF49"
                  tt={"inherit"}
                  variant="dot"
                  fw={"normal"}
                >
                  {status}
                </Badge>
              );
            case "Overdue":
              return (
                <Badge
                  color="#e74c3c"
                  tt={"inherit"}
                  variant="dot"
                  fw={"normal"}
                >
                  {status}
                </Badge>
              );
            case "Returned":
              return (
                <Badge
                  color="#3498db"
                  tt={"inherit"}
                  variant="dot"
                  fw={"normal"}
                >
                  {status}
                </Badge>
              );
            case "Request":
              return (
                <Badge
                  color="#95a5a6"
                  tt={"inherit"}
                  variant="dot"
                  fw={"normal"}
                >
                  {status}
                </Badge>
              );

            case "Reserved":
              return (
                <Badge
                  color="#1c8289"
                  tt={"inherit"}
                  variant="dot"
                  fw={"normal"}
                >
                  {status}
                </Badge>
              );

            case "Cancelled":
              return (
                <Badge
                  color="#95a5a6"
                  tt={"inherit"}
                  variant="dot"
                  fw={"normal"}
                >
                  {status}
                </Badge>
              );
          }
        },
      },
    ],
    []
  );

  // CREATE action
  const handleCreateLevel: MRT_TableOptions<ICirculation>["onCreatingRowSave"] =
    async ({ values, table }) => {
      delete values.borrowersName;
      if (values.requesting === "Request") {
        await createRequestTransaction(values);
      } else if (values.requesting === "Borrow") {
        await createBorrowTransaction(values);
        console.log(values);
      } else if (values.requesting === "Reserved") {
        await createWalkinReserved(values);
      }

      table.setCreatingRow(null);
    };

  const table = useMantineReactTable({
    data: transactionList,
    columns: customColumns,
    createDisplayMode: "modal",
    editDisplayMode: "modal",
    // positionActionsColumn: "last",
    onCreatingRowSave: handleCreateLevel,
    mantineTableContainerProps: {
      style: {
        height: "100%",
      },
    },
    mantineCreateRowModalProps: {
      centered: true,
      size: "xl",
      title: "Borrowing Form",
      scrollAreaComponent: ScrollArea.Autosize,
    },
    mantineEditRowModalProps: {
      centered: true,
      size: "xl",
      title: "Editing form for Catalogue",
      scrollAreaComponent: ScrollArea.Autosize,
    },
    mantineTableProps: {
      withColumnBorders: true,
      withRowBorders: true,
      withTableBorder: true,
    },
    state: {
      isSaving:
        isCreatingBorrowingTransaction ||
        isRequestingBook ||
        isCreatingWalkingReserved,
      isLoading: isTransactionLoading,
      showProgressBars: isTransactionFetching,
    },

    initialState: {
      pagination: { pageIndex: 0, pageSize: 5 },
      showColumnFilters: true,
      columnVisibility: {
        id: false,
        bookType: false,
        borrowersName: false,
        borrowers: false,
      },
    },

    renderToolbarInternalActions: ({ table }) => {
      return (
        <Flex gap="xs" align="center">
          <MRT_ToggleGlobalFilterButton table={table} />{" "}
          <MRT_ToggleDensePaddingButton table={table} />
          <MRT_ShowHideColumnsButton table={table} />
        </Flex>
      );
    },
    renderCreateRowModalContent: ({ table, row }) => {
      return (
        <>
          <Stack>
            <CirculationForm
              table={table}
              row={row}
              onCreate={(data) =>
                handleCreateLevel({
                  values: data,
                  table: table,
                  row: row,
                  exitCreatingMode: () => null,
                })
              }
            />
          </Stack>
        </>
      );
    },
  });

  return (
    <>
      <Box maw={"75.2vw"}>
        <Group align="end" justify="space-between">
          <Box className={classes.highlight}>
            <Text fz={"xl"} fw={"bold"} c={"red"}>
              Borrow Transaction
            </Text>
          </Box>
          <Button
            variant="light"
            leftSection={<IconPlus size={14} />}
            onClick={() => table.setCreatingRow(true)}
            bg={" var(--mantine-color-red-light)"}
            color={" var(--mantine-color-red-light-color)"}
          >
            Add Borrow
          </Button>
        </Group>

        <Box mt={"lg"}>
          <MantineReactTable table={table} />
        </Box>
      </Box>
    </>
  );
};
export default BorrowTransactionTable;
