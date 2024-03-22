import { useCallback, useEffect, useState } from "react";
import {
  Title,
  Select,
  Flex,
  Button,
  Grid,
  Box,
  Divider,
  TextInput,
  LoadingOverlay,
} from "@mantine/core";
import { Controller, useForm } from "react-hook-form";
import { MRT_Row, MRT_RowData, MRT_TableInstance } from "mantine-react-table";
import { toast } from "sonner";
import IGenre from "./models/genres";
import { useReadBookType } from "../BookType/hooks/useReadBookType";

interface BookGenreFormProps<TData extends MRT_RowData> {
  table: MRT_TableInstance<TData>;
  row: MRT_Row<TData>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onCreate?: (props: Record<string, any>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSave?: (props: Record<string, any>) => void;
}

function BookGenreForm<TData extends MRT_RowData>({
  table,
  row,
  onCreate,
  onSave,
}: BookGenreFormProps<TData>) {
  const { data: bookTypeData = [], isLoading } = useReadBookType();

  const isEditing = table.getState().editingRow?.id === row.id;

  const { control, handleSubmit, register, watch } = useForm<IGenre>({
    defaultValues: isEditing ? row.original : {},
  });

  console.log(bookTypeData);

  const isCreating = table.getState().creatingRow?.id === row.id;
  const [genresName, setGenresName] = useState("");

  const onSubmit = useCallback(
    (data: IGenre) => {
      if (!data.genres.trim()) {
        toast.error(
          "Uh-oh! It seems like you forgot to fill in some required information. Please make sure all fields are filled out before submitting."
        );
        return;
      }
      if (watch("bookType") === "") {
        toast.error(
          "Uh-oh! It seems like you forgot to fill in some required information. Please make sure all fields are filled out before submitting."
        );
        return;
      }

      if (isEditing) {
        onSave?.({
          ...data,
          genresName,
        });
      } else if (isCreating) {
        onCreate?.(data);
      }
    },
    [watch, isEditing, isCreating, onSave, genresName, onCreate]
  );

  useEffect(() => {
    if (isEditing) {
      setGenresName(row.original.genres);
    }
  }, [isEditing, row.original.genres]);

  return (
    <>
      <Box p={"md"}>
        <LoadingOverlay
          visible={table.getState().isSaving}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />

        <form onSubmit={handleSubmit(onSubmit)}>
          <Title order={5}>
            {`${isEditing ? "Editing" : "Adding"}`} form for Genre
          </Title>

          <Divider />
          <Grid mt={"md"}>
            <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
              <Controller
                control={control}
                name="bookType"
                render={({ field: { onChange, ...field } }) => {
                  return (
                    <Select
                      label="Book Type"
                      placeholder="Book Type..."
                      data={bookTypeData
                        .filter(
                          (type) =>
                            type.bookType
                              .toLowerCase()
                              .includes("non fiction") ||
                            type.bookType.toLowerCase().includes("fiction")
                        )
                        .map((type) => ({
                          label: type.bookType,
                          value: type.bookType,
                        }))}
                      onChange={(_e) => {
                        onChange(_e);
                      }}
                      withAsterisk
                      {...field}
                    />
                  );
                }}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
              <TextInput
                label="Your Genre"
                placeholder="Genre"
                {...register("genres")}
              />
            </Grid.Col>
          </Grid>

          <Flex justify="flex-end" gap={"xs"} mt={"sm"}>
            <Button
              disabled={isLoading}
              loading={table.getState().isSaving}
              type="submit"
            >
              Save
            </Button>
          </Flex>
        </form>
      </Box>
    </>
  );
}

export default BookGenreForm;
