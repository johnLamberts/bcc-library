import {
  SimpleGrid,
  Card,
  Image,
  Text,
  Container,
  AspectRatio,
  ScrollArea,
  Group,
  Stack,
  Container,
  Divider,
  Grid,
  Skeleton,
  rem,
  Box,
  CardSection,
  Box,
} from "@mantine/core";
import classes from "../styles/ArticlesCardsGrid.module.css";
import { Footer } from "./Footer";
const mockdata = [
  {
    title: "Top 10 places to visit in Norway this summer",
    image:
      "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
    date: "August 18, 2022",
  },
  {
    title: "Best forests to visit in North America",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
    date: "August 27, 2022",
  },
  {
    title: "Hawaii beaches review: better than you think",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
    date: "September 9, 2022",
  },
  {
    title: "Mountains at night: 12 best locations to enjoy the view",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
    date: "September 12, 2022",
  },
];

const PRIMARY_COL_HEIGHT = rem(250);

const Announcement = () => {
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

  const cardNumber = (num: number) => {
    return mockdata.map((article) => (
      <Card key={article.title} p="md" radius="md" component="a" href="#">
        <CardSection>
          <Image src={article.image} h={PRIMARY_COL_HEIGHT} />

          <Box py={"xs"}>
            <Text>{article.title}</Text>
          </Box>
        </CardSection>
      </Card>
    ))[num];
  };
  return (
    <ScrollArea
      scrollbars="y"
      style={{
        height:
          "calc(100vh - var(--mantine-header-height, 0px) - var(--mantine-footer-height, 0px))", // viewport height - height of header - height of footer
      }}
    >
      <Container py="xl" mt={"5rem"}>
        <Stack>
          <Text
            ta={"center"}
            style={{
              fontSize: "2rem",
            }}
            ff={"Montserrat"}
            tt={"uppercase"}
          >
            Latest announcement <br />
            <span
              style={{
                fontSize: "1.5rem",
              }}
            ></span>
          </Text>
        </Stack>
        {/* <SimpleGrid cols={{ base: 1, sm: 2 }}>{cards}</SimpleGrid>
         */}

        <Grid>
          <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>{cardNumber(0)}</Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>{cardNumber(1)}</Grid.Col>
        </Grid>

        <Grid>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>{cardNumber(0)}</Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>{cardNumber(1)}</Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>{cardNumber(2)}</Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>{cardNumber(3)}</Grid.Col>
        </Grid>
      </Container>

      <Divider my={"md"} />

      <Text
        ta={"left"}
        style={{
          fontSize: "1.2rem",
        }}
        ff={"Montserrat"}
        tt={"uppercase"}
        px={"lg"}
      >
        Other blog <br />
        <span
          style={{
            fontSize: "1.5rem",
          }}
        ></span>
      </Text>

      <Box px={"sm"}>
        <Grid>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>{cardNumber(0)}</Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>{cardNumber(1)}</Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>{cardNumber(2)}</Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>{cardNumber(3)}</Grid.Col>

          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>{cardNumber(0)}</Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>{cardNumber(1)}</Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>{cardNumber(2)}</Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>{cardNumber(3)}</Grid.Col>
        </Grid>
      </Box>

      <Footer />
    </ScrollArea>
  );
};
export default Announcement;
