import { Box, Group } from "@mantine/core";
import TeacherReportTable from "@features/Reports/TeacherReport";

export default function TeacherReport() {
  return (
    <>
      <Group justify="space-between"></Group>

      {/* List of Users */}
      <Box w={"100%"}>
        <Box my="xl">
          <TeacherReportTable />
        </Box>
      </Box>
    </>
  );
}
