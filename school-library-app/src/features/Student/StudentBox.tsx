/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Grid,
  Card,
  Group,
  Badge,
  Menu,
  ActionIcon,
  rem,
  Modal,
  Flex,
  Title,
  Image,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDots, IconFileZip, IconEye, IconTrash } from "@tabler/icons-react";
import { Dispatch, SetStateAction } from "react";
import StudentView from "./StudentView";

interface StudentListProps {
  user: Record<string, any>;
  filterStudentData?: Record<string, any>;
  setGetId: Dispatch<SetStateAction<string>>;
}

export default function StudentBox({
  user,
  setGetId,
  filterStudentData,
}: StudentListProps) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Grid.Col span={{ base: 12, md: 8, lg: 4 }}>
        <Card withBorder shadow="sm" radius="md">
          <Card.Section withBorder inheritPadding py="xs">
            <Group justify="space-between">
              <Flex gap={"sm"}>
                <Badge radius={"sm"} bg={" var(--mantine-color-red-light)"}>
                  <span
                    style={{
                      color: "var(--mantine-color-red-light-color)",
                    }}
                  >
                    {user.userRole}
                  </span>
                </Badge>

                <Badge radius={"sm"} bg={" var(--mantine-color-yellow-light)"}>
                  <span
                    style={{
                      color: "var(--mantine-color-yellow-light-color)",
                    }}
                  >
                    {user.studentNumber}
                  </span>
                </Badge>
              </Flex>
              <Menu withinPortal position="bottom-end" shadow="sm">
                <Menu.Target>
                  <ActionIcon variant="subtle" color="gray">
                    <IconDots style={{ width: rem(16), height: rem(16) }} />
                  </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item
                    disabled={
                      user.userRole === "Teacher" || user.userRole === "Student"
                    }
                    leftSection={
                      <IconFileZip
                        style={{ width: rem(14), height: rem(14) }}
                      />
                    }
                  >
                    Update Info
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => {
                      open();

                      setGetId(user.id.toString());
                    }}
                    leftSection={
                      <IconEye style={{ width: rem(14), height: rem(14) }} />
                    }
                  >
                    Preview all
                  </Menu.Item>

                  <Menu.Item
                    leftSection={
                      <IconTrash style={{ width: rem(14), height: rem(14) }} />
                    }
                    color="red"
                  >
                    Remove
                  </Menu.Item>
                </Menu.Dropdown>
                <Modal.Root
                  opened={opened}
                  onClose={close}
                  size={"xl"}
                  centered
                >
                  <Modal.Overlay />
                  <Modal.Content>
                    <StudentView user={filterStudentData} key={user.userUID} />
                  </Modal.Content>
                </Modal.Root>
              </Menu>
            </Group>
          </Card.Section>

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
              src={user.studentImage}
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
                {user.firstName} {user.middleName} {user.lastName}
                <Text inherit c="dimmed">
                  Name
                </Text>{" "}
              </Title>
              <Title mt="sm" size="h6" fw={400}>
                {user.email}
                <Text inherit c="dimmed">
                  Email
                </Text>{" "}
              </Title>
            </Flex>
            {/* </Grid.Col> */}
            <Card.Section inheritPadding mt="sm" pb="md"></Card.Section>
          </Flex>
        </Card>
      </Grid.Col>
    </>
  );
}
