import { Box,  Group,  Button, Text, Tabs, rem, Stack } from "@mantine/core";
import { IconArrowBackUpDouble, IconCheckupList, IconClearAll, IconDatabaseExclamation, IconPlus, IconStackPush} from "@tabler/icons-react";
import classes from "./styles/user.module.css"
const CirculationManagement = () => {
     const iconStyle = { width: rem(12), height: rem(12) };
 return (
      <>
         <Box maw={"78vw"}>
            <Group justify="space-between">

              <Stack>

          <Box className={classes.highlight}>
            <Text fz={"xl"} fw={"bold"} c={"red"}>
               Transactions List
            </Text>

           

          </Box>

 <Tabs defaultValue="gallery">
      <Tabs.List>
        <Tabs.Tab value="All" leftSection={<IconClearAll style={iconStyle} />}>
          All
        </Tabs.Tab>
        <Tabs.Tab value="Request" leftSection={<IconStackPush style={iconStyle} />}>
          Request
        </Tabs.Tab>
        <Tabs.Tab value="Checkout" leftSection={<IconCheckupList style={iconStyle} />}>
          Checked out
        </Tabs.Tab>
 
  <Tabs.Tab value="Overdue" leftSection={<IconDatabaseExclamation style={iconStyle} />}>
          Overdue
        </Tabs.Tab>
        
         <Tabs.Tab value="settings" leftSection={<IconArrowBackUpDouble style={iconStyle} />}>
          Returned
        </Tabs.Tab>     </Tabs.List>
    </Tabs>
          
              </Stack>
          <Group>
            <Button
              variant="light"
              leftSection={<IconPlus size={14} />}
              bg={" var(--mantine-color-red-light)"}
              color={" var(--mantine-color-red-light-color)"}
            >
              Add Borrow
            </Button>
          </Group>
        </Group>


        <Box mt={"lg"}>
          {/* <MantineReactTable table={table} /> */}
        </Box>
      </Box>
          
      </>
    );
}

export default CirculationManagement