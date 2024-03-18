import { Select } from "@mantine/core";
import { useSearchParams } from "react-router-dom";

const SelectAnnouncementCategory = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleChange = (params: string | null) => {
    if (searchParams.get("fq") === null || searchParams.get("fq") === "") {
      searchParams.set("fq", params as string);
    } else {
      searchParams.delete("fq");
    }

    return setSearchParams(searchParams);
  };
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
