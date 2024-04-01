import {
  ActionIcon,
  Group,
  Paper,
  Tooltip,
  Text,
  Flex,
  Divider,
  Grid,
  Badge,
  Card,
  Image,
  rem,
  Spoiler,
  Code,
  Loader,
} from "@mantine/core";
import {
  IconBookmark,
  IconLayoutDashboard,
  IconList,
} from "@tabler/icons-react";
import classes from "./book-list.module.css";
import useBooks from "../hooks/useBooks";
import BookPagination from "./BookPagination";
import { IBooks } from "@features/Catalogue/models/books.interface";
import { Link, useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "src/shared/constant";

const BookList = ({
  booksData,
  count,
}: {
  booksData?: IBooks[];
  count?: number;
}) => {
  // const { data: bookData = [], isLoading: isBookLoading } = useReadCatalogue();

  const { isLoading } = useBooks();

  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (params: string | null) => {
    searchParams.set("viewBy", params as string);

    return setSearchParams(searchParams);
  };

  return (
    <Paper p={"xs"}>
      <Group justify="space-between">
        <Flex gap={"0.3rem"}>
          <Tooltip label={"Card"}>
            <ActionIcon
              variant="transparent"
              size="xs"
              aria-label="Gradient action icon"
              color="#5C0505"
              onClick={() => handleChange("by-cards")}
            >
              <IconLayoutDashboard size={14} />
            </ActionIcon>
          </Tooltip>

          <Tooltip label={"List"}>
            <ActionIcon
              variant="transparent"
              size="xs"
              aria-label="Gradient action icon"
              color="#5C0505"
              onClick={() => handleChange("by-list")}
            >
              <IconList size={14} />
            </ActionIcon>
          </Tooltip>
        </Flex>
      </Group>

      <Divider my={"sm"} />
      <BookPagination
        count={count}
        isLoading={isLoading}
        PAGE_SIZE={PAGE_SIZE}
      />
      {isLoading ? (
        <>
          <Flex justify={"center"} align={"center"} h="100%" pos="relative">
            <Loader color="red.5" />
          </Flex>
        </>
      ) : (
        <>
          {count === 0 ? (
            <>No available books here</>
          ) : (
            <>
              <Grid>
                {booksData?.map((book) => (
                  <Grid.Col
                    span={{
                      base: 12,
                      md: 6,
                      lg:
                        searchParams.get("viewBy") === "by-cards" ||
                        searchParams.get("viewBy") === null
                          ? 4
                          : 12,
                    }}
                  >
                    <Link
                      to={`/library/${book.id}`}
                      style={{
                        textDecoration: "none",
                      }}
                    >
                      {searchParams.get("viewBy") === "by-cards" && (
                        <Card
                          withBorder
                          padding="lg"
                          radius="md"
                          className={classes.card}
                          mt={"xs"}
                          mah={"25rem"}
                        >
                          <Card.Section mb="sm">
                            <Image
                              src={book.bookImageCover}
                              alt="Top 50 underrated plants for house decoration"
                              height={180}
                            />
                          </Card.Section>

                          <Badge w="fit-content" variant="light">
                            {book.bookType}
                          </Badge>

                          <Spoiler
                            maxHeight={50}
                            showLabel="Show more"
                            hideLabel="Hide"
                          >
                            <Text fw={700} className={classes.title} mt="xs">
                              {book.title}
                            </Text>
                          </Spoiler>

                          <Card.Section className={classes.footer}>
                            <Group justify="space-between">
                              <Code px={"xs"}>
                                <Group>
                                  Available Copies:
                                  {book.bookStatus === "Out of Stock" ? (
                                    <Badge
                                      variant="light"
                                      color="red"
                                      size="xs"
                                    >
                                      {book.bookStatus}
                                    </Badge>
                                  ) : (
                                    <Badge variant="light" color="yellow">
                                      {book.numberOfBooksAvailable_QUANTITY}
                                    </Badge>
                                  )}
                                </Group>
                              </Code>
                              <Group gap={0}>
                                <ActionIcon variant="subtle" color="gray">
                                  <IconBookmark
                                    style={{ width: rem(20), height: rem(20) }}
                                    stroke={1.5}
                                  />
                                </ActionIcon>
                              </Group>
                            </Group>
                          </Card.Section>
                        </Card>
                      )}

                      {searchParams.get("viewBy") === null && (
                        <Card
                          withBorder
                          padding="lg"
                          radius="md"
                          className={classes.card}
                          mt={"xs"}
                          mah={"25rem"}
                        >
                          <Card.Section mb="sm">
                            <Image
                              src={book.bookImageCover}
                              alt="Top 50 underrated plants for house decoration"
                              height={180}
                            />
                          </Card.Section>

                          <Badge w="fit-content" variant="light">
                            {book.bookType}
                          </Badge>

                          <Spoiler
                            maxHeight={50}
                            showLabel="Show more"
                            hideLabel="Hide"
                          >
                            <Text fw={700} className={classes.title} mt="xs">
                              {book.title}
                            </Text>
                          </Spoiler>

                          <Card.Section className={classes.footer}>
                            <Group justify="space-between">
                              <Code px={"xs"}>
                                <Group>
                                  Available Copies:
                                  {book.bookStatus === "Out of Stock" ? (
                                    <Badge
                                      variant="light"
                                      color="red"
                                      size="xs"
                                    >
                                      {book.bookStatus}
                                    </Badge>
                                  ) : (
                                    <Badge variant="light" color="yellow">
                                      {book.numberOfBooksAvailable_QUANTITY}
                                    </Badge>
                                  )}
                                </Group>
                              </Code>
                              <Group gap={0}>
                                <ActionIcon variant="subtle" color="gray">
                                  <IconBookmark
                                    style={{ width: rem(20), height: rem(20) }}
                                    stroke={1.5}
                                  />
                                </ActionIcon>
                              </Group>
                            </Group>
                          </Card.Section>
                        </Card>
                      )}

                      {searchParams.get("viewBy") === "by-list" && (
                        <Card
                          withBorder
                          padding="lg"
                          radius="md"
                          className={classes.card}
                          mt={"xs"}
                          mah={"25rem"}
                        >
                          <Grid gutter={"xs"}>
                            <Grid.Col
                              span={{
                                base: 12,
                                md: 6,
                                lg: 6,
                              }}
                            >
                              {/* <Card.Section mb="sm"> */}
                              <Image
                                src={book.bookImageCover}
                                alt="Top 50 underrated plants for house decoration"
                                height={180}
                              />
                              {/* </Card.Section> */}
                            </Grid.Col>

                            <Grid.Col
                              span={{
                                base: 12,
                                md: 6,
                                lg: 6,
                              }}
                            >
                              <Badge w="fit-content" variant="light">
                                {book.bookType}
                              </Badge>

                              {(book.title.length as number) > 15 ? (
                                <Spoiler
                                  maxHeight={50}
                                  showLabel="Show more"
                                  hideLabel="Hide"
                                >
                                  <Text
                                    fw={700}
                                    className={classes.title}
                                    mt="xs"
                                  >
                                    {book.title}
                                  </Text>
                                </Spoiler>
                              ) : (
                                <Text fw={700} mt="xs">
                                  {book.title}
                                </Text>
                              )}

                              <Card.Section>
                                <Group justify="space-between">
                                  <Code px={"xs"}>
                                    <Group>
                                      Available Copies:
                                      {book.bookStatus === "Out of Stock" ? (
                                        <Badge
                                          variant="light"
                                          color="red"
                                          size="xs"
                                        >
                                          {book.bookStatus}
                                        </Badge>
                                      ) : (
                                        <Badge variant="light" color="yellow">
                                          {book.numberOfBooksAvailable_QUANTITY}
                                        </Badge>
                                      )}
                                    </Group>
                                  </Code>
                                  <Group gap={0}>
                                    <ActionIcon variant="subtle" color="gray">
                                      <IconBookmark
                                        style={{
                                          width: rem(20),
                                          height: rem(20),
                                        }}
                                        stroke={1.5}
                                      />
                                    </ActionIcon>
                                  </Group>
                                </Group>
                              </Card.Section>
                            </Grid.Col>
                          </Grid>
                        </Card>
                      )}
                    </Link>
                  </Grid.Col>
                ))}
              </Grid>
            </>
          )}
        </>
      )}
    </Paper>
  );
};
export default BookList;
