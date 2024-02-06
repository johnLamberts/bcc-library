import Form from "@components/Form/Form";
import { Box, Divider, FileInput, Input } from "@mantine/core";
import { Controller, FormProvider, useForm } from "react-hook-form";

interface StudentImportFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSave: (values: any) => void;
}

const StudentImportForm = ({ onSave }: StudentImportFormProps) => {
  const form = useForm();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (value: any) => {
    onSave(value);
  };

  return (
    <div>
      <FormProvider {...form}>
        <Form onSubmit={form.handleSubmit(onSubmit)}>
          <Form.Box>
            <Form.Grid>
              <Form.Col>
                <Controller
                  control={form.control}
                  name="import"
                  render={({ field }) => (
                    <FileInput
                      {...field}
                      placeholder="Place your file to import here"
                      accept="text/csv"
                      description="Only accepts CSV format"
                    />
                  )}
                />
              </Form.Col>
            </Form.Grid>
          </Form.Box>

          <Divider my={"lg"} />

          <Box
            style={{
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Form.SubmitButton alias="Save" />
          </Box>
        </Form>
      </FormProvider>
    </div>
  );
};
export default StudentImportForm;
