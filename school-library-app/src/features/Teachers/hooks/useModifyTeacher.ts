import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { updateTeacher } from "../services/teacher.service";

const useModifyTeacher = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: modifyTeacher, isPending } = useMutation({
    mutationFn: updateTeacher,
    onError: (err) => {
      toast.error(err.message);
    },

    onSuccess: (_newArr, data) => {
      queryClient.invalidateQueries({
        queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.TEACHER],
      });
      toast.success(
        `Update successful! Changes to ${data.email} have been applied.`
      );
    },
  });

  return { modifyTeacher, isPending };
};
export default useModifyTeacher;
