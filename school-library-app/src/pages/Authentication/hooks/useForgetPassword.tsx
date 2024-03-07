import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { forgetPassword } from "../services/auth.service";
import { IUser } from "@features/Users/models/user.interface";

const useForgetPassword = () => {
  const {
    mutate: addForgetPassword,
    isError,
    isSuccess,
    isPending,
  } = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: ({ email }: IUser) => {
      return forgetPassword(email);
    },
    onSuccess: () => {
      toast.success(
        "An email containing instructions to reset your password has been sent to the email address associated with your account. Please check your inbox (and spam folder) for further instructions."
      );
    },
    onError: () => {
      toast.error("Provided email or password are incorrect");
    },
  });

  return { addForgetPassword, isError, isSuccess, isPending };
};
export default useForgetPassword;
