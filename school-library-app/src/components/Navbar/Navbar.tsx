import { ScrollArea, Button, Box, Burger } from "@mantine/core";
import {
  IconUser,
  IconUsersGroup,
  IconChartInfographic,
  IconBook,
  IconAlignBoxBottomLeft,
  IconSchool,
  IconUserBolt,
  IconTheater,
  IconMoneybag,
  IconReport,
  IconSettingsAutomation,
  IconBrandStocktwits,
  IconNews,
} from "@tabler/icons-react";
import { IconCategory2 } from "@tabler/icons-react";
import LinkGroups from "./LinkGroups";
import classes from "./Navbar.module.css";
import Logo from "@components/Logo/Logo";

interface NavbarProps {
  opened: boolean;
  toggle: () => void;
}
const mainFeatures = [
  { link: "/dashboard", label: "Admin Dashboard", icon: IconChartInfographic },

  { link: "/user-management", label: "User Management", icon: IconUser },
  {
    link: "/teacher-management",
    label: "Teacher Management",
    icon: IconSchool,
  },
  {
    link: "/student-management",
    label: "Student Management",
    icon: IconUserBolt,
  },
  {
    link: "/catalogue-management",
    label: "Catalogue Management",
    icon: IconBook,
  },
  {
    link: "/acquisition-and-stock-management",
    label: "Acquisition and Stock Management",
    icon: IconBrandStocktwits,
  },
  {
    link: "/manage-announcement",
    label: "Manage Announcement",
    icon: IconNews,
  },
  {
    label: "Transaction",
    icon: IconAlignBoxBottomLeft,
    links: [
      {
        link: "/borrow-transaction",
        label: "Borrow Transaction",
      },
      {
        link: "/return-transaction",
        label: "Return Transaction",
      },
    ],
  },
  {
    label: "Report",
    icon: IconReport,
    links: [
      { link: "/user-report", label: "User Report", icon: IconUser },
      { link: "/teacher-report", label: "Teacher Report", icon: IconUser },
      {
        link: "/student-report",
        label: "Student Report",
      },
      {
        link: "/transaction-report",
        label: "Transaction Report",
      },
      {
        link: "/book-condition-report",
        label: "Book Condition Report",
      },
      {
        link: "/inventory-report",
        label: "Inventory Report",
      },
      {
        link: "/fee-report",
        label: "Collection Report",
      },
      {
        link: "/stock-report",
        label: "Stock Report",
      },
    ],
  },
  {
    label: "System Settings",
    icon: IconSettingsAutomation,
    links: [
      { link: "/book-genre", label: "Book Genre", icon: IconTheater },
      { link: "/book-author", label: "Book Author", icon: IconUser },
      {
        link: "/category-section",
        label: "Category Section",
        icon: IconCategory2,
      },
      {
        link: "/book-type",
        label: "Book Type",
        icon: IconBook,
      },
      {
        link: "/return-condition",
        label: "Return Condition and Fee",
        icon: IconMoneybag,
        links: [
          {
            link: "/borrow-transaction",
            label: "Borrow Transaction",
          },
          {
            link: "/return-transaction",
            label: "Return Transaction",
          },
          {
            link: "/transaction-management",
            label: "Transaction List",
          },
        ],
      },
      {
        link: "/user-role",
        label: "User Role",
        icon: IconUsersGroup,
      },
      {
        link: "/level-education",
        label: "Level of Education",
        icon: IconUsersGroup,
      },

      {
        link: "/grade-level",
        label: "Grade Level",
        icon: IconUsersGroup,
      },
      {
        link: "/grade-section",
        label: "Grade Section",
        icon: IconUsersGroup,
      },
      {
        link: "/academic-course",
        label: "Academic Course",
        icon: IconUsersGroup,
      },
      {
        link: "/customize-ui",
        label: "Customize UI",
        icon: IconUsersGroup,
      },
    ],
  },
];

export default function Navbar({ opened, toggle }: NavbarProps) {
  return (
    <nav className={classes.navbar}>
      <Box className={classes.header}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "end",
          }}
        >
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </div>
        <Logo />
      </Box>

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>
          <LinkGroups items={mainFeatures} />
        </div>
      </ScrollArea>

      <div className={classes.footer}>
        <Button />
      </div>
    </nav>
  );
}
