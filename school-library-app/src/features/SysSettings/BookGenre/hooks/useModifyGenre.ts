/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import IGenre from "../models/genres";
import { updateGenre } from "../services/genres";

const useModifyGenre = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: modifyGenre, isPending } = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: (genre: IGenre) => updateGenre(genre, genre.id as string),

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

  return { modifyGenre, isPending };
};
export default useModifyGenre;
