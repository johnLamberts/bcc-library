import StockReportTable from "@features/Reports/StockReport";
import { Box } from "@mantine/core";

const StockReport = () => {
  return (
    <Box w={"100%"}>
      <Box my="xl">
        <StockReportTable />
      </Box>
    </Box>
  );
};
export default StockReport;
