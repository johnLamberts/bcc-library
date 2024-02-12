import useReadCatalogue from "@features/Catalogue/hooks/useReadCatalogue";
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
  Button,
  Card,
  Image,
} from "@mantine/core";
import {
  IconBrowserCheck,
  IconLayoutDashboard,
  IconList,
} from "@tabler/icons-react";

// const bookCard = [
//   {
//     image: `https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png`,
//     title: "Norway Fjord Adventures",
//     extra: "On Sale",
//     description: `With Fjord Tours you can explore more of the magical fjord landscapes with tours and
//     activities on and around the fjords of Norway`,
//   },

//   {
//     image: `https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png`,
//     title: "Norway Fjord Adventures",
//     extra: "On Sale",
//     description: `With Fjord Tours you can explore more of the magical fjord landscapes with tours and
//     activities on and around the fjords of Norway`,
//   },

//   {
//     image: `https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png`,
//     title: "Norway Fjord Adventures",
//     extra: "On Sale",
//     description: `With Fjord Tours you can explore more of the magical fjord landscapes with tours and
//     activities on and around the fjords of Norway`,
//   },

//   {
//     image: `https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png`,
//     title: "Norway Fjord Adventures",
//     extra: "On Sale",
//     description: `With Fjord Tours you can explore more of the magical fjord landscapes with tours and
//     activities on and around the fjords of Norway`,
//   },

//   {
//     image: `https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png`,
//     title: "Norway Fjord Adventures",
//     extra: "On Sale",
//     description: `With Fjord Tours you can explore more of the magical fjord landscapes with tours and
//     activities on and around the fjords of Norway`,
//   },
// ];

const BookList = () => {
  const { data: bookData = [], isLoading: isBookLoading } = useReadCatalogue();

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

        <Text size="sm" c={"#5C0505"}>
          Show All 20 results
        </Text>
      </Group>

      <Divider my={"sm"} />

      {isBookLoading ? (
        "Loading..."
      ) : (
        <Grid>
          {bookData.map((book) => (
            <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
              <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                key={book.id}
              >
                <Card.Section>
                  <Image src={book.bookImageCover} height={160} alt="Norway" />
                </Card.Section>

                <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={500}>{book.title}</Text>
                  <Badge color="#5C0505">{book.bookType}</Badge>
                </Group>

                <Text size="sm" c="dimmed">
                  {/* {book.bookDescription} */}
                  With Fjord Tours you can explore more of the magical fjord
                  landscapes with tours and activities on and around the fjords
                  of Norway
                </Text>

                <Text size="sm" my={"xs"}>
                  Number of Copies Available:{" "}
                  <b>{book.numberOfBooksAvailable_QUANTITY}</b>
                </Text>

                <Divider />

                <Button
                  color="#ffa903"
                  fullWidth
                  mt="md"
                  radius="md"
                  rightSection={<IconBrowserCheck size={14} />}
                >
                  Borrow Book
                </Button>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      )}
    </Paper>
  );
};
export default BookList;
