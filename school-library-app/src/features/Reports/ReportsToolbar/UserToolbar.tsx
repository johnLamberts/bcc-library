/* eslint-disable @typescript-eslint/no-explicit-any */
import { FacetedFilter } from "@components/FacetedFilter/FacetedFilter";
import useReadUserRole from "@features/SysSettings/UserRole/hooks/useReadUserRole";
import { Button } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { format } from "date-fns";
import {
  MRT_Column,
  MRT_RowData,
  MRT_TableInstance,
} from "mantine-react-table";

interface UserToolbarProps<TData extends MRT_RowData> {
  table: MRT_TableInstance<TData>;
  // column: MRT_Column<any, unknown>;
  column?: MRT_Column<TData>;
}

const borrowers = [
  {
    label: "Teacher",
    value: "Teacher",
  },
  {
    label: "Student",
    value: "Student",
  },
];

const UserToolbar = <TData extends MRT_RowData>({
  table,
}: UserToolbarProps<TData>) => {
  const { data: userRoles = [] } = useReadUserRole();

  const concatRole = [
    ...borrowers,
    ...userRoles.map((item) => ({
      label: item.userRole,
      value: item.userRole,
    })),
  ];

  return (
    <>
      {/* {table.getColumn("Date Created") && (
        <UserDateRangeReport
          table={table}
          column={table.getColumn("Date Created")}
        />
      )} */}
      {table.getColumn("userRole") && (
        <FacetedFilter
          column={table.getColumn("userRole")}
          title="Borrowers"
          options={concatRole}
        />
      )}
    </>
  );
};
export default UserToolbar;
