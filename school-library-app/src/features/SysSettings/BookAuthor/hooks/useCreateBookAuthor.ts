import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { addAuthor} from "../services/book-author.service";

const useCreateAuthor = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: createAuthor, isPending } = useMutation({
    mutationFn: addAuthor,

    onError: (err) => {
      toast.error(err.message);
    },

    onSuccess: (_newArr, data) => {
      toast.success(
        `Success! The ${data.bookAuthor} has been created successfully. `
      );
      queryClient.invalidateQueries({
        queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.AUTHOR],
      });
    },
  });

  return { createAuthor, isPending };
};
export default useCreateAuthor;
