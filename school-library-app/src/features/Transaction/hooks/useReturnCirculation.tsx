import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { returnOverdueCirculation } from "../service/circulation.service";

export function useReturnOverdueCirculation() {
  const queryClient = useQueryClient();
  const {
    isPending: isReturningTransaction,
    mutateAsync: createReturnOverdueTransaction,
  } = useMutation({
    mutationFn: returnOverdueCirculation,
    onSuccess: (_newArr, data) => {
      toast.success(
        `Success! You have successfully returned the books entitled: ${data.bookTitle} that you've borrwed `
      );
      queryClient.invalidateQueries({
        queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.ALL_BOOKS_TRANSACTION],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isReturningTransaction, createReturnOverdueTransaction };
}
