import PendingTable from "@features/Transaction/BorrowsTablePage/PendingTable";
import ReturnTransactionTable from "@features/Transaction/ReturnTransactionTable";
import { Box, Divider, Group, SegmentedControl, Text } from "@mantine/core";
import { useSearchParams } from "react-router-dom";
import { useHeadTitle } from "src/hooks/use-head-tag";
import classes from "../styles/user.module.css";
const ReturnTransaction = () => {
  useHeadTitle("Return Transaction");
  const [searchParams, setSearchParams] = useSearchParams();

  const handleParams = (value: string) => {
    searchParams.set("rq", value);

    return setSearchParams(searchParams);
  };
  return (
    <>
      <Group justify="space-between">
        <SegmentedControl
          data={["Return List", "Pending"]}
          value={searchParams.get("rq") || "Return List"}
          onChange={handleParams}
        />

        {searchParams.get("rq") === "Return List" && (
          <Box className={classes.highlight}>
            <Text fz={"xs"} fw={"bold"} c={"red"}>
              Return Transaction
            </Text>
          </Box>
        )}

        {searchParams.get("rq") === null && (
          <Box className={classes.highlight}>
            <Text fz={"xs"} fw={"bold"} c={"red"}>
              Return Transaction
            </Text>
          </Box>
        )}

        {searchParams.get("rq") === "Pending" && (
          <Box className={classes.highlight}>
            <Text fz={"xs"} fw={"bold"} c={"red"}>
              Pending Transaction
            </Text>
          </Box>
        )}
      </Group>
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
