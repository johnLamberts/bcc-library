import { Flex, Loader } from "@mantine/core";
import useCurrentUser from "@pages/Authentication/hooks/useCurrentUser";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

interface AdminRequiredProps {
  children: React.ReactNode;
}

const AdminRequired = ({ children }: AdminRequiredProps) => {
  const { user, isLoading } = useCurrentUser();

  const userRole = user?.userRole?.toLowerCase()?.includes("admin");

  console.log(user);
  if (isLoading)
    return (
      <Flex justify={"center"} align={"center"} mih={"100vh"} pos="relative">
        <Loader color="red.5" />
      </Flex>
    );

  return userRole ? children : <Navigate to={"/forbidden"} replace />;
};
export default AdminRequired;
