import Form from "@components/Form/Form";
import { Box } from "@mantine/core";
import { useCallback, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { MRT_RowData, MRT_TableInstance, MRT_Row } from "mantine-react-table";
import { IBooks } from "./models/books.interface";
import BookImageForm from "./CatalogueForm/BookImageForm";
import Availability from "./CatalogueForm/Availability";
import BookLocationAndDetailsForm from "./CatalogueForm/BookLocationAndDetailsForm";
import BookInformationForm from "./CatalogueForm/BookformationForm";
import BookPublicationForm from "./CatalogueForm/PublicationInformation";

interface CatalogueFormProps<TData extends MRT_RowData> {
  table: MRT_TableInstance<TData>;
  row: MRT_Row<TData>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onCreate?: (props: Record<string, any>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSave?: (props: Record<string, any>) => void;
}

export default function CatalogueForm<TData extends MRT_RowData>({
  table,
  row,
  onCreate,
  onSave,
}: CatalogueFormProps<TData>) {
  const isCreating = table.getState().creatingRow?.id === row.id;
  const isEditing = table.getState().editingRow?.id === row.id;

  const form = useForm<IBooks>({
    defaultValues: isEditing ? row.original : {},
  });

  const convertToMilliseconds = (quantity: string, timeUnit: string) => {
    // Convert the quantity to milliseconds based on the selected unit
    const quantityInMilliseconds = parseInt(quantity) || 0; // Ensure quantity is a number
    switch (timeUnit) {
      case "second":
        return quantityInMilliseconds * 1000;
      case "minute":
        return quantityInMilliseconds * 60 * 1000;
      case "hour":
        return quantityInMilliseconds * 60 * 60 * 1000;
      case "day":
        return quantityInMilliseconds * 24 * 60 * 60 * 1000;
      default:
        return 0;
    }
  };

  const onSubmit = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (values: Partial<IBooks>) => {
      const milliseconds = convertToMilliseconds(
        values.timeSpecifier as string,
        values.timeUnit as string
      );

      if (isCreating) {
        onCreate?.({
          ...values,
          milliseconds,
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
     <BookInformationForm table={table} row={row} />

        <BookLocationAndDetailsForm  />

        <BookPublicationForm />

        <Availability /> 

        <BookImageForm table={table} row={row} />

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
