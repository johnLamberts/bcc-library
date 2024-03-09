import {
  Group,
  Box,
  Button,
  Text,
  Flex,
  Stack,
  ScrollArea,
  Avatar,
  Badge,
  Menu,
  rem,
} from "@mantine/core";
import {
  IconArchive,
  IconDots,
  IconEdit,
  IconLockOff,
  IconLockOpen,
  IconPlus,
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
import { useMemo } from "react";

import StudentForm from "./CatalogueForm";
import { IBooks } from "./models/books.interface";
import { modals } from "@mantine/modals";
import { useCreateCatalogue } from "./hooks/useCreateCatalogue";
import useReadCatalogue from "./hooks/useReadCatalogue";
import useModifyCatalogue from "./hooks/useModifyCatalogue";
import useModifyBookAvailability from "./hooks/useModifyBookAvailability";
import CatalogueToolbar from "./CatalogueToolbar/CatalogueToolbar";

const CatalogueTable = () => {
  const { isCreatingCatalogue, createCatalogue } = useCreateCatalogue();

  const { modifyBookAvailability, isPending } = useModifyBookAvailability();
  const {
    data: booksCatalogueData = [],
    isLoading: isLoadingStudent,
    isError: isLoadingStudentError,
    isFetching: isFetchingStudent,
  } = useReadCatalogue();

  const { modifyCatalogue, isPending: isUpdating } = useModifyCatalogue();

  const optimizedCatalogueData = useMemo(
    () => booksCatalogueData,
    [booksCatalogueData]
  );

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
        accessorKey: "bookStatus",
        header: "Status",

        Cell: ({ row }) => {
          const status = row.getValue("bookStatus");

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
            case "Inactive":
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

            case "Out of Stock":
              return (
                <Badge
                  color="#dbe20a"
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

  // STATUS action
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const openUpdateStatusConfirmModal = (row: MRT_Row<IBooks>) =>
    modals.openConfirmModal({
      title: (
        <Text>
          Are you sure you want to{" "}
          <b>{row.original.bookStatus === "Active" ? "Disabled" : "Enable"}</b>{" "}
          this book?
        </Text>
      ),
      children: (
        <Text>
          Are you sure you want to disable{" "}
          <b>
            {row.original.bookISBN}: {row.original.title}
          </b>
          ? This action cannot be undone.
        </Text>
      ),
      labels: {
        confirm: `${
          row.original.bookStatus === "Active" ? "Disabled" : "Enabled"
        }`,
        cancel: "Cancel",
      },
      confirmProps: { color: "red" },
      onConfirm: () => {
        // modifyUserStatus(row.original);

        modifyBookAvailability(row.original);
      },
    });

  // CREATE action
  const handleCreateLevel: MRT_TableOptions<IBooks>["onCreatingRowSave"] =
    async ({ values, table }) => {
      await createCatalogue(values);

      table.setCreatingRow(null);
    };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSaveLevel: MRT_TableOptions<IBooks>["onEditingRowSave"] = async ({
    values,
    table,
  }) => {
    await modifyCatalogue(values);
    table.setEditingRow(null);
  };

  const table = useMantineReactTable({
    data: optimizedCatalogueData,
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
      title: "Adding form for Catalogue",
      scrollAreaComponent: ScrollArea.Autosize,
    },
    mantineEditRowModalProps: {
      centered: true,
      size: "xl",
      title: "Editing form for Catalogue",
      scrollAreaComponent: ScrollArea.Autosize,
    },
    state: {
      isLoading: isLoadingStudent,
      isSaving: isCreatingCatalogue || isUpdating,
      showAlertBanner: isLoadingStudentError,
      showProgressBars: isFetchingStudent,
      showLoadingOverlay: isPending || isCreatingCatalogue || isUpdating,
    },

    initialState: {
      pagination: { pageIndex: 0, pageSize: 5 },
      columnVisibility: {
        id: false,
      },
    },

    renderRowActions: ({ row }) => (
      <>
        <Menu shadow="md">
          <Menu.Target>
            <IconDots size={24} />
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              leftSection={
                <IconEdit style={{ width: rem(18), height: rem(18) }} />
              }
              onClick={() => table.setEditingRow(row)}
            >
              Edit
            </Menu.Item>

            <Menu.Item
              leftSection={
                <IconArchive style={{ width: rem(18), height: rem(18) }} />
              }
              onClick={() => table.setEditingRow(row)}
            >
              Archive
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                openUpdateStatusConfirmModal(row);
              }}
              leftSection={
                row.original.bookStatus === "Disabled" ? (
                  <IconLockOff style={{ width: rem(18), height: rem(18) }} />
                ) : (
                  <IconLockOpen style={{ width: rem(18), height: rem(18) }} />
                )
              }
            >
              {row.original.bookStatus === "Inactive" ? "Disabled" : "Enable"}
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </>
    ),

    renderToolbarInternalActions: ({ table }) => {
      return (
        <Flex gap="xs" align="center">
          <CatalogueToolbar table={table} />
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
            <StudentForm
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
      {/* <Box maw={"75.2vw"}>
        <Group justify="space-between">
          <Box className={classes.highlight}>
            <Text fz={"xl"} fw={"bold"} c={"red"}>
              Catalogue Management
            </Text>
          </Box>
          <Group>
            <Button
              variant="light"
              onClick={() => table.setCreatingRow(true)}
              leftSection={<IconPlus size={14} />}
              bg={" var(--mantine-color-red-light)"}
              color={" var(--mantine-color-red-light-color)"}
            >
              Add Catalogue
            </Button>
          </Group>
        </Group>

        <Box mt={"lg"}>
          <MantineReactTable table={table} />
        </Box>
      </Box> */}
      <Box maw={"78.2vw"}>
        <Group
          justify="end"
          pos={"absolute"}
          top={"1rem"}
          right={"1rem"}
          visibleFrom="md"
        >
          <Button
            variant="light"
            onClick={() => table.setCreatingRow(true)}
            leftSection={<IconPlus size={14} />}
            bg={" var(--mantine-color-red-light)"}
            color={" var(--mantine-color-red-light-color)"}
          >
            Add Book Catalogue
          </Button>
        </Group>
        <Group hiddenFrom="sm">
          <Button
            variant="light"
            onClick={() => table.setCreatingRow(true)}
            leftSection={<IconPlus size={14} />}
            bg={" var(--mantine-color-red-light)"}
            color={" var(--mantine-color-red-light-color)"}
          >
            Add Book Catalogue
          </Button>
        </Group>

        <Box>
          <MantineReactTable table={table} />
        </Box>
      </Box>
    </>
  );
};
export default CatalogueTable;
