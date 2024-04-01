/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Group,
  Box,
  Button,
  Text,
  Flex,
  ScrollArea,
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
import useReadStudents from "@features/Student/hooks/useReadStudents";
import { IStudents } from "@features/Student/models/student.interface";
import StudentToolbar from "@features/Student/StudentToolbar";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { useDisclosure } from "@mantine/hooks";
import { Viewer } from "@react-pdf-viewer/core";

const StudentReportTable = () => {
  const {
    data: studentsData = [],
    isLoading: isLoadingUsers,
    isError: isLoadingUsersError,
    isFetching: isFetchingUsers,
  } = useReadStudents();

  const [opened, { open, close }] = useDisclosure(false);

  const [viewPdf, setViewPdf] = useState<string>();

  const customColumns = useMemo<MRT_ColumnDef<IStudents>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "studentNumber",
        header: "Student Number",
        Cell: ({ row }) => {
          return (
            <Badge radius={"sm"} bg={" var(--mantine-color-yellow-light)"}>
              <span
                style={{
                  color: "var(--mantine-color-yellow-light-color)",
                }}
              >
                {row.getValue("studentNumber")}
              </span>
            </Badge>
          );
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
        accessorKey: "levelOfEducation",
        header: "Level of Education",
        Cell: ({ row }) => {
          return row.getValue("levelOfEducation")
            ? row.getValue("levelOfEducation")
            : "N/A";
        },
      },
      {
        accessorKey: "academicCourse",
        header: "Academic Course",
        Cell: ({ row }) => {
          return row.getValue("academicCourse")
            ? row.getValue("academicCourse")
            : "N/A";
        },
      },

      {
        accessorKey: "gradeLevel",
        header: "Grade Level",
        Cell: ({ row }) => {
          return row.getValue("gradeLevel")
            ? row.getValue("gradeLevel")
            : "N/A";
        },
      },
      {
        accessorKey: "gradeSection",
        header: "Grade Section",
        Cell: ({ row }) => {
          return row.getValue("gradeSection")
            ? row.getValue("gradeSection")
            : "N/A";
        },
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

  const exportCSVFile = (csvData: Row<IStudents>[]) => {
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
    data: studentsData,
    columns: customColumns,
    enableRowNumbers: true,
    mantineTableContainerProps: {
      style: {
        height: "100%",
      },
    },

    mantineCreateRowModalProps: {
      centered: true,
      size: "xl",
      title: "Adding form for User",
      scrollAreaComponent: ScrollArea.Autosize,
    },
    mantineEditRowModalProps: {
      centered: true,
      size: "xl",
      title: "Editing form for User",
      scrollAreaComponent: ScrollArea.Autosize,
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
    },

    renderToolbarInternalActions: ({ table }) => {
      return (
        <Flex gap="xs" align="center">
          <StudentToolbar table={table} />
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

  const exportToPDF = async (data: Row<IStudents>[]) => {
    const headerNamesMapping: Record<string, string> = {
      studentNumber: "Student No.",
      firstName: "First Name",
      middleName: "Middle Name",
      lastName: "Last Name",
      email: "Email",
      levelOfEducation: "Education",
      academicCourse: "Course",
      gradeLevel: "Grade Level",
      gradeSection: "Section",
      createdAt: "Created At",
    };

    const headerNames = table
      .getAllColumns()
      .filter(
        (col) => col.id !== "select" && col.id !== "actions" && col.id !== "id"
      )
      .filter((col) => {
        return (
          col.id === "studentNumber" ||
          col.id === "firstName" ||
          col.id === "middleName" ||
          col.id === "lastName" ||
          col.id === "email" ||
          col.id === "levelOfEducation" ||
          col.id === "academicCourse" ||
          col.id === "gradeLevel" ||
          col.id === "gradeSection" ||
          col.id === "createdAt"
        );
      })
      .map((col) => headerNamesMapping[col.id]);

    const formatData = data?.map((user: any) => {
      const {
        studentNumber,
        firstName,
        lastName,
        middleName,
        email,
        createdAt,
        levelOfEducation,
        academicCourse,
        gradeLevel,
        gradeSection,
      } = user.original;

      const date = format(
        new Date(createdAt.seconds * 1000 + createdAt.nanoseconds / 1000),
        "MMMM dd yyyy"
      );

      // const createdAt = format();
      return {
        studentNumber,
        firstName,
        middleName,
        lastName,
        email,
        levelOfEducation,
        academicCourse,
        gradeLevel,
        gradeSection,
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
          `Binangonan Catholic College Teacher Report `,
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
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <>
      <Box maw={"78vw"}>
        <Group justify="space-between">
          <Box className={classes.highlight}>
            <Text fz={"xl"} fw={"bold"} c={"red"}>
              User Report
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
export default StudentReportTable;
