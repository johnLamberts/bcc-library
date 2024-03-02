import {
  Group,
  Box,
  Button,
  Flex,
  Stack,
  ScrollArea,
  Text,
  Badge,
  Tooltip,
  Select,
  Divider,
} from "@mantine/core";
import {
  MRT_ColumnDef,
  MRT_ShowHideColumnsButton,
  MRT_TableOptions,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleGlobalFilterButton,
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";
import { useMemo, useState } from "react";

import { ICirculation } from "./models/circulation.interface";
import classes from "@pages/styles/user.module.css";
import { format, formatDistance, isAfter, isToday } from "date-fns";
import { formatDistanceFromNow } from "src/utils/helpers/formatDistanceFromNow";
import BooksReturnForm from "./BooksReturnForm";
import useReadReturnCondition from "@features/SysSettings/ReturnCondition/useReadReturnCondition";
import { useReturnBookTransaction } from "./hooks/useReturnBook";
import useReadReturnList from "./hooks/useReadReturnTransaction";
import { modals } from "@mantine/modals";
import { useCreateCompletePayment } from "./hooks/useCreateCompletePayment";
import { useCreatePartialPayment } from "./hooks/useCreatePartialPayment";

const ReturnTransactionTable = () => {
  const [bookCondition, setBookCondition] = useState<string | null>("");
  const [selectedRow, setSelectedRow] = useState<{ [key: string]: number }>({});

  const {
    data: returnsTransaction = [],
    isLoading: isTransactionLoading,
    isFetching: isTransactionFetching,
  } = useReadReturnList();

  const { data: returnCondition = [], isLoading: isLoadingReturnCondition } =
    useReadReturnCondition();

  const { isReturningTransaction, createReturnTransaction } =
    useReturnBookTransaction();

  const { createCompletePayment, isPaymentCompletePending } =
    useCreateCompletePayment();

  const { isPaymentPartialPending, createPartialPayment } =
    useCreatePartialPayment();
  // CREATE action
  const confirmSaveReturnModal = (row: Partial<ICirculation>) =>
    modals.openConfirmModal({
      centered: true,
      title: (
        <>
          Return Notification
          <Divider />
        </>
      ),
      children: (
        <>
          <Text>Are you sure you want to return the selected book(s)?</Text>
          <br />
          <Text>
            This action is
            <b> irreversible</b> once saved. Please ensure you have completed
            your reading or any necessary notes before proceeding.
          </Text>
        </>
      ),
      labels: {
        confirm: "Yes",
        cancel: "Cancel",
      },
      confirmProps: {
        color: "#ffa903",
        variant: "light",
        loading: isReturningTransaction,
      },
      onConfirm: async () => {
        if (!bookCondition?.toLowerCase().includes("return")) {
          await createCompletePayment(row);
        }

        await createReturnTransaction(row);

        table.setEditingRow(null);
      },
    });

  const confirmPartialReturnModal = (row: Partial<ICirculation>) =>
    modals.openConfirmModal({
      centered: true,
      title: (
        <>
          Return Notification
          <Divider />
        </>
      ),
      children: (
        <>
          <Text>Are you sure you want to return the selected book(s)?</Text>
          <br />
          <Text>
            This action is
            <b> irreversible</b> once saved. Please ensure you have completed
            your reading or any necessary notes before proceeding.
          </Text>
        </>
      ),
      labels: {
        confirm: "Yes",
        cancel: "Cancel",
      },
      confirmProps: {
        color: "#ffa903",
        variant: "light",
        loading: isPaymentPartialPending,
      },
      onConfirm: async () => {
        if (!bookCondition?.toLowerCase().includes("return")) {
          await createCompletePayment(row);
        }

        await createPartialPayment(row);

        table.setEditingRow(null);
      },
    });

  // EDIT action
  const handleSaveLevel: MRT_TableOptions<ICirculation>["onEditingRowSave"] =
    async ({ values }) => {
      const {
        bookCondition,
        isSave,
        bookISBN,
        bookTitle,
        booksId,
        booksPrice,
        borrowers,
        borrowersEmail,
        borrowersName,
        borrowersNumber,
        borrowersId,
        status,
        id,
        fee,
        categoryFee,
        conditionFee,
        totalFee,
        booksBorrowedId,
        bookType,
        expiryTime,
        descriptionOrNotes,
        returnCategory,
      } = values;

      if (isSave) {
        confirmSaveReturnModal({
          bookCondition,
          bookISBN,
          bookTitle,
          booksId,
          booksPrice,
          borrowers,
          borrowersEmail,
          borrowersName,
          borrowersNumber,
          borrowersId,
          status,
          id,
          fee,
          categoryFee,
          conditionFee,
          totalFee,
          booksBorrowedId,
          bookType,
          expiryTime,
          descriptionOrNotes,
          conditionCategory: returnCategory,
        });
      } else {
        confirmPartialReturnModal({
          bookCondition,
          bookISBN,
          bookTitle,
          booksId,
          booksPrice,
          borrowers,
          borrowersEmail,
          borrowersName,
          borrowersNumber,
          borrowersId,
          status,
          id,
          fee,
          categoryFee,
          conditionFee,
          totalFee,
          booksBorrowedId,
          bookType,
          expiryTime,
          descriptionOrNotes,
          conditionCategory: returnCategory,
        });
      }
    };
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
        accessorKey: "borrowersName",
        header: "Borrower Name",
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
          const time = new Date(row.getValue("expiryTime"));
          return isToday(time) ? (
            <>
              <Badge variant="light" color="#FFA903" tt={"inherit"}>
                {isAfter(time, new Date())
                  ? `Today, ${format(time, "h:mm a")}`
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
                <Badge color="#0CAF49" tt={"inherit"} variant="dot">
                  {status}
                </Badge>
              );
            case "Overdue":
              return (
                <Badge color="#e74c3c" tt={"inherit"} variant="dot">
                  {status}
                </Badge>
              );
            case "Returned":
              return (
                <Badge color="#3498db" tt={"inherit"} variant="dot">
                  {status}
                </Badge>
              );
            case "Request":
              return (
                <Badge color="#95a5a6" tt={"inherit"} variant="dot">
                  {status}
                </Badge>
              );
          }
        },
      },
      {
        header: "Book Condition",
        Cell: ({ row }) => {
          return (
            <Select
              onChange={(e) => {
                setSelectedRow({
                  [row.index]: row.index,
                });
                setBookCondition(e);
              }}
              placeholder="Select a condition"
              data={returnCondition.map((cond) => cond.returnCondition)}
            />
          );
        },
      },
    ],
    [returnCondition]
  );

  const table = useMantineReactTable({
    data: returnsTransaction,
    columns: customColumns,
    createDisplayMode: "modal",
    editDisplayMode: "modal",
    enableRowActions: true,
    positionActionsColumn: "last",
    onEditingRowSave: handleSaveLevel,
    mantineTableContainerProps: {
      style: {
        height: "100%",
      },
    },
    mantineCreateRowModalProps: {
      centered: true,
      size: "xl",
      title: "Return Form",
      scrollAreaComponent: ScrollArea.Autosize,
    },

    mantineEditRowModalProps: {
      centered: true,
      size: "xl",
      title: "Return Form",
      scrollAreaComponent: ScrollArea.Autosize,
    },

    mantineTableProps: {
      withColumnBorders: true,
      withRowBorders: true,
      withTableBorder: true,
    },
    state: {
      isLoading: isTransactionLoading || isLoadingReturnCondition,
      isSaving:
        isReturningTransaction ||
        isPaymentCompletePending ||
        isPaymentPartialPending,
      showProgressBars: isTransactionFetching,
    },

    initialState: {
      pagination: { pageIndex: 0, pageSize: 5 },
      showColumnFilters: true,
      columnPinning: {
        right: ["mrt-row-actions"],
      },
      columnVisibility: {
        id: false,
        bookType: false,
        borrowersName: false,
        borrowers: false,
      },
    },

    renderRowActions: ({ row }) => {
      return (
        <>
          <Flex gap="md">
            <Tooltip label="Edit">
              <Button
                variant="light"
                color="blue"
                size="sm"
                onClick={() => table.setEditingRow(row)}
                key={row.index}
                disabled={
                  bookCondition === "" ||
                  bookCondition === null ||
                  selectedRow[row.index] !== row.index
                }
              >
                Hand in
              </Button>
            </Tooltip>
          </Flex>
        </>
      );
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

    renderEditRowModalContent: ({ row }) => {
      const rowData = returnCondition
        ?.filter((cond) => cond.returnCondition === bookCondition)
        ?.map((cond) => ({
          ...row.original,
          bookCondition: cond.returnCondition,
          fee: cond.fee,
        }))
        .at(0);
      return (
        <>
          <Stack>
            <BooksReturnForm
              table={table}
              rowData={rowData}
              onSave={(data) =>
                handleSaveLevel({
                  values: data,
                  table: table,
                  row: row,
                  exitEditingMode: () => null,
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
              Return Transaction
            </Text>
          </Box>
        </Group>

        <Box mt={"lg"}>
          <MantineReactTable table={table} />
        </Box>
      </Box>
    </>
  );
};
export default ReturnTransactionTable;
