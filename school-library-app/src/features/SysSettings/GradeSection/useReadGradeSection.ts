import { useQuery } from "@tanstack/react-query";

const levelData = [
  { id: "1", gradeLevel: "K", gradeSection: "K - 1" },
  { id: "2", gradeLevel: "K", gradeSection: "K - 2" },
  { id: "3", gradeLevel: "Grade 1 ", gradeSection: "Grade 1 - 1" },
  { id: "4", gradeLevel: "Grade 1", gradeSection: "Grade 1 - 2" },
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

export type TGradeSection = (typeof levelData)[number];

const useReadGradeSection = () => {
  return useQuery({
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      return Promise.resolve(levelData);
    },
    queryKey: ["grade-section"],

    refetchOnWindowFocus: false,
  });
};
export default useReadGradeSection;
