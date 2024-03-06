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

    onError: (err) => {
      toast.error(`ERROR: ${err.message}`);
    },

    onSuccess: (_newArr, data) => {
      toast.success(
        `Update successful! 
          Changes to ${data.categorySection} have been applied.`
      );

      queryClient.invalidateQueries({
        queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.CATEGORY_SECTION],
      });
    },
  });

  return { modifyCategorySection, isPending };
};
export default useModifyCategorySection;
