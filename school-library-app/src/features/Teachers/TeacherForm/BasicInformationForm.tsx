import Form from "@components/Form/Form";
import { InputBase, Select, TextInput } from "@mantine/core";
import { Controller, useFormContext } from "react-hook-form";
import { IMaskInput } from "react-imask";

const BasicInformationForm = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <>
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

          <Form.Col span={{ base: 12, md: 3, lg: 6 }}>
            <Controller
              name="contactNumber"
              control={control}
              render={({ field }) => {
                return (
                  <InputBase
                    component={IMaskInput}
                    withAsterisk
                    mask="+63 (000) 0000 000"
                    label="Contact Number"
                    placeholder="Your Contact Number..."
                    withErrorStyles={
                      errors.contactNumber?.message ? true : false
                    }
                    {...field}
                    error={<>{errors.contactNumber?.message}</>}
                  />
                );
              }}
            />
          </Form.Col>

          <Form.Col span={{ base: 12, md: 3, lg: 6 }}>
            <Controller
              name="sex"
              control={control}
              render={({ field }) => {
                return (
                  <Select
                    label="Sex"
                    placeholder="Select sex"
                    data={["Male", "Female"]}
                    comboboxProps={{
                      transitionProps: { transition: "pop", duration: 200 },
                    }}
                    withErrorStyles={errors.sex?.message ? true : false}
                    {...field}
                    error={<>{errors.sex?.message}</>}
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
        </Form.Grid>
      </Form.Box>
    </>
  );
};
export default BasicInformationForm;
