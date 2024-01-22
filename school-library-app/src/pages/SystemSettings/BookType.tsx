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

import IBookType from "@features/SysSettings/BookType/models/book-type.interface";
import useReadBookType from "@features/SysSettings/BookType/hooks/useReadBookType";
import useModifyBookType from "@features/SysSettings/BookType/hooks/useModifyBookType";
import useCreateBookType from "@features/SysSettings/BookType/hooks/useCreateBookType";

const BookType = () => {
  const { createBookType, isPending: isCreating } = useCreateBookType();

  const {
    data: bookTypeData = [],
    isLoading: isLoadingBookType,
    isError: isLoadingBookTypeError,
    isFetching: isFetchingBookType,
  } = useReadBookType();

  const { modifyBookType, isPending: isUpdating } = useModifyBookType();

  const customColumns = useMemo<MRT_ColumnDef<IBookType>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableEditing: false,
        enableColumnActions: false,
        size: 80,
      },
      {
        accessorKey: "bookType",
        header: "Book Type",
      },
    ],
    []
  );

  // CREATE action
  const handleCreateLevel: MRT_TableOptions<IBookType>["onCreatingRowSave"] =
    async ({ values, table }) => {
      await createBookType(values);

      table.setCreatingRow(null);
    };

  const handleSaveLevel: MRT_TableOptions<IBookType>["onEditingRowSave"] =
    async ({ values, table }) => {
      await modifyBookType(values);

      table.setEditingRow(null);
    };

  const table = useMantineReactTable({
    data: bookTypeData,
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
      isLoading: isLoadingBookType,
      isSaving: isCreating || isUpdating,
      showAlertBanner: isLoadingBookTypeError,
      showProgressBars: isFetchingBookType,
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
  });

  return (
    <>
      <Group justify="space-between">
        <Box className={classes.highlight}>
          <Text fz={"xl"} fw={"bold"} c={"red"}>
            Book Type
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
            Add Book Type
          </Button>
        </Group>
      </Group>

      <Box mt={"lg"}>
        <MantineReactTable table={table} />
      </Box>
    </>
  );
};
export default BookType;
