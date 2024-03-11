import { IBooks } from "@features/Catalogue/models/books.interface";
import { ICirculation } from "@features/Transaction/models/circulation.interface";
import {
  Paper,
  Group,
  Button,
  List,
  ThemeIcon,
  rem,
  LoadingOverlay,
  Input,
  Flex,
} from "@mantine/core";
import useCurrentUser from "@pages/Authentication/hooks/useCurrentUser";
import {
  IconAddressBook,
  IconAlignCenter,
  IconCategory,
  IconSection,
  IconBooks,
  IconClock,
  IconCopy,
  IconHeading,
} from "@tabler/icons-react";
import { UseMutateAsyncFunction } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useForm } from "react-hook-form";

interface BorrowBookDetailsProps {
  close?: () => void;
  book: IBooks | undefined;
  createRequestTransaction: UseMutateAsyncFunction<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    AxiosResponse<any, any>,
    Error,
    Partial<ICirculation>,
    unknown
  >;
  isRequestingBook: boolean;
  setDisable: React.Dispatch<React.SetStateAction<boolean>>;
}

const BorrowBookDetails = ({
  close,
  book,
  createRequestTransaction,
  isRequestingBook,
  setDisable,
}: BorrowBookDetailsProps) => {
  const { user } = useCurrentUser();

  const form = useForm();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: Record<string, any>) => {
    await createRequestTransaction({
      ...e,
      borrowers: user?.userRole,
      firstName: user?.firstName,
      lastName: user?.lastName,
      middleName: user?.middleName,
      borrowersId: user?.userUID,
      borrowersEmail: user?.email,
    });

    close?.();

    setDisable(true);
  };
  return (
    <>
      {user === undefined ? (
        <>You need to login first</>
      ) : (
        <>
          <LoadingOverlay
            visible={isRequestingBook}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
          />
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <Paper withBorder p="lg" radius="md" shadow="md">
              <List spacing="sm" size="sm">
                <List.Item
                  hidden
                  icon={
                    <ThemeIcon size={20} radius="xl" color="yellow">
                      <IconHeading
                        style={{ width: rem(12), height: rem(12) }}
                        stroke={1.5}
                      />
                    </ThemeIcon>
                  }
                >
                  <Flex align={"center"} justify={"center"} gap={"xs"}>
                    <b>Book IDENTIFICATION</b> –{" "}
                    <Input
                      {...form.register("booksId")}
                      value={book?.id}
                      readOnly
                    />
                  </Flex>
                </List.Item>{" "}
                <List.Item
                  icon={
                    <ThemeIcon size={20} radius="xl" color="yellow">
                      <IconHeading
                        style={{ width: rem(12), height: rem(12) }}
                        stroke={1.5}
                      />
                    </ThemeIcon>
                  }
                >
                  <Flex align={"center"} justify={"center"} gap={"xs"}>
                    <b>Title</b> –{" "}
                    <Input
                      {...form.register("bookTitle")}
                      value={book?.title}
                      readOnly
                    />
                  </Flex>
                </List.Item>
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
                  <Flex align={"center"} justify={"center"} gap={"xs"}>
                    <b>ISBN-10, ISBN-13</b> –
                    <Input
                      {...form.register("bookISBN")}
                      value={book?.bookISBN}
                      readOnly
                    />
                  </Flex>
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
                  <Flex align={"center"} justify={"center"} gap={"xs"}>
                    <b>Book Type</b> –
                    <Input
                      {...form.register("bookType")}
                      value={book?.bookType}
                      readOnly
                    />
                  </Flex>
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
                  <Flex align={"center"} justify={"center"} gap={"xs"}>
                    <b>Book Price</b> –
                    <Input
                      {...form.register("bookPrice", {
                        valueAsNumber: true,
                      })}
                      type="number"
                      value={book?.bookPrice}
                      readOnly
                    />
                  </Flex>
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
                  <Flex align={"center"} justify={"center"} gap={"xs"}>
                    <b>Book Section</b> –
                    <Input
                      {...form.register("bookSection")}
                      value={book?.bookSection}
                      readOnly
                    />
                  </Flex>
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
                  <Flex align={"center"} justify={"center"} gap={"xs"}>
                    <b>Call Number</b> –
                    <Input
                      {...form.register("callNumber")}
                      value={book?.callNumber}
                      readOnly
                    />
                  </Flex>
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
                  <Flex align={"center"} justify={"center"} gap={"xs"}>
                    <b>Duration</b> –
                    <Input
                      {...form.register("timeDuration", {
                        valueAsNumber: true,
                      })}
                      type="number"
                      value={book?.milliseconds}
                      readOnly
                    />
                  </Flex>
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
                  <Flex align={"center"} justify={"center"} gap={"xs"}>
                    <b>
                      {" "}
                      Number of{" "}
                      {book?.numberOfBooksAvailable_QUANTITY === 1
                        ? "Copy"
                        : "Copies"}
                    </b>{" "}
                    –
                    <Input
                      {...form.register("numberOfBooksAvailable_QUANTITY", {
                        valueAsNumber: true,
                      })}
                      type="number"
                      value={book?.numberOfBooksAvailable_QUANTITY}
                      readOnly
                    />
                  </Flex>
                </List.Item>
              </List>
            </Paper>
            <Group justify="flex-end" mt="md">
              <Button variant="default" size="xs" onClick={close}>
                Cancel
              </Button>
              <Button variant="outline" size="xs" type="submit">
                Borrow Book
              </Button>
            </Group>
          </form>
        </>
      )}
    </>
  );
};
export default BorrowBookDetails;
