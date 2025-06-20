/* eslint-disable react-hooks/exhaustive-deps */
import Form from "@components/Form/Form";
import { useReadBookType } from "@features/SysSettings/BookType/hooks/useReadBookType";
import {
  Avatar,
  Group,
  Select,
  SelectProps,
  Text,
  TextInput,
  rem,
} from "@mantine/core";
import { IconEye } from "@tabler/icons-react";
import { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { IBooks } from "../models/books.interface";
import useReadActiveBooks from "@features/Catalogue/hooks/useReadActiveBooks";

interface FormProps {
  seeType: string | null;
  setSeeType: Dispatch<SetStateAction<string | null>>;
}

interface BooksDetailsData {
  [name: string]: {
    name: string;
    image: string | File | null;
  };
}

const BooksToBeBorrowedDetailsForm = ({ seeType, setSeeType }: FormProps) => {
  const {
    register,
    formState: { errors },
    control,
    watch,
    setValue,
  } = useFormContext();

  const { data: bookTypeData = [], isLoading: isBookTypeLoading } =
    useReadBookType();

  const { data: bookData = [], isLoading: isBookLoading } =
    useReadActiveBooks();

  const filteredBook = bookData.filter((book) => book.bookType === seeType);

  const filteredOtherBookInfo = bookData.filter(
    (book) => book.title === watch("bookTitle")
  );

  const setBookValues = useCallback(
    (filterInfo: IBooks | null) => {
      setValue("bookISBN", filterInfo?.bookISBN);
      setValue("callNumber", filterInfo?.callNumber);
      setValue("bookSection", filterInfo?.bookSection);
      setValue("bookLocation", filterInfo?.bookLocation);
      setValue("timeDuration", filterInfo?.milliseconds);
      setValue(
        "numberOfBooksAvailable_QUANTITY",
        filterInfo?.numberOfBooksAvailable_QUANTITY
      );

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setValue("bookPrice", (filterInfo as any)?.bookPrice);
      setValue("booksId", filterInfo?.id);
    },
    [setValue]
  );

  const renderAutocompleteOption: SelectProps["renderOption"] = ({
    option,
  }) => {
    const borrowersData: BooksDetailsData = {};

    filteredBook.forEach((info) => {
      borrowersData[info.title] = {
        name: `${info.bookISBN} ${info.bookSection}`,
        image: info.bookImageCover,
      };
    });

    return (
      <Group gap={"xs"}>
        <Avatar
          size={36}
          radius="xl"
          src={borrowersData[option.value]?.image as string}
        />
        <div>
          <Text size="sm">{option.value}</Text>

          <Text size="xs" opacity={0.5}>
            {/* {filteredOtherInfo[0]?.email} */}
            {borrowersData[option.value]?.name}
          </Text>
        </div>
      </Group>
    );
  };

  useEffect(() => {
    if (filteredOtherBookInfo.length > 0) {
      setBookValues(filteredOtherBookInfo[0]);
    }
  }, [filteredOtherBookInfo, setBookValues]);

  useEffect(() => {
    if (
      bookData?.some((book) => book.bookType !== seeType) &&
      seeType !== null
    ) {
      setBookValues(null);
      setValue("bookTitle", null);
    } else if (seeType === undefined || seeType === null) {
      setBookValues(null);
      setValue("bookTitle", null);
    }
  }, [setValue, seeType, bookData]);

  const handleChangeBookType = (e: string | null) => {
    setValue("bookISBN", "");
    setValue("callNumber", "");
    setValue("bookSection", "");
    setValue("bookLocation", "");
    setValue("timeDuration", "");
    setValue("numberOfBooksAvailable_QUANTITY", "");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setValue("bookPrice", "");
    setValue("booksId", "");
    setValue("bookTitle", null);
    setSeeType(e);
  };

  const handleChangeTitle = () => {
    setValue("bookISBN", "");
    setValue("callNumber", "");
    setValue("bookSection", "");
    setValue("bookLocation", "");
    setValue("timeDuration", "");
    setValue("numberOfBooksAvailable_QUANTITY", "");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setValue("bookPrice", "");
    setValue("booksId", "");
  };

  return (
    <Form.Box mt={"md"}>
      <Form.Title>Books Details</Form.Title>
      <Form.Grid px={"lg"} pt={"lg"}>
        <Form.Col span={{ base: 12, md: 6, lg: 6 }}>
          <Controller
            name="bookType"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, ...field } }) => {
              return (
                <Select
                  label="Book Type"
                  placeholder={"Select book type"}
                  data={bookTypeData.map((type) => ({
                    label: type.bookType,
                    value: type.bookType,
                  }))}
                  searchable
                  comboboxProps={{
                    transitionProps: { transition: "pop", duration: 200 },
                  }}
                  withErrorStyles={errors.bookType?.message ? true : false}
                  {...field}
                  error={<>{errors.bookType?.message}</>}
                  disabled={
                    isBookLoading || isBookTypeLoading
                    // watch("borrowersName") === null ||
                    // watch("borrowersName") === undefined
                  }
                  onChange={(e) => {
                    onChange(e);
                    handleChangeBookType(e);
                  }}
                />
              );
            }}
          />
        </Form.Col>
      </Form.Grid>
      <Form.Grid p={"lg"}>
        <Form.Col span={{ base: 12, md: 6, lg: 6 }}>
          <Controller
            name="bookTitle"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, ...field } }) => {
              return (
                <Select
                  label="Title"
                  description="Editable"
                  renderOption={renderAutocompleteOption}
                  placeholder={`${
                    filteredBook.length === 0
                      ? "No available book assiociated with these book type"
                      : `Select ${seeType?.toLocaleLowerCase()} title`
                  }`}
                  data={filteredBook.map((type) => ({
                    label: type.title,
                    value: type.title,
                  }))}
                  comboboxProps={{
                    transitionProps: { transition: "pop", duration: 200 },
                  }}
                  onChange={(e) => {
                    onChange(e);
                    handleChangeTitle();
                  }}
                  withErrorStyles={errors.bookTitle?.message ? true : false}
                  {...field}
                  error={<>{errors.bookTitle?.message}</>}
                  disabled={
                    isBookLoading ||
                    seeType === undefined ||
                    seeType === "" ||
                    seeType === null ||
                    filteredBook.length === 0
                  }
                  searchable
                />
              );
            }}
          />
        </Form.Col>

        <Form.Col span={{ base: 12, md: 6, lg: 6 }}>
          <TextInput
            label="Book ISBN"
            placeholder="Book ISBN"
            disabled={
              watch("bookTitle") === null || watch("bookTitle") === undefined
            }
            readOnly
            rightSection={
              <IconEye style={{ width: rem(16), height: rem(16) }} />
            }
            description={"Readonly"}
            {...register("bookISBN")}
          />
        </Form.Col>

        <Form.Col span={{ base: 12, md: 6, lg: 6 }}>
          <TextInput
            label="Call Number"
            placeholder="Call Number"
            disabled={
              watch("bookTitle") === null || watch("bookTitle") === undefined
            }
            readOnly
            rightSection={
              <IconEye style={{ width: rem(16), height: rem(16) }} />
            }
            description={"Readonly"}
            {...register("callNumber")}
          />
        </Form.Col>

        <Form.Col span={{ base: 12, md: 6, lg: 6 }}>
          <TextInput
            label="Book Section"
            placeholder="Book Section"
            disabled={
              watch("bookTitle") === null || watch("bookTitle") === undefined
            }
            readOnly
            rightSection={
              <IconEye style={{ width: rem(16), height: rem(16) }} />
            }
            description={"Readonly"}
            {...register("bookSection")}
          />
        </Form.Col>

        <Form.Col span={{ base: 12, md: 6, lg: 6 }}>
          <TextInput
            label="Book Location"
            placeholder="Book Location"
            disabled={
              watch("bookTitle") === null || watch("bookTitle") === undefined
            }
            readOnly
            rightSection={
              <IconEye style={{ width: rem(16), height: rem(16) }} />
            }
            description={"Readonly"}
            {...register("bookLocation")}
          />
        </Form.Col>

        <Form.Col span={{ base: 12, md: 6, lg: 6 }}>
          <TextInput
            label="Duration (in milliseconds)"
            placeholder="Duration"
            {...register("timeDuration")}
            disabled={
              watch("bookTitle") === null || watch("bookTitle") === undefined
            }
            readOnly
            rightSection={
              <IconEye style={{ width: rem(16), height: rem(16) }} />
            }
            description={"Readonly"}
          />
        </Form.Col>
        <Form.Col span={{ base: 12, md: 6, lg: 6 }}>
          <TextInput
            label="Number of books available"
            placeholder="Number of books available"
            {...register("numberOfBooksAvailable_QUANTITY")}
            disabled={
              watch("bookTitle") === null || watch("bookTitle") === undefined
            }
            readOnly
            rightSection={
              <IconEye style={{ width: rem(16), height: rem(16) }} />
            }
            description={"Readonly"}
          />
        </Form.Col>
      </Form.Grid>

      <>
        <Text span c={"dimmed"} size="sm" p={"lg"}>
          {watch("timeDuration") === null ||
            (watch("timeDuration") === undefined
              ? null
              : `The availability of selected book is ${filteredOtherBookInfo[0]?.timeSpecifier} ${filteredOtherBookInfo[0]?.timeUnit}s`)}
        </Text>
      </>
    </Form.Box>
  );
};
export default BooksToBeBorrowedDetailsForm;
