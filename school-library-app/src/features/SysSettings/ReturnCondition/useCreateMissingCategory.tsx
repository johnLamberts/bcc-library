import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { addMissingCategory } from "./services/missing-category.service";

const useCreateMissingCategory = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: createMissingCategory, isPending } = useMutation({
    mutationFn: addMissingCategory,

    onError: (err) => {
      toast.error(err.message);
    },

    onSuccess: (_newArr, data) => {
      toast.success(
        `Success! The ${data.missingCategory} has been created successfully. `
      );
      queryClient.invalidateQueries({
        queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.MISSING_CATEGORY],
      });
    },
  });

  return { createMissingCategory, isPending };
};
export default useCreateMissingCategory;
