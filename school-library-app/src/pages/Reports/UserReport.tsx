import { Box } from "@mantine/core";
import UserReportTable from "@features/Reports/UserReport";

export default function UserReport() {
  return (
    <>
      {/* List of Users */}
      <Box w={"100%"}>
        <UserReportTable />
      </Box>
    </>
  );
}
