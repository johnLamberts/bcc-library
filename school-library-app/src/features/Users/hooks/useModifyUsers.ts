import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { IUser } from "../models/user.interface";
import { updateUser } from "../services/user.service";

const useModifyUser = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: modifyUser, isPending } = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: (user: IUser) => updateUser(user, user.id as string),
    onMutate: async (newLevels: IUser) => {
      await queryClient.cancelQueries({
        queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.USERS],
      });

      const prevLevel = queryClient.getQueryData([
        FIRESTORE_COLLECTION_QUERY_KEY.USERS,
      ]) as IUser[];

      queryClient.setQueryData(
        [FIRESTORE_COLLECTION_QUERY_KEY.USERS],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (prevLevels: any) => {
          const { data } = prevLevels.data || [];
          return data?.map((level: IUser) =>
            level.id === newLevels.id ? newLevels : level
          );
        }
      );

      return { prevLevel };
    },

    onError: (err) => {
      toast.error(err.message);
    },

    onSuccess: (_newArr, data) => {
      queryClient.invalidateQueries({
        queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.USERS],
      });
      toast.success(
        `Update successful! Changes to ${data.email} have been applied.`
      );
    },
  });

  return { modifyUser, isPending };
};
export default useModifyUser;
