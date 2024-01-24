import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { IStudents } from "../models/books.interface";
import { updateStudentStatus } from "../service/student.service";

const useModifyStudentStatus = () => {
  const queryClient = useQueryClient();

  const { mutate: modifyStudentStatus, isPending } = useMutation({
    mutationFn: (user: IStudents) => updateStudentStatus(user),

    onError: (err) => {
      toast.error(err.message);
    },

    onSuccess: (_newArr, data) => {
      queryClient.invalidateQueries({
        queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.STUDENT],
      });
      toast.success(
        `Update successful! Status changes to ${data.email} have been applied.`
      );
    },
  });

  return { modifyStudentStatus, isPending };
};
export default useModifyStudentStatus;
