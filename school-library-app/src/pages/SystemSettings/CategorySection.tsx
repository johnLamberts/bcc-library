import {
  Group,
  Box,
  Button,
  Text,
  Flex,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import { IconEdit, IconPlus } from "@tabler/icons-react";
import {
  MRT_ColumnDef,
  MRT_ShowHideColumnsButton,
  MRT_TableOptions,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleGlobalFilterButton,
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";
import { useMemo } from "react";
import classes from "../styles/user.module.css";

import useReadCategorySection from "@features/SysSettings/CategorySection/hooks/useReadCategorySection";
import useCreateCategorySection from "@features/SysSettings/CategorySection/hooks/useCreateCategorySection";
import useModifyCategorySection from "@features/SysSettings/CategorySection/hooks/useModifyCategorySection";
import ICategorySection from "@features/SysSettings/CategorySection/models/category-section.interface";

const CategorySection = () => {
  const { createCategorySection, isPending: isCreating } =
    useCreateCategorySection();

  const {
    data: categorySectionData = [],
    isLoading: isLoadingCategorySection,
    isError: isLoadingCategorySectionError,
    isFetching: isFetchingCategorySection,
  } = useReadCategorySection();

  const { modifyCategorySection, isPending: isUpdating } =
    useModifyCategorySection();

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
      await modifyCategorySection(values);

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
    mantineTableContainerProps: {
      style: {
        height: "100%",
      },
    },
    state: {
      isLoading: isLoadingCategorySection,
      isSaving: isCreating || isUpdating,
      showAlertBanner: isLoadingCategorySectionError,
      showProgressBars: isFetchingCategorySection,
    },

    initialState: {
      pagination: { pageIndex: 0, pageSize: 5 },
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
  });

  return (
    <>
      <Group justify="space-between">
        <Box className={classes.highlight}>
          <Text fz={"xl"} fw={"bold"} c={"red"}>
            Category Section
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
            Add Category Section
          </Button>
        </Group>
      </Group>

      <Box mt={"lg"}>
        <MantineReactTable table={table} />
      </Box>
    </>
  );
};
export default CategorySection;
