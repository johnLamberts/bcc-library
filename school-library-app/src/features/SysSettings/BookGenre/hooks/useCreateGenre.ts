import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { addGenre } from "../services/genres";

const useCreateGenre = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: createGenre, isPending } = useMutation({
    mutationFn: addGenre,
    // onMutate: async (newAcademic: TGenre) => {
    //   await queryClient.cancelQueries({
    //     queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.USER_ROLE],
    //   });

    //   const prevTGenre = queryClient.getQueryData([
    //     FIRESTORE_COLLECTION_QUERY_KEY.USER_ROLE,
    //   ]);

    //   queryClient.setQueryData(
    //     [FIRESTORE_COLLECTION_QUERY_KEY.USER_ROLE],
    //     (prevLevels: TGenre[]) =>
    //     prevLevels?.map((level: TGenre) =>
    //       ([...])
    //     )
    //   );

    //   return { prevTGenre };
    // },

    onError: (err) => {
      toast.error(err.message);
    },

    onSuccess: (_newArr, data) => {
      toast.success(
        `Success! The ${data.genres} has been created successfully. `
      );
      queryClient.invalidateQueries({
        queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.GENRE],
      });
    },
  });

  return { createGenre, isPending };
};
export default useCreateGenre;
