import Form from "@components/Form/Form";
import {
  Paper,
  Flex,
  Group,
  Avatar,
  Divider,
  Select,
  Text,
  Title,
  Box,
  LoadingOverlay,
} from "@mantine/core";
import { MRT_RowData, MRT_TableInstance, MRT_Row } from "mantine-react-table";
import { Controller, useForm } from "react-hook-form";
import findKeyInObject from "src/utils/helpers/findKeyInObject";

interface AcquisitionFormProps<TData extends MRT_RowData> {
  table: MRT_TableInstance<TData>;
  row: MRT_Row<TData>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onCreate?: (props: Record<string, any>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSave: (props: Record<string, any>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  quantityValues: Record<string, any>;
}
const AcquisitionForm = <TData extends MRT_RowData>({
  table,
  row,
  onSave,
  quantityValues,
}: AcquisitionFormProps<TData>) => {
  const value = findKeyInObject(quantityValues, row.original.id as string);
  const form = useForm();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (e: Record<string, any>) => {
    onSave?.({
      ...row.original,
      reason: e.reason,
      qty: value,
    });
  };

  return (
    <>
      <Form onSubmit={form.handleSubmit(handleSubmit)}>
        <LoadingOverlay
          visible={table.getState().isSaving}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <Form.Box>
          <Text>
            Please confirm adding stock/quantity for the book: <br />
          </Text>
          <br />
          <Paper withBorder shadow="sm" p="xl">
            <Flex justify={"center"} align={"center"}>
              <Group gap={"xs"}>
                <Avatar src={row.original.bookImageCover as string} h={40} />

                <div>
                  <Title order={6} c="dimmed" size="sm">
                    Title:{" "}
                    <Text
                      span
                      fw={"bold"}
                      inherit
                      c="var(--mantine-color-anchor)"
                    >
                      {row.original.title}
                    </Text>
                  </Title>
                  <Title order={6} c="dimmed" size="sm">
                    ISBN:{" "}
                    <Text
                      span
                      fw={"bold"}
                      inherit
                      c="var(--mantine-color-anchor)"
                    >
                      {row.original.bookISBN}
                    </Text>
                  </Title>

                  <Text c="dimmed" size="sm">
                    Book Type:{" "}
                    <Text
                      span
                      fw={"bold"}
                      inherit
                      c="var(--mantine-color-anchor)"
                    >
                      {row.original.bookType}
                    </Text>
                  </Text>

                  <Title order={6} c="dimmed" size="sm">
                    Stock to be added:{" "}
                    <Text
                      span
                      fw={"bold"}
                      inherit
                      c="var(--mantine-color-anchor)"
                    >
                      {row.original.numberOfBooksAvailable_QUANTITY} &rarr;{" "}
                      {value}
                    </Text>
                  </Title>
                </div>
              </Group>
            </Flex>
          </Paper>
          <Divider my={"xs"} />
          <Form.Grid>
            <Form.Col span={{ base: 12, lg: 12, md: 6 }}>
              <Controller
                rules={{
                  required: "This field is required",
                }}
                render={({ field }) => (
                  <Select
                    data={["Replace", "Donate", "Other"]}
                    placeholder="Select options"
                    label="Reason"
                    {...field}
                    error={<>{form.formState.errors.reason?.message}</>}
                    withErrorStyles={
                      form.formState.errors.reason?.message ? true : false
                    }
                  />
                )}
                control={form.control}
                name="reason"
              />
            </Form.Col>
            {/* {reasons === "Replace" && (
      <Grid.Col span={{ base: 12, lg: 12, md: 6 }}>
        <Select
          data={["Replace", "Donate", "Other"]}
          placeholder="Select options"
          label="Borrower's Email'"
        />
       
      </Grid.Col>
    )} */}
          </Form.Grid>
          <br />
          <b>NOTE:</b> Please review the information carefully before
          proceeding.
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
        </Form.Box>
      </Form>
    </>
  );
};
export default AcquisitionForm;
