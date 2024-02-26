import PendingTable from "@features/Transaction/BorrowsTablePage/PendingTable";
import ReturnTransactionTable from "@features/Transaction/ReturnTransactionTable";
import { Box, Divider, Flex, SegmentedControl } from "@mantine/core";
import { useSearchParams } from "react-router-dom";

const ReturnTransaction = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleParams = (value: string) => {
    searchParams.set("rq", value);

    return setSearchParams(searchParams);
  };
  return (
    <>
      <Flex>
        <SegmentedControl
          data={["Return List", "Pending"]}
          value={searchParams.get("rq") || "Return List"}
          onChange={handleParams}
        />
      </Flex>
      <Divider my={"md"} />

      {searchParams.get("rq") === null && (
        <Box>
          <ReturnTransactionTable />
        </Box>
      )}

      {searchParams.get("rq") === "Return List" && (
        <Box>
          <ReturnTransactionTable />
        </Box>
      )}

      {searchParams.get("rq") === "Pending" && (
        <Box>
          <PendingTable />
        </Box>
      )}
    </>
  );
};
export default ReturnTransaction;
