import {
  Box,
  Text,
  Flex,
  ActionIcon,
  Tooltip,
  Stack,
  rem,
  Highlight,
  Button,
  Group,
  LoadingOverlay,
  Title,
} from "@mantine/core";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import {
  MRT_ColumnDef,
  MRT_EditActionButtons,
  MRT_Row,
  MRT_ShowHideColumnsButton,
  MRT_TableOptions,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleGlobalFilterButton,
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";
import { useMemo } from "react";

import IGenre from "@features/SysSettings/BookGenre/models/genres";
import useCreateGenre from "@features/SysSettings/BookGenre/hooks/useCreateGenre";
import useModifyGenre from "@features/SysSettings/BookGenre/hooks/useModifyGenre";
import { modals } from "@mantine/modals";
import { useReadGenre } from "@features/SysSettings/BookGenre/hooks/useReadGenre";
import { useArchiveGenre } from "@features/SysSettings/BookGenre/hooks/useArchiveGenre";

const BookGenreTable = () => {
  const { createGenre, isPending: isCreating } = useCreateGenre();

  const {
    data: genresData = [],
    isLoading: isLoadingGenre,
    isError: isLoadingGenreError,
    isFetching: isFetchingGenre,
  } = useReadGenre();

  const { modifyGenre, isPending: isUpdating } = useModifyGenre();

  // Archive
  const { modifyGenre: modifyArchiveGenre, isArchiving } = useArchiveGenre();
  const openArhivedModalAction = (row: MRT_Row<IGenre>) =>
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
        <Text>
          Note: You can still recover {row.original.genres} on Archive View
        </Text>
      ),
      labels: {
        confirm: `Remove`,
        cancel: "Cancel",
      },
      confirmProps: { color: "red" },
      onConfirm: () => {
        // modifyUserStatus(row.original);
        // alert("Archived: " + row.original.genresName);
        modifyArchiveGenre(row.original);
      },
    });

  const customColumns = useMemo<MRT_ColumnDef<IGenre>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "bookType",
        header: "Book Type",
      },
      {
        accessorKey: "genres",
        header: "Genre",
      },
    ],
    []
  );

  // CREATE action
  const handleCreateLevel: MRT_TableOptions<IGenre>["onCreatingRowSave"] =
    async ({ values, table }) => {
      createGenre(values).then(() => {
        table.setCreatingRow(null);
      });
    };

  const handleSaveLevel: MRT_TableOptions<IGenre>["onEditingRowSave"] = async ({
    values,
    table,
  }) => {
    await modifyGenre(values);
    table.setEditingRow(null);
  };

  const table = useMantineReactTable({
    data: genresData,
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
      isLoading: isLoadingGenre,
      isSaving: isCreating || isUpdating,
      showAlertBanner: isLoadingGenreError,
      showProgressBars: isFetchingGenre,
      showLoadingOverlay: isArchiving,
    },

    initialState: {
      pagination: { pageIndex: 0, pageSize: 5 },
      columnVisibility: { id: false },
    },

    renderEditRowModalContent: ({ internalEditComponents, row, table }) => (
      <>
        <LoadingOverlay
          visible={table.getState().isSaving}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <Stack>
          <Title order={5}>Edit Genres</Title>
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
          <Title order={5}>Add Genres</Title>
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
              onClick={() => table.setEditingRow(row)}
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
              onClick={() => openArhivedModalAction(row)}
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

    // renderEditRowModalContent: ({ row, table }) => {
    //   return (
    //     <>
    //       <Stack>
    //         <BookGenreForm
    //           table={table}
    //           row={row}
    //           onSave={(data) =>
    //             handleSaveLevel({
    //               values: data,
    //               table: table,
    //               row: row,
    //               exitEditingMode: () => null,
    //             })
    //           }
    //         />
    //       </Stack>
    //     </>
    //   );
    // },
    // renderCreateRowModalContent: ({ table, row }) => {
    //   return (
    //     <>
    //       <Stack>
    //         <BookGenreForm
    //           table={table}
    //           row={row}
    //           onCreate={(data) =>
    //             handleCreateLevel({
    //               values: data,
    //               table: table,
    //               row: row,
    //               exitCreatingMode: () => null,
    //             })
    //           }
    //         />
    //       </Stack>
    //     </>
    //   );
    // },
  });

  return (
    <>
      <Box maw={"90vw"}>
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
            Add Book Genre
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
export default BookGenreTable;
