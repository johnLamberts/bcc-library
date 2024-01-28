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
} from "@mantine/core";
import { IconTimeDurationOff } from "@tabler/icons-react";
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
          {isRecentOverdueLoading && "Wait..."}
          {recentOverdue.map((overdue: any) => (
            <Box key={overdue.booksId}>
              <List.Item>
                <Stack w={"max "} align="flex-start" justify="flex-start">
                  <Box>
                    <Text size="sm" c={"dimmed"}>
                      January 24 2024 -{" "}
                      {new Date(overdue.expiryTime).toLocaleString()}
                      <br />
                    </Text>
                    <Group justify="space-between" w={"max-content"}>
                      <Text>{overdue.bookISBN}</Text> -
                      <Text>{overdue.borrowersName}</Text>
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
  );
};
export default RecentOverdue;
