import {
  Anchor,
  Box,
  Button,
  Center,
  Container,
  Flex,
  Group,
  Paper,
  Text,
  TextInput,
  Title,
  rem,
} from "@mantine/core";
import classes from "./styles/ForgetPassword.module.css";
import { IconArrowLeft } from "@tabler/icons-react";
import useForgetPassword from "./Authentication/hooks/useForgetPassword";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const ForgetPassword = () => {
  const { addForgetPassword, isSuccess, isPending } = useForgetPassword();

  const form = useForm();

  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  const handleForgetPassword = (e: any) => {
    addForgetPassword(e);
  };
  return (
    <Container size={460} my={30}>
      <Flex
        align={"center"}
        justify={"center"}
        h={"100vh"}
        direction={"column"}
      >
        <Title className={classes.title} ta="center">
          Forgot your password?
        </Title>
        <Text c="dimmed" fz="sm" ta="center">
          Enter your email to get a reset link
        </Text>

        <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
          {isSuccess ? (
            <>
              <Text>Successfully sent an email!</Text>
              <Anchor
                c="dimmed"
                size="sm"
                className={classes.control}
                onClick={() => navigate("/login")}
              >
                <Center inline>
                  <IconArrowLeft
                    style={{ width: rem(12), height: rem(12) }}
                    stroke={1.5}
                  />
                  <Box ml={5}>Back to the login page</Box>
                </Center>
              </Anchor>
            </>
          ) : (
            <>
              <form onSubmit={form.handleSubmit(handleForgetPassword)}>
                <TextInput
                  label="Your email"
                  placeholder="me@mantine.dev"
                  withAsterisk
                  {...form.register("email", {
                    required: `This field is required`,
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Entered value does not match email format",
                    },
                  })}
                  disabled={isPending}
                  error={<>{form.formState.errors.email?.message}</>}
                  withErrorStyles={
                    form.formState.errors.email?.message ? true : false
                  }
                />
                <Group
                  justify="space-between"
                  mt="lg"
                  className={classes.controls}
                >
                  <Anchor
                    c="dimmed"
                    size="sm"
                    className={classes.control}
                    onClick={() => navigate("/login")}
                  >
                    <Center inline>
                      <IconArrowLeft
                        style={{ width: rem(12), height: rem(12) }}
                        stroke={1.5}
                      />
                      <Box ml={5}>Back to the login page</Box>
                    </Center>
                  </Anchor>
                  <Button
                    className={classes.control}
                    type="submit"
                    disabled={isPending}
                  >
                    Reset password
                  </Button>
                </Group>{" "}
              </form>
            </>
          )}
        </Paper>
      </Flex>
    </Container>
  );
};
export default ForgetPassword;
