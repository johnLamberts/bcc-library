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
  IconLogout,
  IconAt,
  IconPhoneCall,
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
            onClick={open}
          >
            Profile
          </Menu.Item>
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

      <Modal.Root opened={opened} onClose={close} centered size={"xl"}>
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Account settings</Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body>
            <div>
              <Group wrap="nowrap">
                <Avatar
                  src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
                  size={94}
                  radius="md"
                />
                <div>
                  <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
                    Software engineer
                  </Text>

                  <Text fz="lg" fw={500} className={classes.name}>
                    Robert Glassbreaker
                  </Text>

                  <Group wrap="nowrap" gap={10} mt={3}>
                    <IconAt stroke={1.5} size="1rem" className={classes.icon} />
                    <Text fz="xs" c="dimmed">
                      robert@glassbreaker.io
                    </Text>
                  </Group>

                  <Group wrap="nowrap" gap={10} mt={5}>
                    <IconPhoneCall
                      stroke={1.5}
                      size="1rem"
                      className={classes.icon}
                    />
                    <Text fz="xs" c="dimmed">
                      +11 (876) 890 56 23
                    </Text>
                  </Group>
                </div>
              </Group>
            </div>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  );
}
