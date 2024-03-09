import { Group, Text, Flex, Select, Box } from "@mantine/core";
import classes from "../styles/user.module.css";
import { useSearchParams, useLocation } from "react-router-dom";
import LevelEducationTable from "@features/SysSettings/LevelEducation/LevelEducationTable";
import ArchiveEducationTable from "@features/SysSettings/LevelEducation/ArchiveEducationTable";

const LevelEducation = () => {
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
                Level of Education View
              </Text>
            </Box>
            {pathname.toLowerCase().includes("education") && (
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
            <LevelEducationTable />
          </Box>
        )}

        {searchParams.get("viewBy") === "All" && (
          <Box mt={"lg"}>
            <LevelEducationTable />
          </Box>
        )}

        {searchParams.get("viewBy") === "Archive" && (
          <Box mt={"lg"}>
            <ArchiveEducationTable />
          </Box>
        )}
      </Box>
    </>
  );
};
export default LevelEducation;
