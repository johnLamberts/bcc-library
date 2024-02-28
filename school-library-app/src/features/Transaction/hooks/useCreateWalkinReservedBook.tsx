import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { addWalkinReservedBook } from "../service/circulation.service";

export function useCreateWalkinReservedBook() {
  const queryClient = useQueryClient();
  const {
    isPending: isCreatingWalkingReserved,
    mutateAsync: createWalkinReserved,
  } = useMutation({
    mutationFn: addWalkinReservedBook,
    onSuccess: (_newArr, data) => {
      toast.success(
        `Success! You have successfully completed the borrowing transaction.
        Happy ${data.bookTitle} time
        `
      );
      queryClient.invalidateQueries({
        queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.RESERVED_BOOK],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreatingWalkingReserved, createWalkinReserved };
}
