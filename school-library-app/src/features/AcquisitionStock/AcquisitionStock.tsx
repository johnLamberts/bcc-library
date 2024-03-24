import Form from "@components/Form/Form";
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
  Button,
  Tooltip,
  Group,
  Paper,
  NumberInput,
  Select,
  Divider,
  Grid,
  Stack,
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
import AcquisitionForm from "./AcquisitionForm";
import { useCreateStockAcquisition } from "./hooks/useStock";
interface RowQuantity {
  [key: string]: string;
}
const AcquisitionStock = () => {
  const { isCreatingCatalogue, createCatalogue } = useCreateCatalogue();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [quantityValues, setQuantityValues] = useState<RowQuantity>({});

  const {
    data: booksCatalogueData = [],
    isLoading: isLoadingStudent,
    isError: isLoadingStudentError,
    isFetching: isFetchingStudent,
  } = useReadCatalogue();

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
        size: 5,
        header: "Number of Copy",
      },
      {
        accessorKey: "bookStatus",
        header: "Status",
        size: 40,

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
        header: "Stock Qty",
        size: 10,
        Cell: ({ row }) => {
          return (
            <NumberInput
              width={30}
              allowNegative={false}
              allowDecimal={false}
              onChange={(e) => {
                const updatedQuantityValues = { ...quantityValues };
                updatedQuantityValues[row.original.id as string] = e.toString();
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
  // const openQuantityModalConfirmation = (row: MRT_Row<IBooks>) => {
  //   const value = findKeyInObject(quantityValues, row.original.id as string);
  //   return modals.openConfirmModal({
  //     centered: true,
  //     size: "xl",
  //     title: <Text>Add Stock/Quantity</Text>,
  //     children: (

  //     ),
  //     labels: {
  //       confirm: `Confirm`,
  //       cancel: "Cancel",
  //     },
  //     confirmProps: { color: "red" },
  //     onConfirm: () => {
  //       // modifyUserStatus(row.original);
  //       setQuantityValues({});
  //     },
  //   });
  // };

  const { isCreatingStock, createStock } = useCreateStockAcquisition();
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
    // await modifyCatalogue(values);
    await createStock(values);
    setQuantityValues({});
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
      isSaving: isCreatingCatalogue || isCreatingStock,
      showAlertBanner: isLoadingStudentError,
      showProgressBars: isFetchingStudent,
      showLoadingOverlay: isCreatingStock || isCreatingCatalogue,
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
              onClick={() => table.setEditingRow(row)}
              disabled={
                quantityValues[row.original.id as string] === "" ||
                !quantityValues[row.original.id as string]
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

    renderEditRowModalContent: ({ table, row }) => {
      return (
        <>
          <Stack>
            <AcquisitionForm
              table={table}
              quantityValues={quantityValues}
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
