import { ActionIcon, Container, Group, Text, rem } from "@mantine/core";
import classes from "./footer.module.css";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTwitter,
} from "@tabler/icons-react";

import CollegeFooterLogo from "@components/Logo/CollegeLogoFooter";

const data = [
  {
    title: "About",
    links: [
      { label: "Home", link: "/home" },
      { label: "Library", link: "/library" },
      { label: "Announcement", link: "/announcement" },
      { label: "FAQ", link: "/frequently-ask-questions" },
      { label: "Contact Us", link: "/contact-us" },
    ],
  },
];

export function Footer() {
  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text<"a">
        key={index}
        className={classes.link}
        component="a"
        href={link.link}
        onClick={(event) => event.preventDefault()}
        c={"white"}
      >
        {link.label}
      </Text>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title} c={"white"}>
          {group.title}
        </Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <CollegeFooterLogo />
          <Text size="xs" c="white" className={classes.description}>
            Revolutionize library access with an immersive and inclusive web
            system, empowering users to seamlessly explore, borrow, and engage
            with a diverse array of resources.
          </Text>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text c="white" size="sm">
          © 2023 bcc-opac-library.site. All rights reserved.
        </Text>

        <Group
          gap={0}
          className={classes.social}
          justify="flex-end"
          wrap="nowrap"
        >
          <ActionIcon size="lg" color="white" variant="subtle">
            <IconBrandTwitter
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon size="lg" color="white" variant="subtle">
            <IconBrandFacebook
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon size="lg" color="white" variant="subtle">
            <IconBrandInstagram
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}
