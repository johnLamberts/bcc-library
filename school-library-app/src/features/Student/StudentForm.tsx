import Form from "@components/Form/Form";
import { Box, TextInput } from "@mantine/core";
import { useCallback, useEffect } from "react";
import BasicInformationForm from "./StudentForm/BasicInformationForm";
import { FormProvider, useForm } from "react-hook-form";
import EducationForm from "./StudentForm/EducationForm";
import StudentImageForm from "./StudentForm/StudentImageForm";
import useReadStudentEntry from "./hooks/useReadLatestEntry";
import { DocumentData } from "firebase/firestore";
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
    defaultValues: isEditing ? row.original : {},
  });

  const { data: studentEntryData = [], isLoading } = useReadStudentEntry();

  const studentEntryLatest = studentEntryData.map(
    (doc: DocumentData) => doc.studentEntry
  );

  const onSubmit = useCallback(
    (values: Partial<IStudents>) => {
      if (isCreating) {
        onCreate?.(values);
      } else if (isEditing) {
        onSave?.(values);
      }
    },
    [onCreate, isCreating, isEditing, onSave]
  );

  useEffect(() => {
    if (studentEntryLatest.every((value) => value === undefined)) {
      form.setValue("studentEntry", Number(1));
    } else {
      const filterValues = studentEntryLatest.filter(
        (entry) => entry !== undefined
      ) as number[];

      if (filterValues.length > 0) {
        form.setValue("studentEntry", Math.max(...studentEntryLatest) + 1);
      } else {
        form.setValue("studentEntry", Number(1));
      }
    }

    if (isEditing) {
      form.setValue("studentEntry", row.original.studentEntry);
    }
  }, [studentEntryLatest, form, isEditing, row.original.studentEntry]);

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

        // errorElem.focus({ preventScroll: true });
        errorElem.focus();
      }
    }
  }, [form.formState.errors]);

  return (
    <FormProvider {...form}>
      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <Form.Grid p={"lg"}>
          <Form.Col span={{ base: 12, md: 3, lg: 6 }}>
            <TextInput
              label="Student Entry"
              withAsterisk
              disabled
              // withErrorStyles={errors.firstName?.message ? true : false}
              // error={<>{errors.firstName && errors.firstName?.message}</>}
              {...form.register("studentEntry")}
            />
          </Form.Col>
          {isEditing && (
            <Form.Col span={{ base: 12, md: 3, lg: 6 }}>
              <TextInput
                label="Student Number"
                withAsterisk
                disabled
                value={isEditing ? row.original.studentNumber : ""}
                // withErrorStyles={errors.firstName?.message ? true : false}
                // error={<>{errors.firstName && errors.firstName?.message}</>}
              />
            </Form.Col>
          )}
        </Form.Grid>
        <BasicInformationForm />

        <EducationForm />

        <StudentImageForm table={table} row={row} />

        <Box
          style={{
            display: "flex",
            justifyContent: "end",
          }}
        >
          <Form.SubmitButton
            loading={table.getState().isSaving}
            disabled={isLoading}
            color="red.8"
          />
        </Box>
      </Form>
    </FormProvider>
  );
}
