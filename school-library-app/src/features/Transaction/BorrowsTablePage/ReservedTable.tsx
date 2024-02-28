import {
  Group,
  Box,
  Flex,
  ScrollArea,
  Text,
  Badge,
  Tooltip,
  Button,
} from "@mantine/core";
import {
  MRT_ColumnDef,
  MRT_Row,
  MRT_ShowHideColumnsButton,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleGlobalFilterButton,
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";
import { useMemo } from "react";

import classes from "@pages/styles/user.module.css";
import { ICirculation } from "../models/circulation.interface";
import { modals } from "@mantine/modals";
import useReadReserved from "../hooks/useReadReserved";
import { useCreateClaimedRequest } from "../hooks/useClaimedReservedBook";

const BookRequestedTable = () => {
  const {
    data: transactionList = [],
    isLoading: isReservedLoading,
    isFetching: isReservedFetching,
  } = useReadReserved();

  const { isCreatingClaimedTransaction, createClaimedTransaction } =
    useCreateClaimedRequest();
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

  // CREATE action
  // const handleCreateLevel: MRT_TableOptions<ICirculation>["onCreatingRowSave"] =
  //   async ({ values, table }) => {
  //     await createBorrowTransaction(values);

  //     table.setCreatingRow(null);
  //   };

  // Modal `APPROVE` action
  const openApproveConfirmModal = (row: MRT_Row<ICirculation>) =>
    modals.openConfirmModal({
      centered: true,
      title: <>Reserved Notification</>,
      children: <Text>Are you sure this borrower comes in?</Text>,
      labels: {
        confirm: "Yes",
        cancel: "Cancel",
      },
      confirmProps: { color: "#ffa903", variant: "light" },
      onConfirm: () => {
        createClaimedTransaction(row.original);
      },
    });

  const table = useMantineReactTable({
    data: transactionList,
    columns: customColumns,
    createDisplayMode: "modal",
    editDisplayMode: "modal",
    enableRowActions: true,
    // positionActionsColumn: "last",
    // onCreatingRowSave: handleCreateLevel,
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
      isSaving: isCreatingClaimedTransaction,
      isLoading: isReservedLoading,
      showProgressBars: isReservedFetching,
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

    renderRowActions: ({ row }) => (
      <>
        <Flex gap="md">
          <Tooltip label="Edit">
            <Button
              variant="light"
              color="green"
              size="sm"
              onClick={() => openApproveConfirmModal(row)}
            >
              Claim
            </Button>
          </Tooltip>
          <Tooltip label="Edit">
            <Button variant="light" size="sm">
              Cancel
            </Button>
          </Tooltip>
        </Flex>
      </>
    ),

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
      <Box maw={"75.2vw"}>
        <Group align="end" justify="space-between">
          <Box className={classes.highlight}>
            <Text fz={"xl"} fw={"bold"} c={"red"}>
              Reserved Book
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
export default BookRequestedTable;
