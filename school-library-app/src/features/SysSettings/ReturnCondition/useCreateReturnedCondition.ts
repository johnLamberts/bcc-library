import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { addReturnCondition } from "./services/returned-condition.service";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";

const useCreateReturnCondition = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: createReturnCondition, isPending } = useMutation({
    mutationFn: addReturnCondition,

    onError: (err) => {
      toast.error(err.message);
    },

    onSuccess: (_newArr, data) => {
      toast.success(
        `Success! The ${data.returnCondition} has been created successfully. `
      );
      queryClient.invalidateQueries({
        queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.RETURNED_CONDITION],
      });
    },
  });

  return { createReturnCondition, isPending };
};
export default useCreateReturnCondition;
