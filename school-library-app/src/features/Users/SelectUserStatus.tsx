import { Select } from "@mantine/core";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const SelectUserStatus = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleChange = (params: string | null) => {
    searchParams.set("act", params as string);
    return setSearchParams(searchParams);
  };

  useEffect(() => {
    if (searchParams.get("act") === String(null)) {
      searchParams.delete("act");
      return setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams]);

  return (
    <>
      <Select
        placeholder="Filter by Status"
        data={[
          { label: "Active", value: "true" },
          { label: "Inactive", value: "false" },
        ]}
        onChange={handleChange}
        value={searchParams.get("act") || ""}
        //   disabled={isLoading}
        radius="xl"
        size="md"
      />
    </>
  );
};
export default SelectUserStatus;
