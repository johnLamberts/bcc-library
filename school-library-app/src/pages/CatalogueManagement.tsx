import {
  ActionIcon,
  Box,
  Divider,
  Flex,
  Group,
  Select,
  Text,
  TextInput,
  rem,
} from "@mantine/core";
import { IconArrowRight, IconSearch } from "@tabler/icons-react";
import { useSearchParams } from "react-router-dom";
import CatalogueTable from "@features/Catalogue/CatalogueTable";
import { useHeadTitle } from "src/hooks/use-head-tag";

export default function CatalogueManagement() {
  useHeadTitle("Books and Catalogue Management");
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (params: string | null) => {
    searchParams.set("viewBy", params as string);

    return setSearchParams(searchParams);
  };

  return (
    <>
      <Group justify="space-between">
        <Box>
          <Flex align={"center"} gap={"xs"}>
            <Text span c={"dimmed"} size="md">
              View
            </Text>

            <Select
              size="xs"
              allowDeselect={false}
              data={["All", "Archive"]}
              defaultValue={"All"}
              onChange={handleChange}
            />
          </Flex>
        </Box>

        {searchParams.get("view") === "by-cards" && (
          <TextInput
            radius="md"
            size="md"
            placeholder="Search users"
            rightSectionWidth={42}
            leftSection={
              <IconSearch
                style={{ width: rem(18), height: rem(18) }}
                stroke={1.5}
              />
            }
            rightSection={
              <ActionIcon
                size={32}
                radius="xl"
                color={" var(--mantine-color-red-light-color)"}
                variant="filled"
              >
                <IconArrowRight
                  style={{ width: rem(18), height: rem(18) }}
                  stroke={1.5}
                />
              </ActionIcon>
            }
          />
        )}
      </Group>

      {/* List of Users */}
      <Divider my="lg" c={"dimmed"} />

      {searchParams.get("viewBy") === "All" && (
        <>
          <Box my="xl">
            <CatalogueTable />
          </Box>
        </>
      )}

      {searchParams.get("viewBy") === null && (
        <>
          <Box my="xl">
            <CatalogueTable />
          </Box>
        </>
      )}

      {searchParams.get("viewBy") === "Archive" && (
        <>
          <Box my="xl">
            {/* <CatalogueTable /> */}
            Archive Table
          </Box>
        </>
      )}
    </>
  );
}
