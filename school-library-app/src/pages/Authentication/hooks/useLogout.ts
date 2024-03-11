import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const useLogout = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate: logoutUser } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/login", { replace: true });
      toast.success(
        "Thank you for using our library! You're now being logged out. If you need assistance in the future, don't hesitate to reach out. Have a great day!"
      );
    },
  });

  return { logoutUser };
};
export default useLogout;
