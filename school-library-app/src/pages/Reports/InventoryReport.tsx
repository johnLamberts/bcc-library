import { Box } from "@mantine/core";
import InventoryReportTable from "@features/Reports/InventoryReport";

export default function InventoryReport() {
  return (
    <>
      {/* List of Users */}
      <Box w={"100%"}>
        <Box my="xl">
          <InventoryReportTable />
        </Box>
      </Box>
    </>
  );
}
