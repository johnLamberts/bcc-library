import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { addAnnouncement } from "../services/announcement.service";

export function useCreateAnnouncement() {
  const queryClient = useQueryClient();
  const { isPending: isCreatingNews, mutateAsync: createNews } = useMutation({
    mutationFn: addAnnouncement,
    onSuccess: (_newArr, data) => {
      toast.success(
        `Success! The ${data.title} has been created successfully. `
      );
      queryClient.invalidateQueries({
        queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.NEWS_ANNOUNCEMENT],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreatingNews, createNews };
}
