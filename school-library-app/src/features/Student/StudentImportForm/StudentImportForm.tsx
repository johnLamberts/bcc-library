/* eslint-disable @typescript-eslint/no-explicit-any */
import Form from "@components/Form/Form";
import {
  Box,
  Divider,
  FileInput,
  Group,
  LoadingOverlay,
  Progress,
  Text,
} from "@mantine/core";
import { MRT_RowData, MRT_TableInstance } from "mantine-react-table";
import { Controller, FormProvider, useForm } from "react-hook-form";
import * as XLSX from "xlsx";
import generateRandomPassword from "src/utils/helpers/generateRandomPassword";
interface StudentImportFormProps<TData extends MRT_RowData> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSave: (values: any) => void;
  table: MRT_TableInstance<TData>;
  progressTracker?: number;
}

function camelCase(str: string): string {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
}

const StudentImportForm = <TData extends MRT_RowData>({
  onSave,
  table,
  progressTracker,
}: StudentImportFormProps<TData>) => {
  const form = useForm();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (value: any) => {
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
          // Exclude the timestamp column by skipping it
          if (header.toLowerCase() !== "timestamp") {
            obj[header] = row[index];
          }
        });
        return obj;
      });

      const studentParsedData = convertedData.map((entry: any) => ({
        ...entry,
        password: generateRandomPassword(8), // You should replace generatePassword() with your own logic to generate passwords
        studentImage:
          "https://firebasestorage.googleapis.com/v0/b/library-management-syste-fb3e9.appspot.com/o/def_user.png?alt=media&token=b3ea39b4-cba7-4095-8e6c-6996848f0391", // Replace "default_image_url" with the URL of the default image
      }));

      // console.log(studentParsedData);
      onSave(studentParsedData);
    };

    reader.readAsBinaryString(file);
  };

  // studentImage:

  return (
    <div>
      <FormProvider {...form}>
        <LoadingOverlay
          visible={table.getState().isSaving}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
          loaderProps={{
            width: "80vw",
            children: (
              <>
                <Progress
                  value={progressTracker as number}
                  w="20rem"
                  transitionDuration={200}
                />
                <Group justify="space-between" mt={"xs"}>
                  <Text ff="Montserrat" size={"0.5rem"}>
                    {(progressTracker as number) >= 0 &&
                      (progressTracker as number) < 25 &&
                      "Preparing for your documents"}
                    {(progressTracker as number) >= 26 &&
                      (progressTracker as number) < 48 &&
                      "Checking all data"}
                    {(progressTracker as number) >= 49 &&
                      (progressTracker as number) < 79 &&
                      "Processing data"}
                    {(progressTracker as number) >= 80 &&
                      (progressTracker as number) < 99 &&
                      "Almost there..."}
                    {(progressTracker as number) === 100 &&
                      "Processing completed. Data imported successfully!"}
                    {/* {progressTracker ===  && "Preparing for your documents"} */}
                  </Text>
                  <Text ff="Montserrat" size={"0.5rem"}>
                    {progressTracker}%
                  </Text>
                </Group>
              </>
            ),
          }}
        />

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
