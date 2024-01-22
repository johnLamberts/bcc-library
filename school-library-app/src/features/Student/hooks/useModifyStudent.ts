import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { updateStudent } from "../service/student.service";

const useModifyStudent = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: modifyStudent, isPending } = useMutation({
    mutationFn: updateStudent,
    onError: (err) => {
      toast.error(err.message);
    },

    onSuccess: (_newArr, data) => {
      queryClient.invalidateQueries({
        queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.STUDENT],
      });
      toast.success(
        `Update successful! Changes to ${data.email} have been applied.`
      );
    },
  });

  return { modifyStudent, isPending };
};
export default useModifyStudent;
