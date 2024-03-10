import useBookDetail from "@features/HomePage/hooks/useBookDetail";
import {
  Badge,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Grid,
  Image,
  List,
  Paper,
  ScrollArea,
  Tabs,
  Text,
  ThemeIcon,
  Title,
  rem,
} from "@mantine/core";
import {
  IconAlignCenter,
  IconCategory,
  IconClock,
  IconCopy,
  IconSection,
} from "@tabler/icons-react";
import classes from "./book-details.module.css";
const books = {
  title: "Test Book",
  authors: ["John", "Angelo", "Llance", "Neil"],
  dateCreated: Date.now(),
  bookType: "Dictionaries",
  isbn: "12938123-12391203",
  description: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis ratione aliquid, impedit saepe provident eos hic ad, iusto consectetur asperiores, laborum itaque ex eius exercitationem nostrum eaque a in alias.
  Accusamus esse nostrum id doloribus, eos beatae hic voluptates soluta architecto autem fugiat delectus officiis ab voluptas reiciendis deleniti ullam? Autem eos deleniti totam perspiciatis consequuntur dignissimos facere, pariatur fugit?
  Ab dignissimos sapiente molestias et, quisquam ipsum odit error est numquam consequuntur maxime. Accusamus minima deleniti quaerat asperiores velit maiores laboriosam. Ut consequatur ducimus labore dolores velit dolore quam in!
  Atque, asperiores provident sint officia debitis voluptatum omnis non laborum doloribus quam maxime dolorum minima nisi neque? Blanditiis, nulla quo. Magnam temporibus nulla sit saepe fugit, ipsa voluptates dolorum omnis.
  Tempore eligendi nisi veritatis debitis commodi deserunt itaque est doloremque suscipit aspernatur expedita repellendus earum, accusantium magnam maiores impedit, ad nobis. Ab, quas. Hic debitis totam placeat. Distinctio, praesentium odit.
  Hic molestias pariatur molestiae, impedit reprehenderit accusantium fuga asperiores. Inventore, reprehenderit similique aut excepturi animi vitae maiores ex rem labore nihil deserunt quisquam nam, expedita voluptatem minima, fuga sit asperiores!
  Exercitationem animi aliquam excepturi voluptatum mollitia porro! Labore error harum, vel excepturi numquam architecto ea, inventore praesentium ullam, ipsum quaerat optio quidem quas assumenda distinctio voluptas quia dignissimos! Autem, facilis.
  Minima, exercitationem! Soluta molestiae ullam alias doloribus, officia qui voluptate voluptatem et sit saepe libero ratione, dolorem eligendi amet. Accusantium ab provident distinctio iusto nam, ut iure possimus consectetur ipsa?
  Veritatis hic libero tempore modi velit illo ex sint nam neque culpa ipsam nobis, veniam cupiditate blanditiis natus exercitationem? Quas a placeat nulla laborum debitis ipsum molestias aperiam incidunt et.
  Temporibus cumque, illo hic voluptatibus debitis vitae molestias eius architecto, eos modi alias ex aspernatur, officiis dolorum sunt fuga deleniti delectus consequatur facilis libero nulla similique esse eligendi. Maxime, rerum.`,
  location: "BookShelf 21",
  publisher: "Test Product Compony",
  bookFile: "123123",
  edition: "123",
};
const BookDetail = () => {
  const { isLoading, book, error } = useBookDetail();

  console.log(book);
  return (
    <ScrollArea
      scrollbars="y"
      style={{
        paddingBottom: "var(--mantine-footer-height, 5rem)",
        height:
          "calc(100vh - var(--mantine-header-height, 0px) - var(--mantine-footer-height, 0px))", // viewport height - height of header - height of footer
      }}
    >
      <Paper withBorder p={"lg"}>
        <>
          {/* <Group justify="space-between">
            <Image
              // src={book?.bookImageCover}
              src={
                "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-10.png"
              }
              loading="lazy"
              style={{
                filter: "drop-shadow(0 0 0.75rem #ffa903)",
              }}
            />

            <Box>
              <Title c={"#5C0505"} fz={"5rem"}>
                {books?.title}
              </Title>
              <Text>
                {books?.authors.length === 1
                  ? books.authors[0]
                  : books.authors.map((author, index) =>
                      index === books.authors.length - 1
                        ? author
                        : `${author}, `
                    )}
              </Text>

              <Badge variant="dot">
                {new Date(books.dateCreated).toLocaleString()}
              </Badge>

              <Text>{books.bookType}</Text>

              <Text mt={"md"}>{books.isbn}</Text>
              <Divider my={"lg"} />
              <Button
                color="#ffa903"
                radius="md"
                size="md"
                rightSection={<IconBrowserCheck size={14} />}
              >
                Borrow Book
              </Button>
            </Box>
          </Group> */}
          <Grid>
            <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
              <Image
                radius="sm"
                h={"40rem"}
                fit="contain"
                src={book?.bookImageCover}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6, lg: 8 }}>
              <Container size={"md"} p={"xl"}>
                <Flex direction="column" justify={"space-around"} gap={"lg"}>
                  <Title order={2}>{book?.title}</Title>

                  <Divider my={"md"} />

                  <List mt={30} spacing="sm" size="sm">
                    <List.Item
                      icon={
                        <ThemeIcon size={20} radius="xl" color="yellow">
                          <IconAlignCenter
                            style={{ width: rem(12), height: rem(12) }}
                            stroke={1.5}
                          />
                        </ThemeIcon>
                      }
                    >
                      <b>Book Type</b> – {book?.bookType}
                    </List.Item>
                    <List.Item
                      icon={
                        <ThemeIcon size={20} radius="xl" color="yellow">
                          <IconCategory
                            style={{ width: rem(12), height: rem(12) }}
                            stroke={1.5}
                          />
                        </ThemeIcon>
                      }
                    >
                      <b>Genres</b> –{" "}
                      {book?.genres.map((genre) => (
                        <>{genre},</>
                      ))}
                    </List.Item>

                    <List.Item
                      icon={
                        <ThemeIcon size={20} radius="xl" color="yellow">
                          <IconSection
                            style={{ width: rem(12), height: rem(12) }}
                            stroke={1.5}
                          />
                        </ThemeIcon>
                      }
                    >
                      <b>Book Section</b> – {book?.bookSection}
                    </List.Item>

                    <List.Item
                      icon={
                        <ThemeIcon size={20} radius="xl" color="yellow">
                          <IconClock
                            style={{ width: rem(12), height: rem(12) }}
                            stroke={1.5}
                          />
                        </ThemeIcon>
                      }
                    >
                      <b>Availability</b> – {book?.timeSpecifier}{" "}
                      {book?.timeUnit}{" "}
                    </List.Item>

                    <List.Item
                      icon={
                        <ThemeIcon size={20} radius="xl" color="yellow">
                          <IconCopy
                            style={{ width: rem(12), height: rem(12) }}
                            stroke={1.5}
                          />
                        </ThemeIcon>
                      }
                    >
                      <b>
                        Number of{" "}
                        {book?.numberOfBooksAvailable_QUANTITY === 1
                          ? "Copy"
                          : "Copies"}
                      </b>{" "}
                      – {book?.numberOfBooksAvailable_QUANTITY}{" "}
                      {book?.bookStatus === "Out of Stock" && (
                        <Badge variant="light" size="xs">
                          {book.bookStatus}
                        </Badge>
                      )}
                    </List.Item>

                    <Box my={"sm"}>
                      <Paper shadow="xs" p="md" withBorder>
                        <b>Description</b>
                        <Text fw={500}>{book?.bookDescription}</Text>
                      </Paper>
                    </Box>
                  </List>

                  <Divider my={"sm"} />

                  {book?.bookStatus === "Out of Stock" ? (
                    <Button color="red" disabled className={classes.button}>
                      Borrow Book
                    </Button>
                  ) : (
                    <Button color="yellow">Borrow Book</Button>
                  )}
                </Flex>
              </Container>
            </Grid.Col>
          </Grid>
        </>
        <Tabs defaultValue="second" p={"xl"} mt={"md"}>
          <Tabs.List>
            <Tabs.Tab value="first">Description</Tabs.Tab>
            <Tabs.Tab value="second">Location and Details</Tabs.Tab>
          </Tabs.List>

          <Box pt={"md"}>
            <Tabs.Panel value="first">
              <Text ta={"justify"}>{books.description}</Text>
            </Tabs.Panel>
            <Tabs.Panel value="second">
              <Box>
                <Title order={3}>Location</Title>
                <Text>
                  {book?.bookSection} {book?.bookLocation} {book?.callNumber}
                </Text>
              </Box>

              <Box my={"xs"}>
                <Title order={3}>Publisher Details</Title>
                <Text>
                  {book?.publisher} {book?.publicationDetails}{" "}
                  {book?.publicationDate} {book?.edition}
                </Text>
              </Box>
              <Box my={"xs"}>
                <Title order={3}>Book Availability</Title>
                <Text>
                  {book?.timeSpecifier} {book?.timeUnit}{" "}
                </Text>

                <Text>
                  Copies: <b>{book?.numberOfBooksAvailable_QUANTITY}</b>
                </Text>
              </Box>
            </Tabs.Panel>
          </Box>
        </Tabs>
      </Paper>
    </ScrollArea>
  );
};
export default BookDetail;
