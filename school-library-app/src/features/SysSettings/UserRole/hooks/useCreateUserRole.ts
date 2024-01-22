import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { addUserRole } from "../services/user-role.service";

const useCreateUserRole = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: createUserRole, isPending } = useMutation({
    mutationFn: addUserRole,
    // onMutate: async (newAcademic: TUserRole) => {
    //   await queryClient.cancelQueries({
    //     queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.USER_ROLE],
    //   });

    //   const prevTUserRole = queryClient.getQueryData([
    //     FIRESTORE_COLLECTION_QUERY_KEY.USER_ROLE,
    //   ]);

    //   queryClient.setQueryData(
    //     [FIRESTORE_COLLECTION_QUERY_KEY.USER_ROLE],
    //     (prevLevels: TUserRole[]) =>
    //     prevLevels?.map((level: TUserRole) =>
    //       ([...])
    //     )
    //   );

    //   return { prevTUserRole };
    // },

    onError: (err) => {
      toast.error(err.message);
    },

    onSuccess: (_newArr, data) => {
      toast.success(
        `Success! The ${data.userRole} has been created successfully. `
      );
      queryClient.invalidateQueries({
        queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.USER_ROLE],
      });
    },
  });

  return { createUserRole, isPending };
};
export default useCreateUserRole;
