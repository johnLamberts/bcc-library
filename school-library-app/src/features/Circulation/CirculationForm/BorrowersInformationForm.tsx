import Form from "@components/Form/Form";
import useReadStudents from "@features/Student/hooks/useReadStudents";
import useReadTeachers from "@features/Teachers/hooks/useReadTeacher";
import { Select, TextInput, rem } from "@mantine/core";
import { IconEye } from "@tabler/icons-react";

import { MRT_Row, MRT_RowData, MRT_TableInstance } from "mantine-react-table";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface BookInformationProps<TData extends MRT_RowData> {
  table?: MRT_TableInstance<TData>;
  row?: MRT_Row<TData>;
  seeRole: string | null;
  setSeeRole: Dispatch<SetStateAction<string | null>>;
}

const BorrowersInformationForm = <TData extends MRT_RowData>({
  seeRole,
  setSeeRole,
}: BookInformationProps<TData>) => {
  const {
    control,
    formState: { errors },
    setValue,
    register,
    getValues,
    watch,
  } = useFormContext();

  // student or teacher's data
  const { data: teacherData = [], isLoading: isTeacherLoading } =
    useReadTeachers();
  const { data: studentData = [], isLoading: isStudentLoading } =
    useReadStudents();

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

  const filteredNumberInfo =
    seeRole === "Teacher"
      ? teacherData
          .filter(
            (teacher) =>
              `${teacher.firstName} ${teacher.middleName} ${teacher.lastName}` ===
              watch("borrowersName")
          )
          .map((user) => user.teacherNumber)[0]
      : studentData
          .filter(
            (student) =>
              `${student.firstName} ${student.middleName} ${student.lastName}` ===
              watch("borrowersName")
          )
          .map((user) => user.studentNumber)[0];

  useEffect(() => {
    // if() {

    // }
    if (filteredOtherInfo.length > 0) {
      setValue("borrowersId", filteredOtherInfo[0]?.userUID);
      setValue("borrowersNumber", filteredNumberInfo);
      setValue("borrowersEmail", filteredOtherInfo[0]?.email);
    }
  }, [
    filteredOtherInfo,
    getValues,
    watch,
    setValue,
    seeRole,
    studentData,
    teacherData,
    filteredNumberInfo,
  ]);

  useEffect(() => {
    if (
      teacherData.some((teacher) => teacher.userRole !== seeRole) &&
      studentData.some((student) => student.userRole !== seeRole) &&
      seeRole !== null
    ) {
      setValue("borrowersName", null);
      setValue("borrowersId", null);
      setValue("borrowersNumber", null);
      setValue("borrowersEmail", null);
    } else if (seeRole === undefined || seeRole === null) {
      setValue("borrowersName", null);
      setValue("borrowersId", null);
      setValue("borrowersNumber", null);
      setValue("borrowersEmail", null);
    }
  }, [setValue, getValues, teacherData, studentData, seeRole]);

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
                    disabled={isStudentLoading || isTeacherLoading}
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
                    description="Editable"
                    comboboxProps={{
                      transitionProps: { transition: "pop", duration: 200 },
                    }}
                    withErrorStyles={errors.userRole?.message ? true : false}
                    {...field}
                    error={<>{errors.userRole?.message}</>}
                    disabled={
                      isStudentLoading ||
                      isTeacherLoading ||
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
            <TextInput
              placeholder="Borrower's ID"
              label={"Borrower's ID"}
              {...register("borrowersId")}
              disabled={
                watch("borrowersName") === null ||
                watch("borrowersName") === undefined
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
              placeholder="Borrower's Number"
              label={"Borrower's Number"}
              {...register("borrowersNumber")}
              disabled={
                watch("borrowersName") === null ||
                watch("borrowersName") === undefined
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
              placeholder="Borrower's Email"
              label={"Borrower's Email"}
              {...register("borrowersEmail")}
              disabled={
                watch("borrowersName") === null ||
                watch("borrowersName") === undefined
              }
              readOnly
              rightSection={
                <IconEye style={{ width: rem(16), height: rem(16) }} />
              }
              description={"Readonly"}
            />
          </Form.Col>
        </Form.Grid>
      </Form.Box>
    </>
  );
};
export default BorrowersInformationForm;
