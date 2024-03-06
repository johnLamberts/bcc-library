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
import { useMemo, useState } from "react";
import classes from "../styles/user.module.css";
import useCreateAuthor from "@features/SysSettings/BookAuthor/hooks/useCreateBookAuthor";
import useModifyAuthor from "@features/SysSettings/BookAuthor/hooks/useModifyBookAuthor";
import IAuthor from "@features/SysSettings/BookAuthor/models/book-author.interface";
import useReadAuthor from "@features/SysSettings/BookAuthor/hooks/useReadBookType";

const BookAuthor = () => {
  const { createAuthor, isPending: isCreating } = useCreateAuthor();

  const {
    data: bookAuthorData = [],
    isLoading: isLoadingBookAuthor,
    isError: isLoadingBookAuthorError,
    isFetching: isFetchingBookAuthor,
  } = useReadAuthor();

  const { modifyAuthor, isPending: isUpdating } = useModifyAuthor();

  const [authorName, setAuthorName] = useState("");

  const customColumns = useMemo<MRT_ColumnDef<IAuthor>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableEditing: false,
        enableColumnActions: false,
        size: 80,
      },
      {
        accessorKey: "bookAuthor",
        header: "Author",
      },
    ],
    []
  );

  // CREATE action
  const handleCreateLevel: MRT_TableOptions<IAuthor>["onCreatingRowSave"] =
    async ({ values, table }) => {
      await createAuthor(values);

      table.setCreatingRow(null);
    };

  const handleSaveLevel: MRT_TableOptions<IAuthor>["onEditingRowSave"] =
    async ({ values, table }) => {
      const value = {
        ...values,
        authorName,
      };
      await modifyAuthor(value);

      table.setEditingRow(null);
    };

  const table = useMantineReactTable({
    data: bookAuthorData,
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
      isLoading: isLoadingBookAuthor,
      isSaving: isCreating || isUpdating,
      showAlertBanner: isLoadingBookAuthorError,
      showProgressBars: isFetchingBookAuthor,
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
              onClick={() => {
                setAuthorName(row.original.bookAuthor);
                table.setEditingRow(row);
              }}
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
            Book Author
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
            Add Book Author
          </Button>
        </Group>
      </Group>

      <Box mt={"lg"}>
        <MantineReactTable table={table} />
      </Box>
    </>
  );
};
export default BookAuthor;
