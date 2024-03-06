import { useMemo, useState } from "react";
import UsersBox from "@features/Users/UsersBox";
import {
  ActionIcon,
  Box,
  Divider,
  Flex,
  Grid,
  Group,
  Select,
  Text,
  TextInput,
  Tooltip,
  rem,
} from "@mantine/core";
import {
  IconArrowRight,
  IconBoxMultiple1,
  IconSearch,
  IconTable,
} from "@tabler/icons-react";
import { useSearchParams } from "react-router-dom";
import CatalogueTable from "@features/Catalogue/CatalogueTable";

const userData = [
  {
    id: 1,
    fullName: "John Lambert",
    role: "Admin",
    email: "admin@test.admin",
    image: "/images/bcc-logo.svg",
  },
  {
    id: 2,
    fullName: "Damien Liliard",
    role: "Student",
    email: "admin@test.admin",
    image: "/images/bcc-logo.svg",
  },
  {
    id: 3,
    fullName: "Gl Ocamp",
    role: "Teacher",
    email: "admin@test.admin",
    image: "/images/bcc-logo.svg",
  },
];

export default function CatalogueManagement() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [getId, setGetId] = useState("");

  const filterUserData = userData.filter(
    (user) => user.id === Number(getId)
  )[0];

  const memoizedCards = useMemo(() => {
    return (
      searchParams.get("view") === "by-cards" && (
        <Box my={"xl"}>
          {/* gutter={{ base: 12, xs: "md", md: "lg", xl: 5 }} */}
          <Grid>
            {userData.map((user, index) => (
              <UsersBox
                key={index}
                // index={index}
                user={user}
                filterUserData={filterUserData}
                setGetId={setGetId}
              />
            ))}
          </Grid>
        </Box>
      )
    );
  }, [filterUserData, searchParams]);

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

      {memoizedCards}

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
