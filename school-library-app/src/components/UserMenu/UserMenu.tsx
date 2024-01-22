import { Popover, Avatar, Text, Tooltip } from "@mantine/core";
import { IconUser } from "@tabler/icons-react";

export default function UserMenu() {
  return (
    <>
      <Popover
        width={200}
        offset={{
          mainAxis: 10,
        }}
        position="bottom"
        withArrow
        shadow="md"
      >
        <Popover.Target>
          <Tooltip label="Current User Logged in">
            <Avatar
              radius="xl"
              color={"red"}
              style={{
                cursor: "pointer",
              }}
            >
              <IconUser size="1.5rem" />
            </Avatar>
          </Tooltip>
        </Popover.Target>
        <Popover.Dropdown>
          <Text size="xs">
            This is uncontrolled popover, it is opened when button is clicked
          </Text>
        </Popover.Dropdown>
      </Popover>
    </>
  );
}
