import ModeToggle from "@components/ModeToggle/ModeToggle";
import Navbar from "@components/Navbar/Navbar";
import UserMenu from "@components/UserMenu/UserMenu";
import WrapperUserMode from "@components/WrapperUserMode";
import { AppShell, Burger, Group, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  const [opened, { toggle }] = useDisclosure();
  return (
    <>
      <AppShell
        layout="alt"
        header={{ height: 60 }}
        navbar={{
          width: 270,
          breakpoint: "sm",

          collapsed: { mobile: !opened },
        }}
        padding={"md"}
        style={{
          backgroundColor: `light-dark(
            var(--mantine-color-white),
            var(--mantine-color-dark-6)
          )`,
        }}
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
            </div>

            <Group h="100%" justify="space-between" align="center">
              <WrapperUserMode />
              {/* <div>1</div>
              <div>2</div> */}
            </Group>
          </Group>
        </AppShell.Header>
        {/* <------ END of HEADER -------> */}

        {/* <------ NAVBAR -------> */}
        <AppShell.Navbar
          style={{
            backgroundColor: `light-dark(
              var(--mantine-color-white),
              var(--mantine-color-dark-6)
            )`,
          }}
        >
          <ScrollArea scrollbars="y">
            <Navbar opened={opened} toggle={toggle} />
          </ScrollArea>
        </AppShell.Navbar>
        {/* <------ END of NAVBAR -------> */}

        <AppShell.Main>
          {/* <ScrollArea
            scrollbars="y"
            style={{
              height:
                "calc(100vh - var(--mantine-header-height, 0px) - var(--mantine-footer-height, 0px))", // viewport height - height of header - height of footer
            }}
          > */}
          {/* </ScrollArea> */}
          <Outlet />
        </AppShell.Main>
      </AppShell>
    </>
  );
}
