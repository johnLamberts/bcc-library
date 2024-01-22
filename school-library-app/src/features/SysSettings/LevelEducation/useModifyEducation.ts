import { TLevelEducation } from "@pages/LevelEducation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useModifyEducation = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: modifyLevelOfEducation, isPending } = useMutation({
    mutationFn: async (level: TLevelEducation) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      return Promise.resolve();
    },
    onMutate: async (newLevels: TLevelEducation) => {
      await queryClient.cancelQueries({ queryKey: ["level"] });

      const prevLevel = queryClient.getQueryData(["level"]);

      queryClient.setQueryData(["level"], (prevLevels: TLevelEducation[]) =>
        //     [
        //       ...prevUsers,
        //       {
        //         ...newLevel,
        //         id: (Math.random() + 1).toString(36).substring(7),
        //       },
        //     ] as TLevelEducation[]

        prevLevels?.map((level: TLevelEducation) =>
          level.id === newLevels.id ? newLevels : level
        )
      );

      return { prevLevel };
    },

    onError: (err, newLevel, context) => {
      alert(JSON.stringify(newLevel, null, 4));
      toast.error(err.message);
      return queryClient.setQueryData(["level"], context?.prevLevel);
    },

    // onSettled: () => queryClient.invalidateQueries({ queryKey: ["level"] }),
  });

  return { modifyLevelOfEducation, isPending };
};
export default useModifyEducation;
