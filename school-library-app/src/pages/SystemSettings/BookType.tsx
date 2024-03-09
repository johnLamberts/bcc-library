import { Group, Box, Flex, Select, Text } from "@mantine/core";
import { useSearchParams, useLocation } from "react-router-dom";

import classes from "../styles/user.module.css";
import BookTypeTable from "@features/SysSettings/BookType/BookTypeTable";
import ArchiveBookType from "@features/SysSettings/BookType/ArchiveBookType";
const BookType = () => {
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
                Book Type View
              </Text>
            </Box>
            {pathname.toLowerCase().includes("book-type") && (
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
            <BookTypeTable />
          </Box>
        )}

        {searchParams.get("viewBy") === "All" && (
          <Box mt={"lg"}>
            <BookTypeTable />
          </Box>
        )}

        {searchParams.get("viewBy") === "Archive" && (
          <Box mt={"lg"}>
            <ArchiveBookType />
          </Box>
        )}
      </Box>
    </>
  );
};
export default BookType;
