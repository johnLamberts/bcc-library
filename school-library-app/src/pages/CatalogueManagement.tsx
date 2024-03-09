import { Box, Flex, Group, Select, Text } from "@mantine/core";
import { useLocation, useSearchParams } from "react-router-dom";
import CatalogueTable from "@features/Catalogue/CatalogueTable";
import { useHeadTitle } from "src/hooks/use-head-tag";
import classes from "./styles/user.module.css";

export default function CatalogueManagement() {
  useHeadTitle("Books and Catalogue Management");
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
                Catalogue Management
              </Text>
            </Box>
            {pathname.toLowerCase().includes("catalogue") && (
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
              <CatalogueTable />
            </Box>
          </>
        )}

        {searchParams.get("viewBy") === null && (
          <>
            <Box my="xl">
              <CatalogueTable />
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
