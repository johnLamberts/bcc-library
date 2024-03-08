import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import IGenre from "../models/genres";
import { archiveGenre } from "../services/genres";

const useArchiveGenre = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: modifyGenre, isPending: isArchiving } = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: (genre: IGenre) => archiveGenre(genre),

    onError: (err) => {
      toast.error(`ERROR: ${err.message}`);
    },

    onSuccess: (_newArr, data) => {
      toast.success(
        `Update successful!  Changes to ${data.genres} have been applied.`
      );

      queryClient.invalidateQueries({
        queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.GENRE],
      });
    },
  });

  return { modifyGenre, isArchiving };
};

const useRecoverArchiveGenre = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: modifyGenre, isPending: isArchiving } = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: (genre: IGenre) => archiveGenre(genre),

    onError: (err) => {
      toast.error(`ERROR: ${err.message}`);
    },

    onSuccess: (_newArr, data) => {
      toast.success(
        `Update successful!  Changes to ${data.genres} have been applied.`
      );

      queryClient.invalidateQueries({
        queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.ARCHIVE_GENRE],
      });
    },
  });

  return { modifyGenre, isArchiving };
};
export { useArchiveGenre, useRecoverArchiveGenre };
