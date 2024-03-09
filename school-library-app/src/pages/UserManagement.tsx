import { Box, Flex, Group, Select, Text } from "@mantine/core";
import { useLocation, useSearchParams } from "react-router-dom";
import UserTable from "@features/Users/UserTable";
import classes from "./styles/user.module.css";

export default function UserManagement() {
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
                User Management
              </Text>
            </Box>
            {pathname.toLowerCase().includes("user") && (
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
              <UserTable />
            </Box>
          </>
        )}

        {searchParams.get("viewBy") === null && (
          <>
            <Box my="xl">
              <UserTable />
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
