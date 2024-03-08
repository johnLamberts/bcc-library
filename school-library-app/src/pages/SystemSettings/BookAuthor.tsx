import { Group, Box, Text, Flex, Select } from "@mantine/core";

import classes from "../styles/user.module.css";
import BookAuthorTable from "@features/SysSettings/BookAuthor/BookAuthorTable";
import { useLocation, useSearchParams } from "react-router-dom";
import ArchiveAuthor from "@features/SysSettings/BookAuthor/ArchiveAuthor";

const BookAuthor = () => {
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
                Book Author View
              </Text>
            </Box>
            {pathname.toLowerCase().includes("author") && (
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
            <BookAuthorTable />
          </Box>
        )}

        {searchParams.get("viewBy") === "All" && (
          <Box mt={"lg"}>
            <BookAuthorTable />
          </Box>
        )}

        {searchParams.get("viewBy") === "Archive" && (
          <Box mt={"lg"}>
            <ArchiveAuthor />
          </Box>
        )}
      </Box>
    </>
  );
};
export default BookAuthor;
