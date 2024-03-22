import {
  Group,
  Box,
  Button,
  Text,
  Flex,
  ActionIcon,
  Tooltip,
  Stack,
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
import useReadGradeLevel from "@features/SysSettings/GradeLevel/useReadGradeLevel";
import GradeLevelForm from "@features/SysSettings/GradeLevel/GradeLevelForm";
import useCreateGradeLevel from "@features/SysSettings/GradeLevel/useCreateGradeLevel";
import useModifyGradeLevel from "@features/SysSettings/GradeLevel/useModifyGradeLevel";
import IGradeLevel from "@features/SysSettings/GradeLevel/grade-level.interface";

const GradeLevel = () => {
  const { createGradeLevel, isPending: isCreating } = useCreateGradeLevel();

  const {
    data: gradeLevel = [],
    isLoading: isLoadingGradeLevel,
    isError: isLoadingGradeLevelError,
    isFetching: isFetchingGradeLevel,
  } = useReadGradeLevel();

  const { modifyGradeLevel, isPending: isUpdating } = useModifyGradeLevel();

  const customColumns = useMemo<MRT_ColumnDef<IGradeLevel>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "levelOfEducation",
        header: "Education",
      },
      {
        accessorKey: "gradeLevel",
        header: "Grade Level",
      },
    ],
    []
  );

  // CREATE action
  const handleCreateLevel: MRT_TableOptions<IGradeLevel>["onCreatingRowSave"] =
    async ({ values, table }) => {
      await createGradeLevel(values);

      table.setCreatingRow(null);
    };

  const handleSaveLevel: MRT_TableOptions<IGradeLevel>["onEditingRowSave"] =
    async ({ values, table }) => {
      await modifyGradeLevel(values);

      table.setEditingRow(null);
    };

  const table = useMantineReactTable({
    data: gradeLevel,
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
    mantineCreateRowModalProps: {
      centered: true,
    },
    mantineEditRowModalProps: {
      centered: true,
    },
    state: {
      isLoading: isLoadingGradeLevel,
      isSaving: isCreating || isUpdating,
      showAlertBanner: isLoadingGradeLevelError,
      showProgressBars: isFetchingGradeLevel,
    },

    initialState: {
      pagination: { pageIndex: 0, pageSize: 5 },
      columnVisibility: { id: false },
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
            <GradeLevelForm
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
            <GradeLevelForm
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
            Grade Level
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
            Add Grade Level
          </Button>
        </Group>
      </Group>

      <Box mt={"lg"}>
        <MantineReactTable table={table} />
      </Box>
    </>
  );
};
export default GradeLevel;
