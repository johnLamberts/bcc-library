import Form from "@components/Form/Form";
import { TextInput } from "@mantine/core";
import { useFormContext } from "react-hook-form";

const BookPublicationForm = () => {
  const { register } = useFormContext();

  return (
    <Form.Box mt={"md"}>
      <Form.Title>Book Publication Information</Form.Title>
      <Form.Grid p={"lg"}>
        <Form.Col span={{ base: 12, md: 6, lg: 6 }}>
          <TextInput
            label="Publication Details "
            description="Optional"
            placeholder="Your Publication Details..."
            {...register("publicationDetails")}
          />
        </Form.Col>

        <Form.Col span={{ base: 12, md: 6, lg: 6 }}>
          <TextInput
            label="Publisher"
            placeholder="Your Publisher..."
            description="Optional"
            {...register("publisher")}
          />
        </Form.Col>

        <Form.Col span={{ base: 12, md: 6, lg: 6 }}>
          <TextInput
            label="Publication Date"
            placeholder="Your Publication Date..."
            description="Optional"
            {...register("publicationDate")}
          />
        </Form.Col>

        <Form.Col span={{ base: 12, md: 6, lg: 6 }}>
          <TextInput
            label="Edition"
            placeholder="Your Edition..."
            {...register("edition")}
            description="Optional"
          />
        </Form.Col>
      </Form.Grid>
    </Form.Box>
  );
};
export default BookPublicationForm;
