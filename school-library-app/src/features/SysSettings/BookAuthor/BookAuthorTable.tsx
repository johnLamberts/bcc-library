import {
  Flex,
  ActionIcon,
  Group,
  Box,
  Button,
  Tooltip,
  rem,
  Highlight,
  Text,
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
  MRT_Row,
} from "mantine-react-table";
import { useState, useMemo } from "react";
import useCreateAuthor from "./hooks/useCreateBookAuthor";
import useModifyAuthor from "./hooks/useModifyBookAuthor";
import IAuthor from "./models/book-author.interface";
import { useReadAuthor } from "./hooks/useReadAuthor";
import { modals } from "@mantine/modals";
import { useArchiveAuthor } from "./hooks/useArchiveAuthor";
const BookAuthorTable = () => {
  const { createAuthor, isPending: isCreating } = useCreateAuthor();

  const {
    data: bookAuthorData = [],
    isLoading: isLoadingBookAuthor,
    isError: isLoadingBookAuthorError,
    isFetching: isFetchingBookAuthor,
  } = useReadAuthor();

  const { modifyAuthor, isPending: isUpdating } = useModifyAuthor();

  const [authorName, setAuthorName] = useState("");
  const { modifyAuthor: modifyArchiveGenre, isArchiving } = useArchiveAuthor();

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

  const openArhivedModalAction = (row: MRT_Row<IAuthor>) =>
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
          Note: You can still recover {row.original.bookAuthor} on Archive View
        </Text>
      ),
      labels: {
        confirm: `Remove`,
        cancel: "Cancel",
      },
      confirmProps: { color: "red" },
      onConfirm: () => {
        // modifyUserStatus(row.original);
        // alert("Archived: " + row.original.genresName);
        modifyArchiveGenre(row.original);
      },
    });

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
      showLoadingOverlay: isArchiving,
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
              variant="subtle"
              onClick={() => {
                setAuthorName(row.original.bookAuthor);
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
          <MRT_ToggleGlobalFilterButton table={table} />{" "}
          <MRT_ToggleDensePaddingButton table={table} />
          <MRT_ShowHideColumnsButton table={table} />
        </Flex>
      );
    },
  });

  return (
    <>
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
          Add Author
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
          Add Author
        </Button>
      </Group>

      <Box mt={"lg"}>
        <MantineReactTable table={table} />
      </Box>
    </>
  );
};
export default BookAuthorTable;
