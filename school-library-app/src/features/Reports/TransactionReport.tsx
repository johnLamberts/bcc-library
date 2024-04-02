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
import useReadTransactionReport from "./hooks/useTransactionReport";
import TransactionToolbar from "./ReportsToolbar/TransactionToolbar";
import { useDisclosure } from "@mantine/hooks";
import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

const TransactionReportTable = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const [viewPdf, setViewPdf] = useState<string>();

  const {
    data: transactionList = [],
    isLoading: isLoadingUsers,
    isError: isLoadingUsersError,
    isFetching: isFetchingUsers,
  } = useReadTransactionReport();

  const transaction = useMemo(
    () =>
      transactionList.map((tran) => ({
        ...tran,
        borrowersName: `${tran.firstName} ${tran.middleName} ${tran.lastName}`,
      })),
    [transactionList]
  );

  const customColumns = useMemo<MRT_ColumnDef<ICirculation>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "borrowersName",
        header: "Borrower Name",
      },
      {
        accessorKey: "borrowers",
        header: "Borrower",
        enableColumnFilter: false,
      },
      {
        accessorKey: "borrowersEmail",
        header: "Email",
      },
      {
        accessorKey: "status",
        header: "Status",
        enableColumnFilter: false,

        Cell: ({ row }) => {
          const status = row.getValue("status");

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
            case "Overdue":
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
            case "Returned":
              return (
                <Badge
                  color="#3498db"
                  tt={"inherit"}
                  variant="dot"
                  fw={"normal"}
                >
                  {status}
                </Badge>
              );
            case "Request":
              return (
                <Badge
                  color="#95a5a6"
                  tt={"inherit"}
                  variant="dot"
                  fw={"normal"}
                >
                  {status}
                </Badge>
              );

            case "Reserved":
              return (
                <Badge
                  color="#1c8289"
                  tt={"inherit"}
                  variant="dot"
                  fw={"normal"}
                >
                  {status}
                </Badge>
              );

            case "Cancelled":
              return (
                <Badge
                  color="#95a5a6"
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
        accessorKey: "bookTitle",
        header: "Title",
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
              row.original.createdAt?.seconds * 1000 +
                row.original.createdAt?.nanoseconds / 1000
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
    data: transaction,
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
          <TransactionToolbar table={table} />{" "}
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
      borrowersName: "Name",
      borrowers: "Borrower",
      borrowersEmail: "Email",
      status: "Status",
      bookTitle: "Title",
      "Date Created": "Date created",
    };

    const headerNames = table
      .getAllColumns()
      .filter(
        (col) => col.id !== "select" && col.id !== "actions" && col.id !== "id"
      )
      .filter((col) => {
        console.log(col.id);
        return (
          col.id === "borrowersName" ||
          col.id === "borrowers" ||
          col.id === "middleName" ||
          col.id === "borrowersEmail" ||
          col.id === "status" ||
          col.id === "bookTitle" ||
          col.id === "Date Created"
        );
      })
      .map((col) => headerNamesMapping[col.id]);

    const formatData = data?.map((user: any) => {
      const {
        borrowersName,
        borrowers,
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
        borrowersEmail,
        status,
        bookTitle,
        createdAt: date,
      };
    });

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

        doc.addImage(bccLogoPng, "PNG", 50, 15 - 1, 12, 12);
        doc.addImage(image.src, "PNG", 160, 15 - 1, 15, 15);

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
          `Binangonan Catholic College Transaction Report `,
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
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <>
      <Box>
        <Group justify="space-between">
          <Box className={classes.highlight}>
            <Text fz={"xl"} fw={"bold"} c={"red"}>
              Transaction Report
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
        title="Transaction Report"
        size="calc(100vw - 3rem)"
      >
        <Box>
          <Viewer
            plugins={[defaultLayoutPluginInstance]}
            fileUrl={viewPdf as string}
          />
        </Box>
      </Modal>
    </>
  );
};
export default TransactionReportTable;
