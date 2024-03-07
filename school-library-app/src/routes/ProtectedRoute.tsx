import { Flex, Loader } from "@mantine/core";
import useCurrentUser from "@pages/Authentication/hooks/useCurrentUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isLoading } = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === undefined && !isLoading) navigate("/login", { replace: true });
  }, [isLoading, navigate, user]);

  if (isLoading)
    return (
      <Flex justify={"center"} align={"center"} mih={"100vh"} pos="relative">
        <Loader color="red.5" />
      </Flex>
    );

  return children;
};
export default ProtectedRoute;
