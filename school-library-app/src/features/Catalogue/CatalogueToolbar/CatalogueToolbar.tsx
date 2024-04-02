import { FacetedFilter } from "@components/FacetedFilter/FacetedFilter";
import { useReadBookType } from "@features/SysSettings/BookType/hooks/useReadBookType";
import { MRT_RowData, MRT_TableInstance } from "mantine-react-table";

interface CatalogueToolbarProps<TData extends MRT_RowData> {
  table: MRT_TableInstance<TData>;
}

const CatalogueToolbar = <TData extends MRT_RowData>({
  table,
}: CatalogueToolbarProps<TData>) => {
  const { data: bookType = [] } = useReadBookType();

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

      {table.getColumn("bookType") && (
        <FacetedFilter
          height="10rem"
          column={table.getColumn("bookType")}
          title="Book Type"
          options={bookType.map((type) => ({
            label: type.bookType,
            value: type.bookType,
          }))}
        />
      )}
    </>
  );
};
export default CatalogueToolbar;
