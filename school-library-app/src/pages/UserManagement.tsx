import React, { useMemo, useState } from "react";
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
  rem,
} from "@mantine/core";
import { IconArrowRight, IconSearch } from "@tabler/icons-react";
import { useSearchParams } from "react-router-dom";
import UserTable from "@features/Users/UserTable";
import useReadUsers from "@features/Users/hooks/useReadUsers";
import { IUser } from "@features/Users/models/user.interface";

export default function UserManagement() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [getId, setGetId] = useState("");

  const { data: users, isLoading } = useReadUsers();

  const optimizedUsersData = useMemo(() => {
    const { data } = users?.data || [];

    return data;
  }, [users?.data]);

  const filterUserData = optimizedUsersData?.filter(
    (user: IUser) => user.id === getId
  )[0];

  const memoizedCards = useMemo(() => {
    return (
      searchParams.get("view") === "by-cards" && (
        <Box my={"xl"}>
          <Grid>
            {isLoading && <>Loading...</>}
            {optimizedUsersData?.map((user: IUser, index: number) => (
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
  }, [searchParams, isLoading, optimizedUsersData, filterUserData]);

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
              allowDeselect={false}
              size="xs"
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
      <Box w={"100%"}>
        {memoizedCards}
        {searchParams.get("view") === "by-table" && (
          <>
            <Box my="xl">
              <UserTable />
            </Box>
          </>
        )}

        {searchParams.get("view") === null && (
          <>
            <Box my="xl">
              <UserTable />
            </Box>
          </>
        )}
      </Box>
    </>
  );
}
