import BorrowTransactionTable from "@features/Transaction/BorrowTransactionTable";
import BookRequestedTable from "@features/Transaction/BorrowsTablePage/RequestedTable";
import BookReservedTable from "@features/Transaction/BorrowsTablePage/ReservedTable";
import { Box, Divider, Group, SegmentedControl, Text } from "@mantine/core";
import { useSearchParams } from "react-router-dom";
import { useHeadTitle } from "src/hooks/use-head-tag";
import classes from "../styles/user.module.css";
const BorrowTransactionPage = () => {
  useHeadTitle("Borrow Transaction");
  const [searchParams, setSearchParams] = useSearchParams();

  const handleParams = (value: string) => {
    searchParams.set("bq", value);

    return setSearchParams(searchParams);
  };

  return (
    <>
      <Group justify="space-between">
        <SegmentedControl
          data={["Borrow List", "Pending Request", "Reserved"]}
          value={searchParams.get("bq") || "Borrow List"}
          onChange={handleParams}
        />

        {searchParams.get("bq") === "Pending Request" && (
          <Box className={classes.highlight}>
            <Text fz={"xs"} fw={"bold"} c={"red"}>
              Request Transaction
            </Text>
          </Box>
        )}

        {searchParams.get("bq") === "Reserved" && (
          <Box className={classes.highlight}>
            <Text fz={"xs"} fw={"bold"} c={"red"}>
              Reserved Transaction
            </Text>
          </Box>
        )}
      </Group>
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

      {searchParams.get("bq") === "Pending Request" && (
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
