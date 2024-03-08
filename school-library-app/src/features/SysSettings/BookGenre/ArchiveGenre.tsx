import {
  Highlight,
  Flex,
  ActionIcon,
  rem,
  Stack,
  Tooltip,
  Text,
  Box,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconEdit, IconRestore } from "@tabler/icons-react";
import {
  MRT_ColumnDef,
  MRT_TableOptions,
  useMantineReactTable,
  MRT_ToggleGlobalFilterButton,
  MRT_ToggleDensePaddingButton,
  MRT_ShowHideColumnsButton,
  MantineReactTable,
} from "mantine-react-table";
import { useMemo } from "react";
import BookGenreForm from "./BookGenreForm";
import useCreateGenre from "./hooks/useCreateGenre";
import useModifyGenre from "./hooks/useModifyGenre";
import { useReadArchiveGenre } from "./hooks/useReadGenre";
import IGenre from "./models/genres";
import { useRecoverArchiveGenre } from "./hooks/useArchiveGenre";

const ArchiveGenre = () => {
  const { createGenre, isPending: isCreating } = useCreateGenre();

  const {
    data: genresData = [],
    isLoading: isLoadingGenre,
    isError: isLoadingGenreError,
    isFetching: isFetchingGenre,
  } = useReadArchiveGenre();

  const { modifyGenre, isPending: isUpdating } = useModifyGenre();
  const { modifyGenre: modifyArchiveGenre, isArchiving } =
    useRecoverArchiveGenre();

  // Archive

  const openArhivedModalAction = (row: IGenre) =>
    modals.openConfirmModal({
      centered: true,
      title: (
        <Text>
          <Highlight highlight="remove">
            Are you sure you want to recover this items?
          </Highlight>
        </Text>
      ),
      labels: {
        confirm: `Recover`,
        cancel: "Cancel",
      },
      confirmProps: { color: "red" },
      onConfirm: async () => {
        // modifyUserStatus(row.original);
        await modifyArchiveGenre(row);
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

    renderRowActions: ({ row }) => (
      <>
        <Flex gap="md">
          <Tooltip label="Recover">
            <ActionIcon
              variant="subtle"
              onClick={() => openArhivedModalAction(row.original)}
            >
              <IconRestore
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            </ActionIcon>
          </Tooltip>
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
            <BookGenreForm
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
            <BookGenreForm
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
      <Box maw={"90vw"}>
        <MantineReactTable table={table} />
      </Box>
    </>
  );
};
export default ArchiveGenre;
