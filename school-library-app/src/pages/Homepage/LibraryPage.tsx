import BookList from "@features/HomePage/Library/BookList";
import LibraryFilter from "@features/HomePage/Library/LibraryFilter";
import SearchBox from "@features/HomePage/Library/SearchBox";
import { Box, Grid, ScrollArea } from "@mantine/core";

const LibraryPage = () => {
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
        {/**
         ** Search bar
         */}

        <SearchBox />

        {/**
         ** end of Search bar
         */}

        {/**
         * Main content
         * {side filter, list of books}
         */}

        <Box p={"md"}>
          <Grid>
            <Grid.Col span={{ base: 12, md: 4, lg: 3 }}>
              <LibraryFilter />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 8, lg: 9 }}>
              <BookList />
            </Grid.Col>
          </Grid>
        </Box>
      </ScrollArea>
    </>
  );
};
export default LibraryPage;
