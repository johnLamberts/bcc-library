/* eslint-disable @typescript-eslint/no-explicit-any */
import Form from "@components/Form/Form";
import useModifyEditProfile from "@features/AdminDashboard/hooks/useModifyEditProfile";
import { IUser } from "@features/Users/models/user.interface";
import {
  Avatar,
  Box,
  FileInput,
  Flex,
  InputBase,
  LoadingOverlay,
} from "@mantine/core";
import { Controller, useForm } from "react-hook-form";

const EditProfile = ({ user }: { user: IUser | undefined }) => {
  const {
    formState: { errors, isValid },
    control,
    watch,
    handleSubmit,
  } = useForm<any>({
    defaultValues:
      user !== null || user !== undefined
        ? {
            ...user,
            firstName: user?.firstName as string,
            middleName: user?.middleName,
            lastName: user?.lastName,
            avatarImage: user?.avatarImage as any,
          }
        : {},
  });

  const { modifyProfile, isPending } = useModifyEditProfile();

  const handleFormSubmit = (e: any) => {
    modifyProfile(e);
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
                      user?.userRole.toLowerCase().includes("librarian") ||
                      user?.userRole.toLowerCase().includes("staff")
                    }
                  />
                );
              }}
            />
          </Form.Col>

          <Form.Col span={{ base: 12 }} mt={"md"}>
            {user?.avatarImage !== null && (
              <Flex justify={"center"} align={"center"}>
                <Avatar
                  src={
                    typeof watch("avatarImage") === "string"
                      ? watch("avatarImage")
                      : URL.createObjectURL(watch("avatarImage"))
                  }
                  h={100}
                  w={100}
                />
              </Flex>
            )}
            <Controller
              control={control}
              name="avatarImage"
              render={({ field: { onChange, ...field } }) => (
                <FileInput
                  description={
                    "A books that has a soft-copy can be put here but only the abstract. (Optional)"
                  }
                  onChange={(e) => {
                    onChange(e);
                  }}
                  accept="image/jpg,image/png"
                  label="Book File"
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
          disabled={!isValid}
          alias="Save Profile"
          color="red.8"
        />
      </Box>
    </Form>
  );
};
export default EditProfile;
