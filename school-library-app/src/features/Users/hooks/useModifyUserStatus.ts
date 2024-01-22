import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { IUser } from "../models/user.interface";
import { updateUserStatus } from "../services/user.service";

const useModifyUserStatus = () => {
  const queryClient = useQueryClient();

  const { mutate: modifyUserStatus, isPending } = useMutation({
    mutationFn: (user: IUser) => updateUserStatus(user),

    onError: (err) => {
      toast.error(err.message);
    },

    onSuccess: (_newArr, data) => {
      queryClient.invalidateQueries({
        queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.USERS],
      });
      toast.success(
        `Update successful! Status changes to ${data.email} have been applied.`
      );
    },
  });

  return { modifyUserStatus, isPending };
};
export default useModifyUserStatus;
