import { Select } from "@mantine/core";

const SelectAnnouncementCategory = () => {
  return (
    <>
      <Select
        placeholder="Filter by Category"
        data={["React", "Angular", "Vue", "Svelte"]}
        allowDeselect={false}
        radius="xl"
        size="md"
      />
    </>
  );
};
export default SelectAnnouncementCategory;
