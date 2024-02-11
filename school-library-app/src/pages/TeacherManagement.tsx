import { useMemo, useState } from "react";
import UsersBox from "@features/Users/UsersBox";
import {
  ActionIcon,
  Box,
  Divider,
  Grid,
  Group,
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
import TeacherTable from "@features/Teachers/TeacherTable";

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

export default function TeacherManagement() {
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

  return (
    <>
      <Group justify="space-between">
        <Box>
          <Tooltip label="View the students by Table">
            <ActionIcon
              m={1.2}
              variant={
                searchParams.get("view") === "by-table" ||
                searchParams.get("view") === null
                  ? "outline"
                  : "default"
              }
              color="red"
              size="lg"
              aria-label="Settings"
              onClick={() => {
                searchParams.set("view", "by-table");
                setSearchParams(searchParams);
              }}
            >
              <IconTable style={{ width: rem(20) }} stroke={1.5} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="View the students by Card">
            <ActionIcon
              m={1.2}
              variant={
                searchParams.get("view") === "by-cards" ? "outline" : "default"
              }
              color="red"
              size="lg"
              aria-label="Gallery"
              onClick={() => {
                searchParams.set("view", "by-cards");
                setSearchParams(searchParams);
              }}
            >
              <IconBoxMultiple1 style={{ width: rem(20) }} stroke={1.5} />
            </ActionIcon>
          </Tooltip>
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

      {searchParams.get("view") === "by-table" && (
        <>
          <Box my="xl">
            <TeacherTable />
          </Box>
        </>
      )}

      {searchParams.get("view") === null && (
        <>
          <Box my="xl">
            <TeacherTable />
          </Box>
        </>
      )}
    </>
  );
}
