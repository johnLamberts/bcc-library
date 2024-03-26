import { Group, Box, Flex, Text } from "@mantine/core";
import classes from "./styles/user.module.css";
import AcquisitionStock from "@features/AcquisitionStock/AcquisitionStock";
const ManageAcquisationStock = () => {
  return (
    <>
      <Group justify="space-between">
        <Box>
          <Flex align={"center"} gap={"xs"}>
            <Box className={classes.highlight}>
              <Text fz={"xs"} fw={"bold"} c={"red"}>
                Manage Acquisition and Stock
              </Text>
            </Box>
          </Flex>
        </Box>
      </Group>

      <Box my="xl">
        <AcquisitionStock />
      </Box>
    </>
  );
};
export default ManageAcquisationStock;
