import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { addBorrowTransaction } from "../service/circulation.service";

export function useCreateBorrow() {
  const queryClient = useQueryClient();
  const {
    isPending: isCreatingBorrowingTransaction,
    mutateAsync: createBorrowTransaction,
  } = useMutation({
    mutationFn: addBorrowTransaction,
    onSuccess: (_newArr, data) => {
      toast.success(
        `Success! You have successfully completed the borrowing transaction.
        Happy ${data.bookTitle} time
        `
      );
      queryClient.invalidateQueries({
        queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.BORROW_TRANSACTION],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreatingBorrowingTransaction, createBorrowTransaction };
}
