import { Group, Code } from "@mantine/core";
import {
  IconUser,
  IconNote,
  IconUsersGroup,
  IconChartInfographic,
  IconBook,
  IconAlignBoxBottomLeft,
  IconSchool,
  IconUserBolt,
  IconTheater,
  IconMoneybag,
} from "@tabler/icons-react";
import classes from "./Navbar.module.css";
import { Link, useLocation } from "react-router-dom";
import NavbarItem from "./NavbarItem";
import { IconCategory2 } from "@tabler/icons-react";

const mainFeatures = [
  { path: "/user-management", label: "User Management", icon: IconUser },
  {
    path: "/teacher-management",
    label: "Teacher Management",
    icon: IconSchool,
  },
  {
    path: "/student-management",
    label: "Student Management",
    icon: IconUserBolt,
  },
  {
    path: "/catalogue-management",
    label: "Catalogue Management",
    icon: IconBook,
  },
  {
    path: "/circulation-management",
    label: "Circulation",
    icon: IconAlignBoxBottomLeft,
  },
];

const allReports = [
  { path: "/user-report", label: "User Report", icon: IconUser },
  { path: "/teacher-report", label: "Teacher Report", icon: IconUser },
  {
    path: "/student-report",
    label: "Student Report",
    icon: IconNote,
  },
  {
    path: "/catalogue-report",
    label: "Catalogue Report",
    icon: IconUsersGroup,
  },
];

const systemSettings = [
  { path: "/book-genre", label: "Book Genre", icon: IconTheater },
  { path: "/book-author", label: "Book Author", icon: IconUser },
  {
    path: "/category-section",
    label: "Category Section",
    icon: IconCategory2,
  },
  {
    path: "/book-type",
    label: "Book Type",
    icon: IconBook,
  },
  {
    path: "/return-condition",
    label: "Return Condition and Fee",
    icon: IconMoneybag,
  },
  {
    path: "/user-role",
    label: "User Role",
    icon: IconUsersGroup,
  },
  {
    path: "/level-education",
    label: "Level of Education",
    icon: IconUsersGroup,
  },
  {
    path: "/level-education-copy",
    label: "Level of Education -copy",
    icon: IconUsersGroup,
  },
  {
    path: "/grade-level",
    label: "Grade Level",
    icon: IconUsersGroup,
  },
  {
    path: "/grade-section",
    label: "Grade Section",
    icon: IconUsersGroup,
  },
  {
    path: "/academic-course",
    label: "Academic Course",
    icon: IconUsersGroup,
  },
  {
    path: "/customize-ui",
    label: "Customize UI",
    icon: IconUsersGroup,
  },
];

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <Code fw={700}>Admin Dashboard</Code>
        </Group>
        <Link
          to={"/dashboard"}
          data-active={pathname === "/dashboard" || pathname === "/" || null}
          className={classes.link}
          key={"jaskxja8s123CV12"}
        >
          <IconChartInfographic className={classes.linkIcon} stroke={1.5} />
          <span>{"Dashboard"}</span>
        </Link>
      </div>

      <div className={classes.navbarMain}>
        <Group pt={"lg"} className={classes.header} justify="space-between">
          <Code fw={700}>Main Features</Code>
        </Group>
        <NavbarItem items={mainFeatures} />
      </div>

      <div className={classes.navbarMain}>
        <Group pt={"lg"} className={classes.header} justify="space-between">
          <Code fw={700}>All Reports</Code>
        </Group>
        <NavbarItem items={allReports} />
      </div>

      <div className={classes.navbarMain}>
        <Group pt={"lg"} className={classes.header} justify="space-between">
          <Code fw={700}>System Settings</Code>
        </Group>
        <NavbarItem items={systemSettings} />
      </div>

      {/* <div className={classes.footer}></div> */}
    </nav>
  );
}
