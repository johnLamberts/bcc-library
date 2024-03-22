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
  Flex,
  Box,
  Text,
  TextInput,
  Button,
  Tooltip,
  Code,
  Group,
  Grid,
  Paper,
} from "@mantine/core";
import { modals } from "@mantine/modals";

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
import { useMemo, useState } from "react";
import findKeyInObject from "src/utils/helpers/findKeyInObject";
interface RowQuantity {
  [key: string]: string;
}
const AcquisitionStock = () => {
  const { isCreatingCatalogue, createCatalogue } = useCreateCatalogue();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [quantityValues, setQuantityValues] = useState<RowQuantity>({});
  const { isPending } = useModifyBookAvailability();
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
          return (
            <TextInput
              placeholder="only accepts number"
              onChange={(e) => {
                const updatedQuantityValues = { ...quantityValues };
                updatedQuantityValues[row.original.id as string] =
                  e.target.value;
                setQuantityValues(updatedQuantityValues);
              }}
              value={quantityValues[row.original.id as string] || ""}
            />
          );
        },
      },
    ],
    [quantityValues]
  );

  // STATUS action
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const openQuantityModalConfirmation = (row: MRT_Row<IBooks>) =>
    modals.openConfirmModal({
      centered: true,
      title: <Text>Add Stock/Quantity</Text>,
      children: (
        <Text>
          Please confirm adding stock/quantity for the book: <br />
          <br />
          <Paper withBorder shadow="sm" p="xl">
            <Group gap={"xs"}>
              <Avatar src={row.original.bookImageCover as string} h={40} />

              <div>
                <Text c="dimmed" size="sm">
                  Title:{" "}
                  <Text
                    span
                    fw={"bold"}
                    inherit
                    c="var(--mantine-color-anchor)"
                  >
                    {row.original.title}
                  </Text>
                </Text>
                <Text c="dimmed" size="sm">
                  ISBN:{" "}
                  <Text
                    span
                    fw={"bold"}
                    inherit
                    c="var(--mantine-color-anchor)"
                  >
                    {row.original.bookISBN}
                  </Text>
                </Text>

                <Text c="dimmed" size="sm">
                  Book Type:{" "}
                  <Text
                    span
                    fw={"bold"}
                    inherit
                    c="var(--mantine-color-anchor)"
                  >
                    {row.original.bookType}
                  </Text>
                </Text>
              </div>
            </Group>
          </Paper>
          <br />
          <b>NOTE:</b> Please review the information carefully before
          proceeding.
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
        console.log({
          ...row.original,
          // numberOfBooksAvailable_QUANTITY: quantityValues[row.original.id] === row.original.id
        });

        const value = findKeyInObject(
          quantityValues,
          row.original.id as string
        );

        console.log(value);
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

  console.log(quantityValues);

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
        <Flex gap="md">
          <Tooltip label="Add Stock handler">
            <Button
              variant="light"
              color="blue"
              size="sm"
              onClick={() => openQuantityModalConfirmation(row)}
              disabled={
                quantityValues[row.original.id as string] === "" ||
                !quantityValues[row.original.id]
              }
              // disabled={
              //   bookCondition === "" ||
              //   bookCondition === null ||
              //   selectedRow[row.index] !== row.index
              // }

              // disabled={quantity === ""}
            >
              Add Stock
            </Button>
          </Tooltip>
        </Flex>
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

  if (isLoadingStudentError)
    return <>Encountered error while fetching the data...</>;

  return (
    <>
      <Box>
        <MantineReactTable table={table} />
      </Box>
    </>
  );
};
export default AcquisitionStock;
