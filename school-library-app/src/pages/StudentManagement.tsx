import { useMemo, useState } from "react";
import UsersBox from "@features/Users/UsersBox";
import {
  ActionIcon,
  Box,
  Divider,
  Grid,
  Group,
  TextInput,
  Tooltip,
  rem,
} from "@mantine/core";
import {
  IconArrowRight,
  IconBoxMultiple1,
  IconSearch,
  IconTable,
} from "@tabler/icons-react";
import StudentTable from "@features/Student/StudentTable";
import { useSearchParams } from "react-router-dom";
import useReadStudents from "@features/Student/hooks/useReadStudents";
import { IStudents } from "@features/Student/models/student.interface";
import StudentBox from "@features/Student/StudentBox";

export default function StudentManagement() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [getId, setGetId] = useState("");

  const { data: studentData, isLoading } = useReadStudents();

  const filterStudentData = studentData?.filter(
    (user: IStudents) => user.id === getId
  )[0];

  const memoizedCards = useMemo(() => {
    return (
      searchParams.get("view") === "by-cards" && (
        <Box my={"xl"}>
          {/* gutter={{ base: 12, xs: "md", md: "lg", xl: 5 }} */}
          <Grid>
            {isLoading && <>Loading...</>}
            {studentData?.map((user, index) => (
              <StudentBox
                key={index}
                user={user}
                filterStudentData={filterStudentData}
                setGetId={setGetId}
              />
            ))}
          </Grid>
        </Box>
      )
    );
  }, [studentData, isLoading, searchParams, filterStudentData]);

  return (
    <>
      {/* <Container> */}
      {/* Title of the components */}
      {/* <Group justify="space-between">
        <Code p={"xs"}>
          <Text fz={"xl"} fw={"bold"} c={"red"}>
            Student Management
          </Text>
        </Code>

        <Group>
          <Button
            variant="light"
            leftSection={<IconFileImport size={14} />}
            bg={" var(--mantine-color-red-light)"}
            color={" var(--mantine-color-red-light-color)"}
          >
            Import Student
          </Button>
          <Button
            onClick={open}
            variant="light"
            leftSection={<IconPlus size={14} />}
            bg={" var(--mantine-color-red-light)"}
            color={" var(--mantine-color-red-light-color)"}
          >
            Add Student
          </Button>
        </Group>
      </Group> */}

      {/* Data Filtering  */}
      <Group justify="space-between">
        <Box>
          <Tooltip label="View the students by Table">
            <ActionIcon
              m={1.2}
              variant={
                searchParams.get("view") === "by-table" ||
                searchParams.get("view") === null
                  ? "outline"
                  : "default"
              }
              color="red"
              size="lg"
              aria-label="Settings"
              onClick={() => {
                searchParams.set("view", "by-table");
                setSearchParams(searchParams);
              }}
            >
              <IconTable style={{ width: rem(20) }} stroke={1.5} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="View the students by Card">
            <ActionIcon
              m={1.2}
              variant={
                searchParams.get("view") === "by-cards" ? "outline" : "default"
              }
              color="red"
              size="lg"
              aria-label="Gallery"
              onClick={() => {
                searchParams.set("view", "by-cards");
                setSearchParams(searchParams);
              }}
            >
              <IconBoxMultiple1 style={{ width: rem(20) }} stroke={1.5} />
            </ActionIcon>
          </Tooltip>
        </Box>

        {searchParams.get("view") === "by-cards" && (
          <TextInput
            radius="md"
            size="md"
            placeholder="Search users"
            rightSectionWidth={42}
            leftSection={
              <IconSearch
                style={{ width: rem(18), height: rem(18) }}
                stroke={1.5}
              />
            }
            rightSection={
              <ActionIcon
                size={32}
                radius="xl"
                color={" var(--mantine-color-red-light-color)"}
                variant="filled"
              >
                <IconArrowRight
                  style={{ width: rem(18), height: rem(18) }}
                  stroke={1.5}
                />
              </ActionIcon>
            }
          />
        )}
      </Group>

      {/* List of Users */}
      <Divider my="lg" c={"dimmed"} />

      {memoizedCards}

      {searchParams.get("view") === "by-table" && (
        <>
          <Box my="xl">
            <StudentTable />
          </Box>
        </>
      )}

      {searchParams.get("view") === null && (
        <>
          <Box my="xl">
            <StudentTable />
          </Box>
        </>
      )}
      {/* 
      <Drawer.Root
        opened={opened}
        onClose={close}
        scrollAreaComponent={ScrollArea.Autosize}
        size={"xl"}
      >
        <Drawer.Overlay />
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title
              style={{
                fontSize: "1.2rem",
                color: " var(--mantine-color-red-light-color)",
              }}
            >
              Adding Student Form
            </Drawer.Title>
            <Drawer.CloseButton color="" />
          </Drawer.Header>
          <Divider />

          <Drawer.Body>
            <Box p={"xs"}>
              <StudentForm key={formid} closeForm={close} />
            </Box>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root> */}
      {/* </Container> */}
    </>
  );
}
