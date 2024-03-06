import BorrowTransactionTable from "@features/Transaction/BorrowTransactionTable";
import { Box } from "@mantine/core";
import { useHeadTitle } from "src/hooks/use-head-tag";

const CirculationManagement = () => {
  useHeadTitle("Borrow Transaction");
  return (
    <>
      <Box>
        <BorrowTransactionTable />
      </Box>
    </>
  );
};

export default CirculationManagement;
