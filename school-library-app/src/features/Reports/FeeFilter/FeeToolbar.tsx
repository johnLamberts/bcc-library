import { FacetedFilter } from "@components/FacetedFilter/FacetedFilter";
import useReadDamagedCategory from "@features/SysSettings/ReturnCondition/useReadDamagedCategory";
import useReadMissingCategory from "@features/SysSettings/ReturnCondition/useReadMissingCategory";
import useReadReturnCondition from "@features/SysSettings/ReturnCondition/useReadReturnCondition";
import { MRT_RowData, MRT_TableInstance } from "mantine-react-table";

interface FeeToolbarProps<TData extends MRT_RowData> {
  table: MRT_TableInstance<TData>;
}

const paymentStatus = [
  {
    label: "PAID",
    value: "PAID",
  },
  {
    label: "WITH BALANCE",
    value: "WITH BALANCE",
  },
];

const FeeToolbar = <TData extends MRT_RowData>({
  table,
}: FeeToolbarProps<TData>) => {
  const { data: damagedCategory = [] } = useReadReturnCondition();

  return (
    <>
      {table.getColumn("paymentStatus") && (
        <FacetedFilter
          column={table.getColumn("paymentStatus")}
          title="Payment Status"
          options={paymentStatus}
        />
      )}
      {table.getColumn("bookCondition") && (
        <FacetedFilter
          column={table.getColumn("bookCondition")}
          title="Book Condition"
          options={damagedCategory
            .filter(
              (item) => !item.returnCondition.toLowerCase().includes("return")
            )
            .map((item) => ({
              label: item.returnCondition,
              value: item.returnCondition,
            }))}
        />
      )}
    </>
  );
};
export default FeeToolbar;
