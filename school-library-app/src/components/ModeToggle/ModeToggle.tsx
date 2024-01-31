import {
  ActionIcon,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";
import cn from "clsx";
import classes from "./ModeToggle.module.css";

export default function ModeToggle() {
  const { setColorScheme } = useMantineColorScheme();

  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  return (
    <>
      <ActionIcon
        onClick={() =>
          setColorScheme(computedColorScheme === "light" ? "dark" : "light")
        }
        variant="transparent"
        size={"xl"}
        aria-label="Toggle color scheme"
      >
        <IconSun className={cn(classes.icon, classes.light)} stroke={1.5} />
        <IconMoon className={cn(classes.icon, classes.dark)} stroke={1.5} />
      </ActionIcon>
    </>
  );
}
