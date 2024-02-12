import { Burger, Button, Container, Group, Text } from "@mantine/core";
import classes from "./header.module.css";
import { IconUser } from "@tabler/icons-react";

import CollegeLogo from "@components/Logo/CollegeLogo";
import { Link, useNavigate } from "react-router-dom";
import ModeToggle from "@components/ModeToggle/ModeToggle";

const links = [
  { link: "/home", label: "Home" },
  { link: "library", label: "Library" },
  { link: "/services", label: "Services" },
  { link: "/announcement", label: "Announcement" },
  { link: "/contact-us", label: "Contact Us" },
];

const Header = () => {
  const navigate = useNavigate();

  const items = links.map((link) => (
    <Link
      key={link.link}
      to={link.link}
      className={classes.link}
      // onClick={(event) => event.preventDefault()}
      style={{
        fontFamily: "Montserrat",
        color: "white",
        fontWeight: 400,
      }}
    >
      {link.label}
    </Link>
  ));

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
              <Button
                leftSection={<IconUser color={"#5C0505"} size={14} />}
                variant="filled"
                color="#ffa903"
                size="xs"
                onClick={() => navigate("dashboard")}
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
