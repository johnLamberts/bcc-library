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

import useCreateDamagedCategory from "../useCreateDamagedCategory";
import useReadDamagedCategory from "../useReadDamagedCategory";
import IDamagedCategory from "../model/damaged-category.interface";
import useModifyDamagedCategory from "../useModifyDamagedCategory";
import DamagedCategoryForm from "./MissingCategoryForm";

const DamagedCategoryTable = () => {
  const { createDamagedCategory, isPending: isCreating } =
    useCreateDamagedCategory();

  const {
    data: damagedCategory = [],
    isLoading: isLoadingReturnCondition,
    isError: isLoadingReturnConditionError,
    isFetching: isFetchingReturnCondition,
  } = useReadDamagedCategory();

  const { modifyDamagedCategory, isPending: isUpdating } =
    useModifyDamagedCategory();

  const customColumns = useMemo<MRT_ColumnDef<IDamagedCategory>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "damagedCategory",
        header: "Damaged Category",
      },
      {
        accessorKey: "fee",
        header: "Fee",
      },
    ],
    []
  );

  // CREATE action
  const handleCreateLevel: MRT_TableOptions<IDamagedCategory>["onCreatingRowSave"] =
    async ({ values, table }) => {
      await createDamagedCategory(values);

      table.setCreatingRow(null);
    };

  const handleSaveLevel: MRT_TableOptions<IDamagedCategory>["onEditingRowSave"] =
    async ({ values, table }) => {
      await modifyDamagedCategory(values);
      table.setEditingRow(null);
    };

  const table = useMantineReactTable({
    data: damagedCategory,
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
            <DamagedCategoryForm
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
            <DamagedCategoryForm
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
            Damaged Category
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
            Add Damaged Category
          </Button>
        </Group>
      </Group>

      <Box mt={"lg"}>
        <MantineReactTable table={table} />
      </Box>
    </Box>
  );
};
export default DamagedCategoryTable;
