import { useCallback, useState } from "react";
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
import { TGradeLevel } from "./useReadGradeLevel";
import { toast } from "sonner";

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
  const [disableBtn, setDisabledBtn] = useState(false);

  const { data: educationData = [] } = useReadEducation();

  const isEditing = table.getState().editingRow?.id === row.id;

  const { control, handleSubmit, register } = useForm<TGradeLevel>({
    defaultValues: isEditing ? row.original : {},
  });

  const isCreating = table.getState().creatingRow?.id === row.id;

  const onSubmit = useCallback(
    (data: TGradeLevel) => {
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

      setDisabledBtn(true);
    },
    [onCreate, onSave, isEditing, isCreating]
  );

  return (
    <>
      <Box p={"md"}>
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
                        label: course.levelOfEducation,
                        value: course.levelOfEducation,
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
            <Button
              disabled={disableBtn}
              loading={table.getState().isSaving}
              type="submit"
            >
              Save
            </Button>
          </Flex>
        </form>
      </Box>
    </>
  );
}

export default GradeLevelForm;
