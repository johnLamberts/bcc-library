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
    onMutate: async (newLevels: IAuthor) => {
      await queryClient.cancelQueries({
        queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.BOOK_TYPE],
      });

      const prevLevel = queryClient.getQueryData([
        FIRESTORE_COLLECTION_QUERY_KEY.BOOK_TYPE,
      ]) as IAuthor[];

      queryClient.setQueryData(
        [FIRESTORE_COLLECTION_QUERY_KEY.BOOK_TYPE],
        (prevLevels: IAuthor[]) =>
          prevLevels?.map((level: IAuthor) =>
            level.id === newLevels.id ? newLevels : level
          )
      );

      return { prevLevel };
    },

    onError: (err, _newLevel, context) => {
      toast.error(`ERROR: ${err.message}`);
      return queryClient.setQueryData(
        [FIRESTORE_COLLECTION_QUERY_KEY.BOOK_TYPE],
        context?.prevLevel
      );
    },

    onSuccess: (_newArr, data, context) => {
      toast.success(
        `Update successful! ${
          context.prevLevel.filter((prev) => prev.id === data.id)[0]?.bookAuthor
        } Changes to ${data.bookAuthor} have been applied.`
      );
    },
  });

  return { modifyAuthor, isPending };
};
export default useModifyAuthor;
