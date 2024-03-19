import {
  Card,
  Group,
  Image,
  Text,
  ActionIcon,
  Badge,
  Menu,
  Title,
  rem,
  Grid,
  Spoiler,
  Drawer,
  Modal,
  ScrollArea,
  Divider,
} from "@mantine/core";
import useReadAnnouncement from "./hooks/useReadAnnouncement";
import { format } from "date-fns";
import { IconDots, IconEye, IconFileZip, IconTrash } from "@tabler/icons-react";
import AnnouncementCardView from "./AnnouncementView";
import { useDisclosure } from "@mantine/hooks";
import { useMemo, useState } from "react";
import AnnouncementForm from "./AnnouncementForm";
import IPost from "./models/post.interface";

const AnnouncementList = ({ newsData: news }: { newsData?: IPost[] }) => {
  const { isLoading } = useReadAnnouncement();
  const [opened, { open, close }] = useDisclosure(false);
  const [open3d, { open: op3n, close: clos3 }] = useDisclosure(false);

  const [id, setId] = useState<string | undefined>("");

  const newsView = news?.filter((nw) => nw.id === id);

  const memoizedCard = useMemo(() => {
    return news?.map((nw) => {
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
                      {nw.newsCategory}
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
                          op3n();
                          setId(nw.id);
                        }}
                        leftSection={
                          <IconFileZip
                            style={{ width: rem(14), height: rem(14) }}
                          />
                        }
                      >
                        Update Post
                      </Menu.Item>
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
                <Image src={nw.thumbnail} h={80} fit="cover" />
              </Card.Section>

              {(nw.title?.length as number) > 15 ? (
                <Spoiler maxHeight={18} showLabel="Show more" hideLabel="Hide">
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

          <Drawer
            position="right"
            size="xl"
            opened={opened}
            onClose={close}
            title={
              <>
                <Title order={3} fw={"lighter"} ff={"Montserrat"}>
                  {news?.filter((nw) => nw.id === id)?.map((nw) => nw.title) ||
                    "Not dedicated title..."}
                </Title>

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
            <AnnouncementCardView inew={news.filter((nw) => nw.id === id)[0]} />
          </Drawer>

          <Modal.Root
            opened={open3d}
            onClose={clos3}
            centered
            size={"xl"}
            scrollAreaComponent={ScrollArea.Autosize}
          >
            <Modal.Overlay />
            <Modal.Content>
              <Modal.Header>
                <Modal.Title>Edit Announcement</Modal.Title>
                <Modal.CloseButton />
              </Modal.Header>
              <Modal.Body>
                <AnnouncementForm
                  news={news.filter((nw) => nw.id === id)[0]}
                  close={close}
                />
              </Modal.Body>
            </Modal.Content>
          </Modal.Root>
        </>
      );
    });
  }, [clos3, close, id, news, newsView, op3n, open, open3d, opened]);

  return (
    <>
      <Divider my={"sm"} />
      {isLoading ? (
        <>
          <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
            <Text ta={"center"}>Loading...</Text>
          </Grid.Col>
        </>
      ) : (
        memoizedCard
      )}
    </>
  );
};
export default AnnouncementList;
