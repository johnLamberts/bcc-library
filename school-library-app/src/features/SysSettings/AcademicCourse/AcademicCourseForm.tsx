import { useCallback, useEffect, useState } from "react";
import {
  Title,
  Select,
  Flex,
  Button,
  Grid,
  Divider,
  TextInput,
  LoadingOverlay,
  Box,
} from "@mantine/core";
import { Controller, useForm } from "react-hook-form";
import { MRT_Row, MRT_RowData, MRT_TableInstance } from "mantine-react-table";
import useReadEducation from "../LevelEducation/useReadEducation";
import { toast } from "sonner";
import IAcademicCourse from "./academic-course.interface";

interface AcademicCourseFormProps<TData extends MRT_RowData> {
  table: MRT_TableInstance<TData>;
  row: MRT_Row<TData>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onCreate?: (props: Record<string, any>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSave?: (props: Record<string, any>) => void;
}

function AcademicCourseForm<TData extends MRT_RowData>({
  table,
  row,
  onCreate,
  onSave,
}: AcademicCourseFormProps<TData>) {
  const { data: educationData = [] } = useReadEducation();

  const isEditing = table.getState().editingRow?.id === row.id;
  const [course, setCourse] = useState();

  const { control, handleSubmit, register } = useForm<IAcademicCourse>({
    defaultValues: isEditing ? row.original : {},
  });

  // const selectedLevel = watch("levelOfEducation");
  // const filteredCourses = courseData
  //   .filter((item) => item.levelOfEducation === selectedLevel)
  //   .map((item) => item.course);

  // const optimizedCourseData = removeDuplicatesWithSet(
  //   courseData,
  //   "levelOfEducation"
  // );

  // useEffect(() => {
  //   if (filteredCourses[0] === "") {
  //     setValue("academiCourse", "");
  //   }
  // }, [filteredCourses, setValue]);
  const isCreating = table.getState().creatingRow?.id === row.id;

  const onSubmit = useCallback(
    (data: IAcademicCourse) => {
      if (!data.levelOfEducation) {
        toast.error(
          "Uh-oh! It seems like you forgot to fill in some required information. Please make sure all fields are filled out before submitting."
        );
        return;
      }
      if (isEditing) {
        onSave?.({
          ...data,
          course,
        });
      } else if (isCreating) {
        onCreate?.(data);
      }
    },
    [isEditing, isCreating, onSave, course, onCreate]
  );

  useEffect(() => {
    if (isEditing) {
      setCourse(row.original.academicCourse);
    }
  }, [isEditing, row.original.academicCourse]);

  return (
    <>
      <Box p={"md"}>
        <LoadingOverlay
          visible={table.getState().isSaving}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
          loaderProps={{ color: "yellow", type: "oval" }}
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Title order={5}>
            {`${isEditing ? "Editing" : "Adding"}`} form for Academic Course
          </Title>

          <Divider />
          <Grid mt={"md"}>
            <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
              <Controller
                control={control}
                name="levelOfEducation"
                render={({ field: { onChange, ...field } }) => {
                  return (
                    <Select
                      label="Level of Education"
                      placeholder="Pick value"
                      data={educationData.map((course) => ({
                        label: course.levelOfEducation || "",
                        value: course.levelOfEducation || "",
                      }))}
                      onChange={(_e) => {
                        onChange(_e);
                      }}
                      readOnly={table.getState().isSaving}
                      withAsterisk
                      {...field}
                    />
                  );
                }}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
              <TextInput
                label="Your Academic Course"
                placeholder="Academic Course"
                disabled={table.getState().isSaving}
                {...register("academicCourse")}
              />
            </Grid.Col>
          </Grid>

          <Flex justify="flex-end" gap={"xs"} mt={"sm"}>
            <Button loading={table.getState().isSaving} type="submit">
              Save
            </Button>
          </Flex>
        </form>
      </Box>
    </>
  );
}

export default AcademicCourseForm;
