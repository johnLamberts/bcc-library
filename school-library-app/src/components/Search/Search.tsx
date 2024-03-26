import { TextInput, ActionIcon, rem, Flex } from "@mantine/core";
import { IconSearch, IconArrowRight, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export function Search({ keyWords }: { keyWords: string }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState<string>("");
  const handleSearchParams = () => {
    if (searchParams.get("q") === null) {
      searchParams.delete("q");
    }

    searchParams.set("q", query);
    return setSearchParams(searchParams);
  };

  const handleResetParams = () => {
    setQuery("");
    searchParams.delete("q");
    return setSearchParams(searchParams);
  };

  return (
    <TextInput
      radius="xl"
      size="md"
      placeholder={keyWords}
      value={query}
      rightSectionWidth={42}
      leftSection={
        <IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
      }
      onChange={(e) => setQuery(e.target.value)}
      rightSection={
        <>
          {searchParams.get("q") === "" || searchParams.get("q") === null ? (
            <ActionIcon
              size={32}
              radius="xl"
              variant="filled"
              onClick={handleSearchParams}
            >
              <IconArrowRight
                style={{ width: rem(18), height: rem(18) }}
                stroke={1.5}
              />
            </ActionIcon>
          ) : (
            <Flex justify={"space-around"}>
              <ActionIcon
                size={32}
                radius="xl"
                color="#5C0505"
                variant="light"
                disabled={
                  searchParams.get("q") === "" || searchParams.get("q") === null
                }
                onClick={handleResetParams}
              >
                <IconX
                  style={{ width: rem(18), height: rem(18) }}
                  stroke={1.5}
                />
              </ActionIcon>
              <ActionIcon
                size={32}
                radius="xl"
                color="#5C0505"
                onClick={handleSearchParams}
                disabled={query.length === 0}
              >
                <IconArrowRight
                  style={{ width: rem(18), height: rem(18) }}
                  stroke={1.5}
                />
              </ActionIcon>
            </Flex>
          )}
        </>
      }
      // {...props}
    />
  );
}
