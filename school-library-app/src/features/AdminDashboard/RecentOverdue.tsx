/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  Badge,
  List,
  ThemeIcon,
  rem,
  Box,
  Stack,
  Group,
  Divider,
  Text,
  LoadingOverlay,
} from "@mantine/core";
import { IconTimeDurationOff } from "@tabler/icons-react";
import { format } from "date-fns";
import useReadRecentOverdue from "./hooks/useReadRecentOverdue";

const RecentOverdue = () => {
  const { data: recentOverdue = [], isLoading: isRecentOverdueLoading } =
    useReadRecentOverdue();

  console.log(recentOverdue);
  return (
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
          {recentOverdue.map((overdue: any) => (
            <Box key={overdue.booksId}>
              <List.Item>
                <Stack w={"max "} align="flex-start" justify="flex-start">
                  <Box>
                    <Text size="sm" c={"dimmed"}>
                      {format(
                        new Date(
                          overdue?.createdAt.seconds * 1000 +
                            overdue?.createdAt.nanoseconds / 1000
                        ),
                        "MMMM dd yyyy"
                      )}{" "}
                      - {new Date(overdue.expiryTime).toLocaleString()}
                      <br />
                    </Text>
                    <Group justify="space-between" w={"max-content"}>
                      <Text>{overdue.bookISBN}</Text> -
                      <Text>
                        {overdue.firstName} {overdue.middleName}{" "}
                        {overdue.lastName}
                      </Text>
                    </Group>
                  </Box>
                </Stack>
              </List.Item>
              <Divider my={"md"} />
            </Box>
          ))}
        </List>
      </Card.Section>

      <LoadingOverlay
        visible={isRecentOverdueLoading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
    </Card>
  );
};
export default RecentOverdue;
