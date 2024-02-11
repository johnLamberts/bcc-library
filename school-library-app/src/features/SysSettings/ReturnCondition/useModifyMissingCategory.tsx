import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { updateMissingCategory } from "./services/missing-category.service";
import IMissingCategory from "./model/missing-category.interface";

const useModifyMissingCategory = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: modifyMissingCategory, isPending } = useMutation({
    mutationFn: (condition: IMissingCategory) =>
      updateMissingCategory(condition, condition.id),
    onMutate: async (newLevels: IMissingCategory) => {
      await queryClient.cancelQueries({
        queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.MISSING_CATEGORY],
      });

      const prevLevel = queryClient.getQueryData([
        FIRESTORE_COLLECTION_QUERY_KEY.MISSING_CATEGORY,
      ]) as IMissingCategory[];

      queryClient.setQueryData(
        [FIRESTORE_COLLECTION_QUERY_KEY.MISSING_CATEGORY],
        (prevLevels: IMissingCategory[]) =>
          prevLevels?.map((level: IMissingCategory) =>
            level.id === newLevels.id ? newLevels : level
          )
      );

      return { prevLevel };
    },

    onError: (err, _newLevel, context) => {
      toast.error(`ERROR: ${err.message}`);
      return queryClient.setQueryData(
        [FIRESTORE_COLLECTION_QUERY_KEY.MISSING_CATEGORY],
        context?.prevLevel
      );
    },

    onSuccess: (_newArr, data) => {
      toast.success(
        `Update successful! Changes to ${data.missingCategory} have been applied.`
      );
    },
  });

  return { modifyMissingCategory, isPending };
};
export default useModifyMissingCategory;
