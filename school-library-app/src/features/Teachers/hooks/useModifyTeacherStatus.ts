import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { ITeacher } from "../models/teacher.interface";
import { updateTeacherStatus } from "../services/teacher.service";

const useModifyTeacherStatus = () => {
  const queryClient = useQueryClient();

  const { mutate: modifyTeacherStatus, isPending } = useMutation({
    mutationFn: (user: ITeacher) => updateTeacherStatus(user),

    onError: (err) => {
      toast.error(err.message);
    },

    onSuccess: (_newArr, data) => {
      queryClient.invalidateQueries({
        queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.TEACHER],
      });
      toast.success(
        `Update successful! Status changes to ${data.email} have been applied.`
      );
    },
  });

  return { modifyTeacherStatus, isPending };
};
export default useModifyTeacherStatus;
