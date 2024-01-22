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
import TUserRole from "@features/SysSettings/UserRole/models/user-role.interface";
import useCreateUserRole from "@features/SysSettings/UserRole/hooks/useCreateUserRole";
import useReadUserRole from "@features/SysSettings/UserRole/hooks/useReadUserRole";
import useModifyUserRole from "@features/SysSettings/UserRole/hooks/useModifyUserRole";

const UserRole = () => {
  const { createUserRole, isPending: isCreating } = useCreateUserRole();

  const {
    data: userRoles = [],
    isLoading: isLoadingEducation,
    isError: isLoadingLevelsError,
    isFetching: isFetchingLevels,
  } = useReadUserRole();

  const { modifyUserRole, isPending: isUpdating } = useModifyUserRole();

  const customColumns = useMemo<MRT_ColumnDef<TUserRole>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "userRole",
        header: "Role",
      },
    ],
    []
  );

  // CREATE action
  const handleCreateLevel: MRT_TableOptions<TUserRole>["onCreatingRowSave"] =
    async ({ values, exitCreatingMode }) => {
      await createUserRole(values);
      exitCreatingMode();
    };

  const handleSaveLevel: MRT_TableOptions<TUserRole>["onEditingRowSave"] =
    async ({ values, table }) => {
      await modifyUserRole(values, values.id);
      table.setEditingRow(null);
    };

  const table = useMantineReactTable({
    data: userRoles,
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
      isLoading: isLoadingEducation,
      isSaving: isCreating || isUpdating,
      showAlertBanner: isLoadingLevelsError,
      showProgressBars: isFetchingLevels,
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
          {/* add custom button to print table  */}
          {/* along-side built-in buttons in whatever order you want them */}
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
            User Role
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
            Add User Role
          </Button>
        </Group>
      </Group>

      <Box mt={"lg"}>
        <MantineReactTable table={table} />
      </Box>
    </>
  );
};
export default UserRole;
