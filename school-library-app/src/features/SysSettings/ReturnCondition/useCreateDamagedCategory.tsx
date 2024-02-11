import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { addDamagedCategory } from "./services/damaged-category.service";

const useCreateDamagedCategory = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: createDamagedCategory, isPending } = useMutation({
    mutationFn: addDamagedCategory,

    onError: (err) => {
      toast.error(err.message);
    },

    onSuccess: (_newArr, data) => {
      toast.success(
        `Success! The ${data.damagedCategory} has been created successfully. `
      );
      queryClient.invalidateQueries({
        queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.DAMAGE_CATEGORY],
      });
    },
  });

  return { createDamagedCategory, isPending };
};
export default useCreateDamagedCategory;
