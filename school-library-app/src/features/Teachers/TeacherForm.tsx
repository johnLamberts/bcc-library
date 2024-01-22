import { Box, TextInput } from "@mantine/core";
import { FormProvider, useForm } from "react-hook-form";
import Form from "@components/Form/Form";
import { useCallback, useEffect } from "react";
import { ITeacher } from "./models/teacher.interface";

import { MRT_RowData, MRT_TableInstance, MRT_Row } from "mantine-react-table";
import BasicInformationForm from "./TeacherForm/BasicInformationForm";
import EducationForm from "./TeacherForm/EducationForm";
import TeacherImageForm from "./TeacherForm/TeacherImageForm";
import useReadTeacherEntry from "./hooks/useReadLatestEntry";
import { DocumentData } from "firebase/firestore";

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

  const { data: teacherEntryData = [], isLoading } = useReadTeacherEntry();

  const teacherEntryLatest = teacherEntryData.map(
    (doc: DocumentData) => doc.teacherEntry
  );

  const form = useForm<ITeacher>({
    defaultValues: isEditing ? row.original : {},
  });

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
    if (teacherEntryLatest.every((value) => value === undefined)) {
      form.setValue("teacherEntry", Number(1));
    } else {
      const filterValues = teacherEntryLatest.filter(
        (entry) => entry !== undefined
      ) as number[];

      if (filterValues.length > 0) {
        form.setValue("teacherEntry", Math.max(...teacherEntryLatest) + 1);
      } else {
        form.setValue("teacherEntry", Number(1));
      }
    }
  }, [teacherEntryLatest, form, isEditing, row.original.teacherEntry]);

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
        <Form onSubmit={form.handleSubmit(onSubmit)}>
          <Form.Grid p={"lg"}>
            <Form.Col span={{ base: 12, md: 3, lg: 6 }}>
              <TextInput
                label="Teacher Entry"
                withAsterisk
                disabled
                // withErrorStyles={errors.firstName?.message ? true : false}
                // error={<>{errors.firstName && errors.firstName?.message}</>}
                {...form.register("teacherEntry")}
              />
            </Form.Col>
            {isEditing && (
              <Form.Col span={{ base: 12, md: 3, lg: 6 }}>
                <TextInput
                  label="Teacher Number"
                  withAsterisk
                  disabled
                  value={isEditing ? row.original.teacherNumber : ""}
                  // withErrorStyles={errors.firstName?.message ? true : false}
                  // error={<>{errors.firstName && errors.firstName?.message}</>}
                />
              </Form.Col>
            )}
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
              disabled={isLoading}
              loading={table.getState().isSaving}
              color="red.8"
            />
          </Box>
        </Form>
      </FormProvider>
    </>
  );
}
