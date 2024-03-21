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
  Avatar,
  Badge,
} from "@mantine/core";
import { IconEdit, IconEyeMinus, IconPlus } from "@tabler/icons-react";
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

import { ITeacher } from "./models/teacher.interface";
import { modals } from "@mantine/modals";
import TeacherForm from "./TeacherForm";
import useReadTeachers from "./hooks/useReadTeacher";
import useModifyTeacherStatus from "./hooks/useModifyTeacherStatus";
import useModifyTeacher from "./hooks/useModifyTeacher";
import { useCreateTeacher } from "./hooks/useCreateTeacher";
import { useSearchParams } from "react-router-dom";

const TeacherTable = () => {
  const [searchParams] = useSearchParams();

  const { isCreatingTeacher, createTeacher } = useCreateTeacher();

  const {
    data: teachersData = [],
    isLoading: isLoadingTeacher,
    isError: isLoadingTeacherError,
    isFetching: isFetchingTeacher,
  } = useReadTeachers();

  const { modifyTeacherStatus, isPending: isUpdatingStatus } =
    useModifyTeacherStatus();

  const { modifyTeacher, isPending: isUpdating } = useModifyTeacher();

  const optimizedTeachersData = useMemo(() => teachersData, [teachersData]);

  const customColumns = useMemo<MRT_ColumnDef<ITeacher>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "teacherImage",
        header: "Teacher Picture",
        Cell: ({ row }) => {
          return (
            <Avatar src={`${row.getValue("teacherImage")}`} alt="it's me" />
          );
        },
      },
      {
        accessorKey: "teacherNumber",
        header: "Teacher Number",
      },
      {
        accessorKey: "firstName",
        header: "First Name",
      },
      {
        accessorKey: "middleName",
        header: "Middle Name",
      },
      {
        accessorKey: "lastName",
        header: "Last Name",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "gradeSection",
        header: "Grade Section",
      },
      {
        accessorKey: "academicCourse",
        header: "Academic Course",
      },
      {
        accessorKey: "levelOfEducation",
        header: "Level of Education",
      },
      {
        accessorKey: "gradeLevel",
        header: "Grade Level",
      },

      {
        accessorKey: "isEnabled",
        header: "Account Status",
        Cell: ({ cell }) =>
          cell.getValue() ? (
            <Badge color="green.8" size="md">
              Enable
            </Badge>
          ) : (
            <Badge color="red.8" size="md">
              Disabled
            </Badge>
          ),
      },
    ],
    []
  );

  // STATUS action
  const openUpdateStatusConfirmModal = (row: MRT_Row<ITeacher>) =>
    modals.openConfirmModal({
      title: (
        <Text>
          Are you sure you want to{" "}
          <b>{!row.original.isEnabled ? "enabled" : "disabled"}</b> this
          teacher?
        </Text>
      ),
      children: (
        <Text>
          Are you sure you want to take this action on{" "}
          <b>
            {row.original.teacherNumber}: {row.original.email}
          </b>
          ? This action cannot be undone.
        </Text>
      ),
      labels: {
        confirm: `${!row.original.isEnabled ? "Enabled" : "Disabled"}`,
        cancel: "Cancel",
      },
      confirmProps: { color: "red" },
      onConfirm: () => {
        // modifyUserStatus(row.original);
        modifyTeacherStatus(row.original);
      },
    });

  // CREATE action
  const handleCreateLevel: MRT_TableOptions<ITeacher>["onCreatingRowSave"] =
    async ({ values, table }) => {
      await createTeacher(values);

      table.setCreatingRow(null);
    };

  const handleSaveLevel: MRT_TableOptions<ITeacher>["onEditingRowSave"] =
    async ({ values, table }) => {
      await modifyTeacher(values);
      table.setEditingRow(null);
    };

  const table = useMantineReactTable({
    data: optimizedTeachersData,
    columns: customColumns,
    createDisplayMode: "modal",
    editDisplayMode: "modal",
    enableRowActions: true,
    enableEditing: true,
    positionActionsColumn: "last",
    onCreatingRowSave: handleCreateLevel,
    onEditingRowSave: handleSaveLevel,
    mantineTableContainerProps: {
      style: {
        height: "100%",
      },
    },
    mantineTableProps: {
      withColumnBorders: true,
      withRowBorders: true,
      withTableBorder: true,
    },
    mantineCreateRowModalProps: {
      centered: true,
      size: "xl",
      title: "Adding form for Teacher",
      scrollAreaComponent: ScrollArea.Autosize,
    },
    mantineEditRowModalProps: {
      centered: true,
      size: "xl",
      title: "Editing form for Teacher",
      scrollAreaComponent: ScrollArea.Autosize,
    },
    state: {
      isLoading: isLoadingTeacher,
      isSaving: isCreatingTeacher || isUpdatingStatus || isUpdating,
      showAlertBanner: isLoadingTeacherError,
      showProgressBars: isFetchingTeacher,
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

          <Tooltip label="Disabled">
            <ActionIcon
              variant="light"
              onClick={() => {
                openUpdateStatusConfirmModal(row);
              }}
            >
              <IconEyeMinus />
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
            <TeacherForm
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
            <TeacherForm
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
      <Box>
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
            Add Teacher
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
            Add Teacher
          </Button>
        </Group>
        {searchParams.get("ctx") === "add_borrowers" && (
          <Button
            variant="light"
            onClick={() => table.setCreatingRow(true)}
            leftSection={<IconPlus size={14} />}
            bg={" var(--mantine-color-red-light)"}
            color={" var(--mantine-color-red-light-color)"}
          >
            Add Teacher
          </Button>
        )}
        <Box mt={"lg"}>
          <MantineReactTable table={table} />
        </Box>
      </Box>
    </>
  );
};
export default TeacherTable;
