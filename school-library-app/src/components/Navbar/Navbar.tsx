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
import { IconNewsOff } from "@tabler/icons-react";
import useCurrentUser from "@pages/Authentication/hooks/useCurrentUser";

interface NavbarProps {
  opened: boolean;
  toggle: () => void;
}

export default function Navbar({ opened, toggle }: NavbarProps) {
  // const matches = useMediaQuery("(min-width: $mantine-breakpoint-xs)");

  // console.log(matches);

  const { user } = useCurrentUser();

  const mainFeatures = [
    {
      link: "/dashboard",
      label: `${
        user?.userRole.toLowerCase().includes("admin")
          ? "Admin Dashboard"
          : user?.userRole.toLowerCase().includes("librarian")
          ? "Librarian Dashboard"
          : "Staff Dashboard"
      }`,
      icon: IconChartInfographic,
      role: ["ADMIN", "LIBRARIAN", "STAFF"],
    },

    {
      link: "/user-management",
      label: "User Management",
      icon: IconUser,
      role: ["ADMIN"],
    },
    {
      link: "/teacher-management",
      label: "Teacher Management",
      icon: IconSchool,
      role: ["ADMIN", "LIBRARIAN", "STAFF"],
    },
    {
      link: "/student-management",
      label: "Student Management",
      icon: IconUserBolt,
      role: ["ADMIN", "LIBRARIAN", "STAFF"],
    },
    {
      link: "/catalogue-management",
      label: "Catalogue Management",
      icon: IconBook,
      role: ["ADMIN", "LIBRARIAN", "STAFF"],
    },
    {
      link: "/acquisition-and-stock-management",
      label: "Acquisition and Stock Management",
      icon: IconBrandStocktwits,
      role: ["ADMIN", "LIBRARIAN", "STAFF"],
    },
    {
      link: "/manage-announcement",
      label: "Manage Announcement",
      icon: IconNews,
      role: ["ADMIN", "LIBRARIAN", "STAFF"],
    },
    {
      label: "Transaction",
      icon: IconAlignBoxBottomLeft,
      role: ["ADMIN", "LIBRARIAN", "STAFF"],
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
      role: ["ADMIN", "LIBRARIAN", "STAFF"],
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
      role: ["ADMIN", "LIBRARIAN", "STAFF"],
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
          link: "/news-category",
          label: "News Category",
          icon: IconNewsOff,
        },
        {
          link: "/customize-ui",
          label: "Customize UI",
          icon: IconUsersGroup,
        },
      ],
    },
  ];

  const filteredFeatures = mainFeatures.filter((feature) => {
    // If the current user's role matches any of the allowed roles for the feature, it's accessible
    return feature.role?.includes(user?.userRole as string);
  });

  console.log(filteredFeatures);

  return (
    <>
      <nav className={classes.navbar}>
        <Box className={classes.header}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "end",
            }}
          >
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
          </div>
          <Logo />
        </Box>

        <ScrollArea className={classes.links}>
          <div className={classes.linksInner}>
            <LinkGroups items={filteredFeatures} />
          </div>
        </ScrollArea>

        <div className={classes.footer}>
          <Button />
        </div>
      </nav>
    </>
  );
}
