import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { addPatrialPaymentTransaction } from "../service/circulation.service";

export function useCreatePartialPayment() {
  const queryClient = useQueryClient();
  const {
    isPending: isPaymentPartialPending,
    mutateAsync: createWalkinReserved,
  } = useMutation({
    mutationFn: addPatrialPaymentTransaction,
    onSuccess: (_newArr, data) => {
      toast.success(
        `Success! You have successfully completed the borrowing transaction.
        Happy ${data.bookTitle} time
        `
      );
      queryClient.invalidateQueries({
        queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.PARTIAL_PAYMENT],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isPaymentPartialPending, createWalkinReserved };
}
