import BookList from "@features/HomePage/Library/BookList";
import LibraryFilter from "@features/HomePage/Library/LibraryFilter";
import SearchBox from "@features/HomePage/Library/SearchBox";
import useBooks from "@features/HomePage/hooks/useBooks";
import { Box, Grid, ScrollArea } from "@mantine/core";
import { useState } from "react";
import { toast } from "sonner";
import { index } from "src/shared/algolia/algolia";

const LibraryPage = () => {
  const { booksData, count } = useBooks();

  const [query, setQuery] = useState<string>("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [results, setResults] = useState<any[] | undefined>([]);

  const handleSearch = async () => {
    if (query.trim() === "") {
      setResults(booksData);
    }

    setResults(booksData);

    try {
      const searchResults = await index.search(query);
      setResults(searchResults.hits);
    } catch (error) {
      if (error) toast.error("Error searching with Algolia: ", error);
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
              <BookList
                booksData={!results?.length ? booksData : results}
                count={!results?.length ? count : results?.length}
              />
            </Grid.Col>
          </Grid>
        </Box>
      </ScrollArea>
    </>
  );
};
export default LibraryPage;
