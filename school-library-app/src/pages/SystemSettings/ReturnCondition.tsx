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
import classes from "../styles/user.module.css";

import ReturnConditionForm from "@features/SysSettings/ReturnCondition/ReturnConditionForm";
import useCreateReturnCondition from "@features/SysSettings/ReturnCondition/useCreateReturnedCondition";
import IReturnCondition from "@features/SysSettings/ReturnCondition/model/return-condition.interface";
import useReadReturnCondition from "@features/SysSettings/ReturnCondition/useReadReturnCondition";
import useModifyReturnCondition from "@features/SysSettings/ReturnCondition/useModifyReturnCondition";

const ReturnCondition = () => {
  const { createReturnCondition, isPending: isCreating } =
    useCreateReturnCondition();

  const {
    data: returnCondition = [],
    isLoading: isLoadingReturnCondition,
    isError: isLoadingReturnConditionError,
    isFetching: isFetchingReturnCondition,
  } = useReadReturnCondition();

  const { modifyReturnCondition, isPending: isUpdating } =
    useModifyReturnCondition();

  const customColumns = useMemo<MRT_ColumnDef<IReturnCondition>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "returnCondition",
        header: "Condition",
      },
      {
        accessorKey: "fee",
        header: "Fee",
      },
    ],
    []
  );

  // CREATE action
  const handleCreateLevel: MRT_TableOptions<IReturnCondition>["onCreatingRowSave"] =
    async ({ values, table }) => {
      await createReturnCondition(values);

      table.setCreatingRow(null);
    };

  const handleSaveLevel: MRT_TableOptions<IReturnCondition>["onEditingRowSave"] =
    async ({ values, table }) => {
      await modifyReturnCondition(values);
      table.setEditingRow(null);
    };

  const table = useMantineReactTable({
    data: returnCondition,
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
            <ReturnConditionForm
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
            <ReturnConditionForm
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
      <Group justify="space-between">
        <Box className={classes.highlight}>
          <Text fz={"xl"} fw={"bold"} c={"red"}>
            Returned Condition and Fee
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
            Add Returned Condition and Fee
          </Button>
        </Group>
      </Group>

      <Box mt={"lg"}>
        <MantineReactTable table={table} />
      </Box>
    </>
  );
};
export default ReturnCondition;
