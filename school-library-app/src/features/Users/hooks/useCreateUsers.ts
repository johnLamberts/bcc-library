import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { addUser } from "../services/user.service";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";

export function useCreateUser() {
  const queryClient = useQueryClient();
  const { isPending: isCreatingUser, mutateAsync: createUsers } = useMutation({
    mutationFn: addUser,
    onSuccess: (_newArr, data) => {
      toast.success(
        `Success! The ${data.email} has been created successfully. `
      );
      queryClient.invalidateQueries({
        queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.USERS],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreatingUser, createUsers };
}
