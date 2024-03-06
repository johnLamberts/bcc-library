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
import useReadPartialPayment from "../hooks/useReadPendingPayment";
import { useCreateCompletePartialPayment } from "../hooks/useCompleteTransaction";

const PendingTable = () => {
  const {
    data: transactionList = [],
    isLoading: isRequestLoading,
    isFetching: isRequestFetching,
  } = useReadPartialPayment();

  const { isPaymentCompletePending, createCompletePendingPayment } =
    useCreateCompletePartialPayment();

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
        accessorKey: "totalFee",
        header: "Total Fee",
        Cell: ({ row }) => {
          return (
            <Badge color="#95a5a6" tt={"inherit"} variant="dot" fw={"normal"}>
              P{row.getValue("totalFee")}
            </Badge>
          );
        },
      },
      {
        accessorKey: "bookCondition",
        header: "Book Condition",
        Cell: ({ row }) => {
          return (
            <Badge color="#95a5a6" tt={"inherit"} variant="dot" fw={"normal"}>
              {row.getValue("bookCondition")}
            </Badge>
          );
        },
      },
      {
        accessorKey: "conditionCategory",
        header: "Other",
        Cell: ({ row }) => {
          const otherBadge = row.getValue("conditionCategory") as string;

          if (otherBadge?.toLowerCase()?.includes("damage")) {
            return (
              <Badge color="#C31209" tt={"inherit"} variant="dot" fw={"normal"}>
                {otherBadge}
              </Badge>
            );
          } else {
            return (
              <Badge color="#E39500" tt={"inherit"} variant="dot" fw={"normal"}>
                {otherBadge}
              </Badge>
            );
          }

          // return (
          //   <Badge color="#C31209" tt={"inherit"} variant="dot" fw={"normal"}>

          //   </Badge>
          // );
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
      title: <>Complete Transaction Notification</>,
      children: (
        <Text>
          Are you sure this borrower wants to proceed with the completion of
          transaction
          <br />
          <br />
          <b>Note: </b> This action is irreversible.
        </Text>
      ),
      labels: {
        confirm: "Yes",
        cancel: "Cancel",
      },
      confirmProps: { color: "#ffa903", variant: "light" },
      onConfirm: async () => {
        await createCompletePendingPayment(row.original);
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
      isLoading: isRequestLoading,
      showProgressBars: isRequestFetching,
      isSaving: isPaymentCompletePending,
      showLoadingOverlay: isPaymentCompletePending,
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
              Proceed
            </Button>
          </Tooltip>
          <Tooltip label="Edit">
            <Button variant="light" size="sm" color="#D6530C">
              View Details
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
              Pending Transaction
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
export default PendingTable;
