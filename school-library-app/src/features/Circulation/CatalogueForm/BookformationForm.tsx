import Form from "@components/Form/Form";
import useReadUserRole from "@features/SysSettings/UserRole/hooks/useReadUserRole";
import { Select } from "@mantine/core";

import { MRT_Row, MRT_RowData, MRT_TableInstance } from "mantine-react-table";
import { Controller, useFormContext } from "react-hook-form";

interface BookInformationProps<TData extends MRT_RowData> {
  table?: MRT_TableInstance<TData>;
  row?: MRT_Row<TData>;
}

const BorrowersInformationForm = <TData extends MRT_RowData>({
  table,
  row,
}: BookInformationProps<TData>) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const { data: userRoleData = [], isLoading: isUserRoleLoading } =
    useReadUserRole();

  console.log(userRoleData);

  return (
    <>
      <Form.Box mt={"md"}>
        <Form.Title>Borrower's Information</Form.Title>
        <Form.Grid px={"lg"} pt={"lg"}>
          <Form.Col span={{ base: 12, md: 6, lg: 6 }}>
            <Controller
              name="userRole"
              control={control}
              rules={{
                required: "This field is required",
              }}
              render={({ field }) => {
                return (
                  <Select
                    label="User Role"
                    placeholder={"Select user role"}
                    data={userRoleData
                      .filter(
                        (user) =>
                          user.userRole === "Student" ||
                          user.userRole === "STUDENT" ||
                          user.userRole === "student" ||
                          user.userRole === "Teacher" ||
                          user.userRole === "teacher" ||
                          user.userRole === "TEACHER"
                      )
                      .map((type) => ({
                        label: type.userRole,
                        value: type.userRole,
                      }))}
                    comboboxProps={{
                      transitionProps: { transition: "pop", duration: 200 },
                    }}
                    withErrorStyles={errors.userRole?.message ? true : false}
                    {...field}
                    error={<>{errors.userRole?.message}</>}
                    disabled={isUserRoleLoading}
                  />
                );
              }}
            />
          </Form.Col>
        </Form.Grid>
        <Form.Grid p={"lg"}>
          <Form.Col span={{ base: 12, md: 6, lg: 6 }}>
            <Controller
              name="userRole"
              control={control}
              rules={{
                required: "This field is required",
              }}
              render={({ field }) => {
                return <>Student Name</>;
              }}
            />
          </Form.Col>

          <Form.Col span={{ base: 12, md: 6, lg: 6 }}>
            <Controller
              name="userRole"
              control={control}
              rules={{
                required: "This field is required",
              }}
              render={({ field }) => {
                return <>Student ID</>;
              }}
            />
          </Form.Col>

          <Form.Col span={{ base: 12, md: 6, lg: 6 }}>
            <Controller
              name="userRole"
              control={control}
              rules={{
                required: "This field is required",
              }}
              render={({ field }) => {
                return <>Student Number</>;
              }}
            />
          </Form.Col>

          <Form.Col span={{ base: 12, md: 6, lg: 6 }}>
            <Controller
              name="userRole"
              control={control}
              rules={{
                required: "This field is required",
              }}
              render={({ field }) => {
                return <>Student Email</>;
              }}
            />
          </Form.Col>
        </Form.Grid>
      </Form.Box>
    </>
  );
};
export default BorrowersInformationForm;
