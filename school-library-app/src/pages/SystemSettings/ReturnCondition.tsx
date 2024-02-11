import ReturnConditionTable from "@features/SysSettings/ReturnCondition/ReturnConditionTable";
import { Box, Divider, Group, Tabs, rem } from "@mantine/core";
import {
  IconSettings,
  IconMessageCircle,
  IconPhoto,
} from "@tabler/icons-react";

import tabClasses from "../styles/return-condition.module.css";
import { Suspense } from "react";
import DamagedCategoryTable from "@features/SysSettings/ReturnCondition/ReturnCategory/DamageCategoryTable";
import MissingCategoryTable from "@features/SysSettings/ReturnCondition/ReturnCategory/MissingCategoryTable";

const ReturnCondition = () => {
  return (
    <>
      <Group>
        <Tabs
          variant="unstyled"
          defaultValue="bookCondition"
          classNames={tabClasses}
        >
          <Tabs.List>
            <Tabs.Tab
              value="bookCondition"
              leftSection={
                <IconSettings style={{ width: rem(16), height: rem(16) }} />
              }
            >
              Book condition
            </Tabs.Tab>
            <Tabs.Tab
              value="damages"
              leftSection={
                <IconMessageCircle
                  style={{ width: rem(16), height: rem(16) }}
                />
              }
            >
              Damaged Category
            </Tabs.Tab>
            <Tabs.Tab
              value="missing"
              leftSection={
                <IconPhoto style={{ width: rem(16), height: rem(16) }} />
              }
            >
              Missing Category
            </Tabs.Tab>
          </Tabs.List>
          <Divider my="lg" c={"dimmed"} />

          <Tabs.Panel value="bookCondition">
            <Suspense fallback={<>Loading Table...</>}>
              <Box my={"xl"}>
                <ReturnConditionTable />
              </Box>
            </Suspense>
          </Tabs.Panel>

          <Tabs.Panel value="damages">
            <Suspense fallback={<>Loading Table...</>}>
              <Box my={"xl"}>
                <DamagedCategoryTable />
              </Box>
            </Suspense>
          </Tabs.Panel>

          <Tabs.Panel value="missing">
            <Suspense fallback={<>Loading Table...</>}>
              <Box my={"xl"}>
                <MissingCategoryTable />
              </Box>
            </Suspense>
          </Tabs.Panel>
        </Tabs>
      </Group>
    </>
  );
};
export default ReturnCondition;
