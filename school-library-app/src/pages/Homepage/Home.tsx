import { Box, ScrollArea } from "@mantine/core";
import Footer from "./Footer";
import About from "./About";
import Hero from "./Hero";
import useCurrentUser from "@pages/Authentication/hooks/useCurrentUser";

const Home = () => {
  const { user } = useCurrentUser();
  console.log(user);
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
          <Hero />

          <About />

          <Footer />
        </Box>
      </ScrollArea>
    </>
  );
};
export default Home;
