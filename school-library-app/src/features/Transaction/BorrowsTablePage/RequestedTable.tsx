/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Flex,
  ScrollArea,
  Text,
  Badge,
  Tooltip,
  Button,
  Stack,
} from "@mantine/core";
import {
  MRT_ColumnDef,
  MRT_Row,
  MRT_ShowHideColumnsButton,
  MRT_TableOptions,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleGlobalFilterButton,
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";
import { useMemo } from "react";

import { ICirculation } from "../models/circulation.interface";
import useReadRequest from "../hooks/useReadRequest";
import { modals } from "@mantine/modals";
import { useCreateApproveRequest } from "../hooks/useApproveRequest";
import { format } from "date-fns";
import DeclineForm from "../Forms/DeclineForm";
import { useCreateDeclineRequestedBook } from "../hooks/useCancelledRequestedBooks";

const BookRequestedTable = () => {
  const {
    data: transactionList = [],
    isLoading: isRequestLoading,
    isFetching: isRequestFetching,
  } = useReadRequest();

  const { isCreatingCancelledReqBook, createCancelledReqBook } =
    useCreateDeclineRequestedBook();

  const {
    isCreatingApproveRequestTransaction,
    createApproveRequestTransaction,
  } = useCreateApproveRequest();

  const transactionRequestList = useMemo(() => {
    return transactionList?.slice().sort((a: any, b: any) => {
      // Convert createdAt timestamps to Date objects
      const timestampA =
        a.createdAt?.seconds * 1000 + (a.createdAt?.nanoseconds || 0) / 1000;
      const timestampB =
        b.createdAt?.seconds * 1000 + (b.createdAt?.nanoseconds || 0) / 1000;

      // Sort by timestamp in descending order
      return timestampB - timestampA;
    });
  }, [transactionList]);

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
        accessorKey: "createdAt",
        header: "Date Created",
        Cell: ({ row }) => {
          if (
            row.getValue("createdAt") === undefined ||
            typeof row.getValue("createdAt") === "string"
          )
            return <>-</>;
          const date = format(
            new Date(
              row.original.createdAt?.seconds * 1000 +
                row.original.createdAt?.nanoseconds / 1000
            ),
            "MMMM dd yyyy"
          );

          return <Text>{date}</Text>;
        },
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
        accessorKey: "numberOfBooksAvailable_QUANTITY",
        header: "Available Copies",
      },
      {
        accessorKey: "status",
        header: "Status",
        Cell: ({ row }) => {
          return (
            <Badge color="#95a5a6" tt={"inherit"} variant="dot" fw={"normal"}>
              {row.getValue("status")}
            </Badge>
          );
        },
      },
    ],
    []
  );

  // Modal `APPROVE` action
  const openApproveConfirmModal = (row: MRT_Row<ICirculation>) =>
    modals.openConfirmModal({
      centered: true,
      title: <>Approval Message</>,
      children: <Text>Are you sure this borrow can borrow a book?</Text>,
      labels: {
        confirm: "Yes",
        cancel: "Cancel",
      },
      confirmProps: { color: "#ffa903", variant: "light" },
      onConfirm: () => {
        createApproveRequestTransaction(row.original);
      },
    });

  // Modal `DECLINE` action

  const handleSaveLevel: MRT_TableOptions<ICirculation>["onEditingRowSave"] =
    async ({ values, table }) => {
      // await modifyCatalogue(values);
      createCancelledReqBook(values);
      table.setEditingRow(null);
    };

  const table = useMantineReactTable({
    data: transactionRequestList,
    columns: customColumns,
    createDisplayMode: "modal",
    editDisplayMode: "modal",
    enableRowActions: true,
    onEditingRowSave: handleSaveLevel,
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
      title: "Reason for Declining",
      scrollAreaComponent: ScrollArea.Autosize,
    },
    mantineTableProps: {
      withColumnBorders: true,
      withRowBorders: true,
      withTableBorder: true,
    },
    state: {
      isSaving: isCreatingApproveRequestTransaction,
      isLoading: isRequestLoading,
      showProgressBars: isRequestFetching,
      showLoadingOverlay:
        isCreatingApproveRequestTransaction ||
        isRequestLoading ||
        isCreatingCancelledReqBook,
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
        firstName: false,
        middleName: false,
        lastName: false,
      },
    },

    renderRowActions: ({ row }) => (
      <>
        <Flex gap="md">
          <Tooltip
            label={
              row.original.numberOfBooksAvailable_QUANTITY === 0
                ? "No available copy"
                : "Approve"
            }
          >
            <Button
              variant="light"
              color="green"
              size="sm"
              disabled={row.original.numberOfBooksAvailable_QUANTITY === 0}
              onClick={() => openApproveConfirmModal(row)}
            >
              Approve
            </Button>
          </Tooltip>
          <Tooltip label="Edit">
            <Button
              variant="light"
              size="sm"
              onClick={() => table.setEditingRow(row)}
            >
              Decline
            </Button>
          </Tooltip>
        </Flex>
      </>
    ),

    renderEditRowModalContent: ({ row, table }) => {
      return (
        <>
          <Stack>
            <DeclineForm
              table={table}
              row={row}
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

    renderToolbarInternalActions: ({ table }) => {
      return (
        <Flex gap="xs" align="center">
          <MRT_ToggleGlobalFilterButton table={table} />{" "}
          <MRT_ToggleDensePaddingButton table={table} />
          <MRT_ShowHideColumnsButton table={table} />
        </Flex>
      );
    },
  });

  return (
    <>
      <Box maw={"90vw"}>
        {/* <Group align="end" justify="space-between">
         
        </Group> */}

        <Box mt={"lg"}>
          <MantineReactTable table={table} />
        </Box>
      </Box>
    </>
  );
};
export default BookRequestedTable;
