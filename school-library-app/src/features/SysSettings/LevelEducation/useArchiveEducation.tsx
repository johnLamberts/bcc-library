import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createArchiveLevelOfEducation,
  getArchivedLevelOfEducation,
} from "./level-of-education.service";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { toast } from "sonner";
import ILevelOfEducation from "./level-of-education.interface";

const useArchiveReadEducation = () => {
  return useQuery({
    queryFn: getArchivedLevelOfEducation,
    queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.ARCHIVE_LEVEL_OF_EDUCATION],

    refetchOnWindowFocus: false,
  });
};

const useArchiveEducation = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: modifyGenre, isPending: isArchiving } = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: (genre: ILevelOfEducation) =>
      createArchiveLevelOfEducation(genre),

    onError: (err) => {
      toast.error(`ERROR: ${err.message}`);
    },

    onSuccess: (_newArr, data) => {
      toast.success(
        `Update successful!  Changes to ${data.levelOfEducation} have been applied.`
      );

      queryClient.invalidateQueries({
        queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.LEVEL_OF_EDUCATION],
      });
    },
  });

  return { modifyGenre, isArchiving };
};

const useRecoverArchiveEducation = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: modifyGenre, isPending: isArchiving } = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: (genre: ILevelOfEducation) =>
      createArchiveLevelOfEducation(genre),

    onError: (err) => {
      toast.error(`ERROR: ${err.message}`);
    },

    onSuccess: (_newArr, data) => {
      toast.success(
        `Update successful!  Changes to ${data.levelOfEducation} have been applied.`
      );

      queryClient.invalidateQueries({
        queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.ARCHIVE_LEVEL_OF_EDUCATION],
      });
    },
  });

  return { modifyGenre, isArchiving };
};

export {
  useArchiveReadEducation,
  useArchiveEducation,
  useRecoverArchiveEducation,
};
