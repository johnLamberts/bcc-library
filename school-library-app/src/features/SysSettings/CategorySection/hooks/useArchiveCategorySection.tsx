import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { createArchiveCategorySection } from "../services/category-section.service";
import ICategorySection from "../models/category-section.interface";

const useArchiveCategorySection = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: modifyGenre, isPending: isArchiving } = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: (genre: ICategorySection) =>
      createArchiveCategorySection(genre),

    onError: (err) => {
      toast.error(`ERROR: ${err.message}`);
    },

    onSuccess: (_newArr, data) => {
      toast.success(
        `Update successful!  Changes to ${data.categorySection} have been applied.`
      );

      queryClient.invalidateQueries({
        queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.GENRE],
      });
    },
  });

  return { modifyGenre, isArchiving };
};

const useRecoverArchiveCategorySection = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: modifyGenre, isPending: isArchiving } = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: (genre: ICategorySection) =>
      createArchiveCategorySection(genre),

    onError: (err) => {
      toast.error(`ERROR: ${err.message}`);
    },

    onSuccess: (_newArr, data) => {
      toast.success(
        `Update successful!  Changes to ${data.categorySection} have been applied.`
      );

      queryClient.invalidateQueries({
        queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.ARCHIVE_GENRE],
      });
    },
  });

  return { modifyGenre, isArchiving };
};
export { useArchiveCategorySection, useRecoverArchiveCategorySection };
