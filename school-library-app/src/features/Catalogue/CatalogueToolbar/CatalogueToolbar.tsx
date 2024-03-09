import { FacetedFilter } from "@components/FacetedFilter/FacetedFilter";
import { MRT_RowData, MRT_TableInstance } from "mantine-react-table";

interface CatalogueToolbarProps<TData extends MRT_RowData> {
  table: MRT_TableInstance<TData>;
}

const CatalogueToolbar = <TData extends MRT_RowData>({
  table,
}: CatalogueToolbarProps<TData>) => {
  return (
    <>
      {table.getColumn("bookStatus") && (
        <FacetedFilter
          column={table.getColumn("bookStatus")}
          title="Book Status"
          options={[
            { label: "Active", value: "Active" },
            { label: "Inactive", value: "Inactive" },
            { label: "Out of Stock", value: "Out of Stock" },
          ]}
        />
      )}
    </>
  );
};
export default CatalogueToolbar;
