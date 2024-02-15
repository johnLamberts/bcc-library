import { Paper, Title, TextInput, Button, Anchor, Text } from "@mantine/core";
import classes from "./login.module.css";
import Form from "@components/Form/Form";
import { useForm } from "react-hook-form";
import { login } from "./services/auth.service";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import useLogin from "./hooks/useLogin";

const Login = () => {
  const form = useForm();

  const navigate = useNavigate();

  const { loginUser, isPending } = useLogin();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: Record<string, any>) => {
    try {
      // setIsLoading(true);
      // const { email, password } = data;
      // const user = await login(email, password);

      // // const resultUser = (await user?.[0]) as IUser[];

      // const userRole = user?.[0].userRole;

      // console.log(userRole);

      // if (userRole === "Student" || userRole === "Teacher") {
      //   navigate("/home", { replace: true });
      // }

      const user = loginUser(data);

      console.log(user);
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      toast.error(
        `Oops! It seems the credentials you entered are invalid. Please double-check your username and password and try again.`
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="xl" mb={50}>
          Welcome back to BCC OPAC
        </Title>

        {/* Login */}
        <Form onSubmit={form.handleSubmit(onSubmit)}>
          <Form.Box>
            <Form.Grid>
              <Form.Col>
                <TextInput
                  label="Email address"
                  placeholder="hello@gmail.com"
                  size="md"
                  {...form.register("email", {
                    required: "This field is required!",
                  })}
                  withAsterisk
                  withErrorStyles={
                    form.formState.errors.email?.message ? true : false
                  }
                  error={<>{form.formState.errors.email?.message}</>}
                />
              </Form.Col>
              <Form.Col>
                <TextInput
                  label="Password"
                  placeholder="Your password"
                  mt="md"
                  size="md"
                  type="password"
                  withAsterisk
                  withErrorStyles={
                    form.formState.errors.password?.message ? true : false
                  }
                  error={<>{form.formState.errors.password?.message}</>}
                  {...form.register("password", {
                    required: "This field is required!",
                  })}
                />
              </Form.Col>
            </Form.Grid>
          </Form.Box>
          <Button
            fullWidth
            loading={isPending}
            mt="xl"
            size="md"
            type="submit"
            color="#5C0505"
          >
            Login
          </Button>
        </Form>

        {/* end of login */}

        {/* {isError && <Text c={"red"}>Invalid Email and Password</Text>} */}

        <Text ta="center" mt="md">
          <Anchor<"a">
            href="#"
            fw={700}
            onClick={(event) => event.preventDefault()}
          >
            Forget your password?
          </Anchor>
        </Text>

        <Text ta="center" mt="md">
          <Link to={"/library"}>Go back to Library</Link>
        </Text>
      </Paper>
    </div>
  );
};
export default Login;
