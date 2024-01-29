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
  IconArrowBackUpDouble,
  IconCheckupList,
  IconClearAll,
  IconDatabaseExclamation,
  IconEdit,
  IconEyeMinus,
  IconPlus,
  IconStackPush,
} from "@tabler/icons-react";
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
import { Suspense, useMemo } from "react";

import StudentForm from "./CirculationForm";
import { IBooks } from "./models/books.interface";
import { modals } from "@mantine/modals";
import CirculationForm from "./CirculationForm";
import { useCreateBorrow } from "./hooks/useCreateBorrow";
import OverdueTable from "./TransactionTable/OverdueTable";

const CirculationTable = () => {
  const { isCreatingBorrowingTransaction, createBorrowTransaction } =
    useCreateBorrow();

  const customColumns = useMemo<MRT_ColumnDef<IBooks>[]>(
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

      // {
      //   accessorKey: "lastName",
      //   header: "Last Name",
      // },
      // {
      //   accessorKey: "email",
      //   header: "Email",
      // },
      // {
      //   accessorKey: "gradeSection",
      //   header: "Grade Section",
      // },
      // {
      //   accessorKey: "academicCourse",
      //   header: "Academic Course",
      // },
      // {
      //   accessorKey: "levelOfEducation",
      //   header: "Level of Education",
      // },
      // {
      //   accessorKey: "gradeLevel",
      //   header: "Grade Level",
      // },

      // {
      //   accessorKey: "isEnabled",
      //   header: "Account Status",
      //   Cell: ({ cell }) =>
      //     cell.getValue() ? (
      //       <Badge color="green.8" size="md">
      //         Enable
      //       </Badge>
      //     ) : (
      //       <Badge color="red.8" size="md">
      //         Disabled
      //       </Badge>
      //     ),
      // },
    ],
    []
  );

  // STATUS action
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const openUpdateStatusConfirmModal = (row: MRT_Row<IBooks>) =>
    modals.openConfirmModal({
      // title: (
      //   <Text>
      //     Are you sure you want to{" "}
      //     <b>{!row.original.isEnabled ? "enabled" : "disabled"}</b> this
      //     student?
      //   </Text>
      // ),
      // children: (
      //   <Text>
      //     Are you sure you want to delete{" "}
      //     <b>
      //       {row.original.studentNumber}: {row.original.email}
      //     </b>
      //     ? This action cannot be undone.
      //   </Text>
      // ),
      // labels: {
      //   confirm: `${!row.original.isEnabled ? "Enabled" : "Disabled"}`,
      //   cancel: "Cancel",
      // },
      // confirmProps: { color: "red" },
      // onConfirm: () => {
      //   // modifyUserStatus(row.original);
      //   modifyStudentStatus(row.original);
      // },
    });

  // CREATE action
  const handleCreateLevel: MRT_TableOptions<IBooks>["onCreatingRowSave"] =
    async ({ values, table }) => {
      await createBorrowTransaction(values);

      table.setCreatingRow(null);
    };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSaveLevel: MRT_TableOptions<IBooks>["onEditingRowSave"] = async ({
    values,
    table,
  }) => {
    // await modifyCatalogue(values);
    // table.setEditingRow(null);
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
      title: "Editing form for Catalogue",
      scrollAreaComponent: ScrollArea.Autosize,
    },
    state: {
      // isLoading: isLoadingStudent,
      // isSaving: isCreatingCatalogue || isUpdatingStatus || isUpdating,
      isSaving: isCreatingBorrowingTransaction,
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
          <Tooltip label="Edit">
            <ActionIcon
              variant="light"
              onClick={() => table.setEditingRow(row)}
            >
              <IconEdit />
            </ActionIcon>
          </Tooltip>

          <Tooltip label="Disabled">
            <ActionIcon
              variant="light"
              onClick={() => {
                openUpdateStatusConfirmModal(row);
              }}
            >
              <IconEyeMinus />
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

    renderEditRowModalContent: ({ row, table }) => {
      return (
        <>
          <Stack>
            <StudentForm
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
                <Tabs.Tab
                  value="returned"
                  leftSection={<IconArrowBackUpDouble style={iconStyle} />}
                >
                  Returned
                </Tabs.Tab>{" "}
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
            <Box mt={"lg"}>Checkout</Box>
          </Tabs.Panel>

          <Tabs.Panel value="overdue">
            <Box mt={"lg"}>
              <Suspense fallback="Loading Overdue">
                <OverdueTable />
              </Suspense>
            </Box>
          </Tabs.Panel>

          <Tabs.Panel value="returned">
            <Box mt={"lg"}>Returned</Box>
          </Tabs.Panel>
        </Tabs>
      </Box>
    </>
  );
};
export default CirculationTable;
