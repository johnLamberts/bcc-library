import { Box } from "@mantine/core";
import classes from "./hero.module.css";
const Hero = () => {
  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <Box>
          <h1 className={classes.header__one}>
            Binangonan Catholic College Library
          </h1>

          <h1
            style={{
              color: "#fff",
              fontFamily: "Montserrat",
              fontWeight: "300",
              fontStyle: "italic",
            }}
            className={classes["_header__two_1e0y6_37"]}
          >
            Your online portal to boundless knowledge
          </h1>
        </Box>
      </header>
    </div>
  );
};
export default Hero;
