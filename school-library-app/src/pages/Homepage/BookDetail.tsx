import useBookDetail from "@features/HomePage/hooks/useBookDetail";
import {
  Accordion,
  Badge,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Grid,
  Image,
  List,
  Loader,
  Modal,
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
  IconBooks,
  IconCategory,
  IconClock,
  IconCopy,
  IconSection,
} from "@tabler/icons-react";
import classes from "./book-details.module.css";
import { IconAddressBook } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

const BookDetail = () => {
  const { isLoading, book } = useBookDetail();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      {isLoading && (
        <>
          <Flex
            justify={"center"}
            align={"center"}
            mih={"100vh"}
            pos="relative"
          >
            <Loader color="red.5" />
          </Flex>
        </>
      )}

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
                            <IconAddressBook
                              style={{ width: rem(12), height: rem(12) }}
                              stroke={1.5}
                            />
                          </ThemeIcon>
                        }
                      >
                        <b>ISBN-10, ISBN-13</b> – {book?.bookISBN}
                      </List.Item>
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
                            <IconBooks
                              style={{ width: rem(12), height: rem(12) }}
                              stroke={1.5}
                            />
                          </ThemeIcon>
                        }
                      >
                        <b>Call Number</b> – {book?.callNumber}
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
                          <b
                            style={{
                              marginTop: "1rem",
                              marginBottom: "1rem",
                            }}
                          >
                            Description
                          </b>
                          <Text mt={"sm"} fw={500} ta={"justify"}>
                            {book?.bookDescription}
                          </Text>
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
              <Tabs.Tab value="first">PDF File</Tabs.Tab>
              <Tabs.Tab value="second">Location and Details</Tabs.Tab>
            </Tabs.List>

            <Box pt={"md"}>
              <Tabs.Panel value="first">
                {book?.bookFile ? (
                  <Button onClick={open}>View PDF</Button>
                ) : (
                  <>
                    <Text>No available PDF</Text>
                  </>
                )}
              </Tabs.Panel>
              <Tabs.Panel value="second">
                <Accordion variant="separated">
                  <Accordion.Item
                    className={classes.item}
                    value="reset-password"
                  >
                    <Accordion.Control>Publication Date</Accordion.Control>
                    <Accordion.Panel>{book?.publicationDate}</Accordion.Panel>
                  </Accordion.Item>

                  <Accordion.Item
                    className={classes.item}
                    value="another-account"
                  >
                    <Accordion.Control>Publication Details</Accordion.Control>
                    <Accordion.Panel>
                      {book?.publicationDetails}
                    </Accordion.Panel>
                  </Accordion.Item>

                  <Accordion.Item className={classes.item} value="newsletter">
                    <Accordion.Control>Publisher</Accordion.Control>
                    <Accordion.Panel>{book?.publisher}</Accordion.Panel>
                  </Accordion.Item>
                </Accordion>
              </Tabs.Panel>
            </Box>
          </Tabs>
        </Paper>
      </ScrollArea>

      <Modal opened={opened} onClose={close} title="Authentication" centered>
        {/* Modal content */}
        view pdf here
      </Modal>
    </>
  );
};
export default BookDetail;
