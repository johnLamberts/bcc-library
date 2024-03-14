import { Box, ScrollArea } from "@mantine/core";
import About from "./About";
import Hero from "./Hero";
import useCurrentUser from "@pages/Authentication/hooks/useCurrentUser";
import FAQ from "./FAQ";
import { Footer } from "./Footer";

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
        <Box bg={"white"}>
          <Box mt={"5rem"}>
            <Hero />
          </Box>
          <Box mt={"3rem"}>
            <About />
          </Box>

          <Box mt={"5rem"} mb={"3rem"}>
            <FAQ />
          </Box>

          <Footer />
        </Box>
      </ScrollArea>
    </>
  );
};
export default Home;
