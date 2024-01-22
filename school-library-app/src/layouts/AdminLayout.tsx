import Logo from "@components/Logo/Logo";
import ModeToggle from "@components/ModeToggle/ModeToggle";
import Navbar from "@components/Navbar/Navbar";
import UserMenu from "@components/UserMenu/UserMenu";
import {
  AppShell,
  Burger,
  Divider,
  Group,
  Image,
  ScrollArea,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  const [opened, { toggle }] = useDisclosure();
  return (
    <>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 270,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding={"md"}
      >
        {/* <------ HEADER -------> */}
        <AppShell.Header>
          <Group h="100%" px="md" justify="space-between">
            <div>
              <Burger
                opened={opened}
                onClick={toggle}
                hiddenFrom="sm"
                size="sm"
              />
              <Logo />
            </div>

            <Group>
              <UserMenu />
              <ModeToggle />
            </Group>
          </Group>
        </AppShell.Header>
        {/* <------ END of HEADER -------> */}

        {/* <------ NAVBAR -------> */}
        <AppShell.Navbar>
          {/* <AppShell.Section>Navbar header</AppShell.Section> */}
          <AppShell.Section>
            <Group hiddenFrom="sm" mx={"md"} my="md">
              <Image
                src={"/images/bcc-logo.svg"}
                h={35}
                w="auto"
                fit="contain"
              />
              <Text>Binangonan Catholic College</Text>
            </Group>
          </AppShell.Section>

          <AppShell.Section grow my="md" component={ScrollArea}>
            <Navbar />
          </AppShell.Section>
          <AppShell.Section>
            <Divider />
            Log out
          </AppShell.Section>
        </AppShell.Navbar>
        {/* <------ END of NAVBAR -------> */}

        <AppShell.Main>
          {/* <Box mih={"100vh"}> */}
          <ScrollArea
            style={{
              paddingTop: "var(--mantine-header-height, 1rem)",
              paddingBottom: "var(--mantine-footer-height, 5rem)",
              height:
                "calc(100vh - var(--mantine-header-height, 0px) - var(--mantine-footer-height, 0px))", // viewport height - height of header - height of footer
            }}
            scrollbars="y"
          >
            {/* <AppShell.Section p={"md"}> */}
            <Outlet />
            {/* </AppShell.Section> */}
          </ScrollArea>
          {/* </Box> */}
        </AppShell.Main>
      </AppShell>
    </>
  );
}
