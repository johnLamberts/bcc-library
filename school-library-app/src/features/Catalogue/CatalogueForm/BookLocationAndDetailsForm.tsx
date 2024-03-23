import Form from "@components/Form/Form";
import { useReadCategorySection } from "@features/SysSettings/CategorySection/hooks/useReadCategorySection";
import {
  Anchor,
  Checkbox,
  Drawer,
  InputBase,
  NumberInput,
  Select,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import CategorySection from "@pages/SystemSettings/CategorySection";
import { ref } from "firebase/storage";
import { useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { IMaskInput } from "react-imask";
import { useSearchParams } from "react-router-dom";

const removeHyphens = (value: string) => {
  return value.replace(/-/g, "");
};

const isValidISBN10 = (isbn: string) => {
  // Validation logic for ISBN-10 format
  // You can replace this with your own validation logic
  return isbn.length === 10;
};

// Validation logic for ISBN-13 format
// You can replace this with your own validation logic
const isValidISBN13 = (isbn: string) => {
  // Validation logic for ISBN-13 format
  // You can replace this with your own validation logic
  return isbn.length === 13;
};

const BookLocationAndDetailsForm = () => {
  const {
    register,
    formState: { errors },
    control,
    setValue,
  } = useFormContext();

  const [opened, { open, close }] = useDisclosure(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const [isFormatISBN13, setIsFormatISBN13] = useState<boolean>(false);

  const { data: bookSectionData = [], isLoading: isBookSectionLoading } =
    useReadCategorySection();

  const handleChange = (params: string | null) => {
    searchParams.set("ctx", params as string);

    return setSearchParams(searchParams);
  };
  const inputRef = useRef(null);

  const removeQueryParams = () => {
    const param = searchParams.get("ctx");

    if (param) {
      // 👇️ delete each query param
      searchParams.delete("ctx");

      // 👇️ update state after
      setSearchParams(searchParams);
    }
  };

  const handleFormatISBN = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFormatISBN13(e.currentTarget.checked);
    const isChecked = e.currentTarget.checked;
    const newValue = isChecked ? "" : ""; // Set the new value based on checkbox state, you can provide any default value you want here
    setValue("bookISBN", newValue); // Update the value of the input field with the new value
  };

  return (
    <>
      <Form.Box mt={"md"}>
        <Form.Title>Book Location and Details</Form.Title>
        <Form.Grid p={"md"}>
          <Form.Col span={{ base: 12, md: 6, lg: 6 }}>
            <Controller
              name="bookISBN"
              control={control}
              rules={{
                required: "This field is required",
                validate: (value) => {
                  const cleaned = removeHyphens(value);
                  if (!isFormatISBN13) {
                    if (!isValidISBN13(cleaned)) {
                      return "Badly formatted ISBN-13";
                    }
                  } else {
                    if (!isValidISBN10(cleaned)) {
                      return "Badly formatted ISBN-10";
                    }
                  }

                  return true;
                },
              }}
              render={({
                field: { onChange, onBlur, ref, value },
                fieldState: { error },
              }) => {
                return (
                  <InputBase
                    component={IMaskInput}
                    mask={isFormatISBN13 ? "0-000-000000" : "000-0-000-000000"}
                    label={isFormatISBN13 ? "ISBN-10" : "ISBN-13"}
                    onChange={onChange}
                    value={value}
                    onBlur={onBlur}
                    inputRef={ref}
                    description={
                      <Checkbox
                        label={"Use ISBN-10 instead"}
                        onChange={handleFormatISBN}
                        style={{
                          transform: "scale(1)",
                        }}
                        size="xs"
                        checked={isFormatISBN13}
                      />
                    }
                    placeholder={
                      isFormatISBN13 ? "0-000-00000-0" : "000-0-000-00000-0"
                    }
                    withErrorStyles={errors.bookISBN?.message ? true : false}
                    error={<>{errors.bookISBN?.message}</> || error}
                  />
                );
              }}
            />
          </Form.Col>
        </Form.Grid>
        <Form.Grid p={"lg"}>
          <Form.Col span={{ base: 12, md: 6, lg: 6 }}>
            <Controller
              name="callNumber"
              control={control}
              rules={{
                required: "This field is required",
              }}
              render={({ field }) => {
                return (
                  <InputBase
                    withAsterisk
                    label="Call Number"
                    description={
                      <>Manually type, and format the call number.</>
                    }
                    placeholder="eg. DG 271.R38 2009"
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
              rules={{
                required: "This field is required",
              }}
              render={({ field }) => {
                return (
                  <NumberInput
                    label="Book Price"
                    placeholder="Price"
                    description={<>Price of books can be vary.</>}
                    decimalScale={2}
                    {...field}
                    allowNegative={false}
                    leftSection={<>₱</>}
                    defaultValue={0}
                    required
                  />
                );
              }}
            />
          </Form.Col>

          <Form.Col span={{ base: 12, md: 6, lg: 6 }}>
            <Controller
              name="bookSection"
              rules={{
                required: "This field is required",
              }}
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
                    required
                    searchable
                    nothingFoundMessage={
                      <>
                        Nothing found...
                        <br />
                        Add Type{" "}
                        <Anchor
                          variant="gradient"
                          gradient={{ from: "pink", to: "yellow" }}
                          fw={500}
                          underline="hover"
                          onClick={() => {
                            open();
                            handleChange("add_books_section");
                          }}
                        >
                          here
                        </Anchor>
                      </>
                    }
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

      <Drawer.Root
        opened={opened}
        onClose={() => {
          close();
          removeQueryParams();
        }}
        size={"xl"}
      >
        <Drawer.Overlay />
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.CloseButton />
          </Drawer.Header>
          <Drawer.Body>
            {searchParams.get("ctx") === "add_books_section" && (
              <CategorySection />
            )}
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>
    </>
  );
};
export default BookLocationAndDetailsForm;
