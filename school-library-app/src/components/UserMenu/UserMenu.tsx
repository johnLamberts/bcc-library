import { Group, Menu, UnstyledButton, Avatar, rem, Text } from "@mantine/core";
import {
  IconChevronDown,
  IconSettings,
  IconSwitchHorizontal,
  IconLogout,
} from "@tabler/icons-react";
import { useState } from "react";
import classes from "./user-menu.module.css";

import cn from "clsx";
import { useNavigate } from "react-router-dom";
const user = {
  name: "John Lambert P. Asis",
  email: "janspoon@fighter.dev",
  image:
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png",
};

export default function UserMenu() {
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const navigate = useNavigate();
  return (
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
          className={cn(classes.user, { [classes.userActive]: userMenuOpened })}
        >
          <Group gap={7}>
            <Avatar src={user.image} alt={user.name} radius="xl" size={36} />
            <Text fw={500} size="sm" lh={1} mr={3}>
              {user.name}
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
        >
          Account settings
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconSwitchHorizontal
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          }
        >
          Change account
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconLogout
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          }
          onClick={() => navigate("/home")}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
