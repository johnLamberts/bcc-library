import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { addTeacher } from "../services/teacher.service";

export function useCreateTeacher() {
  const queryClient = useQueryClient();
  const { isPending: isCreatingTeacher, mutateAsync: createTeacher } =
    useMutation({
      mutationFn: addTeacher,
      onSuccess: (_newArr, data) => {
        toast.success(
          `Success! The ${data.email} has been created successfully. `
        );
        queryClient.invalidateQueries({
          queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.TEACHER],
        });
      },
      onError: (err) => toast.error(err.message),
    });

  return { isCreatingTeacher, createTeacher };
}
