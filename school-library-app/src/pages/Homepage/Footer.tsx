import {
  Burger,
  Button,
  Container,
  Divider,
  Flex,
  Group,
  Image,
  Text,
} from "@mantine/core";
import classes from "./footer.module.css";
import { IconUser } from "@tabler/icons-react";

import CollegeLogo from "@components/Logo/CollegeLogo";

const links = [
  { link: "/home", label: "Home" },
  { link: "/library", label: "Library" },
  { link: "/services", label: "Services" },
  { link: "/announcement", label: "Announcement" },
  { link: "/contact-us", label: "Contact Us" },
];

const Footer = () => {
  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      onClick={(event) => event.preventDefault()}
      style={{
        fontFamily: "Montserrat",
        color: "white",
        fontWeight: 400,
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <>
      <footer className={classes.footer}>
        <Container size={"lg"} pt={"xs"}>
          <Flex justify={"center"} align="center" h="100%">
            {/* <MantineLogo size={30} /> */}
            <Image
              src={"/images/bcc-logo.svg"}
              h={"auto"}
              w={"auto"}
              fit="cover"
            />

            <Flex direction={"column"} h="100%" gap={0}>
              <Text>About Us</Text>
              <Divider />
              Where exploration and learning thrive. Our Online Public Access
              Catalog (OPAC) is your gateway to a world of educational
              resources, from textbooks to multimedia materials. Join us in
              empowering student learning through technology.
            </Flex>

            <Flex direction={"column"} h="100%" gap={0} visibleFrom="sm">
              <Text>Useful Links</Text>
              <Divider />
              {items}
            </Flex>

            <Flex direction={"column"} h="100%" gap={0} visibleFrom="sm">
              <Text>SEARCH SOMETHING</Text>
              <Divider />
              Where exploration and learning thrive. Our Online Public Access
              Catalog (OPAC) is your gateway to a world of educational
              resources, from textbooks to multimedia materials. Join us in
              empowering student learning through technology.
            </Flex>
          </Flex>
        </Container>
      </footer>
    </>
  );
};
export default Footer;
