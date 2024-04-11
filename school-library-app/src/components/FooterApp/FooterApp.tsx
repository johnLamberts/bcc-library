import {
  ActionIcon,
  Button,
  ButtonProps,
  Group,
  Menu,
  rem,
  Text,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconDots } from "@tabler/icons-react";

const FooterApp = () => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const mobile_match = useMediaQuery("(max-width: 425px)");

  const BUTTON_PROPS: ButtonProps = {
    variant: "subtle",
    style: {
      padding: `${rem(8)} ${rem(12)}`,
      color: colorScheme === "dark" ? theme.white : theme.black,

      "&:hover": {
        transition: "all ease 150ms",
        backgroundColor:
          colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2],
        textDecoration: "none",
      },
    },
  };

  return (
    <Group justify="space-between">
      {mobile_match ? (
        <Menu shadow="md" width={200} position="right-end">
          <Menu.Target>
            <ActionIcon>
              <IconDots size={18} />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item>Privacy</Menu.Item>
            <Menu.Item>Terms of Use</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      ) : (
        <Group gap={4}>
          <Button {...BUTTON_PROPS}>Privacy</Button>
          <Button {...BUTTON_PROPS}>Terms of Use</Button>
        </Group>
      )}

      {mobile_match ? (
        <Text c="dimmed" fz="sm" component="a" target="_blank">
          &copy;&nbsp;{new Date().getFullYear()}&nbsp; BCC OPAC Library
        </Text>
      ) : (
        <Text c="dimmed" fz="sm" component="a" target="_blank">
          &copy;&nbsp;{new Date().getFullYear()}&nbsp; Binangonan Catholic
          College OPAC Library
        </Text>
      )}
    </Group>
  );
};

export default FooterApp;
