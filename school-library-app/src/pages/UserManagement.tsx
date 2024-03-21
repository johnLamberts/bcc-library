import { Box, Flex, Group, Select, Text } from "@mantine/core";
import { useLocation, useSearchParams } from "react-router-dom";
import UserTable from "@features/Users/UserTable";
import classes from "./styles/user.module.css";
import UserCards from "@features/Users/UserCards";

export default function UserManagement() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { pathname } = useLocation();

  const handleChange = (params: string | null) => {
    searchParams.set("viewBy", params as string);

    return setSearchParams(searchParams);
  };

  const handleViewOnChange = (params: string | null) => {
    searchParams.set("viewOn", params as string);

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

            {pathname.toLowerCase().includes("user") && (
              <Select
                allowDeselect={false}
                size="xs"
                disabled={searchParams.get("viewBy") === "Archive"}
                data={["By Table", "By Cards"]}
                value={searchParams.get("viewOn") || "By Table"}
                onChange={handleViewOnChange}
              />
            )}
          </Flex>
        </Box>
      </Group>

      {/* List of Users */}

      <Box w={"100%"}>
        {searchParams.get("viewBy") === "All" &&
          searchParams.get("viewOn") === "By Table" && (
            <>
              <Box my="xl">
                <UserTable />
              </Box>
            </>
          )}

        {searchParams.get("viewBy") === null &&
          searchParams.get("viewOn") === null && (
            <>
              <Box my="xl">
                <UserTable />
              </Box>
            </>
          )}

        {searchParams.get("viewBy") === "All" &&
          searchParams.get("viewOn") === "By Cards" && (
            <>
              <Box my="xl">
                <UserCards />
              </Box>
            </>
          )}

        {searchParams.get("viewBy") === null &&
          searchParams.get("viewOn") === "By Table" && (
            <>
              <Box my="xl">
                <UserTable />
              </Box>
            </>
          )}

        {searchParams.get("viewBy") === null &&
          searchParams.get("viewOn") === "By Cards" && (
            <>
              <Box my="xl">
                {/* <UserTable /> */}
                <UserCards />
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
