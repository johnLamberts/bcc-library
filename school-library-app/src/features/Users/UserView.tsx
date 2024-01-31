import {
  Modal,
  Badge,
  Divider,
  Card,
  Flex,
  Title,
  Image,
  Text,
} from "@mantine/core";

interface UserViewProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user?: Record<string, any>;
}
export default function UserView({ user }: UserViewProps) {
  return (
    <>
      <Modal.Header>
        <Badge
          radius={"sm"}
          bg={" var(--mantine-color-green-light)"}
          color={" var(--mantine-color-green-light-color)"}
        >
          {user?.userRole}
        </Badge>
        <Modal.CloseButton />
      </Modal.Header>
      <Divider />
      <Modal.Body>
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
            src={user?.avatarImage}
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
          <Card.Section inheritPadding mt="sm" pb="md"></Card.Section>
        </Flex>

        <Divider my={"sm"} />
      </Modal.Body>
    </>
  );
}
