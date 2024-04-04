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
  Modal,
  Paper,
  ScrollArea,
  Skeleton,
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
  IconStar,
  IconStarOff,
  IconUserShare,
} from "@tabler/icons-react";
import classes from "./book-details.module.css";
import { IconAddressBook } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import BookPdfFileViewer from "@features/HomePage/Library/BookFileViewer";
import { useSearchParams } from "react-router-dom";
import BorrowBookDetails from "./BorrowBookDetails";
import { useRequestBorrowBook } from "@features/HomePage/hooks/useRequestBorrowBook";
import useCheckBorrowBooks from "@features/HomePage/hooks/useCheckBorrowBooks";
import { useCallback, useEffect, useState } from "react";
import { useFavorites } from "@features/HomePage/hooks/useFavorites";
import useCurrentUser from "@pages/Authentication/hooks/useCurrentUser";
import { modals } from "@mantine/modals";
import {
  useCheckBookFavorite,
  useRemoveBookFavorite,
} from "@features/UserProfile/hooks/useCheckBookFavorite";
import { useQueryClient } from "@tanstack/react-query";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";

const BookDetail = () => {
  const { isLoading, book } = useBookDetail();
  const [opened, { open, close }] = useDisclosure(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const { favs, isLoading: isCheckingFavorite } = useCheckBookFavorite();

  const { isRequestingBook, createRequestTransaction } = useRequestBorrowBook();

  const { book: transactions } = useCheckBorrowBooks();
  const [disable, setDisable] = useState<boolean>(false);

  const { isFavoriteBook, createFavorites } = useFavorites();

  const isNotYetReturned = transactions?.filter(
    (ref) => ref.status !== "Returned"
  )?.length as number;

  const { user } = useCurrentUser();

  const queryClient = useQueryClient();

  const { onRemoveFavorite, isPending: isRemovingFavorite } =
    useRemoveBookFavorite();

  const handleFavorites = useCallback(() => {
    if (user === undefined)
      return modals.openConfirmModal({
        title: "Can't add to your favorite",
        centered: true,
        children:
          "You must logged in in order to add this book to your favorite",
        labels: {
          confirm: `Confirm`,
          cancel: "Cancel",
        },
      });

    const val = {
      ...book,
      bookId: book?.id,
      ...user,
      userId: user?.userUID,
    };
    createFavorites(val);

    searchParams.set("is_favorite", "true");

    return setSearchParams(searchParams);
  }, [book, createFavorites, searchParams, setSearchParams, user]);

  const handleRemoveFavorites = useCallback(() => {
    const val = {
      ...book,
      bookId: book?.id,
      ...user,
      userId: user?.userUID,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onRemoveFavorite(val as any);

    queryClient.invalidateQueries({
      queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.ADD_TO_FAVORITES],
    });

    searchParams.delete("is_favorite");
    return setSearchParams(searchParams);
  }, [
    book,
    onRemoveFavorite,
    queryClient,
    searchParams,
    setSearchParams,
    user,
  ]);

  const handleChange = (params: string | null) => {
    searchParams.set("ctx", params as string);

    return setSearchParams(searchParams);
  };

  const removeQueryParams = () => {
    const param = searchParams.get("ctx");

    if (param) {
      // 👇️ delete each query param
      searchParams.delete("ctx");

      // 👇️ update state after
      setSearchParams(searchParams);
    }
  };

  const handleCloseModal = () => {
    close();
    removeQueryParams();
  };

  useEffect(() => {
    if ((favs?.length as number) > 0) {
      searchParams.set("is_favorite", "true");
    } else {
      searchParams.delete("is_favorite");
    }

    return setSearchParams(searchParams);
  }, [favs?.length, searchParams, setSearchParams]);

  return (
    <>
      {isLoading ? (
        <>
          <Paper withBorder p={"lg"} mt={"5rem"}>
            <>
              <Grid>
                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                  <Skeleton height={"40rem"} mb="xl" />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 8 }}>
                  <Container size={"md"} p={"xl"}>
                    <Flex
                      direction="column"
                      justify={"space-around"}
                      gap={"xs"}
                    >
                      <Skeleton height={8} radius="xl" />
                      <Divider my={"md"} />
                      <List spacing="sm" size="sm">
                        <Skeleton height={8} radius="xl" mt={"xs"} />

                        <Skeleton height={8} radius="xl" mt={"xs"} />

                        <Skeleton height={8} radius="xl" mt={"xs"} />

                        <Skeleton height={8} radius="xl" mt={"xs"} />

                        <Skeleton height={8} radius="xl" mt={"xs"} />

                        <Skeleton height={8} radius="xl" mt={"xs"} />

                        <Skeleton height={8} radius="xl" mt={"xs"} />

                        <Skeleton height={8} radius="xl" mt={"xs"} />

                        <Box my={"sm"}>
                          <Paper shadow="xs" p="md" withBorder>
                            <Skeleton height={8} radius="xl" mt={"xs"} />
                            <Skeleton height={8} radius="xl" mt={"xs"} />
                            <Skeleton height={8} radius="xl" mt={"xs"} />
                            <Skeleton height={8} radius="xl" mt={"xs"} />
                          </Paper>
                        </Box>

                        <Skeleton height={8} radius="xl" mt={"xs"} />

                        <Skeleton height={8} radius="xl" mt={"xs"} />

                        <Skeleton height={8} radius="xl" mt={"xs"} />

                        <Skeleton height={8} radius="xl" mt={"xs"} />
                      </List>
                    </Flex>
                  </Container>
                </Grid.Col>
              </Grid>
            </>
            <Skeleton height={8} radius="xl" mt={"xs"} />
            <Skeleton height={8} radius="xl" mt={"xs"} />
            <Skeleton height={8} radius="xl" mt={"xs"} />
            <Skeleton height={8} radius="xl" mt={"xs"} />
          </Paper>
        </>
      ) : (
        <ScrollArea
          scrollbars="y"
          style={{
            height:
              "calc(100vh - var(--mantine-header-height, 0px) - var(--mantine-footer-height, 0px))", // viewport height - height of header - height of footer
          }}
        >
          <Paper withBorder p={"lg"} mt={"5rem"}>
            <>
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
                    <Flex
                      direction="column"
                      justify={"space-around"}
                      gap={"xs"}
                    >
                      <Title ff={"Montserrat"} order={2}>
                        {book?.title}
                      </Title>
                      <Divider my={"md"} />
                      <List spacing="sm" size="sm">
                        <List.Item
                          ff={"Montserrat"}
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
                          ff={"Montserrat"}
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

                        {(book?.genres.length as number) > 0 ? (
                          <List.Item
                            ff={"Montserrat"}
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
                        ) : null}

                        <List.Item
                          ff={"Montserrat"}
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
                          ff={"Montserrat"}
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
                          ff={"Montserrat"}
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
                          ff={"Montserrat"}
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

                        <List.Item
                          ff={"Montserrat"}
                          icon={
                            <ThemeIcon size={20} radius="xl" color="yellow">
                              <IconUserShare
                                style={{ width: rem(12), height: rem(12) }}
                                stroke={1.5}
                              />
                            </ThemeIcon>
                          }
                        >
                          <b>Authors</b> –{" "}
                          {book?.authors.map((author) => (
                            <>{author},</>
                          ))}
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
                            <Text
                              ff={"Montserrat"}
                              mt={"sm"}
                              fw={500}
                              ta={"justify"}
                            >
                              {book?.bookDescription}
                            </Text>
                          </Paper>
                        </Box>
                      </List>
                      <Divider my={"sm"} />
                      {book?.bookStatus === "Out of Stock" ? (
                        <Button color="red" disabled className={classes.button}>
                          Out of Stock
                        </Button>
                      ) : (
                        <>
                          {isNotYetReturned > 0 || disable === true ? (
                            <Button color="yellow" disabled>
                              {isNotYetReturned > 0
                                ? "Pending transaction await"
                                : "Pending transaction await disable"}
                            </Button>
                          ) : (
                            <Button
                              color="yellow"
                              onClick={() => {
                                open();
                                handleChange("borrow_book");
                              }}
                              disabled={isRequestingBook}
                            >
                              Borrow Book
                            </Button>
                          )}
                        </>
                      )}

                      {(favs?.length as number) > 0 ? (
                        <Button
                          color="yellow.9"
                          // onClick={() => {
                          //   open();
                          //   handleChange("borrow_book");
                          // }}
                          // disabled={isRequestingBook}
                          leftSection={<IconStarOff />}
                          disabled={isRemovingFavorite || isCheckingFavorite}
                          onClick={handleRemoveFavorites}
                        >
                          Remove to favorite
                        </Button>
                      ) : (
                        <Button
                          color="yellow.9"
                          leftSection={<IconStar />}
                          disabled={isFavoriteBook || isCheckingFavorite}
                          onClick={handleFavorites}
                        >
                          Add to favorite
                        </Button>
                      )}
                    </Flex>
                  </Container>
                </Grid.Col>
              </Grid>
            </>
            <Tabs defaultValue="second" p={"xl"} mt={"md"}>
              <Tabs.List>
                <Tabs.Tab value="first" ff={"Montserrat"}>
                  PDF File
                </Tabs.Tab>
                <Tabs.Tab value="second" ff={"Montserrat"}>
                  Location and Details
                </Tabs.Tab>
              </Tabs.List>

              <Box pt={"md"}>
                <Tabs.Panel value="first">
                  {book?.bookFile ? (
                    <Button
                      onClick={() => {
                        open();
                        handleChange("view_pdf");
                      }}
                    >
                      View PDF
                    </Button>
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
                      <Accordion.Control ff={"Montserrat"}>
                        Publication Date
                      </Accordion.Control>
                      <Accordion.Panel ff={"Montserrat"}>
                        {book?.publicationDate}
                      </Accordion.Panel>
                    </Accordion.Item>

                    <Accordion.Item
                      className={classes.item}
                      value="another-account"
                    >
                      <Accordion.Control ff={"Montserrat"}>
                        Publication Details
                      </Accordion.Control>
                      <Accordion.Panel ff={"Montserrat"}>
                        {book?.publicationDetails}
                      </Accordion.Panel>
                    </Accordion.Item>

                    <Accordion.Item className={classes.item} value="newsletter">
                      <Accordion.Control ff={"Montserrat"}>
                        Publisher
                      </Accordion.Control>
                      <Accordion.Panel ff={"Montserrat"}>
                        {book?.publisher}
                      </Accordion.Panel>
                    </Accordion.Item>
                  </Accordion>
                </Tabs.Panel>
              </Box>
            </Tabs>
          </Paper>
        </ScrollArea>
      )}

      <Modal
        opened={opened}
        onClose={() => {
          close();
          removeQueryParams();
        }}
        title={`${
          searchParams.get("ctx") === "view_pdf"
            ? book?.title
            : "Borrow Book Details"
        }`}
        centered
        size={"xl"}
      >
        {searchParams.get("ctx") === "view_pdf" && (
          <BookPdfFileViewer pdfViewer={book?.bookFile as string} />
        )}
        {searchParams.get("ctx") === "borrow_book" && (
          <BorrowBookDetails
            close={handleCloseModal}
            book={book}
            createRequestTransaction={createRequestTransaction}
            isRequestingBook={isRequestingBook}
            setDisable={setDisable}
          />
        )}
      </Modal>
    </>
  );
};
export default BookDetail;
