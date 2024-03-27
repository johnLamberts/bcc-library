import {
  Flex,
  ActionIcon,
  Group,
  Button,
  Box,
  Tooltip,
  Highlight,
  rem,
  Text,
  LoadingOverlay,
  Stack,
  Title,
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
import useCreateCategorySection from "./hooks/useCreateCategorySection";
import useModifyCategorySection from "./hooks/useModifyCategorySection";
import { useReadCategorySection } from "./hooks/useReadCategorySection";
import ICategorySection from "./models/category-section.interface";
import { modals } from "@mantine/modals";
import { useArchiveCategorySection } from "./hooks/useArchiveCategorySection";

const CategorySectionTable = () => {
  const { createCategorySection, isPending: isCreating } =
    useCreateCategorySection();

  const [categoryName, setCategoryName] = useState("");

  const {
    data: categorySectionData = [],
    isLoading: isLoadingCategorySection,
    isError: isLoadingCategorySectionError,
    isFetching: isFetchingCategorySection,
  } = useReadCategorySection();

  const { modifyCategorySection, isPending: isUpdating } =
    useModifyCategorySection();

  //     archive
  const { modifyGenre: modifyArchiveCategorySection, isArchiving } =
    useArchiveCategorySection();

  const openArhivedModalAction = (row: ICategorySection) =>
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
          Note: You can still recover {row.categorySection} on Archive View
        </Text>
      ),
      labels: {
        confirm: `Remove`,
        cancel: "Cancel",
      },
      confirmProps: { color: "red" },
      onConfirm: async () => {
        // modifyUserStatus(row.original);
        // alert("Archived: " + row.original.genresName);
        await modifyArchiveCategorySection(row);
      },
    });

  const customColumns = useMemo<MRT_ColumnDef<ICategorySection>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableEditing: false,
        enableColumnActions: false,
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
  const handleCreateLevel: MRT_TableOptions<ICategorySection>["onCreatingRowSave"] =
    async ({ values, table }) => {
      await createCategorySection(values);

      table.setCreatingRow(null);
    };

  const handleSaveLevel: MRT_TableOptions<ICategorySection>["onEditingRowSave"] =
    async ({ values, table }) => {
      const value = {
        ...values,
        categoryName,
      };
      await modifyCategorySection(value);

      table.setEditingRow(null);
    };

  const table = useMantineReactTable({
    data: categorySectionData,
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
      isLoading: isLoadingCategorySection,
      isSaving: isCreating || isUpdating,
      showAlertBanner: isLoadingCategorySectionError,
      showProgressBars: isFetchingCategorySection || isArchiving,
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
          <Title order={5}>Edit Category Section</Title>
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
          <Title order={5}>Add Category Section</Title>
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
                setCategoryName(row.original.categorySection);
                table.setEditingRow(row);
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
            Add Category Section
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
            Add Category Section
          </Button>
        </Group>

        <Box mt={"lg"}>
          <MantineReactTable table={table} />
        </Box>
      </Box>
    </>
  );
};
export default CategorySectionTable;
