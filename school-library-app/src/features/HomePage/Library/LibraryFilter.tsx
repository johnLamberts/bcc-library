import {
  Accordion,
  Burger,
  Button,
  Drawer,
  Paper,
  Skeleton,
  Title,
} from "@mantine/core";
import BookFilter from "./BookFilter";
import { useReadBookType } from "@features/SysSettings/BookType/hooks/useReadBookType";
import { useReadGenre } from "@features/SysSettings/BookGenre/hooks/useReadGenre";
import { useDisclosure } from "@mantine/hooks";
import { useSearchParams } from "react-router-dom";

const LibraryFilter = () => {
  const { data: bookTypes = [], isLoading: isBookTypeLoading } =
    useReadBookType();
  const { data: genresData = [], isLoading: isGenresLoading } = useReadGenre();
  const [opened, { close, toggle }] = useDisclosure(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const handleResetFilterField = () => {
    if (searchParams.get("genre") !== "") searchParams.delete("genre");

    if (searchParams.get("bookType") !== "") searchParams.delete("bookType");

    return setSearchParams(searchParams);
  };
  return (
    <>
      <Paper shadow="xs" p={"xl"} visibleFrom="md">
        <Title order={4}>Filter</Title>

        {isBookTypeLoading || isGenresLoading ? (
          <Accordion defaultValue={["Academic", "Genres"]} multiple>
            <Accordion.Item value="Academic">
              <Accordion.Control c={"#5C0505"}>Academic</Accordion.Control>
              <Accordion.Panel>
                {/* TODO: Checkbox -- Filter by Book Types */}

                <Skeleton height={8} w={300} radius="xl" mt={"sm"} />
                <Skeleton height={8} w={300} radius="xl" mt={"sm"} />
                <Skeleton height={8} w={300} radius="xl" mt={"sm"} />
                <Skeleton height={8} w={300} radius="xl" mt={"sm"} />
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="Genres">
              <Accordion.Control c={"#5C0505"}>Topics</Accordion.Control>
              <Accordion.Panel>
                <Skeleton height={8} w={300} radius="xl" mt={"sm"} />
                <Skeleton height={8} w={300} radius="xl" mt={"sm"} />
                <Skeleton height={8} w={300} radius="xl" mt={"sm"} />
                <Skeleton height={8} w={300} radius="xl" mt={"sm"} />
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        ) : (
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
        )}
      </Paper>

      <Burger
        opened={opened}
        onClick={toggle}
        size="md"
        hiddenFrom="md"
        color="#5c0505"
      />

      {searchParams.get("genre") !== "" ||
      searchParams.get("bookType") !== "" ? (
        <Button
          variant="outline"
          onClick={handleResetFilterField}
          size="xs"
          hiddenFrom="md"
          color="#5c0505"
        >
          Clear filter
        </Button>
      ) : null}

      <Drawer opened={opened} onClose={close} position="left" size={"xs"}>
        <Paper shadow="xs" p={"xl"} hiddenFrom="md">
          <Title order={4}>Filter</Title>

          {isBookTypeLoading || isGenresLoading ? (
            <Accordion defaultValue={["Academic", "Genres"]} multiple>
              <Accordion.Item value="Academic">
                <Accordion.Control c={"#5C0505"}>Academic</Accordion.Control>
                <Accordion.Panel>
                  {/* TODO: Checkbox -- Filter by Book Types */}

                  <Skeleton height={8} radius="xl" />
                  <Skeleton height={8} radius="xl" />
                  <Skeleton height={8} radius="xl" />
                  <Skeleton height={8} radius="xl" />
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item value="Genres">
                <Accordion.Control c={"#5C0505"}>Topics</Accordion.Control>
                <Accordion.Panel>
                  <Skeleton height={8} radius="xl" />
                  <Skeleton height={8} radius="xl" />
                  <Skeleton height={8} radius="xl" />
                  <Skeleton height={8} radius="xl" />
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          ) : (
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
          )}
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
      </Drawer>
    </>
  );
};
export default LibraryFilter;
