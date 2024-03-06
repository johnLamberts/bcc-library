/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { updateBookType } from "../services/book-type.service";
import IBookType from "../models/book-type.interface";

const useModifyBookType = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: modifyBookType, isPending } = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: (userRole: IBookType) =>
      updateBookType(userRole, userRole.id as string),

    onError: (err) => {
      toast.error(`ERROR: ${err.message}`);
    },

    onSuccess: (_newArr, data) => {
      toast.success(
        `Update successful! Changes to ${data.bookType} have been applied.`
      );

      queryClient.invalidateQueries({
        queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.BOOK_TYPE],
      });
    },
  });

  return { modifyBookType, isPending };
};
export default useModifyBookType;
