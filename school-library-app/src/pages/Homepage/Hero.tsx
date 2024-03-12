import { Box } from "@mantine/core";
import classes from "./hero.module.css";
const Hero = () => {
  return (
    <div className={classes.root}>
      {/* <div className={classes.inner}>
          <div className={classes.content}>
            <Text
              fz={"lg"}
              c="white"
              ff={"Montserrat"}
              style={{
                letterSpacing: "-0.8px",
              }}
              mb={"sm"}
            >
              BINANGONAN CATHOLIC COLLEGE
            </Text>
            <Title className={classes.title}>
              <Text
                component="span"
                inherit
                variant="gradient"
                gradient={{ from: "red.9", to: "yellow" }}
                fz={"5rem"}
                fw={"900"}
                ff={"Montserrat"}
                // lineClamp={2}
                style={{
                  lineHeight: "3rem",
                }}
                tt={"uppercase"}
              >
                Open Public Access Catalog
              </Text>{" "}
            </Title>

            <Text className={classes.description} mt={"xs"}>
              Embark on a Journey of Discovery with Our Cutting-Edge E-Library –
              Your Premier Online Portal for Accessing and Nurturing Boundless
              Knowledge at Your Fingertips.
            </Text>

            <Button
              variant="outline"
              // gradient={{ from: "pink", to: "yellow" }}
              color="#FFA903"
              // size="xl"
              size="md"
              className={classes.control}
              mt={"lg"}
              w={"15rem"}
              rightSection={<IconArrowRight size={20} />}
            >
              Start browsing
            </Button>
          </div>
        </div> */}
      <header className={classes.header}>
        <Box>
          <h1 className={classes.header__one}>
            Binangonan Catholic College Library
          </h1>
        </Box>
      </header>
    </div>
  );
};
export default Hero;
