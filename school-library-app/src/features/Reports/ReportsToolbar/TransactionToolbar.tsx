import { FacetedFilter } from "@components/FacetedFilter/FacetedFilter";
import { MRT_RowData, MRT_TableInstance } from "mantine-react-table";

interface TransactionToolbarProps<TData extends MRT_RowData> {
  table: MRT_TableInstance<TData>;
}

const status = [
  {
    label: "Active",
    value: "Active",
  },
  {
    label: "Overdue",
    value: "Overdue",
  },
  {
    label: "Returned",
    value: "Returned",
  },
  {
    label: "Cancelled",
    value: "Cancelled",
  },
  {
    label: "Request",
    value: "Request",
  },
  {
    label: "Reserved",
    value: "Reserved",
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

const TransactionToolbar = <TData extends MRT_RowData>({
  table,
}: TransactionToolbarProps<TData>) => {
  return (
    <>
      {table.getColumn("status") && (
        <FacetedFilter
          column={table.getColumn("status")}
          title="Payment Status"
          options={status}
        />
      )}

      {table.getColumn("borrowers") && (
        <FacetedFilter
          column={table.getColumn("borrowers")}
          title="Borrowers"
          options={borrowers}
        />
      )}
    </>
  );
};
export default TransactionToolbar;
