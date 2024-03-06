import BorrowTransactionTable from "@features/Transaction/BorrowTransactionTable";
import BookRequestedTable from "@features/Transaction/BorrowsTablePage/RequestedTable";
import BookReservedTable from "@features/Transaction/BorrowsTablePage/ReservedTable";
import { Box, Divider, Flex, SegmentedControl } from "@mantine/core";
import { useSearchParams } from "react-router-dom";
import { useHeadTitle } from "src/hooks/use-head-tag";

const BorrowTransactionPage = () => {
  useHeadTitle("Borrow Transaction");
  const [searchParams, setSearchParams] = useSearchParams();

  const handleParams = (value: string) => {
    searchParams.set("bq", value);

    return setSearchParams(searchParams);
  };

  return (
    <>
      <Flex>
        <SegmentedControl
          data={["Borrow List", "Request", "Reserved"]}
          value={searchParams.get("bq") || "Borrow List"}
          onChange={handleParams}
        />
      </Flex>
      <Divider my={"md"} />
      {searchParams.get("bq") === null && (
        <Box>
          <BorrowTransactionTable />
        </Box>
      )}

      {searchParams.get("bq") === "Borrow List" && (
        <Box>
          <BorrowTransactionTable />
        </Box>
      )}

      {searchParams.get("bq") === "Request" && (
        <Box>
          {/* <BorrowTransactionTable /> */}
          <BookRequestedTable />
        </Box>
      )}

      {searchParams.get("bq") === "Reserved" && (
        <Box>
          {/* <BorrowTransactionTable /> */}
          {/* <BookRequestedTable /> */}
          <BookReservedTable />
        </Box>
      )}
    </>
  );
};
export default BorrowTransactionPage;
