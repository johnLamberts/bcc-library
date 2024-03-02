import { Box, Divider, Group } from "@mantine/core";
import FeeReportTable from "@features/Reports/FeeReportTable";

export default function FeeReport() {
  return (
    <>
      <Group justify="space-between"></Group>

      {/* List of Users */}
      <Divider my="lg" c={"dimmed"} />
      <Box w={"100%"}>
        <Box my="xl">
          <FeeReportTable />
        </Box>
      </Box>
    </>
  );
}
