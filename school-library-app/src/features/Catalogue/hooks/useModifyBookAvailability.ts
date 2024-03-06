import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { IBooks } from "../models/books.interface";
import { updateCatalogueAvailability } from "../service/catalogue.service";

const useModifyBookAvailability = () => {
  const queryClient = useQueryClient();

  const { mutate: modifyBookAvailability, isPending } = useMutation({
    mutationFn: (book: IBooks) => updateCatalogueAvailability(book),

    onError: (err) => {
      toast.error(err.message);
    },

    onSuccess: (_newArr, data) => {
      queryClient.invalidateQueries({
        queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.CATALOGUE],
      });
      toast.success(
        `Update successful! Status changes to ${data.title} have been applied.`
      );
    },
  });

  return { modifyBookAvailability, isPending };
};
export default useModifyBookAvailability;
