import CirculationTable from "@features/Circulation/CirculationTable";
import { Box, Text } from "@mantine/core";
import classes from "./styles/user.module.css";
const CirculationManagement = () => {
  return (
    <>
      <Box className={classes.highlight}>
        <Text fz={"xl"} fw={"bold"} c={"red"}>
          Transactions List
        </Text>
      </Box>
      <Box my="xl">
        <CirculationTable />
      </Box>
    </>
  );
};

export default CirculationManagement;
