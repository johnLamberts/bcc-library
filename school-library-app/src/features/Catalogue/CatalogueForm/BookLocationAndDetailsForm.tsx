import Form from "@components/Form/Form";
import useReadCategorySection from "@features/SysSettings/CategorySection/hooks/useReadCategorySection";
import { Select, TextInput, Textarea } from "@mantine/core";
import { Controller, useFormContext } from "react-hook-form";

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
          <TextInput
            label="ISBN"
            placeholder="Your ISBN..."
            withAsterisk
            withErrorStyles={errors.bookISBN?.message ? true : false}
            {...register("bookISBN", { required: `This field is required` })}
            error={<>{errors.bookISBN?.message}</>}
          />
        </Form.Col>

        <Form.Col span={{ base: 12, md: 6, lg: 6 }}>
          <TextInput
            label="Call Number"
            placeholder="Your Call Number..."
            withAsterisk
            withErrorStyles={errors.callNumber?.message ? true : false}
            {...register("callNumber", { required: `This field is required` })}
            error={<>{errors.callNumber?.message}</>}
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
