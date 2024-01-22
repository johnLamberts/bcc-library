import { TLevelEducation } from "@pages/SystemSettings/LevelEducation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useCreateEducation = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: createLevelOfEducation, isPending } = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mutationFn: async (_level: TLevelEducation) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      return Promise.resolve();
    },
    onMutate: async (newLevel: TLevelEducation) => {
      await queryClient.cancelQueries({ queryKey: ["level"] });

      const prevLevel = queryClient.getQueryData(["level"]);

      queryClient.setQueryData(
        ["level"],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (prevUsers: any) =>
          [
            ...prevUsers,
            {
              ...newLevel,
              id: (Math.random() + 1).toString(36).substring(7),
            },
          ] as TLevelEducation[]
      );

      return { prevLevel };
    },

    onError: (err, newLevel, context) => {
      toast.error(err.message);
      return queryClient.setQueryData(["level"], context?.prevLevel);
    },

    // onSettled: () => queryClient.invalidateQueries({ queryKey: ["level"] }),
  });

  return { createLevelOfEducation, isPending };
};
export default useCreateEducation;
