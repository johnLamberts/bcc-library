import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { returnDueCirculation } from "../service/circulation.service";

export function useReturnDueCirculation() {
  const queryClient = useQueryClient();
  const {
    isPending: isReturningDueTransaction,
    mutateAsync: createReturnDueTransaction,
  } = useMutation({
    mutationFn: returnDueCirculation,
    onSuccess: (_newArr, data) => {
      toast.success(
        `Success! You have successfully returned the books entitled: ${data.bookTitle} that you've borrwed `
      );
      queryClient.invalidateQueries({
        queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.BORROW_TRANSACTION],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isReturningDueTransaction, createReturnDueTransaction };
}
