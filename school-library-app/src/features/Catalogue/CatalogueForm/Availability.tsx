import Form from "@components/Form/Form";
import { NumberInput, Select } from "@mantine/core";
import {
  IconClockOff,
  IconStackBack,
  IconTimeDuration5,
} from "@tabler/icons-react";
import { MRT_TableInstance, MRT_Row, MRT_RowData } from "mantine-react-table";
import { useEffect, useState } from "react";
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

interface AvailabilityProps<TData extends MRT_RowData> {
  table?: MRT_TableInstance<TData>;
  row?: MRT_Row<TData>;
}

const Availability = <TData extends MRT_RowData>({
  table,
  row,
}: AvailabilityProps<TData>) => {
  const isEditing = table?.getState().editingRow?.id === row?.id;
  const {
    control,
    watch,
    formState: { errors },
    setValue,
  } = useFormContext();
  const [unit, setUnit] = useState<string | null>(
    isEditing
      ? timeUnitData
          .filter((unit) => unit.value === row?.original.timeUnit)
          .map((unit) => unit.label)[0]
      : null
  ); // Dropdown for unit

  useEffect(() => {
    if (isEditing) {
      const selectedLabel = timeUnitData.find(
        (unit) => unit.value === row?.original.timeUnit
      );
      setValue("timeUnit", selectedLabel?.value);
    } else {
      setValue("timeUnit", "");
    }
  }, [isEditing, row?.original.timeUnit, setValue]);
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
                  value={value || unit}
                  {...field}
                  error={<>{errors.timeUnit?.message}</>}
                  withErrorStyles={errors.timeUnit?.message ? true : false}
                  leftSection={<IconClockOff size={14} />}
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
                  leftSection={
                    <>
                      <IconTimeDuration5 size={14} />
                    </>
                  }
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
                  disabled={isEditing}
                  leftSection={<IconStackBack size={14} />}
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
