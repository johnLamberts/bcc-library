import {
  Badge,
  Divider,
  Flex,
  Title,
  Image,
  Text,
  Grid,
  useComputedColorScheme,
} from "@mantine/core";

interface StudentViewProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user?: Record<string, any>;
}
export default function StudentView({ user }: StudentViewProps) {
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  console.log(computedColorScheme);
  return (
    <>
      <Flex gap={"sm"}>
        <Badge
          radius={"sm"}
          bg={" var(--mantine-color-red-light)"}
          color={" var(--mantine-color-red-light-color)"}
        >
          <span
            style={{
              color: "var(--mantine-color-red-light-color)",
            }}
          >
            {user?.userRole}
          </span>
        </Badge>
        <Badge
          radius={"sm"}
          bg={" var(--mantine-color-yellow-light)"}
          color={" "}
        >
          <span
            style={{
              color: "var(--mantine-color-yellow-light-color)",
            }}
          >
            {user?.studentNumber}
          </span>
        </Badge>
      </Flex>

      <Flex
        direction={{ base: "column", sm: "row" }}
        gap={{ base: "sm", sm: "md" }}
        justify={{ sm: "center" }}
        mih={80}
      >
        {/* <Grid.Col span={4}> */}
        <Image
          m={"auto"}
          mt={"lg"}
          src={user?.studentImage}
          h={80}
          w={"auto"}
        />
        {/* </Grid.Col> */}
        {/* <Grid.Col span={"auto"}> */}

        <Flex
          direction={{ base: "column", sm: "column" }}
          // gap={{ base: "sm", sm: "xs" }}
          justify={{ sm: "center" }}
          mih={80}
        >
          <Title mt="sm" size="h6" fw={400}>
            {user?.firstName} {user?.middleName} {user?.lastName}
            <Text inherit c="dimmed">
              Name
            </Text>{" "}
          </Title>
          <Title mt="sm" size="h6" fw={400}>
            {user?.email}
            <Text inherit c="dimmed">
              Email
            </Text>{" "}
          </Title>
        </Flex>
        {/* </Grid.Col> */}
      </Flex>

      <Divider my={"sm"} />
      <Badge bg={" var(--mantine-color-gray-light)"}>
        <span
          style={{
            color: `${
              computedColorScheme === "dark"
                ? "var(--mantine-color-white-light-color)"
                : "var(--mantine-color-text)"
            }`,
          }}
        >
          Education
        </span>
      </Badge>

      <Grid pl={"md"}>
        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
          <Title mt="sm" size="h6" fw={400}>
            {user?.levelOfEducation}
            <Text inherit c="dimmed">
              Level of Education
            </Text>{" "}
          </Title>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
          <Title mt="sm" size="h6" fw={400}>
            {user?.academicCourse === "" ? "N/A" : user?.academicCourse}
            <Text inherit c="dimmed">
              Academic Course
            </Text>{" "}
          </Title>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
          <Title mt="sm" size="h6" fw={400}>
            {user?.gradeLevel === "" ? "N/A" : user?.gradeLevel}
            <Text inherit c="dimmed">
              Grade Level
            </Text>{" "}
          </Title>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
          <Title mt="sm" size="h6" fw={400}>
            {user?.gradeSection === "" ? "N/A" : user?.gradeSection}
            <Text inherit c="dimmed">
              Grade Section
            </Text>{" "}
          </Title>
        </Grid.Col>
      </Grid>

      <Divider my={"sm"} />

      <Badge bg={" var(--mantine-color-gray-light)"}>
        <span
          style={{
            color: `${
              computedColorScheme === "dark"
                ? "var(--mantine-color-white-light-color)"
                : "var(--mantine-color-text)"
            }`,
          }}
        >
          Transaction History
        </span>
      </Badge>
    </>
  );
}
