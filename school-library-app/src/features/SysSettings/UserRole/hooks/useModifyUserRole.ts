/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import TUserRole from "../models/user-role.interface";
import { updateUserRole } from "../services/user-role.service";

const useModifyUserRole = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: modifyUserRole, isPending } = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: (userRole: TUserRole) =>
      updateUserRole(userRole, userRole.id as string),
    onMutate: async (newLevels: TUserRole) => {
      await queryClient.cancelQueries({
        queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.USER_ROLE],
      });

      const prevLevel = queryClient.getQueryData([
        FIRESTORE_COLLECTION_QUERY_KEY.USER_ROLE,
      ]) as TUserRole[];

      queryClient.setQueryData(
        [FIRESTORE_COLLECTION_QUERY_KEY.USER_ROLE],
        (prevLevels: TUserRole[]) =>
          prevLevels?.map((level: TUserRole) =>
            level.id === newLevels.id ? newLevels : level
          )
      );

      return { prevLevel };
    },

    onError: (err, _newLevel, context) => {
      toast.error(`ERROR: ${err.message}`);
      return queryClient.setQueryData(
        [FIRESTORE_COLLECTION_QUERY_KEY.USER_ROLE],
        context?.prevLevel
      );
    },

    onSuccess: (_newArr, data, context) => {
      toast.success(
        `Update successful! ${
          context.prevLevel.filter((prev) => prev.id === data.id)[0]?.userRole
        } Changes to ${data.userRole} have been applied.`
      );
    },
  });

  return { modifyUserRole, isPending };
};
export default useModifyUserRole;
