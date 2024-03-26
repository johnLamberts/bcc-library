import { Select } from "@mantine/core";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const SelectAnnouncementCategory = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleChange = (params: string | null) => {
    searchParams.set("fq", params as string);
    return setSearchParams(searchParams);
  };

  useEffect(() => {
    if (searchParams.get("fq") === String(null)) {
      searchParams.delete("fq");
      return setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams]);
  return (
    <>
      <Select
        placeholder="Filter by Category"
        data={["React", "Angular", "Vue", "Svelte"]}
        onChange={handleChange}
        radius="xl"
        size="md"
      />
    </>
  );
};
export default SelectAnnouncementCategory;
