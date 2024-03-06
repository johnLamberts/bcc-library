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
    onMutate: async (newLevels: IGenre) => {
      await queryClient.cancelQueries({
        queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.GENRE],
      });

      const prevLevel = queryClient.getQueryData([
        FIRESTORE_COLLECTION_QUERY_KEY.GENRE,
      ]) as IGenre[];

      queryClient.setQueryData(
        [FIRESTORE_COLLECTION_QUERY_KEY.GENRE],
        (prevLevels: IGenre[]) =>
          prevLevels?.map((level: IGenre) =>
            level.id === newLevels.id ? newLevels : level
          )
      );

      return { prevLevel };
    },

    onError: (err, _newLevel, context) => {
      toast.error(`ERROR: ${err.message}`);
      return queryClient.setQueryData(
        [FIRESTORE_COLLECTION_QUERY_KEY.GENRE],
        context?.prevLevel
      );
    },

    onSuccess: (_newArr, data, context) => {
      toast.success(
        `Update successful! ${
          context.prevLevel.filter((prev) => prev.id === data.id)[0]?.genres
        } Changes to ${data.genres} have been applied.`
      );

      queryClient.invalidateQueries({
        queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.GENRE],
      });
    },
  });

  return { modifyGenre, isPending };
};
export default useModifyGenre;
