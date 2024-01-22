import { useCallback, useState } from "react";
import {
  Title,
  Select,
  Flex,
  Button,
  Grid,
  Box,
  Divider,
  TextInput,
} from "@mantine/core";
import { Controller, useForm } from "react-hook-form";
import { MRT_Row, MRT_RowData, MRT_TableInstance } from "mantine-react-table";
import { toast } from "sonner";
import IGenre from "./models/genres";
import useReadBookType from "../BookType/hooks/useReadBookType";

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
  const [disableBtn, setDisabledBtn] = useState(false);

  const { data: bookTypeData = [] } = useReadBookType();

  const isEditing = table.getState().editingRow?.id === row.id;

  const { control, handleSubmit, register } = useForm<IGenre>({
    defaultValues: isEditing ? row.original : {},
  });

  const isCreating = table.getState().creatingRow?.id === row.id;

  const onSubmit = useCallback(
    (data: IGenre) => {
      if (!data.genres) {
        toast.error(
          "Uh-oh! It seems like you forgot to fill in some required information. Please make sure all fields are filled out before submitting."
        );
        return;
      }

      if (isEditing) {
        onSave?.(data);
      } else if (isCreating) {
        onCreate?.(data);
      }

      setDisabledBtn(true);
    },
    [onCreate, onSave, isEditing, isCreating]
  );

  return (
    <>
      <Box p={"md"}>
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
                            type.bookType === "Fiction Book" ||
                            type.bookType === "fiction Book" ||
                            type.bookType === "Non-Fiction Book" ||
                            type.bookType === "NonFiction Book" ||
                            type.bookType === "Non Fiction Book" ||
                            type.bookType === "non fiction Book"
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
              disabled={disableBtn}
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
