import Form from "@components/Form/Form";
import { MRT_RowData, MRT_TableInstance, MRT_Row } from "mantine-react-table";
import { Controller, useForm } from "react-hook-form";
import { ICirculation } from "./models/circulation.interface";
import { Box, Divider, NumberInput, Select } from "@mantine/core";
import useReadReturnCondition from "@features/SysSettings/ReturnCondition/useReadReturnCondition";
import { useEffect, useState } from "react";
import IReturnCondition from "@features/SysSettings/ReturnCondition/model/return-condition.interface";
interface CirculationFormProps<TData extends MRT_RowData> {
  table: MRT_TableInstance<TData>;
  row: MRT_Row<TData>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onCreate?: (props: Record<string, any>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSave?: (props: Record<string, any>) => void;
}

function BooksReturnForm<TData extends MRT_RowData>({
  table,
  row,
  onSave,
}: CirculationFormProps<TData>) {
  const form = useForm();
  const isEditing = table.getState().editingRow?.id === row.id;
  const { data: returnCondition = [], isLoading } = useReadReturnCondition();

  const [condition, setCondition] = useState<string | null>("");

  const filteredFee = returnCondition
    .filter((cond) => cond.returnCondition === condition)
    .map((cond) => cond.fee)[0];

  const onSubmit = (data: Partial<ICirculation>) => {
    if (isEditing) {
      onSave?.({
        ...data,
        ...row.original,
      });
    }
  };

  useEffect(() => {
    if (
      returnCondition.some(
        (cond: IReturnCondition) => cond.returnCondition !== condition
      )
    ) {
      form.setValue("fee", filteredFee);
      form.setValue("totalFee", filteredFee);
    }
  }, [condition, filteredFee, form, returnCondition]);
  return (
    <Form onSubmit={form.handleSubmit(onSubmit)}>
      <Form.Box>
        <Form.Grid p={"lg"}>
          <Form.Col span={{ base: 12, md: 12, lg: 12 }}>
            <Controller
              name="returnCondition"
              control={form.control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, ...field } }) => (
                <Select
                  placeholder="Books Condition"
                  data={returnCondition.map((condition) => ({
                    label: condition.returnCondition,
                    value: condition.returnCondition,
                  }))}
                  onChange={(e) => {
                    onChange(e);
                    setCondition(e);
                  }}
                  label={"Books Condition after returning"}
                  {...field}
                  disabled={isLoading}
                  withErrorStyles={
                    form.formState.errors.returnCondition?.message
                      ? true
                      : false
                  }
                  {...field}
                  error={<>{form.formState.errors.returnCondition?.message}</>}
                />
              )}
            />
          </Form.Col>

          <Form.Col span={{ base: 12, md: 12, lg: 12 }}>
            <Controller
              control={form.control}
              name="fee"
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <NumberInput
                  label="Set Fee"
                  placeholder="Specify Fee"
                  prefix="₱"
                  thousandSeparator=" "
                  defaultValue={0}
                  decimalScale={2}
                  allowNegative={false}
                  {...field}
                />
              )}
            />
          </Form.Col>

          {/* <Form.Col span={{ base: 12, md: 12, lg: 12 }}>
            <Controller
              control={form.control}
              name="totalFee"
              render={({ field }) => (
                <NumberInput
                  label="Total Fee"
                  prefix="₱"
                  thousandSeparator=" "
                  defaultValue={0}
                  decimalScale={2}
                  allowNegative={false}
                  readOnly
                  {...field}
                />
              )}
            />
          </Form.Col> */}
        </Form.Grid>
      </Form.Box>

      <Divider mt={"xs"} mb={"xs"} />

      <Box
        style={{
          display: "flex",
          justifyContent: "end",
        }}
      >
        <Form.SubmitButton color="red.8" disabled={!form.formState.isValid} />
      </Box>
    </Form>
  );
}
export default BooksReturnForm;

// Book Title
// Borrower
// Borrower Name
// Borrower Email
// Due Date
// Status
