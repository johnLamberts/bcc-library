import { Group, Box, Text, Flex, Select } from "@mantine/core";

import classes from "../styles/user.module.css";

import { useSearchParams, useLocation } from "react-router-dom";
import CategorySectionTable from "@features/SysSettings/CategorySection/CategorySectionTable";
import ArchiveCategorySection from "@features/SysSettings/CategorySection/ArchiveCategorySection";

const CategorySection = () => {
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
                Category Section View
              </Text>
            </Box>
            {pathname.toLowerCase().includes("category-section") && (
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
      <Box w={"100%"}>
        {searchParams.get("viewBy") === null && (
          <Box mt={"lg"}>
            <CategorySectionTable />
          </Box>
        )}

        {searchParams.get("viewBy") === "All" && (
          <Box mt={"lg"}>
            <CategorySectionTable />
          </Box>
        )}

        {searchParams.get("viewBy") === "Archive" && (
          <Box mt={"lg"}>
            <ArchiveCategorySection />
          </Box>
        )}
      </Box>
    </>
  );
};
export default CategorySection;
