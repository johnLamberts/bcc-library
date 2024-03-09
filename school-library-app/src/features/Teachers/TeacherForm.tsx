import {
  Box,
  Checkbox,
  LoadingOverlay,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { FormProvider, useForm } from "react-hook-form";
import Form from "@components/Form/Form";
import { useCallback, useEffect, useState } from "react";
import { ITeacher } from "./models/teacher.interface";

import { MRT_RowData, MRT_TableInstance, MRT_Row } from "mantine-react-table";
import BasicInformationForm from "./TeacherForm/BasicInformationForm";
import EducationForm from "./TeacherForm/EducationForm";
import TeacherImageForm from "./TeacherForm/TeacherImageForm";

interface TeacherFormProps<TData extends MRT_RowData> {
  table: MRT_TableInstance<TData>;
  row: MRT_Row<TData>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onCreate?: (props: Record<string, any>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSave?: (props: Record<string, any>) => void;
}

export default function TeacherForm<TData extends MRT_RowData>({
  table,
  row,
  onCreate,
  onSave,
}: TeacherFormProps<TData>) {
  const isCreating = table.getState().creatingRow?.id === row.id;
  const isEditing = table.getState().editingRow?.id === row.id;

  const form = useForm<ITeacher>({
    defaultValues: isEditing ? row.original : {},
  });
  const [edit, setEdit] = useState<boolean>(true);

  const onSubmit = useCallback(
    (values: Partial<ITeacher>) => {
      if (isCreating) {
        // onSave?.(values);
        onCreate?.(values);
      } else if (isEditing) {
        onSave?.(values);
        // console.log(values);
      }
    },
    [onCreate, isCreating, isEditing, onSave]
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
    <>
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
                {...form.register("teacherNumber", {
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
          <BasicInformationForm />

          <EducationForm />

          <TeacherImageForm table={table} row={row} />

          <Box
            style={{
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Form.SubmitButton
              loading={table.getState().isSaving}
              color="red.8"
            />
          </Box>
        </Form>
      </FormProvider>
    </>
  );
}
