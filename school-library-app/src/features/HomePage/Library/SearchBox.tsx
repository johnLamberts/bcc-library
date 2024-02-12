import {
  ActionIcon,
  Box,
  Flex,
  Text,
  TextInput,
  Title,
  rem,
} from "@mantine/core";
import { IconSearch, IconArrowRight } from "@tabler/icons-react";

const SearchBox = () => {
  return (
    <Box w={"100vw"} bg={"#ffa903"} h={"5rem"}>
      <Flex
        gap={"1rem"}
        align={"center"}
        justify={"center"}
        m={"auto"}
        h={"inherit"}
        w={"70vw"}
      >
        <Box>
          <Title order={1} c={"#5C0505"} lts={""} ta={"center"}>
            OPAC
          </Title>

          <Text fz={"sm"} fs={"italic"}>
            OPEN PUBLIC ACCESS CATALOG
          </Text>
        </Box>

        <TextInput
          radius="xl"
          size="md"
          w={"25rem"}
          placeholder="Search books"
          rightSectionWidth={42}
          leftSection={
            <IconSearch
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          }
          rightSection={
            <ActionIcon size={32} radius="xl" color="#5C0505">
              <IconArrowRight
                style={{ width: rem(18), height: rem(18) }}
                stroke={1.5}
              />
            </ActionIcon>
          }
        />
      </Flex>
    </Box>
  );
};
export default SearchBox;
