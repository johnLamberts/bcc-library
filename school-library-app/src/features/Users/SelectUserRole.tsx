import useReadUserRole from "@features/SysSettings/UserRole/hooks/useReadUserRole";
import { Select } from "@mantine/core";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const SelectUserRole = () => {
  const { data: userRole, isLoading } = useReadUserRole();

  const [searchParams, setSearchParams] = useSearchParams();
  const handleChange = (params: string | null) => {
    searchParams.set("usr", params as string);
    return setSearchParams(searchParams);
  };

  useEffect(() => {
    if (searchParams.get("usr") === String(null)) {
      searchParams.delete("usr");
      return setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams]);

  const sanitizeUserRole = userRole?.map((user) => ({
    label: user.userRole,
    value: user.userRole,
  }));
  return (
    <>
      <Select
        placeholder="Filter by Role"
        data={sanitizeUserRole}
        value={searchParams.get("usr") || ""}
        onChange={handleChange}
        disabled={isLoading}
        radius="xl"
        size="md"
      />
    </>
  );
};
export default SelectUserRole;
