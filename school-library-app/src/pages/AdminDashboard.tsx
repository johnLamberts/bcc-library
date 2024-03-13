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
  Button,
} from "@mantine/core";
import {
  IconCookie,
  IconTimeDurationOff,
  IconBooks,
  IconUserHeart,
  IconTransactionBitcoin,
} from "@tabler/icons-react";
import classes from "./styles/admin-dashboard.module.css";
import { Overview } from "@features/AdminDashboard/Overview";
import {
  useReadAllStudents,
  useReadAllTeachers,
} from "@features/AdminDashboard/hooks/useReadAllBorrowers";
import useReadIncomingRequest from "@features/AdminDashboard/hooks/useReadIncomingRequest";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import useCountBooks from "@features/AdminDashboard/hooks/useCountBooks";
import useCountUsers from "@features/AdminDashboard/hooks/useCountUsers";
import TodayTransaction from "@features/AdminDashboard/TodayTransaction";
import useReadRecentOverdue from "@features/AdminDashboard/hooks/useReadRecentOverdue";

export default function AdminDashboard() {
  const theme = useMantineTheme();

  const { data: students, isLoading: isStudent } = useReadAllStudents();
  const { data: teachers, isLoading: isTeacher } = useReadAllTeachers();
  const { data: books, isLoading: isBooks } = useCountBooks();
  const { data: users, isLoading: isUsers } = useCountUsers();

  const { data: recentOverdue, isLoading: isTodayTransaction } =
    useReadRecentOverdue();

  const { data: transaction, isLoading: isAllTransaction } =
    useReadAllTeachers();

  const { data: requests, isLoading: isRequestIncoming } =
    useReadIncomingRequest();

  const allBorrowers =
    isStudent || isTeacher ? <Loader size={15} /> : students! + teachers!;
  const mockdata = [
    {
      id: 1,
      title: isAllTransaction ? <Loader size={15} /> : transaction,
      description: "All Transactions",
      icon: IconTransactionBitcoin,
    },
    {
      id: 2,
      title: isBooks ? <Loader size={15} /> : books,
      description: "Number of Books",
      icon: IconBooks,
    },
    {
      id: 3,
      title: isUsers ? <Loader size={15} /> : users,
      description: "Number of Users",
      icon: IconCookie,
    },

    {
      id: 4,
      title: allBorrowers,
      description: "Number of Borrowers",
      icon: IconUserHeart,
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
          style={{ width: rem(18), height: rem(18) }}
          stroke={1.5}
          color={theme.colors.red[3]}
        />
      </Group>

      <LoadingOverlay
        visible={isTeacher || isStudent || isAllTransaction}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
    </Card>
  ));

  const navigate = useNavigate();

  return (
    <div>
      {/*  */}
      {/* <Container miw={"fit-content"}> */}
      <Box maw={"100rem"}>
        <SimpleGrid cols={{ base: 1, sm: 2, md: 2, lg: 4 }} spacing="sm">
          {features}
        </SimpleGrid>

        <Grid my={"md"}>
          <Grid.Col span={{ base: 12, sm: 12, md: 8, lg: 8 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <CardSection withBorder inheritPadding py="xs">
                <Badge color={"yellow.8"}>
                  Weekly Reports - All Transactions
                </Badge>
              </CardSection>

              <CardSection p={"md"}>
                <Overview />
              </CardSection>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 12, md: 4, lg: 4 }}>
            <TodayTransaction />
          </Grid.Col>
        </Grid>

        <Grid my={"md"} pos={"relative"}>
          <Grid.Col span={{ base: 12, sm: 12, md: 12, lg: 12 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <CardSection withBorder inheritPadding py="xs">
                <Group justify="space-between">
                  <Badge color={"yellow.8"}>Overdue</Badge>

                  <Button
                    variant="light"
                    radius={"md"}
                    onClick={() => navigate("/return-transaction")}
                  >
                    Go to return table
                  </Button>
                </Group>
              </CardSection>

              <CardSection p={"lg"}>
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
                  <LoadingOverlay
                    visible={isTodayTransaction}
                    zIndex={1000}
                    overlayProps={{ radius: "sm", blur: 2 }}
                  />
                  {!isTodayTransaction &&
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    recentOverdue?.map((overdue: any) => (
                      <Box key={overdue.id}>
                        {/* <Group justify="space-between"> */}
                        <List.Item>
                          <Stack
                            w={"max"}
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
                                {format(
                                  new Date(
                                    overdue?.createdAt.seconds * 1000 +
                                      overdue?.createdAt.nanoseconds / 1000
                                  ),
                                  "MMMM dd yyyy"
                                )}
                                -
                                <Text>
                                  {overdue.firstName} {overdue.lastName}{" "}
                                </Text>
                              </Group>
                            </Box>
                          </Stack>
                        </List.Item>
                        {/* </Group> */}
                        <Divider my={"md"} />
                      </Box>
                    ))}
                </List>
              </CardSection>
            </Card>
          </Grid.Col>
        </Grid>

        <Grid my={"md"} pos={"relative"}>
          <Grid.Col span={{ base: 12, sm: 12, md: 12, lg: 12 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <CardSection withBorder inheritPadding py="xs">
                <Group justify="space-between">
                  <Badge color={"yellow.8"}>Incoming Request</Badge>

                  <Button
                    variant="light"
                    radius={"md"}
                    onClick={() => navigate("/borrow-transaction?bq=Request")}
                  >
                    Go to request table
                  </Button>
                </Group>
              </CardSection>

              <CardSection p={"lg"}>
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
                  <LoadingOverlay
                    visible={isRequestIncoming}
                    zIndex={1000}
                    overlayProps={{ radius: "sm", blur: 2 }}
                  />
                  {!isRequestIncoming &&
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    requests?.map((overdue: any) => (
                      <Box key={overdue.id}>
                        {/* <Group justify="space-between"> */}
                        <List.Item>
                          <Stack
                            w={"max"}
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
                                {format(
                                  new Date(
                                    overdue?.createdAt.seconds * 1000 +
                                      overdue?.createdAt.nanoseconds / 1000
                                  ),
                                  "MMMM dd yyyy"
                                )}
                                -
                                <Text>
                                  {overdue.firstName} {overdue.lastName}{" "}
                                </Text>
                              </Group>
                            </Box>
                          </Stack>
                        </List.Item>
                        {/* </Group> */}
                        <Divider my={"md"} />
                      </Box>
                    ))}
                </List>
              </CardSection>
            </Card>
          </Grid.Col>
        </Grid>
      </Box>
    </div>
  );
}
