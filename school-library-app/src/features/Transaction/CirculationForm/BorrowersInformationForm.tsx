/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Form from "@components/Form/Form";
import useReadStudents from "@features/Student/hooks/useReadStudents";
import useReadTeachers from "@features/Teachers/hooks/useReadTeacher";
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

import { MRT_Row, MRT_RowData, MRT_TableInstance } from "mantine-react-table";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface BookInformationProps<TData extends MRT_RowData> {
  table?: MRT_TableInstance<TData>;
  row?: MRT_Row<TData>;
  seeRole: string | null;
  setSeeRole: Dispatch<SetStateAction<string | null>>;
}

interface BorrowersData {
  [name: string]: {
    name: string;
    image: string | File | undefined;
  };
}

const BorrowersInformationForm = <TData extends MRT_RowData>({
  seeRole,
  setSeeRole,
}: BookInformationProps<TData>) => {
  const [name, setName] = useState<string | null>("");

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
          label: `${teacher.email}`,
          value: `${teacher.email}`,
        }))
      : studentData.map((student) => ({
          label: `${student.email}`,
          value: `${student.email}`,
        })) || [];

  const filteredOtherInfo =
    seeRole === "Teacher"
      ? teacherData.filter(
          (teacher) => `${teacher.email}` === watch("borrowersName")
        )
      : studentData.filter(
          (student) => `${student.email}` === watch("borrowersName")
        );

  const filteredNumberInfo =
    seeRole === "Teacher"
      ? teacherData
          .filter((teacher) => `${teacher.email}` === watch("borrowersName"))
          .map((user) => user.teacherNumber)[0]
      : studentData
          .filter((student) => `${student.email}` === watch("borrowersName"))
          .map((user) => user.studentNumber)[0];

  console.log(filteredOtherInfo);
  const renderAutocompleteOption: SelectProps["renderOption"] = ({
    option,
  }) => {
    const borrowersData: BorrowersData = {};

    const filtered =
      seeRole === "Teacher"
        ? teacherData.map((teacher) => ({
            ...teacher,
            image: teacher.teacherImage,
          }))
        : studentData.map((teacher) => ({
            ...teacher,
            image: teacher.studentImage,
          }));

    filtered.forEach((info) => {
      borrowersData[info.email] = {
        name: `${info.firstName} ${info.middleName} ${info.lastName}`,
        image: info.image,
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
    // if() {

    // }
    if (filteredOtherInfo.length > 0) {
      setValue("borrowersId", filteredOtherInfo[0]?.userUID);
      setValue("borrowersNumber", filteredNumberInfo);
      setValue("borrowersEmail", filteredOtherInfo[0]?.email);
      setValue("firstName", filteredOtherInfo[0]?.firstName);
      setValue("middleName", filteredOtherInfo[0]?.middleName);
      setValue("lastName", filteredOtherInfo[0]?.lastName);
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
    name,
  ]);

  const handleChangeRole = (e: string | null) => {
    setValue("borrowersId", "");
    setValue("borrowersName", null);

    setValue("borrowersNumber", "");
    setValue("borrowersEmail", "");
    setValue("firstName", "");
    setValue("middleName", "");
    setValue("lastName", "");

    setSeeRole(e);
  };

  const handleChangeName = (e: string | null) => {
    setValue("borrowersNumber", "");
    setValue("borrowersEmail", "");
    setValue("borrowersId", "");
    setValue("firstName", "");
    setValue("middleName", "");
    setValue("lastName", "");
    setName(e);
  };
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
                    description="Editable"
                    comboboxProps={{
                      transitionProps: { transition: "pop", duration: 200 },
                    }}
                    withErrorStyles={errors.userRole?.message ? true : false}
                    {...field}
                    error={<>{errors.userRole?.message}</>}
                    disabled={isStudentLoading || isTeacherLoading}
                    onChange={(e) => {
                      onChange(e);
                      handleChangeRole(e);
                    }}
                  />
                );
              }}
            />
          </Form.Col>

          <Form.Col span={{ base: 12, md: 6, lg: 6 }}>
            <Controller
              name="borrowersName"
              control={control}
              rules={{
                required: "This field is required",
              }}
              render={({ field: { onChange, ...field } }) => {
                return (
                  <Select
                    autoComplete="false"
                    label={`Borrower's Email`}
                    placeholder={`Select borrower's email`}
                    data={filteredBorrowersName}
                    renderOption={renderAutocompleteOption}
                    description="Editable"
                    comboboxProps={{
                      transitionProps: { transition: "pop", duration: 200 },
                    }}
                    withErrorStyles={errors.userRole?.message ? true : false}
                    {...field}
                    error={<>{errors.userRole?.message}</>}
                    onChange={(e) => {
                      onChange(e);
                      handleChangeName(e);
                    }}
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
        </Form.Grid>

        <Form.Grid p={"lg"}>
          <Form.Col span={{ base: 12, md: 6, lg: 6 }}>
            <TextInput
              placeholder="Borrower's First Name"
              label={"Borrower's First Name"}
              {...register("firstName")}
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
              placeholder="Borrower's Middle Name"
              label={"Borrower's Middle Name"}
              {...register("middleName")}
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
              placeholder="Borrower's Last Name"
              label={"Borrower's Last Name"}
              {...register("lastName")}
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
