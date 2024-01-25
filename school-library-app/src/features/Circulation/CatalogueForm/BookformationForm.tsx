import Form from "@components/Form/Form";
import useReadStudents from "@features/Student/hooks/useReadStudents";
import useReadUserRole from "@features/SysSettings/UserRole/hooks/useReadUserRole";
import useReadTeachers from "@features/Teachers/hooks/useReadTeacher";
import { Select, TextInput } from "@mantine/core";

import { MRT_Row, MRT_RowData, MRT_TableInstance } from "mantine-react-table";
import { useEffect, useState } from "react";
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
    setValue,
    register,
    watch,
  } = useFormContext();

  const { data: userRoleData = [], isLoading: isUserRoleLoading } =
    useReadUserRole();

  // student or teacher's data

  const { data: teacherData = [], isLoading: isTeacherLoading } =
    useReadTeachers();
  const { data: studentData = [], isLoading: isStudentLoading } =
    useReadStudents();

  const [seeRole, setSeeRole] = useState<string | null>("");

  const filteredBorrowersName =
    seeRole === "Teacher"
      ? teacherData.map((teacher) => ({
          label: `${teacher.firstName} ${teacher.middleName} ${teacher.lastName}`,
          value: `${teacher.firstName} ${teacher.middleName} ${teacher.lastName}`,
        }))
      : studentData.map((student) => ({
          label: `${student.firstName} ${student.middleName} ${student.lastName}`,
          value: `${student.firstName} ${student.middleName} ${student.lastName}`,
        })) || [];

  const filteredOtherInfo =
    seeRole === "Teacher"
      ? teacherData.filter(
          (teacher) =>
            `${teacher.firstName} ${teacher.middleName} ${teacher.lastName}` ===
            watch("borrowersName")
        )
      : studentData.filter(
          (student) =>
            `${student.firstName} ${student.middleName} ${student.lastName}` ===
            watch("borrowersName")
        );

  useEffect(() => {
    if (
      !studentData.some((student) => student.userRole === seeRole) ||
      !teacherData.some((teacher) => teacher.userRole === seeRole)
    ) {
      setValue("borrowersName", null);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filteredBorrowersName.length,
    setValue,
    seeRole,
    studentData,
    teacherData,
  ]);

  return (
    <>
      <Form.Box mt={"md"}>
        <Form.Title>Borrower's Information</Form.Title>
        <Form.Grid px={"lg"} pt={"lg"}>
          <Form.Col span={{ base: 12, md: 6, lg: 6 }}>
            <Controller
              name="borrowers"
              control={control}
              rules={{
                required: "This field is required",
              }}
              render={({ field: { onChange, ...field } }) => {
                return (
                  <Select
                    label="Borrower"
                    placeholder={"Select borrower"}
                    data={["Teacher", "Student"]}
                    comboboxProps={{
                      transitionProps: { transition: "pop", duration: 200 },
                    }}
                    withErrorStyles={errors.userRole?.message ? true : false}
                    {...field}
                    error={<>{errors.userRole?.message}</>}
                    disabled={isUserRoleLoading}
                    onChange={(e) => {
                      onChange(e);
                      setSeeRole(e);
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
              name="borrowersName"
              control={control}
              rules={{
                required: "This field is required",
              }}
              render={({ field }) => {
                return (
                  <Select
                    label={`Borrower's name`}
                    placeholder={`Select borrower's name`}
                    data={filteredBorrowersName}
                    comboboxProps={{
                      transitionProps: { transition: "pop", duration: 200 },
                    }}
                    withErrorStyles={errors.userRole?.message ? true : false}
                    {...field}
                    error={<>{errors.userRole?.message}</>}
                    disabled={
                      isUserRoleLoading ||
                      seeRole === undefined ||
                      seeRole === "" ||
                      seeRole === null
                    }
                    searchable
                  />
                );
              }}
            />
          </Form.Col>

          <Form.Col span={{ base: 12, md: 6, lg: 6 }}>
            <Controller
              name="borrowersId"
              control={control}
              render={({ field: { value, ...field } }) => {
                return (
                  <TextInput
                    placeholder="Borrower's ID"
                    label={"Borrower's ID"}
                    value={
                      value && filteredOtherInfo.map((user) => user.userUID)[0]
                    }
                    {...field}
                    disabled
                  />
                );
              }}
            />
          </Form.Col>

          <Form.Col span={{ base: 12, md: 6, lg: 6 }}>
            <TextInput
              placeholder="Borrower's Number"
              label={"Borrower's Number"}
              {...register("borrowersNumber")}
              disabled
            />
          </Form.Col>

          <Form.Col span={{ base: 12, md: 6, lg: 6 }}>
            <TextInput
              placeholder="Borrower's Email"
              label={"Borrower's Email"}
              {...register("borrowersEmail")}
              disabled
            />
          </Form.Col>
        </Form.Grid>
      </Form.Box>
    </>
  );
};
export default BorrowersInformationForm;
