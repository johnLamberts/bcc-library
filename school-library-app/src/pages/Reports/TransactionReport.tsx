import { Box } from "@mantine/core";
import TransactionReportTable from "@features/Reports/TransactionReport";

export default function TransactionReport() {
  return (
    <>
      {/* List of Users */}
      <Box w={"100%"}>
        <Box my="xl">
          <TransactionReportTable />
        </Box>
      </Box>
    </>
  );
}
