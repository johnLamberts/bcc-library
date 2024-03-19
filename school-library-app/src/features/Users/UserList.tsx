/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Grid,
  Card,
  Group,
  Badge,
  Menu,
  ActionIcon,
  rem,
  Drawer,
  Text,
  Image,
  Spoiler,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDots, IconEye, IconTrash } from "@tabler/icons-react";
import { useState, useMemo } from "react";
import UserView from "./UserView";
import useReadCardUsers from "./hooks/useReadCardUsers";
import { format } from "date-fns";

const UserList = ({ users }: { users?: Record<string, any>[] }) => {
  const { isLoading } = useReadCardUsers();
  const [opened, { open, close }] = useDisclosure(false);

  const [id, setId] = useState<string | undefined>("");

  const newsView = users?.filter((nw) => nw.id === id);

  const filteredOutInvalidDate = users?.filter((item) => {
    const { createdAt } = item;
    if (createdAt && createdAt.seconds && createdAt.nanoseconds) {
      const milliseconds =
        createdAt.seconds * 1000 + createdAt.nanoseconds / 1000;
      const date = new Date(milliseconds);
      // Check if the date is valid
      if (!isNaN(date.getTime())) {
        return { ...item, createdAt: date };
      }
    }
    // Replace invalid date with null
    return { ...item, createdAt: null }; // Invalid date if createdAt or any necessary fields are missing
  });

  const memoizedCard = useMemo(() => {
    return filteredOutInvalidDate?.map((nw) => {
      return (
        <>
          <Grid.Col span={{ base: 12, md: 8, lg: 4 }} key={nw.id}>
            <Card withBorder shadow="sm" radius="md" key={nw.id} mt={"xs"}>
              <Card.Section withBorder inheritPadding py="xs">
                <Group justify="space-between">
                  <Badge
                    radius={"sm"}
                    bg={" var(--mantine-color-red-light)"}
                    // color={""}
                    key={nw.id}
                  >
                    <span
                      style={{
                        color: "var(--mantine-color-red-light-color)",
                      }}
                    >
                      {nw.userRole}
                    </span>
                  </Badge>
                  <Menu withinPortal position="bottom-end" shadow="sm">
                    <Menu.Target>
                      <ActionIcon variant="subtle" color="gray">
                        <IconDots style={{ width: rem(16), height: rem(16) }} />
                      </ActionIcon>
                    </Menu.Target>

                    <Menu.Dropdown>
                      <Menu.Item
                        onClick={() => {
                          open();

                          setId(nw.id);
                          // setGetId(user.id.toString());
                        }}
                        leftSection={
                          <IconEye
                            style={{ width: rem(14), height: rem(14) }}
                          />
                        }
                      >
                        Preview
                      </Menu.Item>

                      <Menu.Item
                        leftSection={
                          <IconTrash
                            style={{ width: rem(14), height: rem(14) }}
                          />
                        }
                        color="red"
                      >
                        Remove
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Group>
              </Card.Section>

              <Card.Section>
                <Image src={nw.avatarImage} h={80} fit="cover" />
              </Card.Section>

              {(nw.email?.length as number) > 30 ? (
                <Spoiler maxHeight={18} showLabel="Show more" hideLabel="Hide">
                  <Title ta={"center"} order={6} mt={"sm"}>
                    {nw.email}
                  </Title>
                </Spoiler>
              ) : (
                <Title ta={"center"} order={6} mt={"sm"}>
                  {nw.email}
                </Title>
              )}

              <Text mt="sm" c="dimmed" size="sm">
                <Text span inherit c="var(--mantine-color-anchor)">
                  {/* {format(
                    new Date(
                      nw.createdAt!.seconds * 1000 +
                        nw.createdAt!.nanoseconds / 1000
                    ),
                    "MMMM dd yyyy"
                  )} */}
                </Text>{" "}
                Name:{" "}
                <Text span inherit c="var(--mantine-color-anchor)">
                  {nw.firstName && (
                    <>
                      {nw.firstName} {nw.middleName} {nw.lastName}
                    </>
                  )}

                  {!nw.firstName && <>Maria Chaves</>}
                </Text>
                <br />
                Date Joined:{" "}
                <Text span inherit c="var(--mantine-color-anchor)">
                  {new Date(
                    nw.createdAt.seconds * 1000 +
                      nw.createdAt.nanoseconds / 1000
                  ).toLocaleString() === "Invalid Date"
                    ? "Unknown Date"
                    : format(
                        new Date(
                          nw.createdAt.seconds * 1000 +
                            nw.createdAt.nanoseconds / 1000
                        ),
                        "MMMM dd yyyy"
                      )}
                </Text>{" "}
              </Text>
            </Card>
          </Grid.Col>

          <Drawer
            position="right"
            size="xl"
            opened={opened}
            onClose={close}
            title={
              <>
                {/* <Title order={3} fw={"lighter"} ff={"Montserrat"}>
                      {users?.filter((nw) => nw.id === id)?.map((nw) => nw.title) ||
                        "Not dedicated title..."}
                    </Title> */}

                <Text mt="sm" c="dimmed" size="sm">
                  Posted by{" "}
                  <Text span inherit c="var(--mantine-color-anchor)">
                    {newsView?.map((nw) => nw.firstName) && (
                      <>
                        {newsView?.map((nw) => nw.firstName)}{" "}
                        {newsView?.map((nw) => nw.middleName)}{" "}
                        {newsView?.map((nw) => nw.lastName)}
                      </>
                    )}

                    {newsView?.map((nw) => nw.firstName === null)[0] && (
                      <>Maria Chaves</>
                    )}
                  </Text>
                </Text>
              </>
            }
          >
            <UserView
              user={filteredOutInvalidDate?.filter((nw) => nw.id === id)[0]}
            />
          </Drawer>
        </>
      );
    });
  }, [close, id, newsView, open, opened, users]);

  return (
    <>
      {isLoading ? (
        <>
          <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
            <Text ta={"center"}>Loading users...</Text>
          </Grid.Col>
        </>
      ) : (
        memoizedCard
      )}
    </>
  );
};
export default UserList;
