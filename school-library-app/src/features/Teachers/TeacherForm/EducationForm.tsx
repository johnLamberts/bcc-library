import Form from "@components/Form/Form";
import useReadAcademicCourse from "@features/SysSettings/AcademicCourse/useReadAcademic";
import useReadGradeLevel from "@features/SysSettings/GradeLevel/useReadGradeLevel";
import useReadGradeSection from "@features/SysSettings/GradeSection/useReadGradeSection";
import { Select } from "@mantine/core";
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { removeDuplicatesWithSet } from "src/utils/validators/hasDuplicates";

const EducationForm = () => {
  const { control, watch, setValue } = useFormContext();

  const { data: courseData = [], isFetching: isFetchingCourse } =
    useReadAcademicCourse();

  const { data: gradeLevelData = [], isFetching: isFetchingGradelevel } =
    useReadGradeLevel();

  const { data: gradeSectionData = [], isFetching: isFetchingSectionevel } =
    useReadGradeSection();

  const selectedLevelOfEducation = watch("levelOfEducation");
  const selectedGrade = watch("gradeLevel");

  const optimizedCourseData = removeDuplicatesWithSet(
    courseData,
    "levelOfEducation"
  );

  const filteredCourses = courseData
    .filter((item) => item.levelOfEducation === selectedLevelOfEducation)
    .map((item) => item.academicCourse);

  const filterGrade = gradeLevelData
    .filter(
      (gradeLevel) => gradeLevel.levelOfEducation === selectedLevelOfEducation
    )
    .map((level) => level.gradeLevel);

  const filterGradeSection = gradeSectionData
    .filter((gradeLevel) => gradeLevel.gradeLevel === selectedGrade)
    .map((level) => level.gradeSection);

  useEffect(() => {
    if (filteredCourses[0] === "") {
      setValue("academicCourse", null);
    }

    if (filterGrade.length === 0 && selectedGrade) {
      setValue("gradeLevel", null);
    }

    if (filterGradeSection.length === 0) {
      setValue("gradeSection", null);
    }
  }, [
    filteredCourses,
    filterGrade.length,
    setValue,
    selectedGrade,
    gradeLevelData,
    selectedLevelOfEducation,
    filterGradeSection,
  ]);

  return (
    <Form.Box mt={"md"}>
      <Form.Title>Education</Form.Title>
      <Form.Grid p={"lg"}>
        <Form.Col span={{ base: 12, md: 3, lg: 6 }}>
          <Controller
            name="levelOfEducation"
            control={control}
            render={({ field }) => {
              return (
                <Select
                  label="Level of Education"
                  placeholder="Select level"
                  data={optimizedCourseData.map((course) => ({
                    label: course.levelOfEducation,
                    value: course.levelOfEducation,
                  }))}
                  comboboxProps={{
                    transitionProps: { transition: "pop", duration: 200 },
                  }}
                  {...field}
                />
              );
            }}
            disabled={isFetchingCourse}
          />
        </Form.Col>
        <Form.Col span={{ base: 12, md: 3, lg: 6 }}>
          <Controller
            name="academicCourse"
            control={control}
            render={({ field }) => {
              return (
                <Select
                  label="Academic Course"
                  placeholder={`${
                    filteredCourses[0] === ""
                      ? "No available course"
                      : "Select academic course"
                  } `}
                  data={filteredCourses}
                  comboboxProps={{
                    transitionProps: { transition: "pop", duration: 200 },
                  }}
                  {...field}
                  readOnly={filteredCourses[0] === ""}
                />
              );
            }}
          />
        </Form.Col>{" "}
        <Form.Col span={{ base: 12, md: 3, lg: 6 }}>
          <Controller
            name="gradeLevel"
            control={control}
            render={({ field }) => {
              return (
                <Select
                  label="Grade Level"
                  placeholder={`${
                    !filterGrade.length
                      ? "No available Grade level"
                      : "Select grade level"
                  } `}
                  data={!filterGrade.length ? undefined : filterGrade}
                  comboboxProps={{
                    transitionProps: { transition: "pop", duration: 200 },
                  }}
                  {...field}
                  readOnly={isFetchingGradelevel || !filterGrade.length}
                />
              );
            }}
          />
        </Form.Col>
        <Form.Col span={{ base: 12, md: 3, lg: 6 }}>
          <Controller
            name="gradeSection"
            control={control}
            render={({ field }) => {
              return (
                <Select
                  label="Section"
                  data={filterGradeSection}
                  placeholder={`${
                    !filterGradeSection.length
                      ? "No available Grade section"
                      : "Select grade section"
                  } `}
                  comboboxProps={{
                    transitionProps: { transition: "pop", duration: 200 },
                  }}
                  {...field}
                  readOnly={isFetchingSectionevel || !filterGradeSection.length}
                />
              );
            }}
          />
        </Form.Col>
      </Form.Grid>
    </Form.Box>
  );
};
export default EducationForm;
