import Header from "@components/Header/Header";
import { Box } from "@mantine/core";
import { Footer } from "@pages/Homepage/Footer";
import { Outlet } from "react-router-dom";
const AppPageLayout = () => {
  return (
    <>
      <Header />
      <Box>
        <Outlet />
      </Box>
    </>
  );
};
export default AppPageLayout;
