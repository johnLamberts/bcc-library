import {
  Avatar,
  Burger,
  Button,
  Divider,
  Drawer,
  Group,
  Menu,
  Text,
  UnstyledButton,
  rem,
} from "@mantine/core";
import classNamees from "./header.module.css";
import { IconChevronDown, IconSettings, IconTrash } from "@tabler/icons-react";

import CollegeLogo from "@components/Logo/CollegeLogo";
import { Link, useLocation, useNavigate } from "react-router-dom";

import cn from "clsx";
import { useState } from "react";
import useCurrentUser from "@pages/Authentication/hooks/useCurrentUser";
import useLogout from "@pages/Authentication/hooks/useLogout";
import classes from "./header.module.css";
import { useDisclosure } from "@mantine/hooks";

const links = [
  { link: "/home", label: "Home" },
  { link: "/library", label: "Library" },
  { link: "/announcement", label: "Announcement" },
  { link: "/contact-us", label: "Contact Us" },
];

const Header = () => {
  const { user, isLoading } = useCurrentUser();

  const navigate = useNavigate();
  const [opened, { close, toggle }] = useDisclosure(false);

  const { logoutUser } = useLogout();

  const { pathname } = useLocation();
  const items = links.map((link) => (
    <Link
      key={link.link}
      to={link.link}
      className={classNamees.link}
      data-active={link.link === pathname}
    >
      {link.label}
    </Link>
  ));

  const mobileItems = links.map((link) => (
    <Link
      key={link.link}
      to={link.link}
      className={classNamees.link}
      data-active={link.link === pathname}
      onClick={close}
    >
      {link.label}
    </Link>
  ));
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const [userMobileMenuOpened, setUserMobileMenuOpened] = useState(false);

  return (
    <>
      <header className={classNamees.header}>
        <CollegeLogo />
        <div className={classes["nav-items"]}>{items}</div>
        <Group visibleFrom="md" justify="center" align="center">
          {user === null || user === undefined ? (
            <Button
              role="button"
              variant="light"
              onClick={() => navigate("login")}
              disabled={isLoading}
              className={classes["button-background-move"]}
              visibleFrom="md"
              style={{
                fontSize: "0.8rem",
                fontWeight: "200",
                letterSpacing: "1px",
                padding: "0.7rem 1.3rem 0.7rem",
                outline: "0",
                border: "1px solid #5c0505",
                // cursor: "pointer",
                position: "relative",
                backgroundColor: "rgba(0, 0, 0, 0)",
                color: "#000c",
              }}
            >
              Login
            </Button>
          ) : (
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
                  className={cn(classNamees.user, {
                    [classNamees.userActive]: userMenuOpened,
                  })}
                >
                  <Group gap={7}>
                    <Avatar
                      src={user?.avatarImage as string}
                      alt={user?.lastName}
                      radius="xl"
                      size={20}
                    />
                    <Text fw={500} size="sm" lh={1} mr={3} c={"black"}>
                      {user?.firstName} {user?.middleName} {user?.lastName}
                    </Text>
                    <IconChevronDown
                      style={{ width: rem(12), height: rem(12) }}
                      stroke={1.5}
                      color={"white"}
                    />
                  </Group>
                </UnstyledButton>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Application</Menu.Label>
                {user.userRole?.toLowerCase()!.includes("student") ||
                user.userRole?.toLowerCase()!.includes("teacher") ? (
                  <Menu.Item
                    leftSection={
                      <IconSettings
                        style={{ width: rem(14), height: rem(14) }}
                      />
                    }
                    onClick={() =>
                      navigate(`profile/${user?.userUID}_${user?.userRole}`)
                    }
                  >
                    Settings
                  </Menu.Item>
                ) : null}

                {user.userRole?.toLowerCase()!.includes("admin") && (
                  <Menu.Item
                    leftSection={
                      <IconSettings
                        style={{ width: rem(14), height: rem(14) }}
                      />
                    }
                    onClick={() => navigate(`/dashboard`)}
                  >
                    Go to dashboard
                  </Menu.Item>
                )}
                <Menu.Divider />

                <Menu.Label>Danger zone</Menu.Label>
                <Menu.Item
                  color="red"
                  leftSection={
                    <IconTrash style={{ width: rem(14), height: rem(14) }} />
                  }
                  onClick={async () => {
                    await logoutUser();
                  }}
                >
                  Log out
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          )}
        </Group>
        <Burger
          opened={opened}
          onClick={toggle}
          size="md"
          hiddenFrom="md"
          color="#5c0505"
        />
      </header>

      <Drawer position="right" onClose={close} opened={opened}>
        <div
          className={classes["nav-items"]}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
            justifyContent: "left",
            textAlign: "left",
          }}
        >
          {mobileItems}
        </div>

        <Divider my={"lg"} />
        <Group justify="center" align="center">
          {user === null || user === undefined ? (
            <Button
              role="button"
              variant="light"
              onClick={() => navigate("login")}
              disabled={isLoading}
              className={classes["button-background-move"]}
              style={{
                fontSize: "0.8rem",
                fontWeight: "200",
                letterSpacing: "1px",
                padding: "0.7rem 1.3rem 0.7rem",
                outline: "0",
                border: "1px solid #5c0505",
                // cursor: "pointer",
                position: "relative",
                backgroundColor: "rgba(0, 0, 0, 0)",
                color: "#000c",
              }}
            >
              Login
            </Button>
          ) : (
            <Menu
              width={260}
              position="bottom-end"
              transitionProps={{ transition: "pop-top-right" }}
              onClose={() => setUserMobileMenuOpened(false)}
              onOpen={() => setUserMobileMenuOpened(true)}
              withinPortal
            >
              <Menu.Target>
                <UnstyledButton
                  className={cn(classNamees.user, {
                    [classNamees.userActive]: userMobileMenuOpened,
                  })}
                >
                  <Group gap={7}>
                    <Avatar
                      src={user?.avatarImage as string}
                      alt={user?.lastName}
                      radius="xl"
                      size={20}
                    />
                    <Text fw={500} size="sm" lh={1} mr={3} c={"black"}>
                      {user?.firstName} {user?.middleName} {user?.lastName}
                    </Text>
                    <IconChevronDown
                      style={{ width: rem(12), height: rem(12) }}
                      stroke={1.5}
                      color={"white"}
                    />
                  </Group>
                </UnstyledButton>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Application</Menu.Label>
                {user.userRole?.toLowerCase()!.includes("student") ||
                user.userRole?.toLowerCase()!.includes("teacher") ? (
                  <Menu.Item
                    leftSection={
                      <IconSettings
                        style={{ width: rem(14), height: rem(14) }}
                      />
                    }
                    onClick={() => {
                      navigate(`profile/${user?.userUID}_${user?.userRole}`);
                      close();
                    }}
                  >
                    Settings
                  </Menu.Item>
                ) : null}

                {user.userRole?.toLowerCase()!.includes("admin") && (
                  <Menu.Item
                    leftSection={
                      <IconSettings
                        style={{ width: rem(14), height: rem(14) }}
                      />
                    }
                    onClick={() => {
                      navigate(`/dashboard`);
                      close();
                    }}
                  >
                    Go to dashboard
                  </Menu.Item>
                )}
                <Menu.Divider />

                <Menu.Label>Danger zone</Menu.Label>
                <Menu.Item
                  color="red"
                  leftSection={
                    <IconTrash style={{ width: rem(14), height: rem(14) }} />
                  }
                  onClick={async () => {
                    await logoutUser();
                    close();
                  }}
                >
                  Log out
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          )}
        </Group>
      </Drawer>
    </>
  );
};
export default Header;
