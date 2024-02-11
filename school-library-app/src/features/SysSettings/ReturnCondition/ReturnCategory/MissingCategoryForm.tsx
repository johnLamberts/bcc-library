import { useCallback, useState } from "react";
import {
  Title,
  Flex,
  Button,
  Grid,
  Box,
  Divider,
  TextInput,
  NumberInput,
} from "@mantine/core";
import { Controller, useForm } from "react-hook-form";
import { MRT_Row, MRT_RowData, MRT_TableInstance } from "mantine-react-table";
import { toast } from "sonner";
import IMissingCategory from "../model/missing-category.interface";

interface MissingCategoryFormProps<TData extends MRT_RowData> {
  table: MRT_TableInstance<TData>;
  row: MRT_Row<TData>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onCreate?: (props: Record<string, any>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSave?: (props: Record<string, any>) => void;
}

function MissingCategoryForm<TData extends MRT_RowData>({
  table,
  row,
  onCreate,
  onSave,
}: MissingCategoryFormProps<TData>) {
  const [disableBtn, setDisabledBtn] = useState(false);

  const isEditing = table.getState().editingRow?.id === row.id;

  const { control, handleSubmit, register } = useForm<IMissingCategory>({
    defaultValues: isEditing ? row.original : {},
  });

  const isCreating = table.getState().creatingRow?.id === row.id;

  const onSubmit = useCallback(
    (data: IMissingCategory) => {
      if (!data.missingCategory) {
        toast.error(
          "Uh-oh! It seems like you forgot to fill in some required information. Please make sure all fields are filled out before submitting."
        );
        setDisabledBtn(false);
        return;
      }
      const sanitizeData = {
        ...data,
        fee: data.fee === undefined || String(data.fee) === "" ? 0 : data.fee,
      };
      if (isEditing) {
        onSave?.(sanitizeData);
      } else if (isCreating) {
        onCreate?.(sanitizeData);
      }

      // setDisabledBtn(true);
    },
    [onCreate, onSave, isEditing, isCreating]
  );

  return (
    <>
      <Box p={"md"}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Title order={5}>
            {`${isEditing ? "Editing" : "Adding"}`} form for Missing Category
          </Title>

          <Divider />
          <Grid mt={"md"}>
            <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
              <TextInput
                label="Your Damaged Category"
                placeholder="Damaged Category"
                {...register("missingCategory")}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
              <Controller
                control={control}
                name="fee"
                render={({ field }) => (
                  <NumberInput
                    label="Set Fee"
                    placeholder="Specify Fee"
                    prefix="₱"
                    thousandSeparator=" "
                    defaultValue={0}
                    decimalScale={2}
                    allowNegative={false}
                    {...field}
                  />
                )}
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

export default MissingCategoryForm;
