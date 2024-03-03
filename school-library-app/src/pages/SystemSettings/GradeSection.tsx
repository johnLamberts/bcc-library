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

import useReadGradeSection from "@features/SysSettings/GradeSection/useReadGradeSection";
import GradeSectionForm from "@features/SysSettings/GradeSection/GradeSectionForm";
import useCreateGradeSection from "@features/SysSettings/GradeSection/useCreateGradeSection";
import useModifyGradeSection from "@features/SysSettings/GradeSection/useModifyGradeSection";
import IGradeSection from "@features/SysSettings/GradeSection/grade-level.interface";

const GradeLevel = () => {
  const { createGradeSection, isPending: isCreating } = useCreateGradeSection();

  const {
    data: gradeSection = [],
    isLoading: isLoadingGradeSection,
    isError: isLoadingGradeSectionError,
    isFetching: isFetchingGradeSection,
  } = useReadGradeSection();

  const { modifyGradeSection, isPending: isUpdating } = useModifyGradeSection();

  const customColumns = useMemo<MRT_ColumnDef<IGradeSection>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "gradeLevel",
        header: "Grade Level",
      },
      {
        accessorKey: "gradeSection",
        header: "Grade Section",
      },
    ],
    []
  );

  // CREATE action
  const handleCreateLevel: MRT_TableOptions<IGradeSection>["onCreatingRowSave"] =
    async ({ values, table }) => {
      await createGradeSection(values);

      table.setCreatingRow(null);
    };

  const handleSaveLevel: MRT_TableOptions<IGradeSection>["onEditingRowSave"] =
    async ({ values, table }) => {
      await modifyGradeSection(values);

      table.setEditingRow(null);
    };

  const table = useMantineReactTable({
    data: gradeSection,
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
      isLoading: isLoadingGradeSection,
      isSaving: isCreating || isUpdating,
      showAlertBanner: isLoadingGradeSectionError,
      showProgressBars: isFetchingGradeSection,
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
            <GradeSectionForm
              table={table}
              row={row}
              onSave={(data) =>
                handleSaveLevel({
                  values: data,
                  table: table,
                  row: row,
                  exitEditingMode: () => table.setCreatingRow(null),
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
            <GradeSectionForm
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
            Grade Section
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
            Add Grade Section
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
