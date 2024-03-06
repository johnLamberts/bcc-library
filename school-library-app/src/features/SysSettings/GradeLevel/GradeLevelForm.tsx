import { useCallback, useEffect, useState } from "react";
import {
  Title,
  Select,
  Flex,
  Button,
  Grid,
  Box,
  Divider,
  TextInput,
  LoadingOverlay,
} from "@mantine/core";
import { Controller, useForm } from "react-hook-form";
import { MRT_Row, MRT_RowData, MRT_TableInstance } from "mantine-react-table";
import useReadEducation from "../LevelEducation/useReadEducation";
import { toast } from "sonner";
import IGradeLevel from "./grade-level.interface";

interface GradeLevelFormProps<TData extends MRT_RowData> {
  table: MRT_TableInstance<TData>;
  row: MRT_Row<TData>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onCreate?: (props: Record<string, any>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSave?: (props: Record<string, any>) => void;
}

function GradeLevelForm<TData extends MRT_RowData>({
  table,
  row,
  onCreate,
  onSave,
}: GradeLevelFormProps<TData>) {
  const { data: educationData = [] } = useReadEducation();

  const isEditing = table.getState().editingRow?.id === row.id;

  const { control, handleSubmit, register } = useForm<IGradeLevel>({
    defaultValues: isEditing ? row.original : {},
  });

  const [level, setLevel] = useState("");
  const isCreating = table.getState().creatingRow?.id === row.id;

  const onSubmit = useCallback(
    (data: IGradeLevel) => {
      if (!data.levelOfEducation) {
        toast.error(
          "Uh-oh! It seems like you forgot to fill in some required information. Please make sure all fields are filled out before submitting."
        );
        return;
      }

      if (!data.gradeLevel) {
        toast.error(
          "Uh-oh! It seems like you forgot to fill in some required information. Please make sure all fields are filled out before submitting."
        );
        return;
      }

      if (isEditing) {
        onSave?.({
          ...data,
          level,
        });
      } else if (isCreating) {
        onCreate?.(data);
      }
    },
    [isEditing, isCreating, onSave, level, onCreate]
  );

  useEffect(() => {
    if (isEditing) {
      setLevel(row.original.gradeLevel);
    }
  }, [isEditing, row.original.gradeLevel]);

  return (
    <>
      <Box p={"md"}>
        <LoadingOverlay
          visible={table.getState().isSaving}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
          loaderProps={{ color: "yellow", type: "oval" }}
        />{" "}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Title order={5}>
            {`${isEditing ? "Editing" : "Adding"}`} form for Grade Level
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
                      placeholder="Level of Education..."
                      data={educationData.map((course) => ({
                        label: course.levelOfEducation || "",
                        value: course.levelOfEducation || "",
                      }))}
                      onChange={(_e) => {
                        onChange(_e);
                      }}
                      withAsterisk
                      {...field}
                    />
                  );
                }}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
              <TextInput
                label="Your Grade Level"
                placeholder="Grade Level"
                {...register("gradeLevel")}
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

export default GradeLevelForm;
