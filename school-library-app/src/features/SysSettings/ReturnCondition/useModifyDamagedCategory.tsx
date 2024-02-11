import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import IDamagedCategory from "./model/damaged-category.interface";
import { updateDmagedCategory } from "./services/damaged-category.service";

const useModifyDamagedCategory = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: modifyDamagedCategory, isPending } = useMutation({
    mutationFn: (condition: IDamagedCategory) =>
      updateDmagedCategory(condition, condition.id),
    onMutate: async (newLevels: IDamagedCategory) => {
      await queryClient.cancelQueries({
        queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.DAMAGE_CATEGORY],
      });

      const prevLevel = queryClient.getQueryData([
        FIRESTORE_COLLECTION_QUERY_KEY.DAMAGE_CATEGORY,
      ]) as IDamagedCategory[];

      queryClient.setQueryData(
        [FIRESTORE_COLLECTION_QUERY_KEY.DAMAGE_CATEGORY],
        (prevLevels: IDamagedCategory[]) =>
          prevLevels?.map((level: IDamagedCategory) =>
            level.id === newLevels.id ? newLevels : level
          )
      );

      return { prevLevel };
    },

    onError: (err, _newLevel, context) => {
      toast.error(`ERROR: ${err.message}`);
      return queryClient.setQueryData(
        [FIRESTORE_COLLECTION_QUERY_KEY.DAMAGE_CATEGORY],
        context?.prevLevel
      );
    },

    onSuccess: (_newArr, data) => {
      toast.success(
        `Update successful! Changes to ${data.damagedCategory} have been applied.`
      );
    },
  });

  return { modifyDamagedCategory, isPending };
};
export default useModifyDamagedCategory;
