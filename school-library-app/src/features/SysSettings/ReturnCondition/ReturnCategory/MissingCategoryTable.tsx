import {
  Group,
  Box,
  Button,
  Text,
  Flex,
  ActionIcon,
  Tooltip,
  Stack,
  ScrollArea,
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
import classes from "@pages/styles/user.module.css";
import IMissingCategory from "../model/missing-category.interface";

import useReadMissingCategory from "../useReadMissingCategory";
import useModifyMissingCategory from "../useModifyMissingCategory";
import useCreateMissingCategory from "../useCreateMissingCategory";
import MissingCategoryForm from "./MissingCategoryForm";

const MissingCategoryTable = () => {
  const { createMissingCategory, isPending: isCreating } =
    useCreateMissingCategory();

  const {
    data: missingCategory = [],
    isLoading: isLoadingReturnCondition,
    isError: isLoadingReturnConditionError,
    isFetching: isFetchingReturnCondition,
  } = useReadMissingCategory();

  const { modifyMissingCategory, isPending: isUpdating } =
    useModifyMissingCategory();

  const customColumns = useMemo<MRT_ColumnDef<IMissingCategory>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "missingCategory",
        header: "Missing Category",
      },
      {
        accessorKey: "fee",
        header: "Fee",
      },
    ],
    []
  );

  // CREATE action
  const handleCreateLevel: MRT_TableOptions<IMissingCategory>["onCreatingRowSave"] =
    async ({ values, table }) => {
      await createMissingCategory(values);

      table.setCreatingRow(null);
    };

  const handleSaveLevel: MRT_TableOptions<IMissingCategory>["onEditingRowSave"] =
    async ({ values, table }) => {
      await modifyMissingCategory(values);
      table.setEditingRow(null);
    };

  const table = useMantineReactTable({
    data: missingCategory,
    columns: customColumns,
    createDisplayMode: "modal",
    editDisplayMode: "modal",
    enableRowActions: true,
    enableEditing: true,
    positionActionsColumn: "last",
    getRowId: (row) => String(row.id),
    onCreatingRowSave: handleCreateLevel,
    //     onEditingRowSave: handleSaveLevel,
    mantineTableContainerProps: {
      style: {
        height: "100%",
      },
    },
    state: {
      isLoading: isLoadingReturnCondition,
      isSaving: isCreating || isUpdating,
      showAlertBanner: isLoadingReturnConditionError,
      showProgressBars: isFetchingReturnCondition,
    },

    mantineCreateRowModalProps: {
      centered: true,
      size: "xl",
      scrollAreaComponent: ScrollArea.Autosize,
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

    renderEditRowModalContent: ({ row, table }) => {
      return (
        <>
          <Stack>
            <MissingCategoryForm
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
            <MissingCategoryForm
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
    <Box miw={"78vw"}>
      <Group justify="space-between">
        <Box className={classes.highlight}>
          <Text fz={"xl"} fw={"bold"} c={"red"}>
            Missing category
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
            Add Missing category
          </Button>
        </Group>
      </Group>

      <Box mt={"lg"}>
        <MantineReactTable table={table} />
      </Box>
    </Box>
  );
};
export default MissingCategoryTable;
