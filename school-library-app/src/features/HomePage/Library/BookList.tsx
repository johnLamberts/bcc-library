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
import { Link } from "react-router-dom";

const BookList = ({
  booksData,
  count,
}: {
  booksData?: IBooks[];
  count?: number;
}) => {
  // const { data: bookData = [], isLoading: isBookLoading } = useReadCatalogue();

  const { isLoading } = useBooks();

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
            >
              <IconList size={14} />
            </ActionIcon>
          </Tooltip>
        </Flex>
      </Group>

      <Divider my={"sm"} />
      <BookPagination count={count} isLoading={isLoading} />
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
                  <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                    <Link
                      to={`/library/${book.id}`}
                      style={{
                        textDecoration: "none",
                      }}
                    >
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
                            {/* <List>
                          <Flex px={"xs"} gap={"xs"}>
                            {book.genres?.[0] && (
                              <List.Item>{book.genres[0]}</List.Item>
                            )}

                            {book.genres?.[1] && (
                              <List.Item>{book.genres[1]}</List.Item>
                            )}
                          </Flex>
                        </List> */}
                            <Code px={"xs"}>
                              <Group>
                                Available Copies:
                                {book.bookStatus === "Out of Stock" ? (
                                  <Badge variant="light" color="red" size="xs">
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
