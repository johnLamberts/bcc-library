import Form from "@components/Form/Form";
import useReadAuthor from "@features/SysSettings/BookAuthor/hooks/useReadBookType";
import useReadGenre from "@features/SysSettings/BookGenre/hooks/useReadGenre";
import useReadBookType from "@features/SysSettings/BookType/hooks/useReadBookType";
import { Anchor, Drawer, MultiSelect, Select, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import BookAuthor from "@pages/SystemSettings/BookAuthor";
import BookGenre from "@pages/SystemSettings/BookGenres";
import BookType from "@pages/SystemSettings/BookType";
import { MRT_Row, MRT_RowData, MRT_TableInstance } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

interface BookInformationProps<TData extends MRT_RowData> {
  table?: MRT_TableInstance<TData>;
  row?: MRT_Row<TData>;
}

const BookInformationForm = <TData extends MRT_RowData>({
  table,
  row,
}: BookInformationProps<TData>) => {
  const isEditing = table?.getState().editingRow?.id === row?.id;
  const {
    register,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();
  const [selectedGenres, setSelectedGenres] = useState<string[]>(
    isEditing ? row?.original.genres : []
  );

  const [opened, { open, close }] = useDisclosure(false);

  const { data: bookTypeData = [], isLoading: isBookTypeLoading } =
    useReadBookType();

  const { data: genresData = [], isLoading: isGenresLoading } = useReadGenre();

  const { data: authorsData = [], isLoading: isAuthorsLoading } =
    useReadAuthor();

  const watchBookType = watch("bookType") || "";

  const [searchParams, setSearchParams] = useSearchParams();

  const filteredGenre = useMemo(() => {
    return (
      genresData
        ?.filter((genre) => genre.bookType === watchBookType)
        ?.map((genre) => genre.genres) || []
    );
  }, [genresData, watchBookType]);

  useEffect(() => {
    if (isGenresLoading) {
      return;
    }

    // If filteredGenre is empty, reset selectedGenres and set the form value
    if (filteredGenre.length === 0) {
      setSelectedGenres([]);
      setValue("genres", []);
    }

    // If in editing mode, remove genres that are not present in the filteredGenre
    if (isEditing) {
      const updatedSelectedGenres = selectedGenres.filter((genre) =>
        filteredGenre.includes(genre)
      );
      setSelectedGenres(updatedSelectedGenres);
      setValue("genres", updatedSelectedGenres);
    } else {
      const filteredGenresForCreate =
        genresData
          ?.filter((genre) => genre.bookType === watchBookType)
          ?.map((genre) => genre.genres) || [];

      // Update selectedGenres and form value based on the filtered genres
      const updatedSelectedGenresForCreate = selectedGenres.filter((genre) =>
        filteredGenresForCreate.includes(genre)
      );
      setSelectedGenres(updatedSelectedGenresForCreate);
      setValue("genres", updatedSelectedGenresForCreate);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filteredGenre.length,
    setValue,
    isEditing,
    row?.original.genres,
    isGenresLoading,
  ]);

  const handleChange = (params: string | null) => {
    searchParams.set("ctx", params as string);

    return setSearchParams(searchParams);
  };

  const removeQueryParams = () => {
    const param = searchParams.get("ctx");

    if (param) {
      // 👇️ delete each query param
      searchParams.delete("ctx");

      // 👇️ update state after
      setSearchParams(searchParams);
    }
  };
  return (
    <>
      <Form.Box mt={"md"}>
        <Form.Title>Book Information</Form.Title>
        <Form.Grid p={"lg"}>
          <Form.Col span={{ base: 12, md: 6, lg: 6 }}>
            <Controller
              name="bookType"
              control={control}
              rules={{
                required: "This field is required",
              }}
              render={({ field }) => {
                return (
                  <Select
                    label="Book Type"
                    placeholder={"Select book type"}
                    data={bookTypeData.map((type) => ({
                      label: type.bookType,
                      value: type.bookType,
                    }))}
                    comboboxProps={{
                      transitionProps: { transition: "pop", duration: 200 },
                    }}
                    withErrorStyles={errors.bookType?.message ? true : false}
                    {...field}
                    error={<>{errors.bookType?.message}</>}
                    disabled={isBookTypeLoading}
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
                            handleChange("add_books_type");
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
            <Controller
              name="genres"
              control={control}
              render={({ field: { onChange, value, ...field } }) => {
                return (
                  <MultiSelect
                    label="Genres"
                    placeholder={
                      filteredGenre.length > 0
                        ? "Select genre"
                        : "No available genre"
                    }
                    data={
                      filteredGenre.length > 0
                        ? filteredGenre.map((bookType) => ({
                            label: bookType,
                            value: bookType,
                          }))
                        : []
                    }
                    onChange={(values) => {
                      onChange(values);
                      setSelectedGenres(values);
                    }}
                    value={value && selectedGenres}
                    comboboxProps={{
                      transitionProps: { transition: "pop", duration: 200 },
                    }}
                    withErrorStyles={errors.sex?.message ? true : false}
                    {...field}
                    error={<>{errors.sex?.message}</>}
                    disabled={isGenresLoading || filteredGenre.length === 0}
                    searchable
                    nothingFoundMessage={
                      <>
                        Nothing found...
                        <br />
                        Add genres{" "}
                        <Anchor
                          variant="gradient"
                          gradient={{ from: "pink", to: "yellow" }}
                          fw={500}
                          underline="hover"
                          onClick={() => {
                            open();
                            handleChange("add_genres");
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
              label="Book Title"
              placeholder="Your Title..."
              withAsterisk
              withErrorStyles={errors.lastName?.message ? true : false}
              {...register("title", { required: `This field is required` })}
              error={<>{errors.lastName?.message}</>}
            />
          </Form.Col>

          <Form.Col span={{ base: 12, md: 6, lg: 6 }}>
            <Controller
              name="authors"
              control={control}
              rules={{
                required: "This field is required",
              }}
              render={({ field }) => {
                return (
                  <MultiSelect
                    label="Author"
                    placeholder={"Select authors type"}
                    data={authorsData.map((type) => ({
                      label: type.bookAuthor,
                      value: type.bookAuthor,
                    }))}
                    comboboxProps={{
                      transitionProps: { transition: "pop", duration: 200 },
                    }}
                    withErrorStyles={errors.authors?.message ? true : false}
                    {...field}
                    error={<>{errors.authors?.message}</>}
                    disabled={isAuthorsLoading || watchBookType === ""}
                    searchable
                    nothingFoundMessage={
                      <>
                        Nothing found...
                        <br />
                        Add author{" "}
                        <Anchor
                          variant="gradient"
                          gradient={{ from: "pink", to: "yellow" }}
                          fw={500}
                          underline="hover"
                          onClick={() => {
                            open();
                            handleChange("add_author");
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
            {searchParams.get("ctx") === "add_author" && <BookAuthor />}

            {searchParams.get("ctx") === "add_genres" && <BookGenre />}

            {searchParams.get("ctx") === "add_books_type" && <BookType />}
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>
    </>
  );
};
export default BookInformationForm;
