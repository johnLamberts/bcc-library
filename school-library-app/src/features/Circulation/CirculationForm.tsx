import Form from "@components/Form/Form";
import { Box } from "@mantine/core";
import { useCallback, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { MRT_RowData, MRT_TableInstance, MRT_Row } from "mantine-react-table";
import { IBooks } from "./models/books.interface";
import BookLocationAndDetailsForm from "./CatalogueForm/BookLocationAndDetailsForm";
import BookInformationForm from "./CatalogueForm/BookformationForm";
import BorrowersInformationForm from "./CatalogueForm/BookformationForm";
import BooksToBeBorrowedDetailsForm from "./CatalogueForm/BookLocationAndDetailsForm";

interface CirculationFormProps<TData extends MRT_RowData> {
  table: MRT_TableInstance<TData>;
  row: MRT_Row<TData>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onCreate?: (props: Record<string, any>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSave?: (props: Record<string, any>) => void;
}

export default function CirculationForm<TData extends MRT_RowData>({
  table,
  row,
  onCreate,
  onSave,
}: CirculationFormProps<TData>) {
  const isCreating = table.getState().creatingRow?.id === row.id;
  const isEditing = table.getState().editingRow?.id === row.id;

  const form = useForm<IBooks>({
    defaultValues: isEditing ? row.original : {},
  });

  const onSubmit = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (values: Partial<IBooks>) => {
      if (isCreating) {
        onCreate?.({
          ...values,
        });
      } else if (isEditing) {
        onSave?.(values);
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

        // errorElem.focus({ preventScroll: true });
        errorElem.focus();
      }
    }
  }, [form.formState.errors]);

  return (
    <FormProvider {...form}>
      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <BorrowersInformationForm table={table} row={row} />

        <BooksToBeBorrowedDetailsForm />

        {/* <BookPublicationForm />

        <Availability />

        <BookImageForm table={table} row={row} /> */}

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
  );
}
