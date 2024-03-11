import { Flex, Loader } from "@mantine/core";
import useCurrentUser from "@pages/Authentication/hooks/useCurrentUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface AdminRequiredProps {
  children: React.ReactNode;
}

const AdminRequired = ({ children }: AdminRequiredProps) => {
  const { user, isLoading } = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.userRole.toLowerCase().includes("admin"))
      navigate("/forbidden", { replace: true });
  }, [isLoading, navigate, user]);

  if (isLoading)
    return (
      <Flex justify={"center"} align={"center"} mih={"100vh"} pos="relative">
        <Loader color="red.5" />
      </Flex>
    );

  return children;
};
export default AdminRequired;
