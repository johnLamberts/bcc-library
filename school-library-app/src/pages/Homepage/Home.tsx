import { Box, ScrollArea } from "@mantine/core";
import Hero from "./Hero";
import About from "./About";
import Footer from "./Footer";

const Home = () => {
  return (
    <>
      <ScrollArea
        scrollbars="y"
        style={{
          paddingBottom: "var(--mantine-footer-height, 5rem)",
          height:
            "calc(100vh - var(--mantine-header-height, 0px) - var(--mantine-footer-height, 0px))", // viewport height - height of header - height of footer
        }}
      >
        <Box bg={"white"}>
          {/* <Hero /> */}

          {/* <About /> */}

          <Footer />
        </Box>
      </ScrollArea>
    </>
  );
};
export default Home;
