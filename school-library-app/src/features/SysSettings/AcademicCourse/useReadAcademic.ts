import { useQuery } from "@tanstack/react-query";

const levelData = [
  { id: "1", levelOfEducation: "Kindergarten", academicCourse: "" },
  { id: "2", levelOfEducation: "Elementary", academicCourse: "" },
  { id: "3", levelOfEducation: "Junior High School", academicCourse: "" },
  // { id: "4", levelOfEducation: "Senior High School", academicCourse: "ABM" },
  { id: "5", levelOfEducation: "Senior High School", academicCourse: "GAS" },
  { id: "6", levelOfEducation: "Senior High School", academicCourse: "HUMSS" },
  { id: "7", levelOfEducation: "Senior High School", academicCourse: "STEM" },
  // { id: "8", levelOfEducation: "College", academicCourse: "BSIT" },
  // { id: "9", levelOfEducation: "College", academicCourse: "BSIS" },
  // { id: "10", levelOfEducation: "College", academicCourse: "BSA" },
  { id: "11", levelOfEducation: "College", academicCourse: "BSBA" },
  { id: "12", levelOfEducation: "College", academicCourse: "BSMA" },
  // { id: "13", levelOfEducation: "College", academicCourse: "BSFA" },
];

export type TLevel = (typeof levelData)[number];

const useReadAcademicCourse = () => {
  return useQuery({
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));

      return Promise.resolve(levelData);
    },
    queryKey: ["academic-course"],

    refetchOnWindowFocus: false,
  });
};
export default useReadAcademicCourse;
