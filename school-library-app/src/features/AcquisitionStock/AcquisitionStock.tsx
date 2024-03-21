import CatalogueToolbar from "@features/Catalogue/CatalogueToolbar/CatalogueToolbar";
import { useCreateCatalogue } from "@features/Catalogue/hooks/useCreateCatalogue";
import useModifyBookAvailability from "@features/Catalogue/hooks/useModifyBookAvailability";
import useModifyCatalogue from "@features/Catalogue/hooks/useModifyCatalogue";
import useReadCatalogue from "@features/Catalogue/hooks/useReadCatalogue";
import { IBooks } from "@features/Catalogue/models/books.interface";
import {
  Avatar,
  Badge,
  ScrollArea,
  Menu,
  rem,
  Flex,
  Box,
  Text,
  TextInput,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import {
  IconDots,
  IconEdit,
  IconArchive,
  IconLockOff,
  IconLockOpen,
} from "@tabler/icons-react";
import {
  MRT_ColumnDef,
  MRT_Row,
  MRT_TableOptions,
  useMantineReactTable,
  MRT_ToggleGlobalFilterButton,
  MRT_ToggleDensePaddingButton,
  MRT_ShowHideColumnsButton,
  MantineReactTable,
} from "mantine-react-table";
import { useMemo } from "react";

const AcquisitionStock = () => {
  const { isCreatingCatalogue, createCatalogue } = useCreateCatalogue();

  const { modifyBookAvailability, isPending } = useModifyBookAvailability();
  const {
    data: booksCatalogueData = [],
    isLoading: isLoadingStudent,
    isError: isLoadingStudentError,
    isFetching: isFetchingStudent,
  } = useReadCatalogue();

  const { modifyCatalogue, isPending: isUpdating } = useModifyCatalogue();

  const optimizedCatalogueData = useMemo(
    () => booksCatalogueData,
    [booksCatalogueData]
  );

  const customColumns = useMemo<MRT_ColumnDef<IBooks>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "bookImageCover",
        header: "Book Picture",
        Cell: ({ row }) => {
          return (
            <Avatar src={`${row.getValue("bookImageCover")}`} alt="it's me" />
          );
        },
      },
      {
        accessorKey: "title",
        header: "Title",
      },
      {
        accessorKey: "bookType",
        header: "Book Type",
      },
      {
        accessorKey: "numberOfBooksAvailable_QUANTITY",
        header: "Number of Copy",
      },
      {
        accessorKey: "bookStatus",
        header: "Status",

        Cell: ({ row }) => {
          const status = row.getValue("bookStatus");

          switch (status) {
            case "Active":
              return (
                <Badge
                  color="#0CAF49"
                  tt={"inherit"}
                  variant="dot"
                  fw={"normal"}
                >
                  {status}
                </Badge>
              );
            case "Inactive":
              return (
                <Badge
                  color="#e74c3c"
                  tt={"inherit"}
                  variant="dot"
                  fw={"normal"}
                >
                  {status}
                </Badge>
              );

            case "Out of Stock":
              return (
                <Badge
                  color="#dbe20a"
                  tt={"inherit"}
                  variant="dot"
                  fw={"normal"}
                >
                  {status}
                </Badge>
              );
          }
        },
      },
      {
        header: "Quantity to be added",
        Cell: ({ row }) => {
          return <TextInput placeholder="only accepts number" />;
        },
      },
    ],
    []
  );

  // STATUS action
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const openUpdateStatusConfirmModal = (row: MRT_Row<IBooks>) =>
    modals.openConfirmModal({
      title: (
        <Text>
          Are you sure you want to{" "}
          <b>{row.original.bookStatus === "Active" ? "Disabled" : "Enable"}</b>{" "}
          this book?
        </Text>
      ),
      children: (
        <Text>
          Are you sure you want to disable{" "}
          <b>
            {row.original.bookISBN}: {row.original.title}
          </b>
          ? This action cannot be undone.
        </Text>
      ),
      labels: {
        confirm: `${
          row.original.bookStatus === "Active" ? "Disabled" : "Enabled"
        }`,
        cancel: "Cancel",
      },
      confirmProps: { color: "red" },
      onConfirm: () => {
        // modifyUserStatus(row.original);

        modifyBookAvailability(row.original);
      },
    });

  // CREATE action
  const handleCreateLevel: MRT_TableOptions<IBooks>["onCreatingRowSave"] =
    async ({ values, table }) => {
      await createCatalogue(values);

      table.setCreatingRow(null);
    };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSaveLevel: MRT_TableOptions<IBooks>["onEditingRowSave"] = async ({
    values,
    table,
  }) => {
    await modifyCatalogue(values);
    table.setEditingRow(null);
  };

  const table = useMantineReactTable({
    data: optimizedCatalogueData.sort((a, b) => {
      // "out of stock" comes before other statuses
      if (a.bookStatus === "Out of Stock" && b.bookStatus !== "Out of Stock") {
        return -1;
      } else if (
        a.bookStatus !== "Out of Stock" &&
        b.bookStatus === "Out of Stock"
      ) {
        return 1;
      } else {
        // For items with the same status or non-'out of stock' status
        // Sort alphabetically based on the "name" property
        return a.title.localeCompare(b.title);
      }
    }),
    columns: customColumns,
    createDisplayMode: "modal",
    editDisplayMode: "modal",
    enableRowActions: true,
    enableEditing: true,
    positionActionsColumn: "last",
    onCreatingRowSave: handleCreateLevel,
    onEditingRowSave: handleSaveLevel,
    mantineTableProps: {
      withColumnBorders: true,
      withRowBorders: true,
      withTableBorder: true,
    },
    mantineTableContainerProps: {
      style: {
        height: "100%",
      },
    },
    mantineCreateRowModalProps: {
      centered: true,
      size: "xl",
      title: "Adding form for Catalogue",
      scrollAreaComponent: ScrollArea.Autosize,
    },
    mantineEditRowModalProps: {
      centered: true,
      size: "xl",
      title: "Editing form for Catalogue",
      scrollAreaComponent: ScrollArea.Autosize,
    },
    state: {
      isLoading: isLoadingStudent,
      isSaving: isCreatingCatalogue || isUpdating,
      showAlertBanner: isLoadingStudentError,
      showProgressBars: isFetchingStudent,
      showLoadingOverlay: isPending || isCreatingCatalogue || isUpdating,
    },

    initialState: {
      pagination: { pageIndex: 0, pageSize: 5 },
      columnVisibility: {
        id: false,
      },
    },

    renderRowActions: ({ row }) => (
      <>
        <Menu shadow="md">
          <Menu.Target>
            <IconDots size={24} />
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              leftSection={
                <IconEdit style={{ width: rem(18), height: rem(18) }} />
              }
              onClick={() => table.setEditingRow(row)}
            >
              Edit
            </Menu.Item>

            <Menu.Item
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
                row.original.bookStatus === "Disabled" ? (
                  <IconLockOff style={{ width: rem(18), height: rem(18) }} />
                ) : (
                  <IconLockOpen style={{ width: rem(18), height: rem(18) }} />
                )
              }
            >
              {row.original.bookStatus === "Inactive" ? "Disabled" : "Enable"}
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </>
    ),

    renderToolbarInternalActions: ({ table }) => {
      return (
        <Flex gap="xs" align="center">
          <CatalogueToolbar table={table} />
          <MRT_ToggleGlobalFilterButton table={table} />{" "}
          <MRT_ToggleDensePaddingButton table={table} />
          <MRT_ShowHideColumnsButton table={table} />
        </Flex>
      );
    },
  });

  return (
    <>
      <Box>
        {/* <Group
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
            Add Book Catalogue
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
            Add Book Catalogue
          </Button>
        </Group> */}

        <Box>
          <MantineReactTable table={table} />
        </Box>
      </Box>
    </>
  );
};
export default AcquisitionStock;
