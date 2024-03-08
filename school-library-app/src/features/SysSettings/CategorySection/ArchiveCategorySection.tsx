import {
  Box,
  Text,
  Flex,
  ActionIcon,
  Tooltip,
  Stack,
  rem,
  Highlight,
} from "@mantine/core";
import { IconEdit, IconRestore } from "@tabler/icons-react";
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

import BookGenreForm from "@features/SysSettings/BookGenre/BookGenreForm";
import { modals } from "@mantine/modals";
import ICategorySection from "./models/category-section.interface";
import { useRecoverArchiveCategorySection } from "./hooks/useArchiveCategorySection";
import { useReadArchiveCategorySection } from "./hooks/useReadCategorySection";
import useModifyCategorySection from "./hooks/useModifyCategorySection";

const ArchiveCategorySection = () => {
  const {
    data: genresData = [],
    isLoading: isLoadingGenre,
    isError: isLoadingGenreError,
    isFetching: isFetchingGenre,
  } = useReadArchiveCategorySection();

  const { modifyCategorySection, isPending: isUpdating } =
    useModifyCategorySection();

  // Archive
  const { modifyGenre: modifyArchiveCategorySection, isArchiving } =
    useRecoverArchiveCategorySection();
  const openArhivedModalAction = (row: MRT_Row<ICategorySection>) =>
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
        confirm: `Reciver`,
        cancel: "Cancel",
      },
      confirmProps: { color: "red" },
      onConfirm: async () => {
        // modifyUserStatus(row.original);
        // alert("Archived: " + row.original.genresName);
        await modifyArchiveCategorySection(row.original);
      },
    });

  const customColumns = useMemo<MRT_ColumnDef<ICategorySection>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "categorySection",
        header: "Category Section",
      },
    ],
    []
  );

  // CREATE action

  const handleSaveLevel: MRT_TableOptions<ICategorySection>["onEditingRowSave"] =
    async ({ values, table }) => {
      await modifyCategorySection(values);
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
          <Tooltip label="Restoer">
            <ActionIcon
              variant="subtle"
              onClick={() => openArhivedModalAction(row)}
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
  });

  return (
    <>
      <Box maw={"90vw"}>
        <Box mt={"lg"}>
          <MantineReactTable table={table} />
        </Box>
      </Box>
    </>
  );
};
export default ArchiveCategorySection;
