import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { addStudent } from "../service/student.service";

export function useCreateStudent() {
  const queryClient = useQueryClient();
  const { isPending: isCreatingUser, mutateAsync: createUsers } = useMutation({
    mutationFn: addStudent,
    onSuccess: (_newArr, data) => {
      toast.success(
        `Success! The ${data.email} has been created successfully. `
      );
      queryClient.invalidateQueries({
        queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.STUDENT],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreatingUser, createUsers };
}
