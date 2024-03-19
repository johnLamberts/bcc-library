import { Box, Box, Grid, Image, ScrollArea } from "@mantine/core";
import About from "./About";
import Hero from "./Hero";
import useCurrentUser from "@pages/Authentication/hooks/useCurrentUser";
import FAQ from "./FAQ";
import { Footer } from "./Footer";
import NewsAnnouncement from "@pages/NewsAnnouncement/NewsAnnouncement";

const Home = () => {
  const { user } = useCurrentUser();
  console.log(user);
  return (
    <>
      <ScrollArea
        scrollbars="y"
        style={{
          // paddingBottom: "var(--mantine-footer-height, 5rem)",
          height:
            "calc(100vh - var(--mantine-header-height, 0px) - var(--mantine-footer-height, 0px))", // viewport height - height of header - height of footer
        }}
      >
        <Box bg={"#FFFAFA"}>
          <Box mt={"5rem"}>
            <Hero />
          </Box>
          <About />

          {/* <Box mt={"5rem"}>
            <NewsAnnouncement />
          </Box> */}

          <Box mt={"5rem"} mb={"3rem"}>
            <FAQ />
          </Box>

          <Grid gutter={{ base: 0, xs: "md", md: 0, xl: 0 }}>
            <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 3 }}>
              <Image fit={""} h={700} src="/attachments/1.jpg" />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 3 }}>
              {" "}
              <Image fit={""} h={700} src="/attachments/7.jpg" />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 3 }}>
              {" "}
              <Image fit={""} h={700} src="/attachments/5.jpg" />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 3 }}>
              {" "}
              <Image fit={""} h={700} src="/attachments/3.jpg" />
            </Grid.Col>
          </Grid>
          <Footer />
        </Box>
      </ScrollArea>
    </>
  );
};
export default Home;
