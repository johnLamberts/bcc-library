/* eslint-disable @typescript-eslint/no-explicit-any */
import { Group, Box, Button, Text, Flex, Badge } from "@mantine/core";
import { IconFileTypeCsv, IconFileTypePdf } from "@tabler/icons-react";
import {
  MRT_ColumnDef,
  MRT_ShowHideColumnsButton,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleGlobalFilterButton,
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";
import { useMemo } from "react";

import classes from "@pages/styles/user.module.css";
import { flatten } from "src/utils/helpers/flatten";
import Papa from "papaparse";
import { format } from "date-fns";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { autoTable, RowInput } from "jspdf-autotable";
import depedLogo from "src/assets/deped.png";
import bccLogo from "src/assets/logo 1.svg";
import bccLogoPng from "src/assets/bccLogo3.png";
import { Row } from "@tanstack/react-table";
import { IBooks } from "@features/Catalogue/models/books.interface";
import useReadInventoryReport from "./hooks/useInventoryReport";
import useReadBookType from "@features/SysSettings/BookType/hooks/useReadBookType";

const InventoryReportTable = () => {
  const {
    data: bookConditionList = [],
    isLoading: isLoadingUsers,
    isError: isLoadingUsersError,
    isFetching: isFetchingUsers,
  } = useReadInventoryReport();

  const { data: bookType, isLoading: isBookType } = useReadBookType();

  console.log(bookType);
  const customColumns = useMemo<MRT_ColumnDef<IBooks>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "bookType",
        header: "Book Type",
        filterVariant: "select",
        mantineFilterSelectProps: {
          data: bookType?.map((type) => type.bookType),
        },
      },
      {
        accessorKey: "title",
        header: "Title",
      },

      {
        accessorKey: "bookSection",
        header: "Book Section",
      },
      {
        accessorKey: "callNumber",
        header: "Call Number",
      },
      {
        accessorKey: "bookISBN",
        header: "Book ISBN",
      },
      {
        accessorKey: "numberOfBooksAvailable_QUANTITY",
        header: "Copies Available",
        enableEditing: false,
        enableColumnFilter: false,
        Cell: ({ row }) => (
          <Badge color="" variant="dot">
            {row.getValue("numberOfBooksAvailable_QUANTITY")}
          </Badge>
        ),
      },

      {
        accessorFn: (originalRow) =>
          new Date(
            originalRow.createdAt?.seconds * 1000 +
              originalRow.createdAt?.nanoseconds / 1000
          ),
        header: "Date Created",
        filterVariant: "date-range",
        Cell: ({ row }) => {
          const date = format(
            new Date(
              row.original.createdAt.seconds * 1000 +
                row.original.createdAt.nanoseconds / 1000
            ),
            "MMMM dd yyyy"
          );

          return <Text>{date}</Text>;
        },
      },
    ],
    [bookType]
  );
  const exportCSVFile = (csvData: Row<IBooks>[]) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formatData = csvData?.map((user: any) => {
      const { firstName, lastName, middleName, email, createdAt, userRole } =
        user.original;

      const date = format(
        new Date(createdAt.seconds * 1000 + createdAt.nanoseconds / 1000),
        "MMMM dd yyyy"
      );

      // const createdAt = format();
      return {
        firstName,
        middleName,
        lastName,
        email,
        userRole,
        createdAt: date,
      };
    });

    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

    const fileExention = ".csv";

    const flatJSON = formatData.map((record) => flatten(record, {}, ""));

    const csv = Papa.unparse(flatJSON);

    const data = new Blob([csv], {
      type: fileType,
    });

    saveAs(
      data,
      `Binangonan Catholic College User Report - ${new Date().toLocaleDateString(
        "en-us",
        { year: "numeric", month: "long", day: "numeric" }
      )} ${fileExention}`
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  const table = useMantineReactTable({
    data: bookConditionList,
    columns: customColumns,
    mantineTableContainerProps: {
      style: {
        height: "100%",
      },
    },

    state: {
      isLoading: isLoadingUsers || isBookType,
      // isSaving: isCreatingUser || isUpdating || isUpdatingStatus,
      showAlertBanner: isLoadingUsersError,
      showProgressBars: isFetchingUsers,

      showLoadingOverlay: isFetchingUsers || isLoadingUsersError,
    },

    initialState: {
      pagination: { pageIndex: 0, pageSize: 5 },
      columnVisibility: {
        id: false,
      },
      showColumnFilters: true,
      columnPinning: {
        left: ["Date Created"],
      },
    },

    renderToolbarInternalActions: ({ table }) => {
      return (
        <Flex gap="xs" align="center">
          <MRT_ToggleGlobalFilterButton table={table} />{" "}
          <MRT_ToggleDensePaddingButton table={table} />
        </Flex>
      );
    },
    renderTopToolbarCustomActions: ({ table }) => (
      <>
        <Box
          style={{
            display: "flex",
            gap: "16px",
            padding: "8px",
            flexWrap: "wrap",
          }}
        >
          <Button
            color="yellow.7"
            onClick={() => exportCSVFile(table.getFilteredRowModel().rows)}
            leftSection={<IconFileTypeCsv />}
            variant="outline"
          >
            Export to CSV
          </Button>

          <Button
            color="yellow.7"
            //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
            onClick={() => {
              //   console.log(table.getFilteredRowModel().rows);
              exportToPDF(table.getFilteredRowModel().rows);
            }}
            leftSection={<IconFileTypePdf />}
            variant="outline"
          >
            Export to PDF
          </Button>
        </Box>
      </>
    ),
  });

  const exportToPDF = async (data: Row<IBooks>[]) => {
    const headerNamesMapping: Record<string, string> = {
      borrowersName: "Name",
      borrowers: "Borrower",
      borrowersNumber: "Borrowers Number",
      borrowersEmail: "Email",
      status: "Status",
      bookTitle: "Title",
      createdAt: "Date created",
    };

    const headerNames = table
      .getAllColumns()
      .filter(
        (col) => col.id !== "select" && col.id !== "actions" && col.id !== "id"
      )
      .filter((col) => {
        console.log(col);
        return (
          col.id === "borrowersName" ||
          col.id === "borrowers" ||
          col.id === "middleName" ||
          col.id === "borrowersNumber" ||
          col.id === "borrowersEmail" ||
          col.id === "status" ||
          col.id === "bookTitle" ||
          col.id === "createdAt"
        );
      })
      .map((col) => headerNamesMapping[col.id]);

    const formatData = data?.map((user: any) => {
      const {
        borrowersName,
        borrowers,
        borrowersNumber,
        borrowersEmail,
        status,
        bookTitle,
        createdAt,
      } = user.original;

      const date = format(
        new Date(createdAt?.seconds * 1000 + createdAt?.nanoseconds / 1000),
        "MMMM dd yyyy"
      );

      // const createdAt = format();
      return {
        borrowersName,
        borrowers,
        borrowersNumber,
        borrowersEmail,
        status,
        bookTitle,
        createdAt: date,
      };
    });

    const doc = new jsPDF("l", "mm", "a4");

    const extractingValues = formatData.map((doc) => Object.values(doc));

    console.log(extractingValues);

    (doc as jsPDF & { autoTable: autoTable }).autoTable({
      headStyles: {
        fillColor: "#77050a",
        textColor: "#fff",
      },
      didDrawCell: () => {
        const image = new Image();
        const logoImage = new Image();

        image.src = depedLogo;
        logoImage.src = bccLogo;
        // doc.addImage(imageRef.current, "PNG", 50, 15 - 1, 12, 12);

        doc.addImage(bccLogoPng, "PNG", 50, 15 - 1, 12, 12);
        doc.addImage(image.src, "PNG", 160, 15 - 1, 15, 15);
      },
      head: [headerNames],
      body: extractingValues as RowInput[],
      margin: { top: 50 },
    });

    doc.internal.scaleFactor = 3.75;
    const docWidth = doc.internal.pageSize.width;

    const colorBlack = "#000000";
    const colorGray = "#1c1c1d";
    let currentHeight = 15;

    const pdfConfig = {
      headerTextSize: 8,
      labelTextSize: 12,
      fieldTextSize: 10,
      lineHeight: 6,
      subLineHeight: 4,
    };

    doc.setFontSize(pdfConfig.headerTextSize);
    doc.setTextColor(colorBlack);

    doc.setFontSize(pdfConfig.fieldTextSize);
    doc.setTextColor(colorGray);
    currentHeight += pdfConfig.subLineHeight;

    doc.text(`Republic of the Philippnes`, docWidth / 2, currentHeight - 5, {
      align: "center",
    });

    currentHeight += pdfConfig.subLineHeight;

    doc.setFont("", "", "bold");
    // doc.text(

    doc.text(`Binangonan Catholic College`, docWidth / 2, currentHeight - 5, {
      align: "center",
    });

    currentHeight += pdfConfig.subLineHeight;

    doc.text(`Binangonan, Rizal`, docWidth / 2, currentHeight - 5, {
      align: "center",
    });

    currentHeight += pdfConfig.subLineHeight;
    currentHeight += pdfConfig.subLineHeight;
    currentHeight += pdfConfig.subLineHeight;
    currentHeight += 2;
    doc.setFont("", "", "bold");
    doc.setFontSize(16);
    doc.text(
      `Binangonan Catholic College Transaction Report`,
      docWidth / 2,
      currentHeight - 5,
      {
        align: "center",
      }
    );

    currentHeight += pdfConfig.subLineHeight;
    doc.setFontSize(pdfConfig.fieldTextSize);
    doc.setFont("", "", "normal");
    doc.text(
      `${format(new Date(), "MMMM dd, yyyy")}`,
      docWidth / 2,
      currentHeight - 5,
      {
        align: "center",
      }
    );
    doc.save(
      `Binangonan Catholic College Transaction Report - ${new Date().toLocaleDateString(
        "en-us",
        { year: "numeric", month: "long", day: "numeric" }
      )}.pdf`
    );
  };

  return (
    <>
      <Box maw={"78vw"}>
        <Group justify="space-between">
          <Box className={classes.highlight}>
            <Text fz={"xl"} fw={"bold"} c={"red"}>
              Inventory Report
            </Text>
          </Box>
        </Group>

        <Box mt={"lg"}>
          <MantineReactTable table={table} />
        </Box>
      </Box>
    </>
  );
};
export default InventoryReportTable;
