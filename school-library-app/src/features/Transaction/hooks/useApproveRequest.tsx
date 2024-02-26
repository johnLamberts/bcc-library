import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { addApproveRequestedBook } from "../service/circulation.service";

export function useCreateApproveRequest() {
  const queryClient = useQueryClient();
  const {
    isPending: isCreatingApproveRequestTransaction,
    mutateAsync: createApproveRequestTransaction,
  } = useMutation({
    mutationFn: addApproveRequestedBook,
    onSuccess: (_newArr, data) => {
      toast.success(
        `Success! You have successfully completed the borrowing transaction.
        Happy ${data.bookTitle} time
        `
      );
      queryClient.invalidateQueries({
        queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.REQUEST_BOOK],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    isCreatingApproveRequestTransaction,
    createApproveRequestTransaction,
  };
}
