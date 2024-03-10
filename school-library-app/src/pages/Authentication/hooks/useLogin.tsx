import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { login } from "../services/auth.service";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const {
    mutate: loginUser,
    isError,
    isSuccess,
    isPending,
  } = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: ({ email, password }: any) => {
      return login(email, password);
      // return login(user);
    },
    onSuccess: (user) => {
      queryClient.setQueryData(
        [FIRESTORE_COLLECTION_QUERY_KEY.CURRENT_USER],
        user
      );

      if (user?.[0].isEnabled) {
        const userRole = user?.[0].userRole;

        if (
          userRole?.toLowerCase().includes("student") ||
          userRole?.toLowerCase().includes("teacher")
        ) {
          navigate("/home");
        } else if (userRole?.toLowerCase().includes("admin")) {
          navigate("/dashboard");
        }

        toast.success("You have successfully");
      } else {
        toast.warning(
          "Apologies, your account has been disabled. Please contact support for further assistance."
        );
      }
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error(
        "Invalid email or password. Please double-check your credentials and try again."
      );
    },
  });

  return { loginUser, isError, isSuccess, isPending };
};
export default useLogin;
