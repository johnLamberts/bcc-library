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
  Button,
  Modal,
} from "@mantine/core";
import { IconTimeDurationOff } from "@tabler/icons-react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import useTodayTransaction from "./hooks/useTodayTransaction";
import { useDisclosure } from "@mantine/hooks";

const TodayTransaction = () => {
  const { data: recentOverdue = [], isLoading: isRecentOverdueLoading } =
    useTodayTransaction();

  const topLatest = recentOverdue.slice(0, 5);
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Today Transaction" centered>
        {/* Modal content */}
        Today Transcation List
      </Modal>

      <Card shadow="sm" padding="md" radius="md" withBorder>
        <Card.Section withBorder inheritPadding py="xs">
          <Group justify="space-between">
            <Badge color={"yellow.8"} size="xs">
              Today Transaction
            </Badge>

            <Button
              variant="light"
              radius={"md"}
              onClick={open}
              size="compact-xs"
            >
              View Today Transaction
            </Button>
          </Group>
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
            {recentOverdue.length > 0 ? (
              topLatest.map((overdue: any) => (
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
                          <Text fz={"xs"}>{overdue.bookISBN}</Text> -
                          <Text fz={"xs"}>
                            {overdue.firstName} {overdue.middleName}{" "}
                            {overdue.lastName}
                          </Text>
                        </Group>
                      </Box>
                    </Stack>
                  </List.Item>
                  <Divider my={"md"} />
                </Box>
              ))
            ) : (
              <>No transaction today yet</>
            )}
          </List>
        </Card.Section>

        <LoadingOverlay
          visible={isRecentOverdueLoading}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
      </Card>
    </>
  );
};
export default TodayTransaction;
