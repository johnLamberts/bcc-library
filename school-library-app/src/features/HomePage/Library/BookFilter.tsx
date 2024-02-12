import { Checkbox, Text } from "@mantine/core";
import { ChangeEvent, useEffect, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";

interface BookFilterProps {
  paramsName: string;
  options: {
    value: string;
    label: string;
  }[];
}

const BookFilter = ({ options, paramsName }: BookFilterProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultParams = searchParams.get(paramsName) || "";
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.checked) {
      searchParams.set(paramsName, event.currentTarget.value);
    } else {
      searchParams.delete(paramsName);
    }
    return setSearchParams(searchParams);
  };

  return (
    <>
      {options?.length > 0 ? (
        options.map((option) => {
          return (
            <Checkbox
              label={option.label}
              value={option.value}
              onChange={handleChange}
              checked={defaultParams === option.value}
              my="xs"
            />
          );
        })
      ) : (
        <Text c={"dimmed"}>No Book types available</Text>
      )}
    </>
  );
};
export default BookFilter;
