import Form from "@components/Form/Form";
import useReadCategorySection from "@features/SysSettings/CategorySection/hooks/useReadCategorySection";
import {
  InputBase,
  NumberInput,
  Select,
  TextInput,
  Textarea,
} from "@mantine/core";
import { Controller, useFormContext } from "react-hook-form";
import { IMaskInput } from "react-imask";

const BookLocationAndDetailsForm = () => {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext();

  const { data: bookSectionData = [], isLoading: isBookSectionLoading } =
    useReadCategorySection();

  return (
    <Form.Box mt={"md"}>
      <Form.Title>Book Location and Details</Form.Title>
      <Form.Grid p={"lg"}>
        <Form.Col span={{ base: 12, md: 6, lg: 6 }}>
          <Controller
            name="bookISBN"
            control={control}
            render={({ field }) => {
              return (
                <InputBase
                  component={IMaskInput}
                  withAsterisk
                  mask="000-0-000-00000-0"
                  label="ISBN"
                  placeholder="Your ISBN..."
                  withErrorStyles={errors.bookISBN?.message ? true : false}
                  {...field}
                  error={<>{errors.bookISBN?.message}</>}
                />
              );
            }}
          />
        </Form.Col>

        <Form.Col span={{ base: 12, md: 6, lg: 6 }}>
          <Controller
            name="callNumber"
            control={control}
            render={({ field }) => {
              return (
                <InputBase
                  component={IMaskInput}
                  withAsterisk
                  mask="000.00"
                  label="Call Number"
                  placeholder="Your Call Number..."
                  withErrorStyles={errors.callNumber?.message ? true : false}
                  {...field}
                  error={<>{errors.callNumber?.message}</>}
                />
              );
            }}
          />
        </Form.Col>

        <Form.Col span={{ base: 12, md: 6, lg: 6 }}>
          <Controller
            name="bookPrice"
            control={control}
            render={({ field }) => {
              return (
                <NumberInput
                  label="Book Price"
                  placeholder="Price"
                  decimalScale={2}
                  {...field}
                  allowNegative={false}
                  leftSection={<>₱</>}
                  defaultValue={0}
                />
              );
            }}
          />
        </Form.Col>

        <Form.Col span={{ base: 12, md: 6, lg: 6 }}>
          <Controller
            name="bookSection"
            control={control}
            render={({ field }) => {
              return (
                <Select
                  label="Book Section"
                  placeholder={"Select book section"}
                  data={bookSectionData.map((type) => ({
                    label: type.categorySection,
                    value: type.categorySection,
                  }))}
                  comboboxProps={{
                    transitionProps: { transition: "pop", duration: 200 },
                  }}
                  withErrorStyles={errors.bookSection?.message ? true : false}
                  {...field}
                  error={<>{errors.bookSection?.message}</>}
                  disabled={isBookSectionLoading}
                />
              );
            }}
          />
        </Form.Col>

        <Form.Col span={{ base: 12, md: 6, lg: 6 }}>
          <TextInput
            label="Book Location"
            placeholder="Your Book Location..."
            withAsterisk
            withErrorStyles={errors.bookLocation?.message ? true : false}
            {...register("bookLocation", {
              required: `This field is required`,
            })}
            error={<>{errors.bookLocation?.message}</>}
          />
        </Form.Col>

        <Form.Col span={{ base: 12, md: 12, lg: 12 }}>
          <Textarea
            label="Book Description"
            placeholder="Your Book Description..."
            withAsterisk
            withErrorStyles={errors.bookDescription?.message ? true : false}
            {...register("bookDescription", {
              required: `This field is required`,
            })}
            error={<>{errors.bookDescription?.message}</>}
            minRows={2}
            maxRows={5}
          />
        </Form.Col>
      </Form.Grid>
    </Form.Box>
  );
};
export default BookLocationAndDetailsForm;
