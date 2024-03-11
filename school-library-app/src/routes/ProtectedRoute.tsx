import { Flex, Loader } from "@mantine/core";
import useCurrentUser from "@pages/Authentication/hooks/useCurrentUser";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isLoading } = useCurrentUser();

  // useEffect(() => {
  //   if (user === undefined && !isLoading) navigate("/login", { replace: true });
  // }, [isLoading, navigate, user]);

  if (isLoading)
    return (
      <Flex justify={"center"} align={"center"} mih={"100vh"} pos="relative">
        <Loader color="red.5" />
      </Flex>
    );

  return user === undefined && !isLoading ? (
    <Navigate to={"/login"} />
  ) : (
    children
  );
};
export default ProtectedRoute;
