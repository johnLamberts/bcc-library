import { Box, Group, Image, Text } from "@mantine/core";

export default function Logo() {
  return (
    <Group>
      <Image src={"/images/bcc-logo.svg"} h={35} w="auto" fit="contain" />
      <Box>
        <Text>Binangonan Catholic College</Text>
        <Text c={"dimmed"} fz={"xs"}>
          Open Public Access Catalog
        </Text>
      </Box>
    </Group>
  );
}
