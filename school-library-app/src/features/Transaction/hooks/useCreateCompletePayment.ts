import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { addCompletePaymentTransaction } from "../service/circulation.service";

export function useCreateCompletePayment() {
  const queryClient = useQueryClient();
  const {
    isPending: isPaymentCompletePending,
    mutateAsync: createCompletePayment,
  } = useMutation({
    mutationFn: addCompletePaymentTransaction,
    onSuccess: (_newArr, data) => {
      toast.success(
        `Success! You have successfully completed the borrowing transaction.
        Happy ${data.bookTitle} time
        `
      );
      queryClient.invalidateQueries({
        queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.RETURNED_TRANSACTION],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isPaymentCompletePending, createCompletePayment };
}
