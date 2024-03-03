import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { addGradeSection } from "./grade-section.service";

const useCreateGradeSection = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: createGradeSection, isPending } = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mutationFn: addGradeSection,
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: (_newArr, data) => {
      toast.success(
        `Success! The ${data.gradeSection} has been created successfully. `
      ),
        queryClient.invalidateQueries({
          queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.GRADE_SECTION],
        });
    },
  });

  return { createGradeSection, isPending };
};
export default useCreateGradeSection;
