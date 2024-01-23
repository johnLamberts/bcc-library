import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { addCatalogue } from "../service/catalogue.service";

export function useCreateCatalogue() {
  const queryClient = useQueryClient();
  const { isPending: isCreatingCatalogue, mutateAsync: createCatalogue } =
    useMutation({
      mutationFn: addCatalogue,
      onSuccess: (_newArr, data) => {
        toast.success(
          `Success! The ${data.title} has been created successfully. `
        );
        queryClient.invalidateQueries({
          queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.CATALOGUE],
        });
      },
      onError: (err) => toast.error(err.message),
    });

  return { isCreatingCatalogue, createCatalogue };
}
