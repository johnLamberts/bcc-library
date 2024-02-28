import Form from "@components/Form/Form";
import { Controller, set, useForm } from "react-hook-form";
import {
  Box,
  Checkbox,
  Code,
  ComboboxData,
  Divider,
  NumberInput,
  Select,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { useEffect, useState } from "react";
import {
  IconEyeExclamation,
  IconNotebook,
  IconReportMoney,
} from "@tabler/icons-react";
import useReadMissingCategory from "@features/SysSettings/ReturnCondition/useReadMissingCategory";
import useReadDamagedCategory from "@features/SysSettings/ReturnCondition/useReadDamagedCategory";
import { MRT_RowData, MRT_TableInstance } from "mantine-react-table";
// interface CirculationFormProps<TData extends MRT_RowData> {
//
//   row: MRT_Row<TData>;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   onCreate?: (props: Record<string, any>) => void;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
// }

interface BooksReturnFormProps<TData extends MRT_RowData> {
  table: MRT_TableInstance<TData>; // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rowData?: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSave?: (props: Record<string, any>) => void;
}
function BooksReturnForm<TData extends MRT_RowData>({
  rowData,
  table,
  onSave,
}: BooksReturnFormProps<TData>) {
  const [isSave, setIsSave] = useState(false);

  const [bookPrice, setBookPrice] = useState(false);

  const form = useForm({
    defaultValues: {
      bookCondition: rowData?.bookCondition,
      returnCategory: "",
      conditionFee: rowData?.fee,
      categoryFee: 0,
      totalFee: 0,
      descriptionOrNotes: "",
    },
  });

  const { data: damagedCategory = [], isLoading: isLoadingDamageCategory } =
    useReadDamagedCategory();

  const { data: missingCategory = [], isLoading: isLoadingMissingCategory } =
    useReadMissingCategory();

  const sanitizeDamageCategory = damagedCategory.map((damage) => ({
    label: damage.damagedCategory,
    value: damage.damagedCategory,
  }));

  const sanitizeMissingCategory = missingCategory.map((damage) => ({
    label: damage.missingCategory,
    value: damage.missingCategory,
  }));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: Record<string, any>) => {
    onSave?.({
      ...data,
      ...rowData,
      isSave,
    });
  };

  useEffect(() => {
    const calculateTotalFee = () => {
      const categoryFee = form.watch("categoryFee");
      const conditionFee = form.getValues("conditionFee");
      const totalFee = categoryFee + parseInt(conditionFee);

      form.setValue("totalFee", isNaN(totalFee) ? 0 : totalFee);
    };

    calculateTotalFee();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, form.watch("categoryFee")]);

  const handleCheckboxChange = () => {
    setBookPrice((prevValue) => !prevValue); // Toggle checkbox state

    const price = rowData?.booksPrice || 0; // Get book price from rowData
    form.setValue("categoryFee", bookPrice ? 0 : price); // Set categoryFee based on checkbox state
  };

  return (
    <Form onSubmit={form.handleSubmit(onSubmit)}>
      <Code block>
        <Form.Box>
          <Form.Grid>
            {/**
             *
             * Book Condition
             *
             * */}
            <Form.Col>
              <TextInput
                {...form.register("bookCondition")}
                readOnly
                label={"Book Condition"}
                // rightSection={<>Readonly</>}
              />
            </Form.Col>

            {/* -------------------------- */}

            {rowData?.bookCondition.toLowerCase().includes("damaged") ? (
              <>
                <Form.Col>
                  <Controller
                    control={form.control}
                    name="returnCategory"
                    render={({ field }) => {
                      return (
                        <Select
                          data={(sanitizeDamageCategory as ComboboxData) || []}
                          allowDeselect={false}
                          searchable
                          label="Damage Category"
                          {...field}
                        />
                      );
                    }}
                  />
                </Form.Col>
              </>
            ) : null}

            {rowData?.bookCondition.toLowerCase().includes("missing") ? (
              <>
                <Form.Col>
                  <Controller
                    control={form.control}
                    name="returnCategory"
                    render={({ field }) => {
                      return (
                        <Select
                          data={(sanitizeMissingCategory as ComboboxData) || []}
                          allowDeselect={false}
                          searchable
                          label="Missing Category"
                          {...field}
                        />
                      );
                    }}
                  />
                </Form.Col>
              </>
            ) : null}

            {rowData?.bookCondition.toLowerCase().includes("missing") ||
            rowData?.bookCondition.toLowerCase().includes("damage") ? (
              <>
                <Form.Col>
                  <Controller
                    name="categoryFee"
                    control={form.control}
                    render={({ field }) => {
                      return (
                        <>
                          {bookPrice ? (
                            <Tooltip label="Using book price will get this field readonly">
                              <NumberInput
                                placeholder="Category Fee"
                                {...field}
                                leftSection={<>₱</>}
                                allowNegative={false}
                                allowDecimal={false}
                                readOnly={
                                  form.watch("returnCategory") === "" ||
                                  bookPrice
                                }
                                rightSection={<IconEyeExclamation size={14} />}
                              />
                            </Tooltip>
                          ) : (
                            <NumberInput
                              placeholder="Category Fee"
                              {...field}
                              leftSection={<>₱</>}
                              allowNegative={false}
                              allowDecimal={false}
                              disabled={form.watch("returnCategory") === ""}
                            />
                          )}

                          <Checkbox
                            mt={"sm"}
                            checked={bookPrice}
                            onChange={handleCheckboxChange}
                            label="Use book price instead"
                            disabled={form.watch("returnCategory") === ""}
                          />
                        </>
                      );
                    }}
                  />
                </Form.Col>
              </>
            ) : null}

            {/* -------------------------- */}
            {/**
             *
             * Description/Notes
             *
             * */}
            <Form.Col>
              <TextInput
                label={"Description"}
                description="You may add description or notes and it is required."
                withAsterisk
                placeholder="You may input here the current condition of the books after returning."
                withErrorStyles={
                  form.formState.errors.descriptionOrNotes?.message
                    ? true
                    : false
                }
                {...form.register("descriptionOrNotes", {
                  required: `This field is required`,
                })}
                error={<>{form.formState.errors.descriptionOrNotes?.message}</>}
                rightSection={
                  <>
                    <IconNotebook />
                  </>
                }
              />
            </Form.Col>

            {/**
             *
             * Total Fee
             *
             * */}
            <Form.Col>
              <TextInput
                {...form.register("totalFee")}
                readOnly
                label={"Total Fee"}
                description="Readonly"
                rightSection={
                  <>
                    <IconReportMoney />
                  </>
                }
              />
            </Form.Col>
          </Form.Grid>
        </Form.Box>
      </Code>
      <Divider mt={"xs"} mb={"xs"} />
      <Box
        style={{
          display: "flex",
          justifyContent: "end",
          gap: "0.5rem",
        }}
      >
        <Form.SubmitButton
          alias="Save"
          loading={table.getState().isSaving}
          disabled={isLoadingDamageCategory || isLoadingMissingCategory}
          onClick={() => setIsSave(true)}
        />

        {!rowData?.bookCondition.toLowerCase().includes("returned") && (
          <Form.SubmitButton
            color="yellow"
            alias="Partial Save"
            onClick={() => setIsSave(false)}
            disabled={isLoadingDamageCategory || isLoadingMissingCategory}
          />
        )}
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
