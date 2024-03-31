import {
  UnstyledButton,
  Group,
  Avatar,
  Menu,
  Text,
  rem,
  Box,
  Modal,
  Tabs,
} from "@mantine/core";
import {
  IconAt,
  IconChevronRight,
  IconLogout,
  IconMessageCircle,
  IconPhoneCall,
  IconPhoto,
  IconSettings,
} from "@tabler/icons-react";
import { forwardRef } from "react";
import ModeToggle from "./ModeToggle/ModeToggle";
import UserMenu from "./UserMenu/UserMenu";
import useCurrentUser from "@pages/Authentication/hooks/useCurrentUser";
import useLogout from "@pages/Authentication/hooks/useLogout";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import classes from "./UserMenu/user-menu.module.css";

interface UserButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  image: string;
  name: string;
  email: string;
  icon?: React.ReactNode;
}
const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ image, name, email, icon, ...others }: UserButtonProps, ref) => (
    <UnstyledButton
      ref={ref}
      style={{
        color: "var(--mantine-color-text)",
        borderRadius: "var(--mantine-radius-sm)",
      }}
      {...others}
    >
      <Group>
        <Avatar src={image} radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {name}
          </Text>

          <Text c="dimmed" size="xs">
            {email}
          </Text>
        </div>

        {icon || <IconChevronRight size="1rem" />}
      </Group>
    </UnstyledButton>
  )
);

const WrapperUserMode = () => {
  const { user } = useCurrentUser();
  const [opened, { open, close }] = useDisclosure(false);

  const { logoutUser } = useLogout();

  const navigate = useNavigate();
  const iconStyle = { width: rem(12), height: rem(12) };
  return (
    <>
      <UserMenu />
      <Box hiddenFrom="xs">
        <Menu withArrow>
          <Menu.Target>
            <UserButton
              image={user?.avatarImage as string}
              name={`${user?.firstName} ${user?.middleName} ${user?.lastName}`}
              email={user?.email as string}
            />
          </Menu.Target>
          {/* ... menu items */}

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
      </Box>
      <ModeToggle />

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
                        <IconAt
                          stroke={1.5}
                          size="1rem"
                          className={classes.icon}
                        />
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
                </Box>
              </Tabs.Panel>

              <Tabs.Panel value="messages">Edit profile</Tabs.Panel>
            </Tabs>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  );
};
export default WrapperUserMode;
