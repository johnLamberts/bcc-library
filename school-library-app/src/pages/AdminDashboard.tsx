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
  Loader,
  LoadingOverlay,
} from "@mantine/core";
import {
  IconUser,
  IconCookie,
  IconUserStar,
  IconTimeDurationOff,
} from "@tabler/icons-react";
import classes from "./styles/admin-dashboard.module.css";
import { Overview } from "@features/AdminDashboard/Overview";
import RecentOverdue from "@features/AdminDashboard/RecentOverdue";
import {
  useReadAllStudents,
  useReadAllTeachers,
} from "@features/AdminDashboard/hooks/useReadAllBorrowers";

export default function AdminDashboard() {
  const theme = useMantineTheme();

  const { data: students, isLoading: isStudent } = useReadAllStudents();
  const { data: teachers, isLoading: isTeacher } = useReadAllTeachers();
  const { data: transaction, isLoading: isAllTransaction } =
    useReadAllTeachers();

  const allBorrowers =
    isStudent || isTeacher ? <Loader size={15} /> : students! + teachers!;
  const mockdata = [
    {
      id: 1,
      title: isAllTransaction ? <Loader size={15} /> : transaction,
      description: "All Transactions",
      icon: IconUserStar,
    },
    {
      id: 2,
      title: "200",
      description: "Number of Students",
      icon: IconUser,
    },
    {
      id: 3,
      title: "400",
      description: "Number of Students",
      icon: IconCookie,
    },

    {
      id: 4,
      title: allBorrowers,
      description: "Number of Borrowers",
      icon: IconCookie,
    },
  ];

  const listOverdue = [
    {
      id: 1,
      fullName: "John Lambert P. Asis",
      bookBorrowed: "Title For a cause",
      expiryTime: new Date(1706152538372).toLocaleString(),
    },
    {
      id: 2,
      fullName: "John Lambert P. Asis",
      bookBorrowed: "Title For a cause",
      expiryTime: new Date(1706152538372).toLocaleString(),
    },
    {
      id: 3,
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

  const features = mockdata.map((feature) => (
    <Card
      key={feature.id}
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

      <LoadingOverlay
        visible={isTeacher || isStudent || isAllTransaction}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
    </Card>
  ));

  return (
    <div>
      {/*  */}
      {/* <Container miw={"fit-content"}> */}
      <Box maw={"100rem"}>
        <SimpleGrid cols={{ base: 1, sm: 2, md: 2, lg: 4 }} spacing="sm">
          {features}
        </SimpleGrid>

        <Grid my={"md"} pos={"relative"}>
          <Grid.Col span={{ base: 12, sm: 12, md: 12, lg: 4 }}>
            <RecentOverdue />
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
                  {listOverdue?.map((overdue) => (
                    <Box key={overdue.id}>
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
