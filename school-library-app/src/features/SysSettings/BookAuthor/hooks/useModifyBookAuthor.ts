/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { updateAuthor } from "../services/book-author.service";
import IAuthor from "../models/book-author.interface";

const useModifyAuthor = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: modifyAuthor, isPending } = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: (userRole: IAuthor) =>
      updateAuthor(userRole, userRole.id as string),

    onError: (err) => {
      toast.error(`ERROR: ${err.message}`);
    },

    onSuccess: (_newArr, data) => {
      toast.success(
        `Update successful! Changes to ${data.bookAuthor} have been applied.`
      );

      queryClient.invalidateQueries({
        queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.AUTHOR],
      });
    },
  });

  return { modifyAuthor, isPending };
};
export default useModifyAuthor;
