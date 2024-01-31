import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateReturnCondition } from "./services/returned-condition.service";
import IReturnCondition from "./model/return-condition.interface";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";

const useModifyReturnCondition = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: modifyReturnCondition, isPending } = useMutation({
    mutationFn: (condition: IReturnCondition) =>
      updateReturnCondition(condition),
    onMutate: async (newLevels: IReturnCondition) => {
      await queryClient.cancelQueries({
        queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.RETURNED_CONDITION],
      });

      const prevLevel = queryClient.getQueryData([
        FIRESTORE_COLLECTION_QUERY_KEY.RETURNED_CONDITION,
      ]) as IReturnCondition[];

      queryClient.setQueryData(
        [FIRESTORE_COLLECTION_QUERY_KEY.RETURNED_CONDITION],
        (prevLevels: IReturnCondition[]) =>
          prevLevels?.map((level: IReturnCondition) =>
            level.id === newLevels.id ? newLevels : level
          )
      );

      return { prevLevel };
    },

    onError: (err, _newLevel, context) => {
      toast.error(`ERROR: ${err.message}`);
      return queryClient.setQueryData(
        [FIRESTORE_COLLECTION_QUERY_KEY.RETURNED_CONDITION],
        context?.prevLevel
      );
    },

    onSuccess: (_newArr, data) => {
      toast.success(
        `Update successful! Changes to ${data.returnCondition} have been applied.`
      );
    },
  });

  return { modifyReturnCondition, isPending };
};
export default useModifyReturnCondition;
