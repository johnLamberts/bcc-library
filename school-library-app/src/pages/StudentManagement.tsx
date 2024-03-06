import { useMemo, useState } from "react";
import {
  Box,
  Divider,
  Flex,
  Grid,
  Group,
  Select,
  Text,
  TextInput,
  rem,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
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
  const handleChange = (params: string | null) => {
    searchParams.set("viewBy", params as string);

    return setSearchParams(searchParams);
  };
  return (
    <>
      <Group justify="space-between">
        <Box>
          <Flex align={"center"} gap={"xs"}>
            <Text span c={"dimmed"} size="md">
              View
            </Text>

            <Select
              size="xs"
              allowDeselect={false}
              data={["All", "Archive"]}
              defaultValue={"All"}
              onChange={handleChange}
            />
          </Flex>
        </Box>

        {searchParams.get("view") === "by-cards" && (
          <TextInput
            radius="md"
            w={"18rem"}
            size="md"
            placeholder="Search by email or student number"
            rightSectionWidth={42}
            leftSection={
              <IconSearch
                style={{ width: rem(18), height: rem(18) }}
                stroke={1.5}
              />
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
    </>
  );
}
