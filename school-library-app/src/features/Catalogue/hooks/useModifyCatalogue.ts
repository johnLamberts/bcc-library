import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { updateCatalogue } from "../service/catalogue.service";
import { IBooks } from "../models/books.interface";

const useModifyCatalogue = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: modifyCatalogue, isPending } = useMutation({
    mutationFn: (book: Partial<IBooks>) => updateCatalogue(book, book.id),
    onError: (err) => {
      toast.error(err.message);
    },

    onSuccess: (_newArr, data) => {
      queryClient.invalidateQueries({
        queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.CATALOGUE],
      });
      toast.success(
        `Update successful! Changes to ${data.title} have been applied.`
      );
    },
  });

  return { modifyCatalogue, isPending };
};
export default useModifyCatalogue;
