import { Box, Group, Image, Text } from "@mantine/core";

const CollegeLogo = () => {
  return (
    <Group>
      <Image src={"/images/bcc-logo.svg"} h={45} w={45} fit="cover" />
      <Box>
        <Text fz={"lg"} c="#5c0505" ff={"Montserrat"} fw={"bolder"}>
          Binangonan Catholic College
        </Text>
        <Text fs={"italic"} fz={"xs"}>
          Open Public Access Catalog
        </Text>
      </Box>
    </Group>
  );
};
export default CollegeLogo;
