import Form from "@components/Form/Form";
import useReadUserRole from "@features/SysSettings/UserRole/hooks/useReadUserRole";
import { PasswordInput, Select, TextInput } from "@mantine/core";
import { MRT_RowData, MRT_TableInstance, MRT_Row } from "mantine-react-table";
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import generateRandomPassword from "src/utils/helpers/generateRandomPassword";
interface UserImageProps<TData extends MRT_RowData> {
  table?: MRT_TableInstance<TData>;
  row?: MRT_Row<TData>;
}

const UserSettingsInfoForm = <TData extends MRT_RowData>({
  table,
  row,
}: UserImageProps<TData>) => {
  const isEditing = table.getState().editingRow?.id === row.id;
  const {
    register,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const { data: userRole = [], isLoading } = useReadUserRole();

  useEffect(() => {
    if (!isEditing) {
      setValue("password", generateRandomPassword(8));
      return;
    }
  }, [isEditing, setValue, watch]);

  return (
    <>
      <Form.Box mt={"md"}>
        <Form.Title>User Settings </Form.Title>
        <Form.Grid p={"lg"}>
          <Form.Col span={{ base: 12, md: 6, lg: 12 }}>
            <Controller
              control={control}
              name="userRole"
              rules={{
                required: "This field is required",
              }}
              render={({ field }) => {
                return (
                  <Select
                    readOnly={isLoading}
                    label="User Role"
                    placeholder={`${
                      isLoading ? "Wait a moment..." : "Choose user role"
                    }`}
                    data={userRole
                      .filter(
                        (role) =>
                          role.userRole !== "STUDENT" &&
                          role.userRole !== "Student" &&
                          role.userRole !== "student" &&
                          role.userRole !== "TEACHER" &&
                          role.userRole !== "Teacher" &&
                          role.userRole !== "teacher"
                      )
                      .map((role) => ({
                        label: role.userRole,
                        value: role.userRole,
                      }))}
                    {...field}
                    error={<>{errors.userRole?.message}</>}
                    withErrorStyles={errors.userRole?.message ? true : false}
                  />
                );
              }}
            />
          </Form.Col>

          <Form.Col span={{ base: 12, md: 6, lg: 12 }}>
            <TextInput
              label="Email"
              placeholder="Your Email..."
              withAsterisk
              {...register("email", { required: `This field is required` })}
              error={<>{errors.email?.message}</>}
              withErrorStyles={errors.email?.message ? true : false}
            />
          </Form.Col>

          <Form.Col span={{ base: 12, md: 6, lg: 12 }}>
            <PasswordInput
              label="Password"
              withAsterisk
              placeholder="Your password"
              {...register("password", { required: `This field is required` })}
            />
          </Form.Col>
        </Form.Grid>
      </Form.Box>
    </>
  );
};
export default UserSettingsInfoForm;
