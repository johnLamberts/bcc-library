import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { updateAnnouncement } from "../services/announcement.service";
import IPost from "../models/post.interface";

export function useModifyAnnouncement() {
  const queryClient = useQueryClient();
  const { isPending: isModifyingNews, mutateAsync: modifyNews } = useMutation({
    mutationFn: (data: Partial<IPost>) => updateAnnouncement(data),
    onSuccess: (_newArr, data) => {
      toast.success(`Success!${data.title} has been updated successfully. `);
      queryClient.invalidateQueries({
        queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.NEWS_ANNOUNCEMENT],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isModifyingNews, modifyNews };
}
