/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Form from "@components/Form/Form";
import { Box, Textarea } from "@mantine/core";
import { MRT_RowData, MRT_TableInstance, MRT_Row } from "mantine-react-table";
import { Controller, useForm } from "react-hook-form";

interface DeclineFormProps<TData extends MRT_RowData> {
  table: MRT_TableInstance<TData>;
  row: MRT_Row<TData>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onCreate?: (props: Record<string, any>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSave?: (props: Record<string, any>) => void;
}

const DeclineForm = <TData extends MRT_RowData>({
  table,
  row,
  onCreate,
  onSave,
}: DeclineFormProps<TData>) => {
  const form = useForm();

  const handleSubmit = (e: any) => {
    onSave?.({
      ...row.original,
      reasons: e.reasons,
    });
  };

  return (
    <Form onSubmit={form.handleSubmit(handleSubmit)}>
      <Form.Box>
        <Form.Grid>
          <Form.Col span={{ base: 12, md: 12, lg: 12 }}>
            <Controller
              name="reasons"
              control={form.control}
              rules={{
                required: "This field is required",
              }}
              render={({ field }) => {
                return (
                  <Textarea
                    resize="vertical"
                    label="Reason"
                    placeholder="Your comment"
                    {...field}
                    withErrorStyles={
                      form.formState.errors.reasons?.message ? true : false
                    }
                    error={<>{form.formState.errors.reasons?.message}</>}
                  />
                );
              }}
            />
          </Form.Col>
        </Form.Grid>
      </Form.Box>

      <Box
        style={{
          display: "flex",
          justifyContent: "end",
          marginTop: "0.5rem",
        }}
      >
        <Form.SubmitButton alias="Confirm" color="yellow.8" />
      </Box>
    </Form>
  );
};
export default DeclineForm;
