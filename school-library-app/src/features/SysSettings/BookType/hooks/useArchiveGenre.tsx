import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import IBookType from "../models/book-type.interface";
import { createArchiveBookType } from "../services/book-type.service";

const useArchiveBookType = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: modifyGenre, isPending: isArchiving } = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: (bookType: IBookType) => createArchiveBookType(bookType),

    onError: (err) => {
      toast.error(`ERROR: ${err.message}`);
    },

    onSuccess: (_newArr, data) => {
      toast.success(
        `Update successful!  Changes to ${data.bookType} have been applied.`
      );

      queryClient.invalidateQueries({
        queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.BOOK_TYPE],
      });
    },
  });

  return { modifyGenre, isArchiving };
};

const useRecoverArchiveBookType = () => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: modifyGenre,
    isPending: isArchiving,
    isSuccess,
  } = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: (bookType: IBookType) => createArchiveBookType(bookType),

    onError: (err) => {
      toast.error(`ERROR: ${err.message}`);
    },

    onSuccess: (_newArr, data) => {
      toast.success(
        `Update successful!  Changes to ${data.bookType} have been applied.`
      );

      queryClient.invalidateQueries({
        queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.ARCHIVE_BOOK_TYPE],
      });
    },
  });

  return { modifyGenre, isArchiving, isSuccess };
};
export { useArchiveBookType, useRecoverArchiveBookType };
