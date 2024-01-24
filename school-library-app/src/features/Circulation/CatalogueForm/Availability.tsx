import Form from "@components/Form/Form";
import { NumberInput, Select } from "@mantine/core";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

const timeUnitData = [
  {
    label: "Second",
    value: "second",
  },
  {
    label: "Minute",
    value: "minute",
  },
  {
    label: "Hour",
    value: "hour",
  },
  {
    label: "Day",
    value: "day",
  },
];
const Availability = () => {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext();
  const [unit, setUnit] = useState<string | null>(""); // Dropdown for unit

  return (
    <Form.Box mt={"md"}>
      <Form.Title>Book Availability</Form.Title>
      <Form.Grid p={"lg"}>
        <Form.Col span={{ base: 12, md: 6, lg: 4 }}>
          <Controller
            name="timeUnit"
            control={control}
            rules={{
              required: "This field is required",
            }}
            render={({ field: { onChange, value, ...field } }) => {
              return (
                <Select
                  data={timeUnitData}
                  label="Time Unit"
                  placeholder="Select time unit..."
                  onChange={(e) => {
                    setUnit(e);
                    onChange(e);
                  }}
                  value={value && unit}
                  {...field}
                  error={<>{errors.timeUnit?.message}</>}
                  withErrorStyles={errors.timeUnit?.message ? true : false}
                />
              );
            }}
          />
        </Form.Col>

        <Form.Col span={{ base: 12, md: 6, lg: 8 }}>
          <Controller
            name="timeSpecifier"
            control={control}
            rules={{
              required: "This field is required",
            }}
            render={({ field }) => {
              return (
                <NumberInput
                  allowNegative={false}
                  allowDecimal={false}
                  placeholder="Enter only a number"
                  label="Time Specifier"
                  {...field}
                  disabled={
                    watch("timeUnit") === undefined ||
                    watch("timeUnit") === "" ||
                    watch("timeUnit") === null
                  }
                  error={<>{errors.timeSpecifier?.message}</>}
                  withErrorStyles={errors.timeSpecifier?.message ? true : false}
                />
              );
            }}
          />
        </Form.Col>

        <Form.Col span={{ base: 12, md: 12, lg: 12 }}>
          <Controller
            name="numberOfBooksAvailable_QUANTITY"
            control={control}
            rules={{
              required: "This field is required",
            }}
            render={({ field }) => {
              return (
                <NumberInput
                  allowNegative={false}
                  allowDecimal={false}
                  placeholder="Enter a number of books available"
                  label="Number of Books"
                  {...field}
                  error={<>{errors.numberOfBooksAvailable_QUANTITY?.message}</>}
                  withErrorStyles={
                    errors.numberOfBooksAvailable_QUANTITY?.message
                      ? true
                      : false
                  }
                />
              );
            }}
          />
        </Form.Col>
      </Form.Grid>
    </Form.Box>
  );
};
export default Availability;
