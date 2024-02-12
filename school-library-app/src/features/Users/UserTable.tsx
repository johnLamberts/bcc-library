import {
  Group,
  Box,
  Button,
  Text,
  Flex,
  Stack,
  ScrollArea,
  Avatar,
  Badge,
  Menu,
  rem,
} from "@mantine/core";
import {
  IconArchive,
  IconDots,
  IconEdit,
  IconLockOff,
  IconLockOpen,
  IconPlus,
} from "@tabler/icons-react";
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
import UserForm from "./UserForm";
import { useCreateUser } from "./hooks/useCreateUsers";
import useReadUsers from "./hooks/useReadUsers";
import { IUser } from "./models/user.interface";
import useModifyUser from "./hooks/useModifyUsers";
import { modals } from "@mantine/modals";
import useModifyUserStatus from "./hooks/useModifyUserStatus";

const UserTable = () => {
  const { isCreatingUser, createUsers } = useCreateUser();
  const {
    data: usersData,
    isLoading: isLoadingUsers,
    isError: isLoadingUsersError,
    isFetching: isFetchingUsers,
  } = useReadUsers();

  const { modifyUser, isPending: isUpdating } = useModifyUser();

  const { modifyUserStatus, isPending: isUpdatingStatus } =
    useModifyUserStatus();

  const optimizedUsersData =
    useMemo(() => {
      const { data } = usersData?.data || [];

      return data;
    }, [usersData?.data]) || [];

  const customColumns = useMemo<MRT_ColumnDef<IUser>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "avatarImage",
        header: "User Picture",
        Cell: ({ row }) => {
          return (
            <Avatar src={`${row.getValue("avatarImage")}`} alt="it's me" />
          );
        },
      },
      {
        accessorKey: "userRole",
        header: "Role",
        Cell: ({ row }) => {
          return <Badge size="md">{row.getValue("userRole")}</Badge>;
        },
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
        accessorKey: "isEnabled",
        filterVariant: "multi-select",
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
  const openUpdateStatusConfirmModal = (row: MRT_Row<IUser>) =>
    modals.openConfirmModal({
      centered: true,
      title: (
        <Text>
          Are you sure you want to{" "}
          <b>{!row.original.isEnabled ? "enable" : "disable"}</b> this user?
        </Text>
      ),
      children: (
        <Text>
          Are you sure you want to{" "}
          {!row.original.isEnabled ? "enable" : "disable"}{" "}
          {row.original.firstName} {row.original.lastName}? This action cannot
          be undone.
        </Text>
      ),
      labels: {
        confirm: `${!row.original.isEnabled ? "Enable" : "Disable"}`,
        cancel: "Cancel",
      },
      confirmProps: { color: "red" },
      onConfirm: () => {
        modifyUserStatus(row.original);
      },
    });

  // CREATE action
  const handleCreateLevel: MRT_TableOptions<IUser>["onCreatingRowSave"] =
    async ({ values, table }) => {
      await createUsers(values);
      table.setCreatingRow(null);
    };

  const handleSaveLevel: MRT_TableOptions<IUser>["onEditingRowSave"] = async ({
    values,
    table,
  }) => {
    await modifyUser(values, values.id);
    table.setEditingRow(null);
  };

  const table = useMantineReactTable({
    data: optimizedUsersData,
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
        width: "100%",
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
      title: "Adding form for User",
      scrollAreaComponent: ScrollArea.Autosize,
    },
    mantineEditRowModalProps: {
      centered: true,
      size: "xl",
      title: "Editing form for User",
      scrollAreaComponent: ScrollArea.Autosize,
    },
    state: {
      isLoading: isLoadingUsers,
      isSaving: isCreatingUser || isUpdating,
      showAlertBanner: isLoadingUsersError,
      showProgressBars: isFetchingUsers,
      // showSkeletons: isUpdatingStatus,
      showLoadingOverlay: isUpdatingStatus,
    },

    columnFilterDisplayMode: "popover",

    initialState: {
      pagination: { pageIndex: 0, pageSize: 5 },
      columnVisibility: {
        id: false,
      },
      showColumnFilters: true,
    },

    renderRowActions: ({ row }) => {
      return (
        <>
          <Menu shadow="md">
            <Menu.Target>
              <IconDots size={24} />
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                disabled={
                  row.original.userRole === "Student" ||
                  row.original.userRole === "student" ||
                  row.original.userRole === "STUDENT" ||
                  row.original.userRole === "Teacher" ||
                  row.original.userRole === "teacher" ||
                  row.original.userRole === "TEACHER"
                }
                leftSection={
                  <IconEdit style={{ width: rem(18), height: rem(18) }} />
                }
                onClick={() => table.setEditingRow(row)}
              >
                Edit
              </Menu.Item>

              <Menu.Item
                disabled={
                  row.original.userRole === "Student" ||
                  row.original.userRole === "student" ||
                  row.original.userRole === "STUDENT" ||
                  row.original.userRole === "Teacher" ||
                  row.original.userRole === "teacher" ||
                  row.original.userRole === "TEACHER"
                }
                leftSection={
                  <IconArchive style={{ width: rem(18), height: rem(18) }} />
                }
                onClick={() => table.setEditingRow(row)}
              >
                Archive
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  openUpdateStatusConfirmModal(row);
                }}
                leftSection={
                  row.original.isEnabled ? (
                    <IconLockOff style={{ width: rem(18), height: rem(18) }} />
                  ) : (
                    <IconLockOpen style={{ width: rem(18), height: rem(18) }} />
                  )
                }
              >
                {row.original.isEnabled ? "Disabled" : "Enable"}
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </>
      );
    },

    // renderRowActions: ({ row }) => (
    //   <>
    //     <Flex gap="md">
    //       <Tooltip
    //         label={`${
    //           row.original.userRole === "Student" ||
    //           row.original.userRole === "student" ||
    //           row.original.userRole === "STUDENT" ||
    //           row.original.userRole === "Teacher" ||
    //           row.original.userRole === "teacher" ||
    //           row.original.userRole === "TEACHER"
    //             ? "You can't perform this action directly at the moment.\nPlease navigate to the dedicated Management section to make the necessary changes."
    //             : "Edit"
    //         }`}
    //       >
    //         <ActionIcon
    //           disabled={
    //             row.original.userRole === "Student" ||
    //             row.original.userRole === "student" ||
    //             row.original.userRole === "STUDENT" ||
    //             row.original.userRole === "Teacher" ||
    //             row.original.userRole === "teacher" ||
    //             row.original.userRole === "TEACHER"
    //           }
    //           variant="light"
    //           onClick={() => table.setEditingRow(row)}
    //         >
    //           <IconEdit />
    //         </ActionIcon>
    //       </Tooltip>
    //       <Tooltip label="Disabled">
    //         <ActionIcon
    //           variant="light"
    //           onClick={() => {
    //             openUpdateStatusConfirmModal(row);
    //           }}
    //         >
    //           <IconEyeMinus />
    //         </ActionIcon>
    //       </Tooltip>

    //       <Tooltip
    //         label={`${
    //           row.original.userRole === "Student" ||
    //           row.original.userRole === "student" ||
    //           row.original.userRole === "STUDENT" ||
    //           row.original.userRole === "Teacher" ||
    //           row.original.userRole === "teacher" ||
    //           row.original.userRole === "TEACHER"
    //             ? "You can't perform this action directly at the moment.\nPlease navigate to the dedicated Management section to make the necessary changes."
    //             : "Archive"
    //         }`}
    //       >
    //         <ActionIcon
    //           disabled={
    //             row.original.userRole === "Student" ||
    //             row.original.userRole === "student" ||
    //             row.original.userRole === "STUDENT" ||
    //             row.original.userRole === "Teacher" ||
    //             row.original.userRole === "teacher" ||
    //             row.original.userRole === "TEACHER"
    //           }
    //           variant="light"
    //           onClick={() => table.setEditingRow(row)}
    //         >
    //           <IconArchive />
    //         </ActionIcon>
    //       </Tooltip>
    //     </Flex>
    //   </>
    // ),

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
            <UserForm
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
            <UserForm
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
      <Box maw={"78vw"}>
        <Group justify="space-between">
          <Box className={classes.highlight}>
            <Text fz={"xl"} fw={"bold"} c={"red"}>
              User Management
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
              Add User
            </Button>
          </Group>
        </Group>

        <Box mt={"lg"}>
          <MantineReactTable table={table} />
        </Box>
      </Box>
    </>
  );
};
export default UserTable;
