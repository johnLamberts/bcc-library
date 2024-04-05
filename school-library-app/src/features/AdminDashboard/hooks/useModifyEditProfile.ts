import { IUser } from "@features/Users/models/user.interface";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { updateUser } from "@features/Users/services/user.service";

const useModifyEditProfile = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: modifyProfile, isPending } = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: (user: IUser) => updateUser(user, user.id as string),

    onError: (err) => {
      toast.error(`ERROR: ${err.message}`);
    },

    onSuccess: (_newArr, data) => {
      toast.success(
        `Update successful! Changes to ${data.email} have been applied.`
      );

      queryClient.invalidateQueries({
        queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.CURRENT_USER],
      });
    },
  });

  return { modifyProfile, isPending };
};
export default useModifyEditProfile;
