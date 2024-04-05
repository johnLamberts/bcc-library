import Form from "@components/Form/Form";
import {
  Box,
  Checkbox,
  LoadingOverlay,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import BasicInformationForm from "./StudentForm/BasicInformationForm";
import { FormProvider, useForm } from "react-hook-form";
import EducationForm from "./StudentForm/EducationForm";
import StudentImageForm from "./StudentForm/StudentImageForm";
import { MRT_RowData, MRT_TableInstance, MRT_Row } from "mantine-react-table";
import { IStudents } from "./models/student.interface";

interface StudentFormProps<TData extends MRT_RowData> {
  table: MRT_TableInstance<TData>;
  row: MRT_Row<TData>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onCreate?: (props: Record<string, any>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSave?: (props: Record<string, any>) => void;
}

export default function StudentForm<TData extends MRT_RowData>({
  table,
  row,
  onCreate,
  onSave,
}: StudentFormProps<TData>) {
  const isCreating = table.getState().creatingRow?.id === row.id;
  const isEditing = table.getState().editingRow?.id === row.id;

  const form = useForm<IStudents>({
    defaultValues: isEditing
      ? {
          ...row.original,
          academicCourse: row.original.academicCourse,
          gradeLevel: row.original.gradeLevel,
          gradeSection: row.original.gradeSection,
          levelOfEducation: row.original.levelOfEducation,
          sex: row.original.sex,
        }
      : {
          academicCourse: null,
          gradeLevel: null,
          gradeSection: null,
          levelOfEducation: null,
          sex: null,
        },
  });

  const [edit, setEdit] = useState<boolean>(true);

  const onSubmit = useCallback(
    (values: Partial<IStudents>) => {
      if (isCreating) {
        onCreate?.({
          ...values,
          edit,
        });

        form.reset();
      } else if (isEditing) {
        onSave?.(values);
      }
    },
    [isCreating, isEditing, onCreate, edit, form, onSave]
  );
  useEffect(() => {
    if (form.formState.errors) {
      const elements = Object.keys(form.formState.errors)
        .map(
          () =>
            document.querySelectorAll<HTMLInputElement>(
              `[data-error="true"]`
            )[0]
        )
        .filter((el) => !!el);
      elements.sort(
        (a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top
      );

      if (elements.length > 0) {
        const errorElem = elements[0];

        errorElem.scrollIntoView({ behavior: "smooth", block: "center" });

        errorElem.focus();
      }
    }
  }, [form.formState.errors]);

  return (
    <FormProvider {...form}>
      <LoadingOverlay
        visible={table.getState().isSaving}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <Form.Grid p={"lg"}>
          <Form.Col span={{ base: 12, md: 3, lg: 6 }}>
            <TextInput
              label="Student Number"
              withAsterisk
              placeholder="Place your student number here"
              disabled={isEditing && edit}
              {...form.register("studentNumber", {
                required: "This field is required!",
              })}
              rightSection={
                <>
                  {isEditing && (
                    <Tooltip
                      label={`To
                        ${
                          edit ? " turn on " : "turn off "
                        }this field,  you may ${
                        edit ? " enable" : "disabled"
                      } this by toggling the checkbox.`}
                    >
                      <Checkbox
                        checked={edit}
                        onChange={(e) => setEdit(e.currentTarget.checked)}
                      />
                    </Tooltip>
                  )}
                </>
              }
            />
          </Form.Col>
        </Form.Grid>
        <BasicInformationForm table={table} row={row} />

        <EducationForm table={table} row={row} />

        <StudentImageForm table={table} row={row} />

        <Box
          style={{
            display: "flex",
            justifyContent: "end",
            gap: "0.5rem",
          }}
        >
          {isCreating && (
            <Form.SubmitButton
              loading={table.getState().isSaving}
              onClick={() => setEdit(false)}
              color="red"
              alias={`Save Student`}
            />
          )}

          <Form.SubmitButton
            loading={table.getState().isSaving}
            onClick={() => setEdit(true)}
            color="yellow"
            alias={`${isCreating ? "Save" : "Update"} and Exit`}
          />
        </Box>
      </Form>
    </FormProvider>
  );
}
