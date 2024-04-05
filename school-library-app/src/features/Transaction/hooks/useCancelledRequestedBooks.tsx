import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { addDeclineRequestedBook } from "../service/circulation.service";

export function useCreateDeclineRequestedBook() {
  const queryClient = useQueryClient();
  const {
    isPending: isCreatingCancelledReqBook,
    mutateAsync: createCancelledReqBook,
  } = useMutation({
    mutationFn: addDeclineRequestedBook,
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
    isCreatingCancelledReqBook,
    createCancelledReqBook,
  };
}
