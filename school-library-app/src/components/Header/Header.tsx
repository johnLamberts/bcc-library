import {
  Avatar,
  Burger,
  Button,
  Container,
  Group,
  Menu,
  Text,
  UnstyledButton,
  rem,
} from "@mantine/core";
import classes from "./header.module.css";
import {
  IconChevronDown,
  IconSettings,
  IconTrash,
  IconUser,
} from "@tabler/icons-react";

import CollegeLogo from "@components/Logo/CollegeLogo";
import { Link, useNavigate } from "react-router-dom";
import ModeToggle from "@components/ModeToggle/ModeToggle";

import cn from "clsx";
import { useState } from "react";
import useCurrentUser from "@pages/Authentication/hooks/useCurrentUser";
import { logout } from "@pages/Authentication/services/auth.service";
import { toast } from "sonner";

const links = [
  { link: "/home", label: "Home" },
  { link: "library", label: "Library" },
  { link: "/announcement", label: "Announcement" },
  { link: "/contact-us", label: "Contact Us" },
];

const Header = () => {
  const { user } = useCurrentUser();

  const navigate = useNavigate();

  const items = links.map((link) => (
    <Link
      key={link.link}
      to={link.link}
      className={classes.link}
      style={{
        fontFamily: "Montserrat",
        color: "white",
        fontWeight: 400,
      }}
    >
      {link.label}
    </Link>
  ));
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  return (
    <>
      <header className={classes.header}>
        <Container size={"lg"} pt={"xs"}>
          <Group justify="space-between" h="100%">
            {/* <MantineLogo size={30} /> */}
            <CollegeLogo />
            <Group h="100%" gap={0} visibleFrom="sm">
              {items}
            </Group>
            <Group visibleFrom="sm" justify="center" align="center">
              {user === null || user === undefined ? (
                <Button
                  leftSection={<IconUser color={"#5C0505"} size={14} />}
                  variant="filled"
                  color="#ffa903"
                  size="xs"
                  onClick={() => navigate("login")}
                >
                  <Text
                    pt={"0.2em"}
                    span
                    c={"#5C0505"}
                    size="sm"
                    fw={"600"}
                    ff={"Montserrat"}
                  >
                    Login
                  </Text>
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
                      className={cn(classes.user, {
                        [classes.userActive]: userMenuOpened,
                      })}
                    >
                      <Group gap={7}>
                        <Avatar
                          src={user?.avatarImage as string}
                          alt={user?.lastName}
                          radius="xl"
                          size={20}
                        />
                        <Text fw={500} size="sm" lh={1} mr={3} c={"white"}>
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
                    {user.userRole.toLowerCase().includes("student") &&
                      user.userRole.toLowerCase().includes("teacher") && (
                        <Menu.Item
                          leftSection={
                            <IconSettings
                              style={{ width: rem(14), height: rem(14) }}
                            />
                          }
                          onClick={() =>
                            navigate(
                              `profile/${user?.userUID}_${user?.userRole}`
                            )
                          }
                        >
                          Settings
                        </Menu.Item>
                      )}

                    {user.userRole.toLowerCase().includes("admin") && (
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
                        <IconTrash
                          style={{ width: rem(14), height: rem(14) }}
                        />
                      }
                      onClick={async () => {
                        await logout();
                        toast.success(
                          "Thank you for using our library! You're now being logged out. If you need assistance in the future, don't hesitate to reach out. Have a great day!"
                        );
                        navigate("/login", { replace: true });
                      }}
                    >
                      Log out
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              )}

              <ModeToggle />
            </Group>
            <Burger hiddenFrom="sm" />
          </Group>
        </Container>
      </header>
    </>
  );
};
export default Header;
