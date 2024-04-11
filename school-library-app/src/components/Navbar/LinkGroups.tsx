/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Collapse, Group, Text, ThemeIcon, rem } from "@mantine/core";
import { useState } from "react";
import classes from "./LinkGroups.module.css";
import { IconChevronRight } from "@tabler/icons-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import activityLogs from "src/shared/services/activity-logs";
import useCurrentUser from "@pages/Authentication/hooks/useCurrentUser";

interface NestedLinkGroupProps {
  label?: string;
  link?: string;
  links?: { label: string; link: string }[];
}
export interface LinkGroupProps {
  icon?: React.FC<any>;
  label?: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
  nestedGroups?: NestedLinkGroupProps[];
  link?: string;
}

export interface ItemLinkedGroupProps {
  items: LinkGroupProps[];

  closeSideBar: () => void;
}

const LinkGroups = ({ items, closeSideBar }: ItemLinkedGroupProps) => {
  const { user } = useCurrentUser();

  const { pathname } = useLocation();

  const [opened, setOpened] = useState<{ [key: string]: boolean }>({});

  const toggleOpened = (index: number) => {
    setOpened((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <div>
      {items?.map((item, index) => {
        return (
          <>
            <Link
              key={item.label}
              to={item.link || pathname}
              onClick={() => {
                if (!pathname.toLowerCase().includes("audit-trail")) {
                  activityLogs(
                    `${user?.firstName} ${user?.lastName} navigated to the '${item.label}' page`,
                    user,
                    "Navigation"
                  );
                }
                toggleOpened(index);

                !item.links?.length && closeSideBar();
              }}
              data-active={item.link === pathname}
              className={classes.control}
            >
              <Group justify="space-between" gap={0}>
                <Box style={{ display: "flex", alignItems: "center" }}>
                  <ThemeIcon variant="light" size={30}>
                    {item.icon && (
                      <item.icon style={{ width: rem(18), height: rem(18) }} />
                    )}
                  </ThemeIcon>
                  <Box ml="md">
                    <Text ff={"Montserrat"} fw={500} fz={"sm"}>
                      {item.label}
                    </Text>
                  </Box>
                </Box>
                {Array.isArray(item.links) && (
                  <IconChevronRight
                    className={classes.chevron}
                    stroke={1.5}
                    style={{
                      width: rem(16),
                      height: rem(16),
                      transform: opened[index] ? "rotate(-90deg)" : "none",
                    }}
                  />
                )}
              </Group>
            </Link>
            {item.links && (
              <Collapse in={opened[index]}>
                {(Array.isArray(item.links) ? item.links : []).map((link) => {
                  return (
                    <Link
                      className={classes.link}
                      to={link.link}
                      key={link.label}
                      data-active={link.link === pathname}
                      onClick={async () => {
                        if (!pathname.toLowerCase().includes("audit-trail")) {
                          activityLogs(
                            `${user?.firstName} ${user?.lastName} navigated to the '${item.label}' page`,
                            user,
                            "Navigation"
                          );
                        }
                        closeSideBar();
                      }}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </Collapse>
            )}
            {item.nestedGroups && (
              <Collapse in={opened[index]}>
                {item.nestedGroups.map((nestedGroup, subIndex) => (
                  <div key={subIndex}>
                    <Link
                      to="#"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleOpened(index);
                      }}
                      data-active={false} // Set active state based on your logic
                      className={classes.control}
                    >
                      {nestedGroup.label}
                    </Link>
                    {nestedGroup.links?.map((link) => (
                      <Collapse in={opened[index]}>
                        <Link
                          className={classes.link}
                          to={link.link}
                          key={link.label}
                          data-active={link.link === pathname}
                          onClick={() => closeSideBar()}
                        >
                          {link.label}
                        </Link>
                      </Collapse>
                    ))}
                  </div>
                ))}
              </Collapse>
            )}
          </>
        );
      })}
    </div>
  );
};
export default LinkGroups;
