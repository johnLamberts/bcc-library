import { Box } from "@mantine/core";
import { ReactNode } from "react";

type AppMainProps = {
  children: ReactNode;
};

const AppMain = ({ children }: AppMainProps) => {
  return (
    <Box py="lg" px="md" mih={"100vh"}>
      {children}
    </Box>
  );
};

export default AppMain;
