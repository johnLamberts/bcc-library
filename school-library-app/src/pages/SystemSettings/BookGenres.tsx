import { Group, Box, Text, Flex, Select } from "@mantine/core";
import classes from "../styles/user.module.css";

import { useSearchParams } from "react-router-dom";
import ArchiveGenre from "@features/SysSettings/BookGenre/ArchiveGenre";
import BookGenreTable from "@features/SysSettings/BookGenre/BookGenreTable";

const BookGenre = () => {
  const [searchParams, setSearchParams] = useSearchParams();

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
                Book Genre View
              </Text>
            </Box>
            <Select
              allowDeselect={false}
              size="xs"
              data={["All", "Archive"]}
              value={searchParams.get("viewBy") || "All"}
              onChange={handleChange}
            />
          </Flex>
        </Box>
      </Group>
      <Box w={"100%"}>
        {searchParams.get("viewBy") === null && (
          <Box mt={"lg"}>
            <BookGenreTable />
          </Box>
        )}

        {searchParams.get("viewBy") === "All" && (
          <Box mt={"lg"}>
            <BookGenreTable />
          </Box>
        )}

        {searchParams.get("viewBy") === "Archive" && (
          <Box mt={"lg"}>
            <ArchiveGenre />
          </Box>
        )}
      </Box>
    </>
  );
};
export default BookGenre;
