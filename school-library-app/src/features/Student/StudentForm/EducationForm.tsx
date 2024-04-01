import Form from "@components/Form/Form";
import useReadAcademicCourse from "@features/SysSettings/AcademicCourse/useReadAcademic";
import useReadGradeLevel from "@features/SysSettings/GradeLevel/useReadGradeLevel";
import useReadGradeSection from "@features/SysSettings/GradeSection/useReadGradeSection";
import useReadEducation from "@features/SysSettings/LevelEducation/useReadEducation";
import { Select } from "@mantine/core";
import { MRT_RowData, MRT_TableInstance, MRT_Row } from "mantine-react-table";
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface EducationFormProps<TData extends MRT_RowData> {
  table: MRT_TableInstance<TData>;
  row: MRT_Row<TData>;
}

const EducationForm = <TData extends MRT_RowData>({
  table,
  row,
}: EducationFormProps<TData>) => {
  const { control, watch, setValue } = useFormContext();

  const isEditing = table.getState().editingRow?.id === row.id;

  useEffect(() => {
    if (isEditing) {
      setValue("levelOfEducation", row.original.levelOfEducation);
      setValue("gradeLevel", row.original.gradeLevel);
    }
  }, [
    isEditing,
    row.original.gradeLevel,
    row.original.levelOfEducation,
    setValue,
  ]);

  const {
    data: levelOfEducationData = [],
    isFetching: isFetchingLevelOfEducation,
  } = useReadEducation();

  const { data: courseData = [], isFetching: isFetchingCourse } =
    useReadAcademicCourse();

  const { data: gradeLevelData = [], isFetching: isFetchingGradelevel } =
    useReadGradeLevel();

  const { data: gradeSectionData = [], isFetching: isFetchingSectionevel } =
    useReadGradeSection();

  const selectedLevelOfEducation = watch("levelOfEducation");
  const selectedGradeLevel = row.original.gradeLevel || watch("gradeLevel");

  console.log(selectedGradeLevel, selectedLevelOfEducation);

  const filteredCourses = courseData
    .filter((item) => item?.levelOfEducation === selectedLevelOfEducation)
    .map((item) => item?.academicCourse || "");

  const filterGrade = gradeLevelData
    .filter(
      (gradeLevel) => gradeLevel.levelOfEducation === selectedLevelOfEducation
    )
    .map((level) => level.gradeLevel || "");

  const filterGradeSection = gradeSectionData
    .filter((gradeLevel) => gradeLevel.gradeLevel === selectedGradeLevel)
    .map((level) => level.gradeSection || "");

  const handleChangeLevel = (e: string | null) => {
    setValue("levelOfEducation", e);

    setValue("academicCourse", null);
    setValue("gradeLevel", null);
    setValue("gradeSection", null);
  };

  const handleChangeGradeLevel = (e: string | null) => {
    setValue("gradeLevel", e);

    setValue("gradeSection", null);
  };

  return (
    <Form.Box mt={"md"}>
      <Form.Title>Education</Form.Title>
      <Form.Grid p={"lg"}>
        <Form.Col span={{ base: 12, md: 3, lg: 6 }}>
          <Controller
            name="levelOfEducation"
            control={control}
            render={({ field: { onChange, ...field } }) => {
              return (
                <Select
                  label="Level of Education"
                  placeholder="Select level"
                  data={levelOfEducationData.map((course) => ({
                    label: course.levelOfEducation || "",
                    value: course.levelOfEducation || "",
                  }))}
                  onChange={(e) => {
                    onChange(e);
                    handleChangeLevel(e);
                  }}
                  comboboxProps={{
                    transitionProps: { transition: "pop", duration: 200 },
                  }}
                  disabled={isFetchingLevelOfEducation}
                  {...field}
                  allowDeselect={false}
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
            render={({ field: { onChange, ...field } }) => {
              return (
                <Select
                  label="Academic Course"
                  placeholder={`${
                    !filteredCourses.length
                      ? "No available course"
                      : "Select academic course"
                  } `}
                  data={filteredCourses}
                  comboboxProps={{
                    transitionProps: { transition: "pop", duration: 200 },
                  }}
                  onChange={(e) => {
                    onChange(e);
                  }}
                  {...field}
                  disabled={!filteredCourses.length}
                  searchable={true}
                />
              );
            }}
          />
        </Form.Col>{" "}
        <Form.Col span={{ base: 12, md: 3, lg: 6 }}>
          <Controller
            name="gradeLevel"
            control={control}
            render={({ field: { onChange, ...field } }) => {
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
                  onChange={(e) => {
                    onChange(e);
                    handleChangeGradeLevel(e);
                  }}
                  {...field}
                  readOnly={isFetchingGradelevel || !filterGrade.length}
                  disabled={isFetchingGradelevel || !filterGrade.length}
                  searchable={true}
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
                  disabled={isFetchingSectionevel || !filterGradeSection.length}
                  searchable={true}
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
