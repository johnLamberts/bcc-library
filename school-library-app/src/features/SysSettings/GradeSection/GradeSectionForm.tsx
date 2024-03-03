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
  LoadingOverlay,
} from "@mantine/core";
import { Controller, useForm } from "react-hook-form";
import { MRT_Row, MRT_RowData, MRT_TableInstance } from "mantine-react-table";
import useReadGradeLevel from "../GradeLevel/useReadGradeLevel";
import { toast } from "sonner";
import IGradeSection from "./grade-section.interface";

interface GradeSectionFormProps<TData extends MRT_RowData> {
  table: MRT_TableInstance<TData>;
  row: MRT_Row<TData>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onCreate?: (props: Record<string, any>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSave?: (props: Record<string, any>) => void;
}

function GradeSectionForm<TData extends MRT_RowData>({
  table,
  row,
  onCreate,
  onSave,
}: GradeSectionFormProps<TData>) {
  const [disableBtn, setDisabledBtn] = useState(false);

  const { data: gradeLevelData = [] } = useReadGradeLevel();

  const isEditing = table.getState().editingRow?.id === row.id;

  const { control, handleSubmit, register } = useForm<IGradeSection>({
    defaultValues: isEditing ? row.original : {},
  });

  const isCreating = table.getState().creatingRow?.id === row.id;

  const onSubmit = useCallback(
    (data: IGradeSection) => {
      if (!data.gradeLevel) {
        setDisabledBtn(false);
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
        <LoadingOverlay
          visible={table.getState().isSaving}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
          loaderProps={{ color: "yellow", type: "oval" }}
        />{" "}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Title order={5}>
            {`${isEditing ? "Editing" : "Adding"}`} form for Grade Section
          </Title>

          <Divider />
          <Grid mt={"md"}>
            <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
              <Controller
                control={control}
                name="gradeLevel"
                render={({ field }) => {
                  return (
                    <Select
                      label="Level of Education"
                      placeholder="Level of Education..."
                      data={gradeLevelData.map((gradeLevel) => ({
                        label: gradeLevel.gradeLevel || "",
                        value: gradeLevel.gradeLevel || "",
                      }))}
                      searchable
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
                {...register("gradeSection")}
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

export default GradeSectionForm;
