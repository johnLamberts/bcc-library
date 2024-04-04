/* eslint-disable @typescript-eslint/no-explicit-any */
import Form from "@components/Form/Form";
import useModifyStudent from "@features/Student/hooks/useModifyStudent";
import { IStudents } from "@features/Student/models/student.interface";
import {
  Box,
  LoadingOverlay,
  PasswordInput,
  Popover,
  Progress,
  Text,
  rem,
} from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

function PasswordRequirement({
  meets,
  label,
}: {
  meets: boolean;
  label: string;
}) {
  return (
    <Text
      c={meets ? "teal" : "red"}
      style={{ display: "flex", alignItems: "center" }}
      mt={7}
      size="sm"
    >
      {meets ? (
        <IconCheck style={{ width: rem(14), height: rem(14) }} />
      ) : (
        <IconX style={{ width: rem(14), height: rem(14) }} />
      )}{" "}
      <Box ml={10}>{label}</Box>
    </Text>
  );
}

const requirements = [
  { re: /[0-9]/, label: "Includes number" },
  { re: /[a-z]/, label: "Includes lowercase letter" },
  { re: /[A-Z]/, label: "Includes uppercase letter" },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Includes special symbol" },
];

function getStrength(password: string) {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

const ChangeStudentPassword = ({
  user,
}: {
  user?: IStudents | undefined;
  close: () => void;
}) => {
  const {
    formState: { errors, isValid },
    control,
    handleSubmit,
    watch,
  } = useForm<any>();

  const { modifyStudent, isPending } = useModifyStudent();

  const handleFormSubmit = (e: any) => {
    const value = {
      ...user,
      password: e.password,
    } as IStudents;

    modifyStudent(value);

    close();
  };

  const [popoverOpened, setPopoverOpened] = useState(false);
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(watch("password"))}
    />
  ));

  const strength = getStrength(watch("password") || "");
  const color = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";

  return (
    <Form onSubmit={handleSubmit(handleFormSubmit)}>
      <LoadingOverlay
        visible={isPending}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      <Form.Box mt={"md"}>
        <Form.Title>
          Keep your account secure by updating your password regularly
        </Form.Title>
        <Form.Grid p={"lg"}>
          <Form.Col span={{ base: 12, md: 12, lg: 12 }}>
            <Popover
              opened={popoverOpened}
              position="bottom"
              width="target"
              transitionProps={{ transition: "pop" }}
            >
              <Popover.Target>
                <div
                  onFocusCapture={() => setPopoverOpened(true)}
                  onBlurCapture={() => setPopoverOpened(false)}
                >
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => {
                      return (
                        <PasswordInput
                          withAsterisk
                          label="New Password"
                          placeholder="Your password"
                          {...field}
                        />
                      );
                    }}
                  />
                </div>
              </Popover.Target>
              <Popover.Dropdown>
                <Progress color={color} value={strength} size={5} mb="xs" />
                <PasswordRequirement
                  label="Includes at least 6 characters"
                  meets={watch("password")?.length > 5}
                />
                {checks}
              </Popover.Dropdown>
            </Popover>
          </Form.Col>
          <Form.Col span={{ base: 12, md: 12, lg: 12 }}>
            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                required: "This field is required",
                validate: (value) => {
                  if (watch("password") !== value) {
                    return "Passwords do not match. Please ensure that the password you entered matches the one you provided above.";
                  }

                  return true;
                },
              }}
              render={({ field }) => {
                return (
                  <PasswordInput
                    withAsterisk
                    label="Confirm New Password"
                    placeholder="Your password"
                    {...field}
                    withErrorStyles={
                      errors.confirmPassword?.message ? true : false
                    }
                    error={<>{errors.confirmPassword?.message}</>}
                  />
                );
              }}
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
          alias="Save Password"
          color="yellow.8"
        />
      </Box>
    </Form>
  );
};
export default ChangeStudentPassword;
