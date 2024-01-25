import {
  Group,
  Badge,
  SimpleGrid,
  Text,
  Card,
  rem,
  useMantineTheme,
  Box,
  Grid,
  List,
  ThemeIcon,
  Stack,
  Divider,
  CardSection,
} from "@mantine/core";
import {
  IconUser,
  IconCookie,
  IconUserStar,
  IconTimeDurationOff,
} from "@tabler/icons-react";
import classes from "./styles/admin-dashboard.module.css";
import { Overview } from "@features/AdminDashboard/Overview";

export default function AdminDashboard() {
  const theme = useMantineTheme();
  const mockdata = [
    {
      title: "1000",
      description: "Number of Students",
      icon: IconUserStar,
    },
    {
      title: "200",
      description: "Number of Students",
      icon: IconUser,
    },
    {
      title: "400",
      description: "Number of Students",
      icon: IconCookie,
    },

    {
      title: "400",
      description: "Number of Students",
      icon: IconCookie,
    },
  ];

  const listOverdue = [
    {
      fullName: "John Lambert P. Asis",
      bookBorrowed: "Title For a cause",
      expiryTime: new Date(1706152538372).toLocaleString(),
    },
    {
      fullName: "John Lambert P. Asis",
      bookBorrowed: "Title For a cause",
      expiryTime: new Date(1706152538372).toLocaleString(),
    },
    {
      fullName: "John Lambert P. Asis",
      bookBorrowed: "Title For a cause",
      expiryTime: new Date(1706152538372).toLocaleString(),
    },

    {
      fullName: "John Lambert P. Asis",
      bookBorrowed: "Title For a cause",
      expiryTime: new Date(1706152538372).toLocaleString(),
    },

    {
      fullName: "John Lambert P. Asis",
      bookBorrowed: "Title For a cause",
      expiryTime: new Date(1706152538372).toLocaleString(),
    },
  ];

  // const annoucementData = [
  //   {
  //     title: "John Lambert P. Asis",
  //     description:
  //       "Extend default theme with any amount of additional colors, replace",
  //     icon: IconColorSwatch,
  //   },
  //   {
  //     title: "John Lambert P. Asis",
  //     description:
  //       "        shadows, radius, spacing, fonts and many other properties to match your",
  //     icon: IconColorSwatch,
  //   },
  //   {
  //     title: "John Lambert P. Asis",
  //     description:
  //       "        design requirements. Mantine theme is just an object, you can subscribe",
  //     icon: IconColorSwatch,
  //   },

  //   {
  //     title: "John Lambert P. Asis",
  //     description:
  //       "        to it in any part of application via context and use it to build your",
  //     icon: IconColorSwatch,
  //   },
  // ];

  const features = mockdata.map((feature) => (
    <Card
      key={feature.title}
      shadow="md"
      radius="md"
      className={classes.card}
      padding="xl"
      withBorder
    >
      <Group justify="space-between">
        <Box>
          <Text fz="sm" my={"sm"}>
            {feature.description}
          </Text>
          <Text
            fw="bolder"
            style={{
              fontSize: "1.6rem",
            }}
          >
            {feature.title}
          </Text>
        </Box>
        <feature.icon
          style={{ width: rem(30), height: rem(30) }}
          stroke={2}
          color={theme.colors.red[4]}
        />
      </Group>
    </Card>
  ));

  // const announcement = annoucementData.map((feature) => (
  //   <Card withBorder radius="md">
  //     <Group justify="space-between">
  //       <ThemeIcon
  //         size="xl"
  //         radius="md"
  //         variant="gradient"
  //         gradient={{ deg: 0, from: "pink", to: "orange" }}
  //       >
  //         {/* <IconColorSwatch
  //         style={{ width: rem(28), height: rem(28) }}
  //         stroke={1.5}
  //       /> */}

  //         <feature.icon
  //           style={{ width: rem(30), height: rem(30) }}
  //           stroke={2}
  //           color={theme.colors.red[4]}
  //         />
  //       </ThemeIcon>
  //       <Box>
  //         <Text size="xl" fw={500} mt="md">
  //           {feature.title}
  //         </Text>
  //         <Text size="sm" mt="sm" c="dimmed">
  //           {feature.description}
  //         </Text>
  //       </Box>
  //     </Group>
  //   </Card>
  // ));

  return (
    <div>
      {/*  */}
      {/* <Container miw={"fit-content"}> */}
      <Box maw={"100rem"}>
        <SimpleGrid
          cols={{ base: 1, sm: 2, md: 2, lg: 4 }}
          spacing="sm"
          mt={50}
        >
          {features}
        </SimpleGrid>

        <Grid my={"md"} pos={"relative"}>
          <Grid.Col span={{ base: 12, sm: 12, md: 12, lg: 4 }}>
            {/* */}
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section withBorder inheritPadding py="xs">
                <Badge color="red.8">Recent Overdue</Badge>
              </Card.Section>
              <Card.Section p={"lg"}>
                <List
                  spacing="lg"
                  size="lg"
                  center
                  icon={
                    <ThemeIcon color="yellow.7" size={24} radius="xl">
                      <IconTimeDurationOff
                        style={{ width: rem(16), height: rem(16) }}
                      />
                    </ThemeIcon>
                  }
                >
                  {listOverdue.map((overdue, index) => (
                    <Box key={index}>
                      <List.Item>
                        <Stack
                          w={"max "}
                          align="flex-start"
                          justify="flex-start"
                        >
                          <Box>
                            <Text size="sm" c={"dimmed"}>
                              January 24 2024 -{" "}
                              {new Date(1706152538372).toLocaleString()}
                              <br />
                            </Text>
                            <Group justify="space-between" w={"max-content"}>
                              <Text>{overdue.bookBorrowed}</Text>-
                              <Text>{overdue.fullName}</Text>
                            </Group>
                          </Box>
                        </Stack>
                      </List.Item>
                      <Divider my={"md"} />
                    </Box>
                  ))}
                </List>
              </Card.Section>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 12, md: 12, lg: 8 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <CardSection withBorder inheritPadding py="xs">
                <Badge color={"yellow.8"}>Weekly Reports</Badge>
              </CardSection>

              <CardSection p={"lg"}>
                <Overview />
              </CardSection>
            </Card>
          </Grid.Col>
        </Grid>

        <Grid my={"md"} pos={"relative"}>
          <Grid.Col span={{ base: 12, sm: 12, md: 12, lg: 12 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <CardSection withBorder inheritPadding py="xs">
                <Badge color={"yellow.8"}>Latest Activities</Badge>
              </CardSection>

              <CardSection p={"lg"}>
                {/* <Overview /> */}

                <List
                  spacing="lg"
                  size="lg"
                  center
                  icon={
                    <ThemeIcon color="yellow.7" size={24} radius="xl">
                      <IconTimeDurationOff
                        style={{ width: rem(16), height: rem(16) }}
                      />
                    </ThemeIcon>
                  }
                >
                  {listOverdue.map((overdue, index) => (
                    <Box key={index}>
                      <List.Item>
                        <Stack
                          w={"max "}
                          align="flex-start"
                          justify="flex-start"
                        >
                          <Box>
                            <Text size="sm" c={"dimmed"}>
                              January 24 2024 -{" "}
                              {new Date(1706152538372).toLocaleString()}
                              <br />
                            </Text>
                            <Group justify="space-between" w={"max-content"}>
                              <Text>{overdue.bookBorrowed}</Text>-
                              <Text>{overdue.fullName}</Text>
                            </Group>
                          </Box>
                        </Stack>
                      </List.Item>
                      <Divider my={"md"} />
                    </Box>
                  ))}
                </List>
              </CardSection>
            </Card>
          </Grid.Col>
        </Grid>
      </Box>

      {/* <SimpleGrid cols={{ base: 1, sm: 2, md: 2, lg: 4 }} spacing="sm" mt={50}>
        {announcement}
      </SimpleGrid> */}

      {/* <SimpleGrid cols={{ base: 1, sm: 2, md: 2, lg: 4 }} spacing="sm" mt={50}> */}
      {/* {announcement} */}
      {/* </SimpleGrid> */}
      {/* </Container> */}
    </div>
  );
}
