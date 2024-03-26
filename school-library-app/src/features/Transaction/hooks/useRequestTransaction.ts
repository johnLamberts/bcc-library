import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { addRequestTransaction } from "../service/circulation.service";

export function useCreateRequestTransaction() {
  const queryClient = useQueryClient();
  const { isPending: isRequestingBook, mutateAsync: createRequestTransaction } =
    useMutation({
      mutationFn: addRequestTransaction,
      onSuccess: (_newArr, data) => {
        toast.success(
          `Success! You have successfully completed the request transaction.
          I'm so glad to hear that you're interested in ${data.bookTitle}
        `
        );
        queryClient.invalidateQueries({
          queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.ALL_BOOKS_TRANSACTION],
        });
      },
      onError: (err) => toast.error(err.message),
    });

  return { isRequestingBook, createRequestTransaction };
}
