import BookList from "@features/HomePage/Library/BookList";
import LibraryFilter from "@features/HomePage/Library/LibraryFilter";
import SearchBox from "@features/HomePage/Library/SearchBox";
import useBooks from "@features/HomePage/hooks/useBooks";
import { Box, Grid, ScrollArea } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { index } from "src/shared/algolia/algolia";

const LibraryPage = () => {
  const { booksData, count } = useBooks();

  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState<string>(searchParams.get("q") || "");

  const [debounced] = useDebouncedValue(query, 1000);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [results, setResults] = useState<any[] | undefined>([]);

  const handleSearch = async () => {
    try {
      setIsSearching(true);
      const searchResults = await index.search(debounced);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const newMap = searchResults.hits.map((item: any) => ({
        ...item,
        id: item.path.split("/").pop(),
      }));

      setResults(newMap);
    } catch (error) {
      if (error) toast.error("Error searching with Algolia: ", error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <>
      <ScrollArea
        scrollbars="y"
        style={{
          paddingBottom: "var(--mantine-footer-height, 5rem)",
          height:
            "calc(100vh - var(--mantine-header-height, 0px) - var(--mantine-footer-height, 0px))", // viewport height - height of header - height of footer
        }}
      >
        <SearchBox
          query={query}
          setQuery={setQuery}
          handleSearch={handleSearch}
        />
        <Box p={"md"}>
          <Grid>
            <Grid.Col span={{ base: 12, md: 4, lg: 3 }}>
              <LibraryFilter />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 8, lg: 9 }}>
              {isSearching && <>Searching for results</>}

              {results?.length === 0 && <>No found results</>}

              {!isSearching && (
                <BookList
                  booksData={
                    !results?.length || searchParams.get("q") === ""
                      ? booksData
                      : results
                  }
                  count={!results?.length ? count : results?.length}
                />
              )}
            </Grid.Col>
          </Grid>
        </Box>
      </ScrollArea>
    </>
  );
};
export default LibraryPage;
