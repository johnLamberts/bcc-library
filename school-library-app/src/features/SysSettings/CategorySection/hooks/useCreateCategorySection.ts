import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { addCategorySection } from "../services/category-section.service";

const useCreateCategorySection = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: createCategorySection, isPending } = useMutation({
    mutationFn: addCategorySection,

    onError: (err) => {
      toast.error(err.message);
    },

    onSuccess: (_newArr, data) => {
      toast.success(
        `Success! The ${data.categorySection} has been created successfully. `
      );
      queryClient.invalidateQueries({
        queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.CATEGORY_SECTION],
      });
    },
  });
  return { createCategorySection, isPending };
};
export default useCreateCategorySection;
