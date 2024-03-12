/* eslint-disable react-hooks/rules-of-hooks */
import {
  ActionIcon,
  Autocomplete,
  Box,
  Flex,
  Text,
  Title,
  rem,
} from "@mantine/core";
import { IconSearch, IconArrowRight, IconX } from "@tabler/icons-react";
import { Dispatch } from "react";
import { useSearchParams } from "react-router-dom";
import useBooks from "../hooks/useBooks";

interface SearchBoxProps {
  query: string;
  setQuery: Dispatch<React.SetStateAction<string>>;
  handleSearch: () => void;
  handleReset: () => void;
}

const SearchBox = ({
  query,
  setQuery,
  handleSearch,
  handleReset,
}: SearchBoxProps) => {
  // const renderAutocompleteOption: TaginputPr["renderOption"] = ({ option }) => {
  //   return (
  //     <Group gap="sm">
  //       <Avatar
  //         src={booksData?.[option.value].bookImageCover as string}
  //         size={36}
  //         radius="xl"
  //       />
  //       <div>
  //         <Text size="sm">{booksData?.[option.value].title}</Text>
  //         <Text size="xs" opacity={0.5}>
  //           {booksData?.[option.value].bookISBN}
  //         </Text>
  //       </div>
  //     </Group>
  //   );
  // };

  const [searchParams, setSearchParams] = useSearchParams();

  const { booksData, isLoading } = useBooks();

  const handleSearchParams = () => {
    if (searchParams.get("q") === null) {
      searchParams.delete("q");
    }

    searchParams.set("q", query);
    handleSearch();
    return setSearchParams(searchParams);
  };

  const uniqueTitlesAndISBNs = new Set();
  const uniqueBooksData = booksData?.filter((item) => {
    const titleOrISBN = item?.title || item?.bookISBN;
    if (!uniqueTitlesAndISBNs.has(titleOrISBN)) {
      uniqueTitlesAndISBNs.add(titleOrISBN);
      return true;
    }
    return false;
  });

  // Now map the unique books data to titles or bookISBNs
  const autocompleteData = uniqueBooksData?.map(
    (item) => item?.title || item?.bookISBN
  );
  return (
    <Box w={"100vw"} bg={"#ffa903"} h={"5rem"} mt={"5rem"}>
      <Flex
        gap={"1rem"}
        align={"center"}
        justify={"center"}
        m={"auto"}
        h={"inherit"}
        w={"70vw"}
      >
        <Box>
          <Title order={1} c={"#5C0505"} lts={""} ta={"center"}>
            OPAC
          </Title>

          <Text fz={"sm"} fs={"italic"} visibleFrom="md">
            OPEN PUBLIC ACCESS CATALOG
          </Text>
        </Box>

        {/* <TextInput
          radius="xl"
          size="md"
          w={"25rem"}
          placeholder="Search books"
          rightSectionWidth={42}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          leftSection={
            <IconSearch
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          }
          rightSection={
            <>
              {searchParams.get("q") === "" ||
              searchParams.get("q") === null ? (
                <ActionIcon
                  size={32}
                  radius="xl"
                  color="#5C0505"
                  onClick={handleSearchParams}
                  disabled={query.length === 0}
                >
                  <IconArrowRight
                    style={{ width: rem(18), height: rem(18) }}
                    stroke={1.5}
                  />
                </ActionIcon>
              ) : (
                <ActionIcon
                  size={32}
                  radius="xl"
                  color="#5C0505"
                  disabled={query.length === 0}
                  onClick={handleReset}
                >
                  <IconX
                    style={{ width: rem(18), height: rem(18) }}
                    stroke={1.5}
                  />
                </ActionIcon>
              )}
            </>
          }
        /> */}
        <Autocomplete
          data={autocompleteData}
          radius="xl"
          size="md"
          w={"30rem"}
          placeholder={`${
            isLoading
              ? "Loading books"
              : "Search for title, authors, section and ISBN"
          }`}
          rightSectionWidth={42}
          value={query}
          onChange={(e) => setQuery(e)}
          leftSection={
            <IconSearch
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          }
          rightSection={
            <>
              {searchParams.get("q") === "" ||
              searchParams.get("q") === null ? (
                <ActionIcon
                  size={32}
                  radius="xl"
                  color="#5C0505"
                  onClick={handleSearchParams}
                  disabled={query.length === 0}
                >
                  <IconArrowRight
                    style={{ width: rem(18), height: rem(18) }}
                    stroke={1.5}
                  />
                </ActionIcon>
              ) : (
                <Flex justify={"space-around"}>
                  <ActionIcon
                    size={32}
                    radius="xl"
                    color="#5C0505"
                    variant="light"
                    disabled={
                      searchParams.get("q") === "" ||
                      searchParams.get("q") === null
                    }
                    onClick={handleReset}
                  >
                    <IconX
                      style={{ width: rem(18), height: rem(18) }}
                      stroke={1.5}
                    />
                  </ActionIcon>
                  <ActionIcon
                    size={32}
                    radius="xl"
                    color="#5C0505"
                    onClick={handleSearchParams}
                    disabled={query.length === 0}
                  >
                    <IconArrowRight
                      style={{ width: rem(18), height: rem(18) }}
                      stroke={1.5}
                    />
                  </ActionIcon>
                </Flex>
              )}
            </>
          }
        />
      </Flex>
    </Box>
  );
};
export default SearchBox;
