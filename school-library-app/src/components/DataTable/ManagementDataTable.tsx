import { MRT_ColumnDef, MRT_RowData } from "mantine-react-table";

interface IManagementDataTableProps<TData extends MRT_RowData> {
  data: TData[];
  columns: MRT_ColumnDef<TData>[];

  createDisplayMode: string;
  editDisplayMode: string;

  positionActionsColumn: string;
}

const ManagementDataTable = () => {
  return <div>ManagementDataTable</div>;
};
export default ManagementDataTable;
