import { Box, Divider, Group } from "@mantine/core";
import BookConditionReportTable from "@features/Reports/BookConditionReport";

export default function BookConditionReport() {
  return (
    <>
      <Group justify="space-between"></Group>

      {/* List of Users */}
      <Divider my="lg" c={"dimmed"} />
      <Box w={"100%"}>
        <Box my="xl">
          <BookConditionReportTable />
        </Box>
      </Box>
    </>
  );
}
