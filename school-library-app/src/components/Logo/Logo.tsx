import { Group, Image, Text } from "@mantine/core";

export default function Logo() {
  return (
    <Group visibleFrom="sm">
      <Image src={"/images/bcc-logo.svg"} h={35} w="auto" fit="contain" />
      <Text>Binangonan Catholic College</Text>
    </Group>
  );
}
