import {
  rem,
  Container,
  Group,
  Title,
  SimpleGrid,
  Text,
  Box,
  Card,
} from "@mantine/core";
import { IconGauge, IconUser, IconCookie } from "@tabler/icons-react";

import classes from "./about.module.css";
import cardClasses from "./about-card.module.css";
import React from "react";

const mockdata = [
  {
    id: 1,
    title: "Accessibility",
    description: `Ensure the e-library is accessible to all users, following web accessibility standards.`,
    icon: IconGauge,
    imageCapture: "./image1.png",
  },
  {
    id: 2,
    title: "Book Discovery",
    description:
      "Enable easy navigation and intuitive search functionality for finding books.",
    icon: IconUser,
    imageCapture: "./image2.png",
  },
  {
    id: 3,
    title: "User Friendly",
    description:
      "Experience that's effortless to navigate, catering to users of all levels.",
    icon: IconCookie,
    imageCapture: "./image3.png",
  },
];

const About = () => {
  const features = mockdata.map((feature) => (
    <React.Fragment key={feature.id}>
      <Card
        key={feature.id}
        shadow="lg"
        radius="lg"
        className={classes.cardShadow}
        padding="xl"
        style={{
          border: "1px solid #ffa903",
          boxShadow: "1px 12px 54px -15px rgba(0,0,0,0.54)",
        }}
        bg={"#FFA903"}
      >
        <feature.icon
          style={{ width: rem(50), height: rem(50) }}
          stroke={2}
          color={"#5c0505"}
        />
        <Title
          fz="xl"
          fw={700}
          className={classes.cardTitle}
          mt="md"
          c={"#5c0505"}
        >
          {feature.title}

          <Text fz="md" c="#000" mt="sm">
            {feature.description}
          </Text>
        </Title>
      </Card>
      <Card
        key={feature.id}
        p="lg"
        shadow="lg"
        className={cardClasses.card}
        radius="md"
      >
        <div
          className={cardClasses.image}
          style={{
            backgroundImage: `url(${feature.imageCapture})`,
          }}
        />
        <div className={cardClasses.overlay} />
      </Card>
    </React.Fragment>
  ));

  return (
    <Container size="lg" py="xl">
      {/* <Title order={2} className={classes.title} ta="center" mt="sm">
        Integrate effortlessly with any technology stack
      </Title> */}

      <Group justify="center">
        <Box>
          <Title c="black" className={classes.description} mt="md">
            PLATFORM{" "}
            <span
              style={{
                color: "#5c0505",
              }}
            >
              FEATURES
            </span>
          </Title>

          <Text mt={"md"} c={"dimmed"} ta={"center"} w={"40rem"}>
            Explore the World of Knowledge with OPAC: Your Passport to
            Empowerment. Connect, Learn, and Grow as You Navigate Our Extensive
            Resources, Fostering Lifelong Learning for All.
          </Text>
        </Box>
      </Group>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="md" mt={50}>
        {features}
      </SimpleGrid>
    </Container>
  );
};
export default About;
