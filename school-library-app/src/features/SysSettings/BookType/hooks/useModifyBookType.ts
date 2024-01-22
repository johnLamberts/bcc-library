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
    onMutate: async (newLevels: IBookType) => {
      await queryClient.cancelQueries({
        queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.BOOK_TYPE],
      });

      const prevLevel = queryClient.getQueryData([
        FIRESTORE_COLLECTION_QUERY_KEY.BOOK_TYPE,
      ]) as IBookType[];

      queryClient.setQueryData(
        [FIRESTORE_COLLECTION_QUERY_KEY.BOOK_TYPE],
        (prevLevels: IBookType[]) =>
          prevLevels?.map((level: IBookType) =>
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
          context.prevLevel.filter((prev) => prev.id === data.id)[0]?.bookType
        } Changes to ${data.bookType} have been applied.`
      );
    },
  });

  return { modifyBookType, isPending };
};
export default useModifyBookType;
