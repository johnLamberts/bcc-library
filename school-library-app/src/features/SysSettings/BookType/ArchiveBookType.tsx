import {
  Highlight,
  Flex,
  ActionIcon,
  rem,
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
import { useRecoverArchiveBookType } from "./hooks/useArchiveGenre";
import { useReadArchiveBookType } from "./hooks/useReadBookType";
import IBookType from "./models/book-type.interface";
import useModifyBookType from "./hooks/useModifyBookType";

const ArchiveBookType = () => {
  const {
    data: genresData = [],
    isLoading: isLoadingGenre,
    isError: isLoadingGenreError,
    isFetching: isFetchingGenre,
  } = useReadArchiveBookType();

  const { modifyBookType, isPending: isUpdating } = useModifyBookType();
  const { modifyGenre: modifyArchiveGenre, isArchiving } =
    useRecoverArchiveBookType();

  // Archive

  const openArhivedModalAction = (row: IBookType) =>
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

  const customColumns = useMemo<MRT_ColumnDef<IBookType>[]>(
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

  const handleSaveLevel: MRT_TableOptions<IBookType>["onEditingRowSave"] =
    async ({ values, table }) => {
      await modifyBookType(values);
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
    onEditingRowSave: handleSaveLevel,
    mantineTableContainerProps: {
      style: {
        height: "100%",
      },
    },
    state: {
      isLoading: isLoadingGenre,
      isSaving: isUpdating,
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
  });

  return (
    <>
      <Box maw={"90vw"}>
        <MantineReactTable table={table} />
      </Box>
    </>
  );
};
export default ArchiveBookType;
