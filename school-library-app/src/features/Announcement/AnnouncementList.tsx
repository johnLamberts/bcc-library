import { Card, Group, Avatar, Image, Text } from "@mantine/core";

const AnnouncementList = () => {
  return (
    <>
      <Card
        withBorder
        radius="md"
        p={0}
        style={{
          backgroundColor: "var(--mantine-color-body)",
        }}
      >
        <Group wrap="nowrap" gap={0}>
          <Image
            src="https://images.unsplash.com/photo-1602080858428-57174f9431cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80"
            height={160}
          />
          <div
            style={{
              padding: `var(--mantine-spacing-md)`,
            }}
          >
            <Text tt="uppercase" c="dimmed" fw={700} size="xs">
              technology
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
              The best laptop for Frontend engineers in 2022
            </Text>
            <Group wrap="nowrap" gap="xs">
              <Group gap="xs" wrap="nowrap">
                <Avatar
                  size={20}
                  src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
                />
                <Text size="xs">Elsa Typechecker</Text>
              </Group>
              <Text size="xs" c="dimmed">
                •
              </Text>
              <Text size="xs" c="dimmed">
                Feb 6th
              </Text>
            </Group>
          </div>
        </Group>
      </Card>
    </>
  );
};
export default AnnouncementList;
