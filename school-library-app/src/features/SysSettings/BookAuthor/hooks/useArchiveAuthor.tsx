import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { createArchiveAuthor } from "../services/book-author.service";
import IAuthor from "../models/book-author.interface";

const useArchiveAuthor = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: modifyAuthor, isPending: isArchiving } = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: (genre: IAuthor) => createArchiveAuthor(genre),

    onError: (err) => {
      toast.error(`ERROR: ${err.message}`);
    },

    onSuccess: (_newArr, data) => {
      toast.success(
        `Update successful!  Changes to ${data.bookAuthor} have been applied.`
      );

      queryClient.invalidateQueries({
        queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.AUTHOR],
      });
    },
  });

  return { modifyAuthor, isArchiving };
};

const useRecoverArchiveAuthor = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: modifyGenre, isPending: isArchiving } = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: (genre: IAuthor) => createArchiveAuthor(genre),

    onError: (err) => {
      toast.error(`ERROR: ${err.message}`);
    },

    onSuccess: (_newArr, data) => {
      toast.success(
        `Update successful!  Changes to ${data.bookAuthor} have been applied.`
      );

      queryClient.invalidateQueries({
        queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.ARCHIVE_AUTHOR],
      });
    },
  });

  return { modifyGenre, isArchiving };
};
export { useArchiveAuthor, useRecoverArchiveAuthor };
