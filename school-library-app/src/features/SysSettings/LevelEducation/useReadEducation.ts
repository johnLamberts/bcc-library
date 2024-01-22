import { useQuery } from "@tanstack/react-query";

const levelData = [
  { id: "1", levelOfEducation: "Kindergarten" },
  { id: "2", levelOfEducation: "Elementary" },
  { id: "3", levelOfEducation: "Junior High School" },
  { id: "4", levelOfEducation: "Senior High School" },
  { id: "5", levelOfEducation: "College" },
];

const useReadEducation = () => {
  return useQuery({
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      return Promise.resolve(levelData);
    },
    queryKey: ["level"],

    refetchOnWindowFocus: false,
  });
};
export default useReadEducation;
