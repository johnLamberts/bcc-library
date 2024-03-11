import {
  Image,
  Container,
  Title,
  Text,
  Button,
  SimpleGrid,
} from "@mantine/core";
import image from "/images/image.svg";
import classes from "./styles/NotFoundImage.module.css";
import { useNavigate } from "react-router-dom";

export function Forbidden() {
  const navigate = useNavigate();

  return (
    <Container className={classes.root}>
      <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
        <Image src={image} className={classes.mobileImage} />
        <div>
          <Title className={classes.title}>Something is not right...</Title>
          <Text c="dimmed" size="lg">
            Page you are trying to open is forbidden.
          </Text>
          <Button
            variant="outline"
            size="md"
            mt="xl"
            className={classes.control}
            onClick={() => navigate(-1)}
          >
            Get back to home page
          </Button>
        </div>
      </SimpleGrid>
    </Container>
  );
}
