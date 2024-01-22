import { Box, Divider, Group } from "@mantine/core";
import UserReportTable from "@features/Reports/UserReport";

export default function UserReport() {
  return (
    <>
      <Group justify="space-between"></Group>

      {/* List of Users */}
      <Divider my="lg" c={"dimmed"} />
      <Box w={"100%"}>
        <Box my="xl">
          <UserReportTable />
        </Box>
      </Box>
    </>
  );
}
