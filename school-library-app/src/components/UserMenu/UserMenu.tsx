/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Group,
  Menu,
  UnstyledButton,
  Avatar,
  rem,
  Text,
  Modal,
  Tabs,
  Box,
  Tabs,
} from "@mantine/core";
import {
  IconChevronDown,
  IconSettings,
  IconLogout,
  IconAt,
  IconMessageCircle,
  IconPhoto,
  IconCalendarDot,
} from "@tabler/icons-react";
import { useMemo, useState } from "react";
import classes from "./user-menu.module.css";

import cn from "clsx";
import useLogout from "@pages/Authentication/hooks/useLogout";
import useCurrentUser from "@pages/Authentication/hooks/useCurrentUser";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import EditProfile from "./EditProfile";
import ChangeProfile from "./ChangePassword";
import ChangePassword from "./ChangePassword";

export default function UserMenu() {
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);

  const { logoutUser } = useLogout();

  const navigate = useNavigate();

  const { user, isLoading } = useCurrentUser();

  const iconStyle = { width: rem(12), height: rem(12) };

  const memoizedUser = useMemo(() => user, [user]);
  return (
    <>
      <Menu
        width={260}
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
            disabled={isLoading}
          >
            <Group gap={7}>
              <Avatar
                src={memoizedUser?.avatarImage as string}
                alt={memoizedUser?.email}
                radius="xl"
                size={36}
              />
              <Text fw={500} size="sm" lh={1} mr={3}>
                {memoizedUser?.firstName} {memoizedUser?.middleName}{" "}
                {memoizedUser?.lastName}
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
            <Tabs defaultValue={"gallery"}>
              <Tabs.List>
                <Tabs.Tab
                  value="gallery"
                  leftSection={<IconPhoto style={iconStyle} />}
                >
                  My profile
                </Tabs.Tab>
                <Tabs.Tab
                  value="messages"
                  leftSection={<IconMessageCircle style={iconStyle} />}
                >
                  Edit Profile
                </Tabs.Tab>
                <Tabs.Tab
                  value="settings"
                  leftSection={<IconSettings style={iconStyle} />}
                >
                  Change Password
                </Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel value="gallery">
                <Box mt="xs">
                  <Tabs.Panel value="gallery">
                    <Box mt="xs">
                      <Group wrap="nowrap">
                        <Avatar
                          src={memoizedUser?.avatarImage as string}
                          size={94}
                          radius="md"
                        />
                        <div>
                          <Text
                            fz="xs"
                            tt="uppercase"
                            fw={700}
                            c="dimmed"
                            ff="Montserrat"
                          >
                            {memoizedUser?.userRole}
                          </Text>

                          <Text
                            fz="lg"
                            fw={500}
                            className={classes.name}
                            ff="Montserrat"
                          >
                            {memoizedUser?.firstName} {memoizedUser?.lastName}
                          </Text>

                          <Group wrap="nowrap" gap={10} mt={3}>
                            <IconAt
                              stroke={1.5}
                              size="1rem"
                              className={classes.icon}
                            />
                            <Text fz="sm" ff="Montserrat">
                              {memoizedUser?.email}
                            </Text>
                          </Group>

                          <Group wrap="nowrap" gap={10} mt={5}>
                            <IconCalendarDot
                              stroke={1.5}
                              size="1rem"
                              className={classes.icon}
                            />
                            <Text fz="sm" ff="Montserrat">
                              {new Date(
                                (memoizedUser as any)?.createdAt.seconds *
                                  1000 +
                                  (memoizedUser as any)?.createdAt.nanoseconds /
                                    1000
                              ).toLocaleString()}
                            </Text>
                          </Group>
                        </div>
                      </Group>
                    </Box>
                  </Tabs.Panel>
                </Box>
              </Tabs.Panel>

              <Tabs.Panel value="messages">
                <EditProfile user={memoizedUser} />
              </Tabs.Panel>

              <Tabs.Panel value="settings">
                <ChangePassword user={memoizedUser} />
              </Tabs.Panel>
            </Tabs>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  );
}
