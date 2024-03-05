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
  const { data: academicCourse = [] } = useReadAcademicCourse();
  const { data: levelOfEducation = [] } = useReadEducation();
  const { data: gradeLevel = [] } = useReadGradeLevel();

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
        />
      )}
      {table.getColumn("academicCourse") && (
        <FacetedFilter
          column={table.getColumn("academicCourse")}
          title="Academic Course"
          options={academicCourse.map((course) => ({
            label: course.academicCourse || "",
            value: course.academicCourse || "",
          }))}
        />
      )}

      {table.getColumn("gradeLevel") && (
        <FacetedFilter
          column={table.getColumn("gradeLevel")}
          title="Grade Level"
          options={gradeLevel.map((course) => ({
            label: course.gradeLevel || "",
            value: course.gradeLevel || "",
          }))}
        />
      )}
    </>
  );
};
export default StudentToolbar;
