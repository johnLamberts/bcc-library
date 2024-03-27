import {
  LoadingOverlay,
  ActionIcon,
  Group,
  Box,
  Button,
  Tooltip,
  Highlight,
  Text,
  rem,
  Stack,
  Title,
  Flex,
} from "@mantine/core";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import {
  MRT_ColumnDef,
  MRT_TableOptions,
  useMantineReactTable,
  MRT_ToggleGlobalFilterButton,
  MRT_ToggleDensePaddingButton,
  MRT_ShowHideColumnsButton,
  MantineReactTable,
  MRT_EditActionButtons,
} from "mantine-react-table";
import { useState, useMemo } from "react";
import useCreateBookType from "./hooks/useCreateBookType";
import useModifyBookType from "./hooks/useModifyBookType";
import { useReadBookType } from "./hooks/useReadBookType";
import IBookType from "./models/book-type.interface";
import { modals } from "@mantine/modals";
import { useArchiveBookType } from "./hooks/useArchiveGenre";

const BookTypeTable = () => {
  const { createBookType, isPending: isCreating } = useCreateBookType();

  const {
    data: bookTypeData = [],
    isLoading: isLoadingBookType,
    isError: isLoadingBookTypeError,
    isFetching: isFetchingBookType,
  } = useReadBookType();

  const [types, setBookType] = useState<string>("");

  const { modifyBookType, isPending: isUpdating } = useModifyBookType();

  // Archive
  const { modifyGenre: modifyArchiveBookType, isArchiving } =
    useArchiveBookType();

  const openArhivedModalAction = (row: IBookType) =>
    modals.openConfirmModal({
      centered: true,
      title: (
        <Text>
          <Highlight highlight="remove">
            Are you sure you want to remove this items?
          </Highlight>
        </Text>
      ),
      children: (
        <Text>Note: You can still recover {row.bookType} on Archive View</Text>
      ),
      labels: {
        confirm: `Remove`,
        cancel: "Cancel",
      },
      confirmProps: { color: "red" },
      onConfirm: async () => {
        await modifyArchiveBookType(row);
      },
    });

  const customColumns = useMemo<MRT_ColumnDef<IBookType>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableEditing: false,
        enableColumnActions: false,
        size: 80,
      },
      {
        accessorKey: "bookType",
        header: "Book Type",
      },
    ],
    []
  );

  // CREATE action
  const handleCreateLevel: MRT_TableOptions<IBookType>["onCreatingRowSave"] =
    async ({ values, table }) => {
      await createBookType(values);

      table.setCreatingRow(null);
    };

  const handleSaveLevel: MRT_TableOptions<IBookType>["onEditingRowSave"] =
    async ({ values, table }) => {
      const value = {
        ...values,
        types,
      };
      await modifyBookType(value);

      table.setEditingRow(null);
    };

  const table = useMantineReactTable({
    data: bookTypeData,
    columns: customColumns,
    createDisplayMode: "modal",
    editDisplayMode: "modal",
    enableRowActions: true,
    enableEditing: true,
    positionActionsColumn: "last",
    getRowId: (row) => String(row.id),
    onCreatingRowSave: handleCreateLevel,
    onEditingRowSave: handleSaveLevel,

    mantineEditRowModalProps: {
      centered: true,
    },
    mantineTableContainerProps: {
      style: {
        height: "100%",
      },
    },
    state: {
      isLoading: isLoadingBookType,
      isSaving: isCreating || isUpdating,
      showAlertBanner: isLoadingBookTypeError,
      showProgressBars: isFetchingBookType,
      showLoadingOverlay: isArchiving,
    },

    initialState: {
      pagination: { pageIndex: 0, pageSize: 5 },
      columnVisibility: {
        id: false,
      },
    },

    renderEditRowModalContent: ({ internalEditComponents, row, table }) => (
      <>
        <LoadingOverlay
          visible={table.getState().isSaving}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <Stack>
          <Title order={5}>Edit Book Type</Title>
          {internalEditComponents}{" "}
          {/*or map over row.getAllCells() and render your own components */}
          <Flex justify="flex-end">
            <MRT_EditActionButtons row={row} table={table} variant="text" />{" "}
            {/*or render your own buttons */}
          </Flex>
        </Stack>
      </>
    ),

    renderCreateRowModalContent: ({ internalEditComponents, row, table }) => (
      <>
        <LoadingOverlay
          visible={table.getState().isSaving}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <Stack>
          <Title order={5}>Add Book Type</Title>
          {internalEditComponents}{" "}
          {/*or map over row.getAllCells() and render your own components */}
          <Flex justify="flex-end">
            <MRT_EditActionButtons row={row} table={table} variant="text" />{" "}
            {/*or render your own buttons */}
          </Flex>
        </Stack>
      </>
    ),

    renderRowActions: ({ row }) => (
      <>
        <Flex gap="md">
          <Tooltip label="Edit">
            <ActionIcon
              variant="subtle"
              onClick={() => {
                table.setEditingRow(row);
                setBookType(row.original.bookType);
              }}
            >
              <IconEdit
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            </ActionIcon>
          </Tooltip>

          <Tooltip label="Trash">
            <ActionIcon
              variant="subtle"
              onClick={() => openArhivedModalAction(row.original)}
            >
              <IconTrash
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
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
  });

  return (
    <>
      <Box maw={"90vw"}>
        <Group
          justify="end"
          pos={"absolute"}
          right={"1rem"}
          top={"5rem"}
          visibleFrom="md"
        >
          <Button
            variant="light"
            onClick={() => table.setCreatingRow(true)}
            leftSection={<IconPlus size={14} />}
            bg={" var(--mantine-color-red-light)"}
            color={" var(--mantine-color-red-light-color)"}
          >
            Add Book Genre
          </Button>
        </Group>
        <Group hiddenFrom="md">
          <Button
            variant="light"
            onClick={() => table.setCreatingRow(true)}
            leftSection={<IconPlus size={14} />}
            bg={" var(--mantine-color-red-light)"}
            color={" var(--mantine-color-red-light-color)"}
          >
            Add Book Genre
          </Button>
        </Group>

        <Box mt={"lg"}>
          <MantineReactTable table={table} />
        </Box>
      </Box>
    </>
  );
};
export default BookTypeTable;
