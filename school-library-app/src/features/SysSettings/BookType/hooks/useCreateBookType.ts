import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { addBookType } from "../services/book-type.service";

const useCreateBookType = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: createBookType, isPending } = useMutation({
    mutationFn: addBookType,

    onError: (err) => {
      toast.error(err.message);
    },

    onSuccess: (_newArr, data) => {
      toast.success(
        `Success! The ${data.bookType} has been created successfully. `
      );
      queryClient.invalidateQueries({
        queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.BOOK_TYPE],
      });
    },
  });

  return { createBookType, isPending };
};
export default useCreateBookType;
