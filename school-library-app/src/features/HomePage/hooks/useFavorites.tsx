import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { addToFavorites } from "../services/books.service";

export function useFavorites() {
  const queryClient = useQueryClient();
  const { isPending: isFavoriteBook, mutateAsync: createFavorites } =
    useMutation({
      mutationFn: addToFavorites,
      onSuccess: (_newArr, data) => {
        toast.success(
          `Success! You have successfully completed the request transaction.
              I'm so glad to hear that you're interested in ${data.bookTitle}
            `
        );
        queryClient.invalidateQueries({
          queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.ADD_TO_FAVORITES],
        });
      },
      onError: (err) => toast.error(err.message),
    });

  return { isFavoriteBook, createFavorites };
}
