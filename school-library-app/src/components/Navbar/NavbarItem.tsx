import { Link, useLocation } from "react-router-dom";
import classes from "./Navbar.module.css";

interface NavbarItemProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: Record<string, any>[];
}

export default function NavbarItem({ items }: NavbarItemProps) {
  const { pathname } = useLocation();

  return (
    <>
      {items.map((item, index) => (
        <Link
          to={item.path}
          data-active={item.path === pathname || null}
          className={classes.link}
          key={item.label || index}
        >
          <item.icon className={classes.linkIcon} stroke={1.5} />
          <span>{item.label}</span>
        </Link>
      ))}
    </>
  );
}
