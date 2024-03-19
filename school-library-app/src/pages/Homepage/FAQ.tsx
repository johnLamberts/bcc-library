import { Grid, Title, Accordion, Image, Button, Flex } from "@mantine/core";
import classes from "./faq.module.css";
import { useNavigate } from "react-router-dom";

const FAQ = () => {
  const navigate = useNavigate();

  return (
    <div className={classes.wrapper}>
      <Grid id="faq-grid">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Image src="./images/faq.svg" alt="Frequently Asked Questions" />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Title order={2} ta="left" className={classes.title}>
            Frequently Asked Questions
          </Title>

          <Accordion
            chevronPosition="right"
            defaultValue="reset-password"
            variant="separated"
          >
            <Accordion.Item className={classes.item} value="reset-password">
              <Accordion.Control>
                How can I create account in Online Public Access Catalog (OPAC)?{" "}
              </Accordion.Control>
              <Accordion.Panel>
                In the library system, the responsibility of creating user
                accounts falls upon the administrative and librarian staff. When
                individuals seek to utilize library services, they approach the
                administrative desk or a librarian to initiate the account
                creation process
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item className={classes.item} value="another-account">
              <Accordion.Control>
                How do I return check out books?{" "}
              </Accordion.Control>
              <Accordion.Panel>
                Books borrowed from the library can be returned at the
                designated return area or desk within the library premises.
                Simply locate this area, deposit the books, and ensure they are
                properly returned by following any instructions provided by
                library staff and also to confirm the return books to be placed
                in this system has been restored.
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item className={classes.item} value="newsletter">
              <Accordion.Control>
                Can I access my account from a mobile device{" "}
              </Accordion.Control>
              <Accordion.Panel>
                Yes, you can access your account from a mobile device
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item className={classes.item} value="credit-card">
              <Accordion.Control>
                How can I create an account at the library?{" "}
              </Accordion.Control>
              <Accordion.Panel>
                You can create an account by visiting the library in person.
                Simply approach the librarian at the circulation desk, and they
                will assist you in setting up your account
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
          <Flex justify="center" align="center">
            <Button
              size="md"
              variant="light"
              mt={"xl"}
              onClick={() => navigate("/frequently-ask-questions")}
            >
              Visit for more
            </Button>
          </Flex>
        </Grid.Col>
      </Grid>
    </div>
  );
};
export default FAQ;
