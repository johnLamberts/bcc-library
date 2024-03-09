import { Box, Flex, Group, Select, Text } from "@mantine/core";
import StudentTable from "@features/Student/StudentTable";
import { useLocation, useSearchParams } from "react-router-dom";
import classes from "./styles/user.module.css";

export default function StudentManagement() {
  // const [getId, setGetId] = useState("");

  // const { data: studentData, isLoading } = useReadStudents();

  // const filterStudentData = studentData?.filter(
  //   (user: IStudents) => user.id === getId
  // )[0];

  // const memoizedCards = useMemo(() => {
  //   return (
  //     searchParams.get("view") === "by-cards" && (
  //       <Box my={"xl"}>
  //         {/* gutter={{ base: 12, xs: "md", md: "lg", xl: 5 }} */}
  //         <Grid>
  //           {isLoading && <>Loading...</>}
  //           {studentData?.map((user, index) => (
  //             <StudentBox
  //               key={index}
  //               user={user}
  //               filterStudentData={filterStudentData}
  //               setGetId={setGetId}
  //             />
  //           ))}
  //         </Grid>
  //       </Box>
  //     )
  //   );
  // }, [studentData, isLoading, searchParams, filterStudentData]);
  const [searchParams, setSearchParams] = useSearchParams();

  const { pathname } = useLocation();

  const handleChange = (params: string | null) => {
    searchParams.set("viewBy", params as string);

    return setSearchParams(searchParams);
  };

  return (
    <>
      <Group justify="space-between">
        <Box>
          <Flex align={"center"} gap={"xs"}>
            <Box className={classes.highlight}>
              <Text fz={"xs"} fw={"bold"} c={"red"}>
                Student Management
              </Text>
            </Box>
            {pathname.toLowerCase().includes("student") && (
              <Select
                allowDeselect={false}
                size="xs"
                data={["All", "Archive"]}
                value={searchParams.get("viewBy") || "All"}
                onChange={handleChange}
              />
            )}
          </Flex>
        </Box>
      </Group>

      {/* List of Users */}

      <Box w={"100%"}>
        {searchParams.get("viewBy") === "All" && (
          <>
            <Box my="xl">
              <StudentTable />
            </Box>
          </>
        )}

        {searchParams.get("viewBy") === null && (
          <>
            <Box my="xl">
              <StudentTable />
            </Box>
          </>
        )}

        {searchParams.get("viewBy") === "Archive" && (
          <>
            <Box my="xl">
              {/* <CatalogueTable /> */}
              Archive Table
            </Box>
          </>
        )}
      </Box>
    </>
  );
}
