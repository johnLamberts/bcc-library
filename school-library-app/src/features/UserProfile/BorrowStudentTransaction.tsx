import { Badge, Group, ScrollArea, Skeleton, Table, Text } from "@mantine/core";
import useAllUsersTransaction from "./hooks/useAllTransaction";
import { format } from "date-fns";
import clsx from "clsx";
import classes from "./borrow-student.module.css";
import { useState } from "react";
const BorrowStudentTransaction = () => {
  const { isLoading, usersTransaction } = useAllUsersTransaction();
  const [scrolled, setScrolled] = useState(false);

  const sortedTransactions = usersTransaction?.slice().sort((a, b) => {
    // Convert createdAt timestamps to Date objects
    const timestampA =
      a.createdAt?.seconds * 1000 + (a.createdAt?.nanoseconds || 0) / 1000;
    const timestampB =
      b.createdAt?.seconds * 1000 + (b.createdAt?.nanoseconds || 0) / 1000;

    // Sort by timestamp in descending order
    return timestampB - timestampA;
  });

  const rows = isLoading ? (
    <Table.Tr>
      <Table.Td>
        <Group gap="sm">
          <div>
            <Text fz="sm" fw={500}>
              <Skeleton height={8} radius="xl" />
              <Skeleton height={8} radius="xl" />
            </Text>
            <Text fz="xs" c="dimmed">
              <Skeleton height={8} radius="xl" />{" "}
            </Text>
          </div>
        </Group>
      </Table.Td>

      <Table.Td>
        <Skeleton height={8} radius="xl" />{" "}
      </Table.Td>
      <Table.Td>
        <Skeleton height={8} radius="xl" />
      </Table.Td>
    </Table.Tr>
  ) : (
    sortedTransactions?.map((item) => {
      let badgeColor;
      switch (item.status) {
        case "Active":
          badgeColor = "#0CAF49";
          break;
        case "Overdue":
          badgeColor = "#e74c3c";
          break;
        case "Returned":
          badgeColor = "#3498db";
          break;
        case "Request":
          badgeColor = "#d8732f";
          break;
        case "Reserved":
          badgeColor = "#1c8289";
          break;
        case "Cancelled":
          badgeColor = "#6c0303";
          break;
        default:
          badgeColor = "gray"; // Default color if status doesn't match any case
      }

      const date = format(
        new Date(
          item.createdAt?.seconds * 1000 + item.createdAt?.nanoseconds / 1000
        ),
        "MMMM dd yyyy"
      );

      return (
        <>
          <Table.Tr key={item.id}>
            <Table.Td>
              <Group gap="sm">
                <div>
                  <Text fz="sm" fw={500}>
                    {item.bookTitle}
                  </Text>
                  <Text fz="xs" c="dimmed">
                    {item.bookISBN}
                  </Text>
                </div>
              </Group>
            </Table.Td>

            <Table.Td>
              <Badge color={badgeColor} fullWidth variant="light">
                {item.status}
              </Badge>
            </Table.Td>
            <Table.Td>{date}</Table.Td>
          </Table.Tr>
        </>
      );
    })
  );

  return (
    <ScrollArea
      h={460}
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      mt={"xs"}
    >
      <Table verticalSpacing="md" withTableBorder>
        <Table.Thead
          className={clsx(classes.header, { [classes.scrolled]: scrolled })}
        >
          <Table.Tr>
            <Table.Th>Title</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Begin Date</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
};
export default BorrowStudentTransaction;
