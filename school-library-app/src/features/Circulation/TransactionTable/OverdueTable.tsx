import {
  ActionIcon,
  Badge,
  Flex,
  ScrollArea,
  Stack,
  Text,
  Tooltip,
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
import { IconDoorExit } from "@tabler/icons-react";
import useReadOverdue from "../hooks/useReadOverdues";
import { ICirculation } from "../models/circulation.interface";
import { modals } from "@mantine/modals";
import { toast } from "sonner";
import BooksReturnForm from "../BooksReturnForm";
import { useReturnCirculation } from "../hooks/useReturnCirculation";

const OverdueTable = () => {
  const { data: overdues = [], isLoading: isOverdueLoading } = useReadOverdue();

  const { isReturningTransaction, createReturnTransaction } =
    useReturnCirculation();
  const customColumns = useMemo<MRT_ColumnDef<ICirculation>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableEditing: false,
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
  const openUpdateStatusConfirmModal = (row: MRT_Row<ICirculation>) =>
    modals.openConfirmModal({
      centered: true,
      size: "xl",

      title: (
        <Text>
          Are you sure <b>{row.original.borrowersName}</b> wants to return{" "}
          <b>{row.original.bookTitle}</b>
        </Text>
      ),
      children: <>form</>,
      labels: {
        confirm: `Confirm`,
        cancel: "Cancel",
      },
      confirmProps: { color: "red" },
      onConfirm: () => {},
      onCancel: () => toast.warning("You cancel the dialog form."),
    });

  // CREATE action
  const handleSaveLevel: MRT_TableOptions<ICirculation>["onEditingRowSave"] =
    async ({ values, table }) => {
      // await modifyCatalogue(values);
      await createReturnTransaction(values);
      table.setEditingRow(null);
    };
  const table = useMantineReactTable({
    data: overdues,
    columns: customColumns,
    createDisplayMode: "modal",
    editDisplayMode: "modal",
    enableRowActions: true,
    enableEditing: true,
    positionActionsColumn: "last",
    mantineTableContainerProps: {
      style: {},
    },
    state: {
      isLoading: isOverdueLoading,
      // isSaving: isCreatingCatalogue || isUpdatingStatus || isUpdating,
      isSaving: isReturningTransaction,
      // showAlertBanner: isLoadingStudentError,
      // showProgressBars: isFetchingStudent,
    },
    mantineEditRowModalProps: {
      centered: true,
      size: "xl",
      radius: "md",
      shadow: "xl",
      title: "Return Borrowed Books Form",
      scrollAreaComponent: ScrollArea.Autosize,
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
        </Flex>
      </>
    ),

    renderEditRowModalContent: ({ row, table }) => {
      return (
        <>
          <Stack>
            <BooksReturnForm
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

  return <MantineReactTable table={table} />;
};
export default OverdueTable;
