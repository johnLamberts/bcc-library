import Form from "@components/Form/Form";
import { InputBase } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";

const EditProfile = () => {
  const {
    formState: { errors },
    control,
  } = useForm();
  return (
    <Form.Box mt={"md"}>
      <Form.Title>Basic Information</Form.Title>
      <Form.Grid p={"lg"}>
        <Form.Col span={{ base: 12, md: 3, lg: 6 }}>
          <Controller
            name="firstName"
            control={control}
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
      </Form.Grid>
    </Form.Box>
  );
};
export default EditProfile;
