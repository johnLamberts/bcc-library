import { Accordion, Paper, Title } from "@mantine/core";
import BookFilter from "./BookFilter";
import { useReadBookType } from "@features/SysSettings/BookType/hooks/useReadBookType";
import { useReadGenre } from "@features/SysSettings/BookGenre/hooks/useReadGenre";

const LibraryFilter = () => {
  const { data: bookTypes = [], isLoading: isBookTypeLoading } =
    useReadBookType();
  const { data: genresData = [], isLoading: isGenresLoading } = useReadGenre();

  if (isBookTypeLoading || isGenresLoading) return <>Loading...</>;
  return (
    <>
      <Paper shadow="xs" p={"xl"}>
        <Title order={4}>Filter</Title>

        <Accordion defaultValue={["Academic", "Genres"]} multiple>
          <Accordion.Item value="Academic">
            <Accordion.Control c={"#5C0505"}>Academic</Accordion.Control>
            <Accordion.Panel>
              {/* TODO: Checkbox -- Filter by Book Types */}

              <BookFilter
                options={bookTypes.map((book) => ({
                  label: book.bookType,
                  value: book.bookType,
                }))}
                paramsName="bookType"
              />
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="Genres">
            <Accordion.Control c={"#5C0505"}>Topics</Accordion.Control>
            <Accordion.Panel>
              <BookFilter
                options={genresData.map((book) => ({
                  label: book.genres,
                  value: book.genres,
                }))}
                paramsName="genre"
              />
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Paper>
    </>
  );
};
export default LibraryFilter;
