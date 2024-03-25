import { FacetedFilter } from "@components/FacetedFilter/FacetedFilter";
import useReadAcademicCourse from "@features/SysSettings/AcademicCourse/useReadAcademic";
import useReadGradeLevel from "@features/SysSettings/GradeLevel/useReadGradeLevel";
import useReadEducation from "@features/SysSettings/LevelEducation/useReadEducation";
import { MRT_RowData, MRT_TableInstance } from "mantine-react-table";
import { useSearchParams } from "react-router-dom";

interface StudentToolbarProps<TData extends MRT_RowData> {
  table: MRT_TableInstance<TData>;
}

const StudentToolbar = <TData extends MRT_RowData>({
  table,
}: StudentToolbarProps<TData>) => {
  const { data: levelOfEducation = [] } = useReadEducation();

  const { data: academicCourse = [] } = useReadAcademicCourse();
  const { data: gradeLevel = [] } = useReadGradeLevel();

  const [searchParams] = useSearchParams();

  const condAcademicCourse =
    searchParams.get("lovey") === null
      ? academicCourse.map((course) => ({
          label: course.academicCourse || "",
          value: course.academicCourse || "",
        }))
      : academicCourse
          .filter(
            (course) => course.levelOfEducation === searchParams.get("lovey")
          )
          .map((course) => ({
            label: course.academicCourse || "",
            value: course.academicCourse || "",
          }));

  const condGradeLevel =
    searchParams.get("lovey") === null
      ? gradeLevel.map((course) => ({
          label: course.gradeLevel || "",
          value: course.gradeLevel || "",
        }))
      : gradeLevel
          .filter(
            (course) => course.levelOfEducation === searchParams.get("lovey")
          )
          .map((course) => ({
            label: course.gradeLevel || "",
            value: course.gradeLevel || "",
          }));

  return (
    <>
      {table.getColumn("levelOfEducation") && (
        <FacetedFilter
          column={table.getColumn("levelOfEducation")}
          title="Level of Education"
          options={levelOfEducation.map((course) => ({
            label: course.levelOfEducation || "",
            value: course.levelOfEducation || "",
          }))}
          enableParams={true}
          paramsName="lovey"
        />
      )}
      {table.getColumn("academicCourse") && (
        <FacetedFilter
          height="10rem"
          column={table.getColumn("academicCourse")}
          title="Academic Course"
          options={condAcademicCourse}
        />
      )}

      {table.getColumn("gradeLevel") && (
        <FacetedFilter
          height="10rem"
          column={table.getColumn("gradeLevel")}
          title="Grade Level"
          options={condGradeLevel}
        />
      )}
    </>
  );
};
export default StudentToolbar;
