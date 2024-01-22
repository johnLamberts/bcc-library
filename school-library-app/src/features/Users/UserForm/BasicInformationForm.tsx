import Form from "@components/Form/Form";
import { TextInput } from "@mantine/core";
import { useFormContext } from "react-hook-form";

const BasicInformationForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Form.Box mt={"md"}>
        <Form.Title>Basic Information</Form.Title>
        <Form.Grid p={"lg"}>
          <Form.Col span={{ base: 12, md: 3, lg: 6 }}>
            <TextInput
              label="First Name"
              placeholder="Your First Name..."
              withAsterisk
              withErrorStyles={errors.firstName?.message ? true : false}
              error={<>{errors.firstName && errors.firstName?.message}</>}
              {...register("firstName", { required: `This field is required` })}
            />
          </Form.Col>
          <Form.Col span={{ base: 12, md: 3, lg: 6 }}>
            <TextInput
              label="Middle Name"
              placeholder="Your Middle Name..."
              withAsterisk
              withErrorStyles={errors.middleName?.message ? true : false}
              {...register("middleName", {
                required: `This field is required`,
              })}
              error={<>{errors && errors.middleName?.message}</>}
            />
          </Form.Col>

          <Form.Col span={{ base: 12, md: 3, lg: 12 }}>
            <TextInput
              label="Last Name"
              placeholder="Your Last Name..."
              withAsterisk
              withErrorStyles={errors.lastName?.message ? true : false}
              {...register("lastName", { required: `This field is required` })}
              error={<>{errors.lastName?.message}</>}
            />
          </Form.Col>
        </Form.Grid>
      </Form.Box>
    </>
  );
};
export default BasicInformationForm;
