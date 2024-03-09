import { Box, Flex, Group, Select, Text } from "@mantine/core";

import { useLocation, useSearchParams } from "react-router-dom";
import TeacherTable from "@features/Teachers/TeacherTable";

import classes from "./styles/user.module.css";

// const userData = [
//   {
//     id: 1,
//     fullName: "John Lambert",
//     role: "Admin",
//     email: "admin@test.admin",
//     image: "/images/bcc-logo.svg",
//   },
//   {
//     id: 2,
//     fullName: "Damien Liliard",
//     role: "Student",
//     email: "admin@test.admin",
//     image: "/images/bcc-logo.svg",
//   },
//   {
//     id: 3,
//     fullName: "Gl Ocamp",
//     role: "Teacher",
//     email: "admin@test.admin",
//     image: "/images/bcc-logo.svg",
//   },
// ];

export default function TeacherManagement() {
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
                Teacher Management
              </Text>
            </Box>
            {pathname.toLowerCase().includes("teacher") && (
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
              <TeacherTable />
            </Box>
          </>
        )}

        {searchParams.get("viewBy") === null && (
          <>
            <Box my="xl">
              <TeacherTable />
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
