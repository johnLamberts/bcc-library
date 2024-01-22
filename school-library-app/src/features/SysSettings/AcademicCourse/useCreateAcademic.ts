import { TLevelEducation } from "@pages/SystemSettings/LevelEducation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { TLevel } from "./useReadAcademic";

const useCreateAcademicCourse = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: createAcademicCourse, isPending } = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mutationFn: async (_level: TLevel) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      return Promise.resolve();
    },
    onMutate: async (newAcademic: TLevel) => {
      await queryClient.cancelQueries({ queryKey: ["academic-course"] });

      const prevAcademics = queryClient.getQueryData(["academic-course"]);

      queryClient.setQueryData(
        ["academic-course"],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (prevAcademic: any) =>
          [
            ...prevAcademic,
            {
              ...newAcademic,
              id: (Math.random() + 1).toString(36).substring(7),
            },
          ] as TLevelEducation[]
      );

      return { prevAcademics };
    },

    onError: (err, _newLevel, context) => {
      toast.error(err.message);
      return queryClient.setQueryData(
        ["academic-course"],
        context?.prevAcademics
      );
    },

    // onSettled: () => queryClient.invalidateQueries({ queryKey: ["level"] }),
    onSuccess: (_newArr, data) =>
      toast.success(
        `Success! The ${data.academicCourse} has been created successfully. `
      ),
    // queryClient.invalidateQueries({ queryKey: ["academic-course"] }),
  });

  return { createAcademicCourse, isPending };
};
export default useCreateAcademicCourse;
