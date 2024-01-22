import { useQuery } from "@tanstack/react-query";

const levelData = [
  { id: "1", levelOfEducation: "Kindergarten", gradeLevel: "K" },
  { id: "2", levelOfEducation: "Elementary", gradeLevel: "Grade 1" },
  { id: "3", levelOfEducation: "Elementary", gradeLevel: "Grade 2" },
  { id: "4", levelOfEducation: "Elementary", gradeLevel: "Grade 3" },
  // { id: "5", levelOfEducation: "Elementary", level: "Grade 4" },
  // { id: "6", levelOfEducation: "Elementary", level: "Grade 5" },
  // { id: "7", levelOfEducation: "Elementary", level: "Grade 6" },
  // { id: "8", levelOfEducation: "Junior High School", level: "Grade 7" },
  // { id: "9", levelOfEducation: "Junior High School", level: "Grade 8" },
  // { id: "10", levelOfEducation: "Junior High School", level: "Grade 9" },
  // { id: "11", levelOfEducation: "Junior High School", level: "Grade 10" },
  // { id: "12", levelOfEducation: "Senior High School", level: "Grade 11" },
  // { id: "13", levelOfEducation: "Senior High School", level: "Grade 12" },
  // { id: "14", levelOfEducation: "College", level: "First Year" },
  // { id: "15", levelOfEducation: "College", level: "Second Year" },
  // { id: "16", levelOfEducation: "College", level: "Third Year" },
  // { id: "17", levelOfEducation: "College", level: "Fourth Year" },
  // { id: "18", levelOfEducation: "College", level: "Fifth Year" },
];

export type TGradeLevel = (typeof levelData)[number];

const useReadGradeLevel = () => {
  return useQuery({
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      return Promise.resolve(levelData);
    },
    queryKey: ["grade-level"],

    refetchOnWindowFocus: false,
  });
};
export default useReadGradeLevel;
