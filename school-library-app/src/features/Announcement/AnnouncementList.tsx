import { Card, Group, Avatar, Image, Text } from "@mantine/core";
import useReadAnnouncement from "./hooks/useReadAnnouncement";
import { format } from "date-fns";

const AnnouncementList = () => {
  const { data: news, isLoading } = useReadAnnouncement();

  return (
    <>
      {isLoading ? (
        <>Loading...</>
      ) : (
        news?.map((nw) => {
          return (
            <Card
              withBorder
              radius="md"
              my={"xs"}
              p={0}
              style={{
                backgroundColor: "var(--mantine-color-body)",
              }}
            >
              <Group wrap="nowrap" gap={0}>
                <Image
                  src={nw.thumbnail}
                  height={160}
                  style={{
                    width: "15rem",
                  }}
                  fit="cover"
                />
                <div
                  style={{
                    padding: `var(--mantine-spacing-md)`,
                  }}
                >
                  <Text tt="uppercase" c="dimmed" fw={700} size="xs">
                    {nw.newsCategory}
                  </Text>
                  <Text
                    style={{
                      fontWeight: `bold`,
                      fontFamily: `Greycliff CF,
                var(--mantine-font-family)`,
                      lineHeight: `1.2`,
                    }}
                    mt="xs"
                    mb="md"
                  >
                    {nw.title}
                  </Text>
                  <Group wrap="nowrap" gap="xs">
                    <Group gap="xs" wrap="nowrap">
                      <Avatar
                        size={20}
                        src={
                          nw.authorImage === undefined
                            ? "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
                            : nw.authorImage
                        }
                      />
                      <Text size="xs">
                        {nw.firstName} {nw.middleName} {nw.lastName}
                      </Text>
                    </Group>
                    <Text size="xs" c="dimmed">
                      •
                    </Text>
                    <Text size="xs" c="dimmed">
                      {format(
                        new Date(
                          nw?.createdAt!.seconds * 1000 +
                            nw?.createdAt!.nanoseconds / 1000
                        ),
                        "MMMM dd yyyy"
                      )}
                    </Text>
                  </Group>
                </div>
              </Group>
            </Card>
          );
        })
      )}
    </>
  );
};
export default AnnouncementList;
