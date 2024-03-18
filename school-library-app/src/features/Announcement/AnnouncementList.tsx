import {
  Card,
  Group,
  Image,
  Text,
  ActionIcon,
  Badge,
  Flex,
  Menu,
  Modal,
  Title,
  rem,
  Grid,
  Spoiler,
} from "@mantine/core";
import useReadAnnouncement from "./hooks/useReadAnnouncement";
import { format } from "date-fns";
import UserView from "@features/Teachers/TeacherView";
import { IconDots, IconFileZip, IconEye, IconTrash } from "@tabler/icons-react";

const AnnouncementList = () => {
  const { data: news, isLoading } = useReadAnnouncement();

  return (
    <>
      {isLoading ? (
        <>
          <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
            <Text ta={"center"}>Loading...</Text>
          </Grid.Col>
        </>
      ) : (
        news?.map((nw) => {
          return (
            <>
              <Grid.Col span={{ base: 12, md: 8, lg: 4 }}>
                <Card withBorder shadow="sm" radius="md" key={nw.id}>
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
                          {nw.newsCategory}
                        </span>
                      </Badge>
                      <Menu withinPortal position="bottom-end" shadow="sm">
                        <Menu.Target>
                          <ActionIcon variant="subtle" color="gray">
                            <IconDots
                              style={{ width: rem(16), height: rem(16) }}
                            />
                          </ActionIcon>
                        </Menu.Target>

                        <Menu.Dropdown>
                          {/* <Menu.Item
                        disabled={
                          user.userRole === "Teacher" ||
                          user.userRole === "Student"
                        }
                        leftSection={
                          <IconFileZip
                            style={{ width: rem(14), height: rem(14) }}
                          />
                        }
                      >
                        Update Info
                      </Menu.Item> */}
                          <Menu.Item
                            onClick={() => {
                              open();

                              // setGetId(user.id.toString());
                            }}
                            leftSection={
                              <IconEye
                                style={{ width: rem(14), height: rem(14) }}
                              />
                            }
                          >
                            Preview all
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
                        {/* <Modal.Root
                      // opened={opened}
                      onClose={close}
                      // key={user.id}
                      size={"lg"}
                      centered
                    >
                      <Modal.Overlay />
                      <Modal.Content>
                        <UserView user={filterUserData} key={user.id} />
                      </Modal.Content>
                    </Modal.Root> */}
                      </Menu>
                    </Group>
                  </Card.Section>

                  <Card.Section>
                    <Image src={nw.thumbnail} h={80} fit="cover" />
                  </Card.Section>

                  {(nw.title?.length as number) > 15 ? (
                    <Spoiler
                      maxHeight={18}
                      showLabel="Show more"
                      hideLabel="Hide"
                    >
                      <Title ta={"center"} order={3} mt={"sm"}>
                        {nw.title}
                      </Title>
                    </Spoiler>
                  ) : (
                    <Title ta={"center"} order={3} mt={"sm"}>
                      {nw.title}
                    </Title>
                  )}

                  <Text mt="sm" c="dimmed" size="sm">
                    Posted on{" "}
                    <Text span inherit c="var(--mantine-color-anchor)">
                      {format(
                        new Date(
                          nw.createdAt!.seconds * 1000 +
                            nw.createdAt!.nanoseconds / 1000
                        ),
                        "MMMM dd yyyy"
                      )}
                    </Text>{" "}
                    by{" "}
                    <Text span inherit c="var(--mantine-color-anchor)">
                      {nw.firstName && (
                        <>
                          {nw.firstName} {nw.middleName} {nw.lastName}
                        </>
                      )}

                      {!nw.firstName && <>Maria Chaves</>}
                    </Text>
                  </Text>
                </Card>
              </Grid.Col>
            </>
          );
        })
      )}
    </>
  );
};
export default AnnouncementList;
