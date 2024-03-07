import {
  Group,
  Menu,
  UnstyledButton,
  Avatar,
  rem,
  Text,
  Modal,
  Card,
  RingProgress,
  Image,
} from "@mantine/core";
import {
  IconChevronDown,
  IconSettings,
  IconSwitchHorizontal,
  IconLogout,
} from "@tabler/icons-react";
import { useState } from "react";
import classes from "./user-menu.module.css";
import classe from "./user-card.module.css";

import cn from "clsx";
import useLogout from "@pages/Authentication/hooks/useLogout";
import useCurrentUser from "@pages/Authentication/hooks/useCurrentUser";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";

export default function UserMenu() {
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);

  const { logoutUser } = useLogout();

  const navigate = useNavigate();

  const { user } = useCurrentUser();
  const stats = [
    { title: "Distance", value: "27.4 km" },
    { title: "Avg. speed", value: "9.6 km/h" },
    { title: "Score", value: "88/100" },
  ];
  const items = stats.map((stat) => (
    <div key={stat.title}>
      <Text size="xs" color="dimmed">
        {stat.title}
      </Text>
      <Text fw={500} size="sm">
        {stat.value}
      </Text>
    </div>
  ));
  return (
    <>
      <Menu
        width={260}
        position="bottom-end"
        transitionProps={{ transition: "pop-top-right" }}
        onClose={() => setUserMenuOpened(false)}
        onOpen={() => setUserMenuOpened(true)}
        withinPortal
      >
        <Menu.Target>
          <UnstyledButton
            className={cn(classes.user, {
              [classes.userActive]: userMenuOpened,
            })}
          >
            <Group gap={7}>
              <Avatar
                src={user?.avatarImage as string}
                alt={user?.email}
                radius="xl"
                size={36}
              />
              <Text fw={500} size="sm" lh={1} mr={3}>
                {user?.firstName} {user?.middleName} {user?.lastName}
              </Text>
              <IconChevronDown
                style={{ width: rem(12), height: rem(12) }}
                stroke={1.5}
              />
            </Group>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Settings</Menu.Label>
          <Menu.Item
            leftSection={
              <IconSettings
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            }
            onClick={() => navigate("/library")}
          >
            Go to Library Page
          </Menu.Item>

          <Menu.Item
            leftSection={
              <IconLogout
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            }
            onClick={() => logoutUser()}
          >
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      <Modal.Root opened={opened} onClose={close} centered>
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Account settings</Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body>
            <Card withBorder padding="lg" className={classe.card}>
              <Card.Section>
                <Image
                  src="https://images.unsplash.com/photo-1581889470536-467bdbe30cd0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80"
                  alt="Running challenge"
                  height={100}
                />
              </Card.Section>

              <Group justify="space-between" mt="xl">
                <Text fz="sm" fw={700} className={classe.title}>
                  Running challenge
                </Text>
                <Group gap={5}>
                  <Text fz="xs" c="dimmed">
                    80% completed
                  </Text>
                  <RingProgress
                    size={18}
                    thickness={2}
                    sections={[{ value: 80, color: "blue" }]}
                  />
                </Group>
              </Group>
              <Text mt="sm" mb="md" c="dimmed" fz="xs">
                56 km this month • 17% improvement compared to last month • 443
                place in global scoreboard
              </Text>
              <Card.Section className={classe.footer}>{items}</Card.Section>
            </Card>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  );
}
