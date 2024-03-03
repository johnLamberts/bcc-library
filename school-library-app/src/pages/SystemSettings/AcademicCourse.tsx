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
import useReadAcademicCourse from "@features/SysSettings/AcademicCourse/useReadAcademic";
import AcademicCourseForm from "@features/SysSettings/AcademicCourse/AcademicCourseForm";
import useCreateAcademicCourse from "@features/SysSettings/AcademicCourse/useCreateAcademic";
import useModifyAcademicCourse from "@features/SysSettings/AcademicCourse/useModifyAcademic";
import IAcademicCourse from "@features/SysSettings/AcademicCourse/academic-course.interface";

const AcademicCourse = () => {
  const { createAcademicCourse, isPending: isCreating } =
    useCreateAcademicCourse();

  const {
    data: courseData = [],
    isLoading: isLoadingCourse,
    isError: isLoadingCourseError,
    isFetching: isFetchingCourse,
  } = useReadAcademicCourse();

  const { modifyAcademicCourse, isPending: isUpdating } =
    useModifyAcademicCourse();

  console.log(courseData);
  const customColumns = useMemo<MRT_ColumnDef<IAcademicCourse>[]>(
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
        accessorKey: "academicCourse",
        header: "Course",
      },
    ],
    []
  );

  // CREATE action
  const handleCreateLevel: MRT_TableOptions<IAcademicCourse>["onCreatingRowSave"] =
    async ({ values }) => {
      await createAcademicCourse(values);

      table.setCreatingRow(null);
    };

  const handleSaveLevel: MRT_TableOptions<IAcademicCourse>["onEditingRowSave"] =
    async ({ values, table }) => {
      await modifyAcademicCourse(values);
      // console.log(values);
      table.setEditingRow(null);
    };

  const table = useMantineReactTable({
    data: courseData,
    columns: customColumns,
    createDisplayMode: "modal",
    editDisplayMode: "modal",
    enableRowActions: true,
    enableEditing: true,
    positionActionsColumn: "last",
    getRowId: (row) => String(row.id),
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
      isLoading: isLoadingCourse,
      isSaving: isCreating || isUpdating,
      showAlertBanner: isLoadingCourseError,
      showProgressBars: isFetchingCourse,
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
            <AcademicCourseForm
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
            <AcademicCourseForm
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
            Academic Course
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
export default AcademicCourse;
