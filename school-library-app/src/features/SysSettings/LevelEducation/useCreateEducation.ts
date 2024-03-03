import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { addLevelOfEducation } from "./level-of-education.service";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";

const useCreateEducation = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: createLevelOfEducation, isPending } = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mutationFn: addLevelOfEducation,
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: (_newArr, data) => {
      toast.success(
        `Success! The ${data.levelOfEducation} has been created successfully. `
      ),
        queryClient.invalidateQueries({
          queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.LEVEL_OF_EDUCATION],
        });
    },
  });

  return { createLevelOfEducation, isPending };
};
export default useCreateEducation;
