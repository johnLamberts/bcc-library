import {
  ScrollArea,
  Container,
  Title,
  Card,
  Text,
  List,
  ThemeIcon,
  rem,
  Accordion,
} from "@mantine/core";
import { IconDirectionArrows, IconUserCircle } from "@tabler/icons-react";
import classes from "./details-faq.module.css";
import { Footer } from "./Footer";

const DetailsFAQ = () => {
  return (
    <ScrollArea
      scrollbars="y"
      style={{
        height:
          "calc(100vh - var(--mantine-header-height, 0px) - var(--mantine-footer-height, 0px))", // viewport height - height of header - height of footer
      }}
    >
      <Container py="xl" mt={"5rem"}>
        <Title ta="center">
          Frequently Asked{" "}
          <span
            style={{
              color: "#5c0505",
            }}
          >
            Questions
          </span>
        </Title>

        <Card withBorder shadow="sm" mt={"3rem"}>
          <List>
            <List.Item
              icon={
                <ThemeIcon size={20} radius="xl" color="yellow">
                  <IconUserCircle
                    style={{ width: rem(12), height: rem(12) }}
                    stroke={1.5}
                  />
                </ThemeIcon>
              }
            >
              <Text>Library Account Creation FAQ</Text>
            </List.Item>

            <Accordion variant="separated" px={"md"} mt={"1.5rem"}>
              <Accordion.Item className={classes.item} value="reset-password">
                <Accordion.Control>
                  How can I create an account at the library?
                </Accordion.Control>
                <Accordion.Panel>
                  You can create an account by visiting the library in person.
                  Simply approach the librarian at the circulation desk, and
                  they will assist you in setting up your account.
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="another-account">
                <Accordion.Control>
                  What do I need to bring with me to create an account?
                </Accordion.Control>
                <Accordion.Panel>
                  Please bring a valid identification card issued by Binangonan
                  Catholic College, such as your student ID card, to verify your
                  identity and enrollment status
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="newsletter">
                <Accordion.Control>
                  Can I create an account online?{" "}
                </Accordion.Control>
                <Accordion.Panel>
                  Currently, library account creation is done in person at the
                  library. We do not offer online account creation at this time.
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="credit-card">
                <Accordion.Control>
                  Is there a fee for creating an account?{" "}
                </Accordion.Control>
                <Accordion.Panel>
                  Library account creation is typically free for Binangonan
                  Catholic College students, faculty, and staff.
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="library-card">
                <Accordion.Control>
                  Can I access my library account online after it is created?{" "}
                </Accordion.Control>
                <Accordion.Panel>
                  Yes, once your account is created, you will be able to access
                  it online through the Binangonan Catholic College Library's
                  website or online catalog system. This allows you to manage
                  your account, including renewing materials and placing holds
                  on items.
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="payment">
                <Accordion.Control>
                  Who should I contact if I encounter issues during the account
                  creation process?{" "}
                </Accordion.Control>
                <Accordion.Panel>
                  If you encounter any issues or have questions during the
                  account creation process, please don't hesitate to ask the
                  librarian for assistance. They are there to help and ensure
                  that you have a smooth experience.
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="services-library">
                <Accordion.Control>
                  What services can I access with my library account?
                </Accordion.Control>
                <Accordion.Panel>
                  With your library account, you can borrow books, journals,
                  DVDs, and other materials from the library's collection. You
                  may also be able to access online resources and databases
                  using your account credentials.
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="account-question">
                <Accordion.Control>
                  Who should I contact if I have further questions about
                  creating an account?{" "}
                </Accordion.Control>
                <Accordion.Panel>
                  If you have any additional questions or need further
                  assistance with creating an account, please don't hesitate to
                  contact the library directly. Our staff will be happy to help
                  you.
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </List>
        </Card>

        <Card withBorder shadow="sm" mt={"3rem"}>
          <List>
            <List.Item
              icon={
                <ThemeIcon size={20} radius="xl" color="yellow">
                  <IconDirectionArrows
                    style={{ width: rem(12), height: rem(12) }}
                    stroke={1.5}
                  />
                </ThemeIcon>
              }
            >
              <Text>Borrowing and Returning Online FAQ</Text>
            </List.Item>

            <Accordion variant="separated" px={"md"} mt={"1.5rem"}>
              <Accordion.Item className={classes.item} value="reset-password">
                <Accordion.Control>
                  How do I borrow materials from the library online?
                </Accordion.Control>
                <Accordion.Panel>
                  To borrow materials online from the Binangonan Catholic
                  College Library, visit the library's website at
                  bcc-opac-library.site. Log in to your library account using
                  your email and the associated password provided by the
                  library.
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="another-account">
                <Accordion.Control>
                  How long can I keep borrowed digital materials from the
                  Binangonan Catholic College Library's online platform?{" "}
                </Accordion.Control>
                <Accordion.Panel>
                  The loan period for digital materials borrowed from the BCC
                  Library's online platform varies depending on the type of item
                  and the library's policies. Typically, e-books and audiobooks
                  are loaned for a set period, such as two weeks, after which
                  they will automatically expire and be returned to the
                  library's collection
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="newsletter">
                <Accordion.Control>
                  What happens if I return digital materials late to the
                  Binangonan Catholic College Library's online platform?{" "}
                </Accordion.Control>
                <Accordion.Panel>
                  Since digital materials automatically expire at the end of the
                  loan period, there are typically no late fees for returning
                  them late. However, it's courteous to return digital materials
                  promptly so that others can access them.
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="credit-card">
                <Accordion.Control>
                  Can I return digital materials early to the Binangonan
                  Catholic College Library's online platform if I finish with
                  them before the due date?{" "}
                </Accordion.Control>
                <Accordion.Panel>
                  Membership is free, but you must be currently enrolled in our
                  school.
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </List>
        </Card>
      </Container>

      <Footer />
    </ScrollArea>
  );
};
export default DetailsFAQ;
