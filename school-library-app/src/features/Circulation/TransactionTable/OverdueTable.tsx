import {
  ActionIcon,
  Avatar,
  Badge,
  Flex,
  ScrollArea,
  Tooltip,
} from "@mantine/core";
import { modals } from "@mantine/modals";
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
import { IconDoorExit } from "@tabler/icons-react";
import useReadOverdue from "../hooks/useReadOverdues";
import { ICirculation } from "../models/circulation.interface";
import { Cell } from "recharts";

const OverdueTable = () => {
  const { data: overdues = [], isLoading: isOverdueLoading } = useReadOverdue();

  const customColumns = useMemo<MRT_ColumnDef<ICirculation>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableEditing: false,
        size: 80,
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
        Cell: ({ row }) => {
          return (
            <Badge color="yellow.8">
              {new Date(row.getValue("expiryTime")).toLocaleString()}
            </Badge>
          );
        },
      },
      {
        accessorKey: "borrowStatus",
        header: "Status",
        Cell: ({ row }) => {
          return <Badge color="red.8">{row.getValue("borrowStatus")}</Badge>;
        },
      },
    ],
    []
  );

  // STATUS action
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   const openUpdateStatusConfirmModal = (row: MRT_Row<ICirculation>) =>
  //     modals.openConfirmModal({
  //       // title: (
  //       //   <Text>
  //       //     Are you sure you want to{" "}
  //       //     <b>{!row.original.isEnabled ? "enabled" : "disabled"}</b> this
  //       //     student?
  //       //   </Text>
  //       // ),
  //       // children: (
  //       //   <Text>
  //       //     Are you sure you want to delete{" "}
  //       //     <b>
  //       //       {row.original.studentNumber}: {row.original.email}
  //       //     </b>
  //       //     ? This action cannot be undone.
  //       //   </Text>
  //       // ),
  //       // labels: {
  //       //   confirm: `${!row.original.isEnabled ? "Enabled" : "Disabled"}`,
  //       //   cancel: "Cancel",
  //       // },
  //       // confirmProps: { color: "red" },
  //       // onConfirm: () => {
  //       //   // modifyUserStatus(row.original);
  //       //   modifyStudentStatus(row.original);
  //       // },
  //     });

  // CREATE action
  const handleCreateLevel: MRT_TableOptions<ICirculation>["onCreatingRowSave"] =
    async ({ values, table }) => {
      // await createBorrowTransaction(values);
      // table.setCreatingRow(null);
    };

  const table = useMantineReactTable({
    data: overdues,
    columns: customColumns,
    createDisplayMode: "modal",
    editDisplayMode: "modal",
    enableRowActions: true,
    enableEditing: true,
    positionActionsColumn: "last",
    onCreatingRowSave: handleCreateLevel,
    //     onEditingRowSave: handleSaveLevel,
    mantineTableContainerProps: {
      style: {},
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
    state: {
      isLoading: isOverdueLoading,
      // isSaving: isCreatingCatalogue || isUpdatingStatus || isUpdating,
      // isSaving: isCreatingBorrowingTransaction,
      // showAlertBanner: isLoadingStudentError,
      // showProgressBars: isFetchingStudent,
    },

    initialState: {
      pagination: { pageIndex: 0, pageSize: 5 },
      columnVisibility: {
        id: false,
      },
    },

    renderRowActions: ({ row }) => (
      <>
        <Flex gap="md">
          <Tooltip label="Return Books">
            <ActionIcon
              variant="light"
              onClick={() => table.setEditingRow(row)}
            >
              <IconDoorExit />
            </ActionIcon>
          </Tooltip>

          {/* <Tooltip label="Disabled">
            <ActionIcon
              variant="light"
              //   onClick={() => {
              //     openUpdateStatusConfirmModal(row);
              //   }}
            >
              <IconEyeMinus />
            </ActionIcon>
          </Tooltip> */}
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

  return <MantineReactTable table={table} />;
};
export default OverdueTable;
