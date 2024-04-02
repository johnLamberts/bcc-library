/* eslint-disable @typescript-eslint/no-explicit-any */
import { Group, Box, Button, Text, Flex, Badge, Modal } from "@mantine/core";
import { IconFileTypeCsv, IconFileTypePdf } from "@tabler/icons-react";
import {
  MRT_ColumnDef,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleGlobalFilterButton,
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";
import { useMemo, useState } from "react";

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
import { ICirculation } from "@features/Transaction/models/circulation.interface";
import useReadBookConditionnReport from "./hooks/useBookCoditionReport";
import { useDisclosure } from "@mantine/hooks";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { Viewer } from "@react-pdf-viewer/core";
import FeeToolbar from "./FeeFilter/FeeToolbar";

const BookConditionReportTable = () => {
  const {
    data: bookConditionList = [],
    isLoading: isLoadingUsers,
    isError: isLoadingUsersError,
    isFetching: isFetchingUsers,
  } = useReadBookConditionnReport();

  const [opened, { open, close }] = useDisclosure(false);

  const [viewPdf, setViewPdf] = useState<string>();
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const customColumns = useMemo<MRT_ColumnDef<ICirculation>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "bookTitle",
        header: "Title",
      },
      {
        accessorKey: "bookType",
        header: "Book Type",
      },
      {
        accessorKey: "bookISBN",
        header: "ISBN",
      },
      {
        accessorKey: "bookCondition",
        header: "Book Condition",
        Cell: ({ row }) => {
          const otherBadge = row.getValue("bookCondition") as string;

          if (otherBadge?.toLowerCase()?.includes("damage")) {
            return (
              <Badge color="#C31209" tt={"inherit"} variant="dot" fw={"normal"}>
                {otherBadge}
              </Badge>
            );
          }

          if (otherBadge.toLowerCase().includes("return")) {
            return (
              <Badge color="#027127" tt={"inherit"} variant="dot" fw={"normal"}>
                {otherBadge}
              </Badge>
            );
          }

          return (
            <Badge color="#E39500" tt={"inherit"} variant="dot" fw={"normal"}>
              {otherBadge}
            </Badge>
          );

          // return (
          //   <Badge color="#C31209" tt={"inherit"} variant="dot" fw={"normal"}>

          //   </Badge>
          // );
        },
      },
      {
        accessorFn: (originalRow) =>
          new Date(
            originalRow.dateReturned?.seconds * 1000 +
              originalRow.dateReturned?.nanoseconds / 1000
          ),
        header: "Date Created",
        filterVariant: "date-range",
        Cell: ({ row }) => {
          const date = format(
            new Date(
              row.original.dateReturned?.seconds * 1000 +
                row.original.dateReturned?.nanoseconds / 1000
            ),
            "MMMM dd yyyy"
          );

          return <Text>{date}</Text>;
        },
      },
    ],
    []
  );

  const exportCSVFile = (csvData: Row<ICirculation>[]) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formatData = csvData?.map((user: any) => {
      const { bookTitle, bookType, bookISBN, bookCondition, dateReturned } =
        user.original;

      const date = format(
        new Date(
          dateReturned?.seconds * 1000 + dateReturned?.nanoseconds / 1000
        ),
        "MMMM dd yyyy"
      );

      // const createdAt = format();
      return {
        bookTitle,
        bookType,
        bookISBN,
        bookCondition,
        dateReturned: date,
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
      isLoading: isLoadingUsers,
      // isSaving: isCreatingUser || isUpdating || isUpdatingStatus,
      showAlertBanner: isLoadingUsersError,
      showProgressBars: isFetchingUsers,
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
          <FeeToolbar table={table} />
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
            onClick={() =>
              exportCSVFile(table.getFilteredRowModel().rows as any)
            }
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
              exportToPDF(table.getFilteredRowModel().rows as any);
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

  const exportToPDF = async (data: Row<ICirculation>[]) => {
    const headerNamesMapping: Record<string, string> = {
      bookTitle: "Title",
      bookType: "Book Type",
      bookISBN: "Book ISBN",
      bookCondition: "bookCondition",
      "Date Created": "Date created",
    };

    const headerNames = table
      .getAllColumns()
      .filter(
        (col) => col.id !== "select" && col.id !== "actions" && col.id !== "id"
      )
      .filter((col) => {
        return (
          col.id === "bookType" ||
          col.id === "bookISBN" ||
          col.id === "bookCondition" ||
          col.id === "status" ||
          col.id === "bookTitle" ||
          col.id === "Date Created"
        );
      })
      .map((col) => headerNamesMapping[col.id]);

    const formatData = data?.map((user: any) => {
      const { bookTitle, bookType, bookISBN, bookCondition, dateReturned } =
        user.original;

      const date = format(
        new Date(
          dateReturned?.seconds * 1000 + dateReturned?.nanoseconds / 1000
        ),
        "MMMM dd yyyy"
      );

      // const createdAt = format();
      return {
        bookTitle,
        bookType,
        bookISBN,
        bookCondition,
        dateReturned: date,
      };
    });

    console.log(formatData, headerNames);

    const doc = new jsPDF("l", "mm", "a4");

    const totalPagesExp = "{total_pages_count_string}";
    const extractingValues = formatData.map((doc) => Object.values(doc));

    (doc as jsPDF & { autoTable: autoTable }).autoTable({
      headStyles: {
        fillColor: "#77050a",
        textColor: "#fff",
      },
      willDrawPage: () => {
        const image = new Image();
        const logoImage = new Image();

        image.src = depedLogo;
        logoImage.src = bccLogo;
        // doc.addImage(imageRef.current, "PNG", 50, 15 - 1, 12, 12);

        doc.addImage(bccLogoPng, "PNG", 50, 15 - 1, 25, 25);
        doc.addImage(image.src, "PNG", 250, 15 - 1, 25, 25);

        doc.internal.scaleFactor = 3.75;
        const docWidth = doc.internal.pageSize.width;
        // const docHeight = doc.internal.pageSize.height;

        const colorBlack = "#000000";
        const colorGray = "#1c1c1d";
        //starting at 15mm
        let currentHeight = 15;
        //var startPointRectPanel1 = currentHeight + 6;

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

        doc.text(
          `Republic of the Philippnes`,
          docWidth / 2,
          currentHeight - 5,
          {
            align: "center",
          }
        );

        currentHeight += pdfConfig.subLineHeight;

        doc.setFont("", "", "bold");

        doc.text(
          `Binangonan Catholic College`,
          docWidth / 2,
          currentHeight - 5,
          {
            align: "center",
          }
        );

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
          `Binangonan Catholic College Books Condition Report `,
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
      },

      head: [headerNames],
      body: extractingValues as RowInput[],
      startY: 50,
      showHead: "firstPage",
      margin: { top: 50 },
      didDrawPage: function (data) {
        // Footer
        let str = "Page " + doc.getNumberOfPages();
        // Total page number plugin only available in jspdf v1.0+
        if (typeof doc.putTotalPages === "function") {
          str = str + " of " + totalPagesExp;
        }
        doc.setFontSize(10);

        // jsPDF 1.4+ uses getHeight, <1.4 uses .height
        const pageSize = doc.internal.pageSize;
        const pageHeight = pageSize.height
          ? pageSize.height
          : pageSize.getHeight();
        doc.text(str, data.settings.margin.left, pageHeight - 10);
      },
    });
    if (typeof doc.putTotalPages === "function") {
      doc.putTotalPages(totalPagesExp);
    }

    console.log(headerNames, formatData);
    setViewPdf(doc.output("datauristring"));

    open?.();
  };

  return (
    <>
      <Box maw={"78vw"}>
        <Group justify="space-between">
          <Box className={classes.highlight}>
            <Text fz={"xl"} fw={"bold"} c={"red"}>
              Book Condition Report
            </Text>
          </Box>
        </Group>

        <Box mt={"lg"}>
          <MantineReactTable table={table} />
        </Box>
      </Box>

      <Modal
        opened={opened}
        onClose={close}
        title="Teacher Report"
        size="calc(100vw - 3rem)"
      >
        <Box>
          <Viewer
            plugins={[defaultLayoutPluginInstance]}
            fileUrl={viewPdf as string}
          />{" "}
        </Box>
        {/* Modal content */}
      </Modal>
    </>
  );
};
export default BookConditionReportTable;
