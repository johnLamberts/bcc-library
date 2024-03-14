import { Box, Group, Image, Text } from "@mantine/core";

const CollegeFooterLogo = () => {
  return (
    <Group>
      <Image src={"/images/bcc-logo.svg"} h={45} w={45} fit="cover" />
      <Box>
        <Text fz={"lg"} c="white" ff={"Montserrat"} fw={"bolder"}>
          Binangonan Catholic College
        </Text>
        <Text fs={"italic"} fz={"xs"} c={"#ffa903"}>
          Open Public Access Catalog
        </Text>
      </Box>
    </Group>
  );
};
export default CollegeFooterLogo;
