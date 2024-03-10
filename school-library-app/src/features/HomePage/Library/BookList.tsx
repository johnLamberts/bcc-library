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
} from "@mantine/core";
import {
  IconBookmark,
  IconHeart,
  IconLayoutDashboard,
  IconList,
  IconShare,
} from "@tabler/icons-react";
import classes from "./book-list.module.css";
import useBooks from "../hooks/useBooks";
import BookPagination from "./BookPagination";
import { IBooks } from "@features/Catalogue/models/books.interface";

const BookList = ({
  booksData,
  count,
}: {
  booksData?: IBooks[];
  count?: number;
}) => {
  // const { data: bookData = [], isLoading: isBookLoading } = useReadCatalogue();

  const { isLoading } = useBooks();

  console.log(booksData);
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
      <BookPagination count={count} />
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <Grid>
            {booksData?.map((book) => (
              <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
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
                      <Group gap={0}>
                        <ActionIcon variant="subtle" color="gray">
                          <IconHeart
                            style={{ width: rem(20), height: rem(20) }}
                          />
                        </ActionIcon>
                        <ActionIcon variant="subtle" color="gray">
                          <IconBookmark
                            style={{ width: rem(20), height: rem(20) }}
                            stroke={1.5}
                          />
                        </ActionIcon>
                        <ActionIcon variant="subtle" color="gray">
                          <IconShare
                            style={{ width: rem(20), height: rem(20) }}
                            stroke={1.5}
                          />
                        </ActionIcon>
                      </Group>
                    </Group>
                  </Card.Section>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </>
      )}
    </Paper>
  );
};
export default BookList;
