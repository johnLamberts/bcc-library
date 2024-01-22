import { useCallback } from "react";
import {
  Title,
  Select,
  Flex,
  Button,
  Grid,
  Box,
  Divider,
  TextInput,
} from "@mantine/core";
import { Controller, useForm } from "react-hook-form";
import { MRT_Row, MRT_RowData, MRT_TableInstance } from "mantine-react-table";
import useReadEducation from "../LevelEducation/useReadEducation";
import { TLevel } from "./useReadAcademic";
import { toast } from "sonner";

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

  const { control, handleSubmit, register } = useForm<TLevel>({
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
    (data: TLevel) => {
      if (!data.levelOfEducation) {
        toast.error(
          "Uh-oh! It seems like you forgot to fill in some required information. Please make sure all fields are filled out before submitting."
        );
        return;
      }
      if (isEditing) {
        onSave?.(data);
      } else if (isCreating) {
        onCreate?.(data);
      }
    },
    [onCreate, onSave, isEditing, isCreating]
  );

  return (
    <>
      <Box p={"md"}>
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
                        label: course.levelOfEducation,
                        value: course.levelOfEducation,
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
              {/* <Controller
                control={control}
                name="academiCourse"
                render={({ field: { value, ...field } }) => {
                  return (
                    <Select
                      disabled={!selectedLevel}
                      data={filteredCourses}
                      label="Your Academic Course"
                      placeholder="Pick value"
                      value={filteredCourses[0] === "" ? "" : value}
                      {...field}
                    />
                  );
                }}
              /> */}
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
