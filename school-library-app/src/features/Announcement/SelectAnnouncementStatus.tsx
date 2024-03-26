import { Select } from "@mantine/core";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const SelectAnnouncementStatus = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleChange = (params: string | null) => {
    if (searchParams.get("act") === null || searchParams.get("act") === "") {
      searchParams.set("act", params as string);
    } else {
      searchParams.delete("act");
    }

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
        data={["Active", "Inactive"]}
        onChange={handleChange}
        radius="xl"
        size="md"
      />
    </>
  );
};
export default SelectAnnouncementStatus;
