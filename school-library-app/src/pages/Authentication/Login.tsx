import {
  Paper,
  Title,
  TextInput,
  Button,
  Anchor,
  Text,
  Grid,
  Image,
  Box,
} from "@mantine/core";
import classes from "./login.module.css";
import Form from "@components/Form/Form";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import useLogin from "./hooks/useLogin";

const Login = () => {
  const form = useForm();

  const navigate = useNavigate();

  const { loginUser, isPending } = useLogin();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: Record<string, any>) => {
    try {
      loginUser(data);
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      toast.error(
        `Oops! It seems the credentials you entered are invalid. Please double-check your username and password and try again.`
      );
    }
  };
  return (
    <Box
      style={{
        overflow: "hidden",
      }}
    >
      <Grid>
        <Grid.Col
          span={{
            base: 12,
            lg: 8,
            md: 8,
          }}
          visibleFrom="md"
        >
          <Image src={"/images/login_bcc.png"} mah={"100vh"} visibleFrom="lg" />

          <Image src={"/images/login_bcc.png"} mih={"100vh"} hiddenFrom="lg" />
        </Grid.Col>

        <Grid.Col
          span={{
            base: 12,
            lg: 4,
            md: 4,
          }}
        >
          <Paper className={classes.form} radius={0} p={30}>
            <Title
              order={2}
              className={classes.title}
              ta="center"
              mt="xl"
              mb={50}
              ff={"Montserrat"}
              fw={500}
            >
              <span className={classes.highlight}>
                Online Public Access Catalog <br />
              </span>
              <Text span c="dimmed">
                Binangonan Catholic College
              </Text>
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
                fw={700}
                onClick={() => navigate("/forget-password")}
              >
                Forget your password?
              </Anchor>
            </Text>

            <Text ta="center" mt="md">
              <Link to={"/library"}>Go back to Library</Link>
            </Text>
            <Image src={"/images/bg.png"} />
          </Paper>
        </Grid.Col>
      </Grid>
    </Box>
  );
};
export default Login;
