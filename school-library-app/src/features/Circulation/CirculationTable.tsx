import {
  Group,
  Box,
  Button,
  Flex,
  ActionIcon,
  Tooltip,
  Stack,
  ScrollArea,
  Avatar,
  Tabs,
  rem,
} from "@mantine/core";
import {
  IconCheckupList,
  IconClearAll,
  IconDatabaseExclamation,
  IconEdit,
  IconPlus,
  IconStackPush,
} from "@tabler/icons-react";
import {
  MRT_ColumnDef,
  MRT_ShowHideColumnsButton,
  MRT_TableOptions,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleGlobalFilterButton,
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";
import { Suspense, useMemo } from "react";

import CirculationForm from "./CirculationForm";
import { useCreateBorrow } from "./hooks/useCreateBorrow";
import OverdueTable from "./TransactionTable/OverdueTable";
import { ICirculation } from "./models/circulation.interface";
import CheckedOutTable from "./TransactionTable/CheckedOutTable";

const CirculationTable = () => {
  const { isCreatingBorrowingTransaction, createBorrowTransaction } =
    useCreateBorrow();

  const customColumns = useMemo<MRT_ColumnDef<ICirculation>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableEditing: false,
        size: 80,
      },

      {
        accessorKey: "bookImageCover",
        header: "Book Picture",
        Cell: ({ row }) => {
          return (
            <Avatar src={`${row.getValue("bookImageCover")}`} alt="it's me" />
          );
        },
      },
      {
        accessorKey: "title",
        header: "Title",
      },
      {
        accessorKey: "bookType",
        header: "Book Type",
      },
      {
        accessorKey: "bookSection",
        header: "Book Section",
      },
      {
        accessorKey: "callNumber",
        header: "Call Number",
      },
      {
        accessorKey: "bookISBN",
        header: "Book ISBN",
      },
    ],
    []
  );

  // CREATE action
  const handleCreateLevel: MRT_TableOptions<ICirculation>["onCreatingRowSave"] =
    async ({ values, table }) => {
      await createBorrowTransaction(values);

      table.setCreatingRow(null);
    };

  const table = useMantineReactTable({
    data: [],
    columns: customColumns,
    createDisplayMode: "modal",
    editDisplayMode: "modal",
    enableRowActions: true,
    enableEditing: true,
    positionActionsColumn: "last",
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
    state: {
      isSaving: isCreatingBorrowingTransaction,
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
          <Tooltip label="Edit">
            <ActionIcon
              variant="light"
              onClick={() => table.setEditingRow(row)}
            >
              <IconEdit />
            </ActionIcon>
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
  const iconStyle = { width: rem(12), height: rem(12) };

  return (
    <>
      <Box maw={"78vw"}>
        <Tabs defaultValue="all">
          <Group justify="space-between">
            <Stack>
              <Tabs.List>
                <Tabs.Tab
                  value="all"
                  leftSection={<IconClearAll style={iconStyle} />}
                >
                  All
                </Tabs.Tab>
                <Tabs.Tab
                  value="request"
                  leftSection={<IconStackPush style={iconStyle} />}
                >
                  Request
                </Tabs.Tab>
                <Tabs.Tab
                  value="checkout"
                  leftSection={<IconCheckupList style={iconStyle} />}
                >
                  Checked out
                </Tabs.Tab>
                <Tabs.Tab
                  value="overdue"
                  leftSection={<IconDatabaseExclamation style={iconStyle} />}
                >
                  Overdue
                </Tabs.Tab>
              </Tabs.List>
            </Stack>
            <Group>
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
          </Group>

          <Tabs.Panel value="all">
            <Box mt={"lg"}>
              <MantineReactTable table={table} />
            </Box>
          </Tabs.Panel>

          <Tabs.Panel value="request">
            <Box mt={"lg"}>Request</Box>
          </Tabs.Panel>

          <Tabs.Panel value="checkout">
            <Box mt={"lg"}>
              <CheckedOutTable />
            </Box>
          </Tabs.Panel>

          <Tabs.Panel value="overdue">
            <Box mt={"lg"}>
              <Suspense fallback="Loading Overdue">
                <OverdueTable />
              </Suspense>
            </Box>
          </Tabs.Panel>
        </Tabs>
      </Box>
    </>
  );
};
export default CirculationTable;
