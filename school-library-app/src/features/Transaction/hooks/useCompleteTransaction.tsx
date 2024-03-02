import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { addUpdatePaymentTransaction } from "../service/circulation.service";

export function useCreateCompletePartialPayment() {
  const queryClient = useQueryClient();
  const {
    isPending: isPaymentCompletePending,
    mutateAsync: createCompletePendingPayment,
  } = useMutation({
    mutationFn: addUpdatePaymentTransaction,
    onSuccess: () => {
      toast.success(
        `Success! You have successfully completed the completed the transaction.`
      );
      queryClient.invalidateQueries({
        queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.PARTIAL_PAYMENT],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isPaymentCompletePending, createCompletePendingPayment };
}
