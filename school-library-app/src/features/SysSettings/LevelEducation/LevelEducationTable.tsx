import {
  Flex,
  ActionIcon,
  Group,
  Box,
  Button,
  Text,
  Tooltip,
  LoadingOverlay,
  Stack,
  Title,
  Highlight,
  rem,
} from "@mantine/core";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import {
  MRT_ColumnDef,
  MRT_TableOptions,
  useMantineReactTable,
  MRT_ToggleGlobalFilterButton,
  MRT_ToggleDensePaddingButton,
  MRT_ShowHideColumnsButton,
  MantineReactTable,
  MRT_EditActionButtons,
} from "mantine-react-table";
import { useState, useMemo } from "react";
import { toast } from "sonner";
import ILevelOfEducation from "./level-of-education.interface";
import useCreateEducation from "./useCreateEducation";
import useModifyEducation from "./useModifyEducation";
import useReadEducation from "./useReadEducation";
import { modals } from "@mantine/modals";
import { useArchiveEducation } from "./useArchiveEducation";

const LevelEducationTable = () => {
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

  const [education, setEducation] = useState<string | undefined>("");

  const { modifyGenre: modifyArchiveLevelOfEducation, isArchiving } =
    useArchiveEducation();

  const openArhivedModalAction = (row: ILevelOfEducation) =>
    modals.openConfirmModal({
      centered: true,
      title: (
        <Text>
          <Highlight highlight="remove">
            Are you sure you want to remove this items?
          </Highlight>
        </Text>
      ),
      children: (
        <Text>
          Note: You can still recover {row.levelOfEducation} on Archive View
        </Text>
      ),
      labels: {
        confirm: `Remove`,
        cancel: "Cancel",
      },
      confirmProps: { color: "red" },
      onConfirm: async () => {
        // modifyUserStatus(row.original);
        // alert("Archived: " + row.original.genresName);
        await modifyArchiveLevelOfEducation(row);
      },
    });

  const customColumns = useMemo<MRT_ColumnDef<ILevelOfEducation>[]>(
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
  const handleCreateLevel: MRT_TableOptions<ILevelOfEducation>["onCreatingRowSave"] =
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

  const handleSaveLevel: MRT_TableOptions<ILevelOfEducation>["onEditingRowSave"] =
    async ({ values, table }) => {
      const value = {
        ...values,
        education,
      };
      await modifyLevelOfEducation(value);

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
    mantineEditRowModalProps: {
      centered: true,
    },
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
      showLoadingOverlay: isArchiving,
    },

    initialState: {
      pagination: { pageIndex: 0, pageSize: 5 },
    },

    renderEditRowModalContent: ({ internalEditComponents, row, table }) => (
      <>
        <LoadingOverlay
          visible={table.getState().isSaving}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <Stack>
          <Title order={5}>Edit Level of Education</Title>
          {internalEditComponents}{" "}
          <Flex justify="flex-end">
            <MRT_EditActionButtons row={row} table={table} variant="text" />{" "}
          </Flex>
        </Stack>
      </>
    ),

    renderCreateRowModalContent: ({ internalEditComponents, row, table }) => (
      <>
        <LoadingOverlay
          visible={table.getState().isSaving}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <Stack>
          <Title order={5}>Add Level of Education</Title>
          {internalEditComponents}{" "}
          {/*or map over row.getAllCells() and render your own components */}
          <Flex justify="flex-end">
            <MRT_EditActionButtons row={row} table={table} variant="text" />{" "}
            {/*or render your own buttons */}
          </Flex>
        </Stack>
      </>
    ),

    renderRowActions: ({ row }) => (
      <>
        <Flex gap="md">
          <Tooltip label="Edit">
            <ActionIcon
              variant="subtle"
              onClick={() => {
                setEducation(row.original.levelOfEducation);
                table.setEditingRow(row);
              }}
            >
              <IconEdit
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            </ActionIcon>
          </Tooltip>

          <Tooltip label="Trash">
            <ActionIcon
              variant="subtle"
              onClick={() => openArhivedModalAction(row)}
            >
              <IconTrash
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
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
      <Box maw={"90vw"}>
        <Group
          justify="end"
          pos={"absolute"}
          top={"1rem"}
          right={"1rem"}
          visibleFrom="md"
        >
          <Button
            variant="light"
            onClick={() => table.setCreatingRow(true)}
            leftSection={<IconPlus size={14} />}
            bg={" var(--mantine-color-red-light)"}
            color={" var(--mantine-color-red-light-color)"}
          >
            Add Book Genre
          </Button>
        </Group>
        <Group hiddenFrom="sm">
          <Button
            variant="light"
            onClick={() => table.setCreatingRow(true)}
            leftSection={<IconPlus size={14} />}
            bg={" var(--mantine-color-red-light)"}
            color={" var(--mantine-color-red-light-color)"}
          >
            Add Book Genre
          </Button>
        </Group>
        <Box mt={"lg"}>
          <MantineReactTable table={table} />
        </Box>
      </Box>
    </>
  );
};
export default LevelEducationTable;
