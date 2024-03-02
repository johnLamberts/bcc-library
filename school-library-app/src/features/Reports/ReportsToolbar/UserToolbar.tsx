import { FacetedFilter } from "@components/FacetedFilter/FacetedFilter";
import useReadUserRole from "@features/SysSettings/UserRole/hooks/useReadUserRole";
import { MRT_RowData, MRT_TableInstance } from "mantine-react-table";

interface UserToolbarProps<TData extends MRT_RowData> {
  table: MRT_TableInstance<TData>;
}

const status = [
  {
    label: "Enable",
    value: "Enable",
  },
  {
    label: "Disable",
    value: "Disable",
  },
];

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
