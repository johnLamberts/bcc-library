/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import ICategorySection from "../models/category-section.interface";
import { updateCategorySection } from "../services/category-section.service";

const useModifyCategorySection = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: modifyCategorySection, isPending } = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: (userRole: ICategorySection) =>
      updateCategorySection(userRole, userRole.id as string),
    onMutate: async (newLevels: ICategorySection) => {
      await queryClient.cancelQueries({
        queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.CATEGORY_SECTION],
      });

      const prevLevel = queryClient.getQueryData([
        FIRESTORE_COLLECTION_QUERY_KEY.CATEGORY_SECTION,
      ]) as ICategorySection[];

      queryClient.setQueryData(
        [FIRESTORE_COLLECTION_QUERY_KEY.CATEGORY_SECTION],
        (prevLevels: ICategorySection[]) =>
          prevLevels?.map((level: ICategorySection) =>
            level.id === newLevels.id ? newLevels : level
          )
      );

      return { prevLevel };
    },

    onError: (err, _newLevel, context) => {
      toast.error(`ERROR: ${err.message}`);
      return queryClient.setQueryData(
        [FIRESTORE_COLLECTION_QUERY_KEY.CATEGORY_SECTION],
        context?.prevLevel
      );
    },

    onSuccess: (_newArr, data, context) => {
      toast.success(
        `Update successful! ${
          context.prevLevel.filter((prev) => prev.id === data.id)[0]
            ?.categorySection
        } Changes to ${data.categorySection} have been applied.`
      );
    },
  });

  return { modifyCategorySection, isPending };
};
export default useModifyCategorySection;
