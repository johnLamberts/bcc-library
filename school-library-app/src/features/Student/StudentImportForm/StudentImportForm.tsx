/* eslint-disable @typescript-eslint/no-explicit-any */
import Form from "@components/Form/Form";
import { Box, Divider, FileInput } from "@mantine/core";
import { Controller, FormProvider, useForm } from "react-hook-form";
import * as XLSX from "xlsx";
interface StudentImportFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSave: (values: any) => void;
}

function camelCase(str: string): string {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
}

const StudentImportForm = ({ onSave }: StudentImportFormProps) => {
  const form = useForm();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (value: any) => {
    // Papa.parse(value.import, {
    //   skipEmptyLines: true,
    //   header: true,
    //   complete: function (result) {
    //     const { data } = result;

    //     onSave(data);
    //   },
    // });

    // onSave(value);

    const file = value.import;

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      const data = e.target?.result;
      if (typeof data !== "string") return;

      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0]; // Assuming only one sheet
      const worksheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
      }) as any[][];

      if (parsedData.length === 0) {
        console.error("Empty data");
        return;
      }

      // Convert parsed data to JSON with keys in camelCase
      const headers = parsedData[0].map((header: string) => camelCase(header));
      const convertedData = parsedData.slice(1).map((row: any[]) => {
        const obj: { [key: string]: any } = {};
        headers.forEach((header: string, index: number) => {
          obj[header] = row[index];
        });
        return obj;
      });
      onSave(convertedData);
    };

    reader.readAsBinaryString(file);
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
                      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                      description="Only accepts Excel Files 2007+ (.XLSX) format"
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
