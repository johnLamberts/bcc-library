/* eslint-disable @typescript-eslint/no-explicit-any */
import Form from "@components/Form/Form";
import useModifyStudent from "@features/Student/hooks/useModifyStudent";
import { IStudents } from "@features/Student/models/student.interface";
import {
  LoadingOverlay,
  InputBase,
  Flex,
  Avatar,
  FileInput,
  Box,
} from "@mantine/core";
import { useForm, Controller } from "react-hook-form";

const EditStudentProfile = ({
  student,
}: {
  student: IStudents | undefined;
}) => {
  const {
    formState: { errors, isDirty },
    control,
    watch,
    handleSubmit,
  } = useForm<any>({
    defaultValues:
      student !== null || student !== undefined
        ? {
            ...student,
            firstName: student?.firstName as string,
            middleName: student?.middleName,
            lastName: student?.lastName,
            studentImage: student?.studentImage,
          }
        : {},
  });

  const { modifyStudent, isPending } = useModifyStudent();
  const handleFormSubmit = (e: any) => {
    modifyStudent(e);
  };

  return (
    <Form onSubmit={handleSubmit(handleFormSubmit)}>
      <LoadingOverlay
        visible={isPending}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      <Form.Box mt={"md"}>
        <Form.Title>Basic Information</Form.Title>
        <Form.Grid p={"lg"}>
          <Form.Col span={{ base: 12, md: 3, lg: 6 }}>
            <Controller
              name="firstName"
              control={control}
              rules={{
                required: "This field is required",
              }}
              render={({ field }) => {
                return (
                  <InputBase
                    withAsterisk
                    label="First Name"
                    placeholder="John Doe..."
                    withErrorStyles={errors.firstName?.message ? true : false}
                    {...field}
                    error={<>{errors.firstName?.message}</>}
                  />
                );
              }}
            />
          </Form.Col>
          <Form.Col span={{ base: 12, md: 3, lg: 6 }}>
            <Controller
              name="middleName"
              control={control}
              rules={{
                required: "This field is required",
              }}
              render={({ field }) => {
                return (
                  <InputBase
                    withAsterisk
                    label="Middle Name"
                    placeholder="Dela Fuena..."
                    withErrorStyles={errors.middleName?.message ? true : false}
                    {...field}
                    error={<>{errors.middleName?.message}</>}
                  />
                );
              }}
            />
          </Form.Col>

          <Form.Col span={{ base: 12, md: 3, lg: 12 }}>
            <Controller
              name="lastName"
              control={control}
              rules={{
                required: "This field is required",
              }}
              render={({ field }) => {
                return (
                  <InputBase
                    withAsterisk
                    label="Last Name"
                    placeholder="Fuentes Strange..."
                    withErrorStyles={errors.lastName?.message ? true : false}
                    {...field}
                    error={<>{errors.lastName?.message}</>}
                  />
                );
              }}
            />
          </Form.Col>

          <Form.Col span={{ base: 12, md: 3, lg: 12 }}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => {
                return (
                  <InputBase
                    withAsterisk
                    label="Email"
                    placeholder="johndoe@gmail.com"
                    withErrorStyles={errors.email?.message ? true : false}
                    {...field}
                    error={<>{errors.email?.message}</>}
                    disabled={
                      student?.userRole.toLowerCase().includes("student") ||
                      student?.userRole.toLowerCase().includes("teacher")
                    }
                  />
                );
              }}
            />
          </Form.Col>

          <Form.Col span={{ base: 12 }} mt={"md"}>
            {student?.studentImage !== null && (
              <Flex justify={"center"} align={"center"}>
                <Avatar
                  src={
                    typeof watch("studentImage") === "string"
                      ? watch("studentImage")
                      : URL.createObjectURL(watch("studentImage"))
                  }
                  h={100}
                  w={100}
                />
              </Flex>
            )}
            <Controller
              control={control}
              name="studentImage"
              render={({ field: { onChange, ...field } }) => (
                <FileInput
                  description={
                    "A books that has a soft-copy can be put here but only the abstract. (Optional)"
                  }
                  onChange={(e) => {
                    onChange(e);
                  }}
                  accept="image/jpg,image/png"
                  label="Your Image"
                  placeholder={"Upload your document (PDF)"}
                  {...field}
                />
              )}
            />
          </Form.Col>
        </Form.Grid>
      </Form.Box>

      <Box
        style={{
          display: "flex",
          justifyContent: "end",
        }}
      >
        <Form.SubmitButton
          loading={isPending}
          disabled={!isDirty}
          alias="Save Profile"
          color="red.8"
        />
      </Box>
    </Form>
  );
};
export default EditStudentProfile;
