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
import useReadEducation from "@features/SysSettings/LevelEducation/useReadEducation";
import useCreateEducation from "@features/SysSettings/LevelEducation/useCreateEducation";
import useModifyEducation from "@features/SysSettings/LevelEducation/useModifyEducation";
import { toast } from "sonner";

export type TLevelEducation = {
  id?: string | number;
  levelOfEducation: string;
};

const LevelEducation = () => {
  const { createLevelOfEducation, isPending: isCreating } =
    useCreateEducation();

  const {
    data: eduData = [],
    isLoading: isLoadingEducation,
    isError: isLoadingLevelsError,
    isFetching: isFetchingLevels,
  } = useReadEducation();

  const { modifyLevelOfEducation, isPending: isUpdating } =
    useModifyEducation();

  const customColumns = useMemo<MRT_ColumnDef<TLevelEducation>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "levelOfEducation",
        header: "Name",
      },
    ],
    []
  );

  // CREATE action
  const handleCreateLevel: MRT_TableOptions<TLevelEducation>["onCreatingRowSave"] =
    async ({ values, exitCreatingMode }) => {
      const isDuplicate = eduData.some(
        (level) => level.levelOfEducation === values.levelOfEducation
      );

      if (isDuplicate) {
        toast.error(
          "Oops! It looks like we already have that information.\nPlease double-check your input and try again."
        );
        return;
      }

      if (!values.levelOfEducation) {
        toast.error(
          "Uh-oh! It seems like you forgot to fill in some required information. Please make sure all fields are filled out before submitting."
        );
        return;
      }

      await createLevelOfEducation(values);

      exitCreatingMode();
    };

  const handleSaveLevel: MRT_TableOptions<TLevelEducation>["onEditingRowSave"] =
    async ({ values, table }) => {
      await modifyLevelOfEducation(values);

      table.setEditingRow(null);
    };

  const table = useMantineReactTable({
    data: eduData,
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
            Level of Education
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
            Add Level of Education
          </Button>
        </Group>
      </Group>

      <Box mt={"lg"}>
        <MantineReactTable table={table} />
      </Box>
    </>
  );
};
export default LevelEducation;
