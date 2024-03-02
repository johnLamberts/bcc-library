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
  Modal,
  Divider,
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

import classes from "@pages/styles/user.module.css";
import StudentForm from "./StudentForm";
import { useCreateStudent } from "./hooks/useCreateStudent";
import useReadStudents from "./hooks/useReadStudents";
import { IStudents } from "./models/student.interface";
import { modals } from "@mantine/modals";
import useModifyStudentStatus from "./hooks/useModifyStudentStatus";
import useModifyStudent from "./hooks/useModifyStudent";
import StudentImportForm from "./StudentImportForm/StudentImportForm";
import { useDisclosure } from "@mantine/hooks";
import StudentToolbar from "./StudentToolbar";

const StudentTable = () => {
  const [opened, { close }] = useDisclosure(false);
  const { isCreatingUser, createUsers } = useCreateStudent();

  const {
    data: studentData = [],
    isLoading: isLoadingStudent,
    isError: isLoadingStudentError,
    isFetching: isFetchingStudent,
  } = useReadStudents();

  const { modifyStudentStatus, isPending: isUpdatingStatus } =
    useModifyStudentStatus();

  const { modifyStudent, isPending: isUpdating } = useModifyStudent();

  const optimizedStudentsData = useMemo(() => studentData, [studentData]);

  const customColumns = useMemo<MRT_ColumnDef<IStudents>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "studentImage",
        header: "Student Picture",
        Cell: ({ row }) => {
          return (
            <Avatar src={`${row.getValue("studentImage")}`} alt="it's me" />
          );
        },
      },
      {
        accessorKey: "studentNumber",
        header: "Student Number",
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
            <Badge color="#0CAF49" tt={"inherit"} variant="dot" fw={"normal"}>
              Enable
            </Badge>
          ) : (
            <Badge color="#e74c3c" tt={"inherit"} variant="dot" fw={"normal"}>
              Disabled
            </Badge>
          ),
      },
    ],
    []
  );

  // STATUS action
  const openUpdateStatusConfirmModal = (row: MRT_Row<IStudents>) =>
    modals.openConfirmModal({
      title: (
        <Text>
          Are you sure you want to{" "}
          <b>{!row.original.isEnabled ? "enable" : "disable"}</b> this student?
        </Text>
      ),
      children: (
        <Text>
          Are you sure you want to{" "}
          {!row.original.isEnabled ? "enable" : "disable"}{" "}
          <b>
            {row.original.firstName} {row.original.lastName}?{" "}
          </b>
          This action cannot be undone.
        </Text>
      ),
      labels: {
        confirm: `${!row.original.isEnabled ? "Enable" : "Disable"}`,
        cancel: "Cancel",
      },
      confirmProps: { color: "red" },
      onConfirm: () => {
        // modifyUserStatus(row.original);
        modifyStudentStatus(row.original);
      },
    });

  // CREATE action
  const handleCreateLevel: MRT_TableOptions<IStudents>["onCreatingRowSave"] =
    async ({ values, table }) => {
      await createUsers(values);

      table.setCreatingRow(null);
    };

  const handleSaveLevel: MRT_TableOptions<IStudents>["onEditingRowSave"] =
    async ({ values, table }) => {
      await modifyStudent(values);
      table.setEditingRow(null);
      // console.log(values);
    };

  // IMPORT action

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleImportLevel = async (values: any) => {
    console.log(values);
  };

  const table = useMantineReactTable({
    data: optimizedStudentsData,
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
      title: "Adding form for Student",
      scrollAreaComponent: ScrollArea.Autosize,
    },
    mantineEditRowModalProps: {
      centered: true,
      size: "xl",
      title: "Editing form for Student",
      scrollAreaComponent: ScrollArea.Autosize,
    },
    state: {
      isLoading: isLoadingStudent,
      isSaving: isCreatingUser || isUpdatingStatus || isUpdating,
      showAlertBanner: isLoadingStudentError,
      showProgressBars: isFetchingStudent,
    },

    initialState: {
      pagination: { pageIndex: 0, pageSize: 5 },
      columnVisibility: {
        id: false,
      },
      columnPinning: {
        right: ["mrt-row-actions"],
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
          {/* <Select data={["Table"]} placeholder="Filter by Grade Level" /> */}
          <StudentToolbar table={table} />
          {/*           
          <Select
            data={["Table"]}
            placeholder="Filter by  Level of Education"
          />
          <Select data={["Table"]} placeholder="Filter by Academic Course" /> */}
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
            <StudentForm
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
            <StudentForm
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
      <Box maw={"60.8rem"}>
        <Group justify="space-between">
          <Box className={classes.highlight}>
            <Text fz={"xl"} fw={"bold"} c={"red"}>
              Student Management
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
              Add Student
            </Button>

            {/* <Button
              variant="light"
              onClick={() => open()}
              leftSection={<IconFileImport size={14} />}
              bg={" var(--mantine-color-yellow-light)"}
              color={" var(--mantine-color-yellow-light-color)"}
            >
              Import Students
            </Button> */}
          </Group>
        </Group>

        <Box mt={"lg"}>
          <MantineReactTable table={table} />
        </Box>
      </Box>

      <Modal.Root opened={opened} onClose={close} centered>
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Import Student</Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Divider />
          <Modal.Body my={"md"} p={"md"}>
            <StudentImportForm onSave={handleImportLevel} />
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  );
};
export default StudentTable;
