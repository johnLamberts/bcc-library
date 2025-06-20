/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Group,
  Box,
  Button,
  Text,
  Flex,
  Avatar,
  Badge,
  Modal,
} from "@mantine/core";
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
import { IUser } from "@features/Users/models/user.interface";
import useReadUsers from "@features/Users/hooks/useReadUsers";
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
import UserToolbar from "./ReportsToolbar/UserToolbar";
import { useDisclosure } from "@mantine/hooks";
import { Viewer } from "@react-pdf-viewer/core";

import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
const UserReportTable = () => {
  const {
    data: usersData,
    isLoading: isLoadingUsers,
    isError: isLoadingUsersError,
    isFetching: isFetchingUsers,
  } = useReadUsers();
  const [opened, { open, close }] = useDisclosure(false);

  const [viewPdf, setViewPdf] = useState<string>();
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const optimizedUsersData: IUser[] =
    useMemo(() => {
      const { data } = usersData?.data || [];

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return data;
    }, [usersData?.data]) || [];

  const customColumns = useMemo<MRT_ColumnDef<IUser>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "avatarImage",
        header: "User Picture",
        enableColumnFilter: false,
        Cell: ({ row }) => {
          return (
            <Avatar src={`${row.getValue("avatarImage")}`} alt="it's me" />
          );
        },
      },
      {
        accessorKey: "userRole",
        header: "Role",
        filterVariant: "select",
        mantineFilterMultiSelectProps: {
          data: ["Student", "Librarian", "Admin", "Teacher", "Staff"],
        },

        Cell: ({ row }) => {
          return <Badge size="md">{row.getValue("userRole")}</Badge>;
        },
      },
      {
        accessorKey: "firstName",
        header: "First Name",
      },
      {
        accessorKey: "middleName",
        header: "Middle Name",
      },
      {
        accessorKey: "lastName",
        header: "Last Name",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorFn: (originalRow) => {
          const seconds =
            originalRow.createdAt?._seconds ||
            (originalRow as any).createdAt?.seconds;
          const nanoseconds =
            originalRow.createdAt?._nanoseconds ||
            (originalRow as any).createdAt?.nanoseconds;

          if (seconds !== undefined && nanoseconds !== undefined) {
            // Remove underscore if it exists
            const secondsWithoutUnderscore = seconds
              .toString()
              .replace("_", "");
            const nanosecondsWithoutUnderscore = nanoseconds
              .toString()
              .replace("_", "");

            const milliseconds =
              Number(secondsWithoutUnderscore) * 1000 +
              Number(nanosecondsWithoutUnderscore) / 1000;

            const date = new Date(milliseconds);

            return new Date(date);
          }

          return null;
        },
        header: "Date Created",
        filterVariant: "date-range",
        Cell: ({ row }) => {
          const seconds =
            row.original.createdAt?._seconds ||
            (row as any).original.createdAt?.seconds;
          const nanoseconds =
            row.original.createdAt?._nanoseconds ||
            (row as any).original.createdAt?.nanoseconds;

          if (seconds !== undefined && nanoseconds !== undefined) {
            // Remove underscore if it exists
            const secondsWithoutUnderscore = seconds
              .toString()
              .replace("_", "");
            const nanosecondsWithoutUnderscore = nanoseconds
              .toString()
              .replace("_", "");

            const milliseconds =
              Number(secondsWithoutUnderscore) * 1000 +
              Number(nanosecondsWithoutUnderscore) / 1000;

            const date = new Date(milliseconds);

            return <Text>{format(new Date(date), "MMMM dd yyyy")}</Text>;
          }

          return null;
          // return <Text>{date}</Text>;
          // return <Text>{date}</Text>;
        },

        size: 40,
      },

      {
        accessorFn: (originalRow) => (originalRow.isEnabled ? "true" : "false"),
        filterVariant: "checkbox",
        header: "Account Status",
        Cell: ({ cell }) =>
          cell.getValue() === "true" ? (
            <Badge color="green.8" size="md">
              Enable
            </Badge>
          ) : (
            <Badge color="red.8" size="md">
              Disable
            </Badge>
          ),
      },
    ],
    []
  );

  console.log(optimizedUsersData);

  const exportCSVFile = (csvData: Row<IUser>[]) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formatData = csvData?.map((user: any) => {
      const { firstName, lastName, middleName, email, createdAt, userRole } =
        user.original;

      const date = format(
        new Date(createdAt._seconds * 1000 + createdAt._nanoseconds / 1000),
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
    data: optimizedUsersData,
    columns: customColumns,
    mantineTableContainerProps: {
      style: {
        height: "100%",
      },
    },
    mantineTableProps: {
      withColumnBorders: true,
      withRowBorders: true,
      withTableBorder: true,
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
        avatarImage: false,
        middleName: false,
      },
      columnPinning: {
        left: ["Date Created"],
      },
      showColumnFilters: true,
    },

    renderToolbarInternalActions: ({ table }) => {
      return (
        <Flex gap="xs" align="center">
          <UserToolbar table={table} column={table.getColumn("Date Created")} />{" "}
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
            onClick={() => exportToPDF(table.getFilteredRowModel().rows)}
            leftSection={<IconFileTypePdf />}
            variant="outline"
          >
            Export to PDF
          </Button>
        </Box>
      </>
    ),
  });

  const exportToPDF = async (data: Row<IUser>[]) => {
    const headerNamesMapping: Record<string, string> = {
      firstName: "First Name",
      middleName: "Middle Name",
      lastName: "Last Name",
      email: "Email",
      userRole: "User Role",
      "Date Created": "Date Created",
    };

    const headerNames = table
      .getAllColumns()
      .filter(
        (col) => col.id !== "select" && col.id !== "actions" && col.id !== "id"
      )
      .filter((col) => {
        return (
          col.id === "firstName" ||
          col.id === "middleName" ||
          col.id === "lastName" ||
          col.id === "email" ||
          col.id === "firstName" ||
          col.id === "userRole" ||
          col.id === "Date Created"
        );
      })
      .map((col) => headerNamesMapping[col.id]);

    const formatData = data?.map((user: any) => {
      const { firstName, lastName, middleName, email, createdAt, userRole } =
        user.original;

      const seconds = createdAt?._seconds || createdAt?.seconds;
      const nanoseconds = createdAt?._nanoseconds || createdAt?.nanoseconds;

      let date = new Date();

      if (seconds !== undefined && nanoseconds !== undefined) {
        // Remove underscore if it exists
        const secondsWithoutUnderscore = seconds.toString().replace("_", "");
        const nanosecondsWithoutUnderscore = nanoseconds
          .toString()
          .replace("_", "");

        const milliseconds =
          Number(secondsWithoutUnderscore) * 1000 +
          Number(nanosecondsWithoutUnderscore) / 1000;

        date = new Date(milliseconds);
      }

      const formatDate = format(new Date(date), "MMMM dd yyyy");

      // const createdAt = format();
      return {
        userRole,
        firstName,
        middleName,
        lastName,
        email,
        createdAt: formatDate,
      };
    });

    const doc = new jsPDF("p", "mm", "a4");

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

        doc.addImage(bccLogoPng, "PNG", 50, 15 - 1, 12, 12);
        doc.addImage(image.src, "PNG", 160, 15 - 1, 15, 15);

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
          `Binangonan Catholic College User Report `,
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

    // let tdWidth = (docWidth - 20) / headerNames.length;

    // if (headerNames.length > 2) {
    //   tdWidth = (docWidth - 20) / headerNames.length;
    // }

    // const addTableHeaderBorder = () => {
    //   currentHeight += 2;
    //   const lineHeight = 7;
    //   let startWidth = 0;
    //   for (let i = 0; i < headerNames.length; i++) {
    //     const currentTdWidth = (headerNames[i] as any)?.style?.width || tdWidth;
    //     if (i === 0) doc.rect(10, currentHeight, currentTdWidth, lineHeight);
    //     else {
    //       const previousTdWidth =
    //         (headerNames[i - 1] as any)?.style?.width || tdWidth;
    //       const widthToUse =
    //         currentTdWidth == previousTdWidth
    //           ? currentTdWidth
    //           : previousTdWidth;
    //       startWidth += widthToUse;
    //       doc.rect(startWidth + 10, currentHeight, currentTdWidth, lineHeight);
    //     }
    //   }
    //   currentHeight -= 2;
    // };
    // doc.save(
    //   `Binangonan Catholic College User Report - ${new Date().toLocaleDateString(
    //     "en-us",
    //     { year: "numeric", month: "long", day: "numeric" }
    //   )}.pdf`
    // );
    if (typeof doc.putTotalPages === "function") {
      doc.putTotalPages(totalPagesExp);
    }
    setViewPdf(doc.output("datauristring"));

    open?.();
  };

  // Your render function
  return (
    <>
      <Box>
        <Group justify="space-between">
          <Box className={classes.highlight}>
            <Text fz={"xs"} fw={"bold"} c={"red"}>
              User Management
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
        title="User Report"
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
export default UserReportTable;
