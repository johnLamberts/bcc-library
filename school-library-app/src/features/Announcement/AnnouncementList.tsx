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
        <>Loading...</>
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

                  <Flex
                    direction={{ base: "column", sm: "row" }}
                    gap={{ base: "sm", sm: "md" }}
                    justify={{ sm: "center" }}
                    mih={80}
                  >
                    {/* <Grid.Col span={4}> */}
                    <Image
                      m={"auto"}
                      mt={"lg"}
                      src={nw.authorImage}
                      h={80}
                      w={"auto"}
                    />
                    {/* </Grid.Col> */}
                    {/* <Grid.Col span={"auto"}> */}

                    <Flex
                      direction={{ base: "column", sm: "column" }}
                      // gap={{ base: "sm", sm: "xs" }}
                      justify={{ sm: "center" }}
                      mih={80}
                    >
                      <Title mt="sm" size="h6" fw={400}>
                        {nw.firstName} {nw.middleName} {nw.lastName}
                        <Text inherit c="dimmed">
                          Name
                        </Text>{" "}
                      </Title>
                      {/* <Title mt="sm" size="h6" fw={400}>
                    {use}
                    <Text inherit c="dimmed">
                      Email
                    </Text>{" "}
                  </Title> */}
                    </Flex>
                    {/* </Grid.Col> */}
                    <Card.Section inheritPadding mt="sm" pb="md"></Card.Section>
                  </Flex>
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
