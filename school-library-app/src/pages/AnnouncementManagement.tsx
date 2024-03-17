import {
  Box,
  Button,
  Divider,
  Grid,
  Group,
  Modal,
  ScrollArea,
  Text,
} from "@mantine/core";
import classes from "./styles/user.module.css";
import { IconPlus } from "@tabler/icons-react";
import AnnouncementList from "@features/Announcement/AnnouncementList";
import { SearchAnnouncement } from "@features/Announcement/SearchAnnouncement";
import SelectAnnouncementCategory from "@features/Announcement/SelectAnnouncementCategory";
import { useDisclosure } from "@mantine/hooks";
import AnnouncementForm from "@features/Announcement/AnnouncementForm";

const AnnouncementManagement = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Group justify="space-between">
        <Box className={classes.highlight}>
          <Text fz={"xs"} fw={"bold"} c={"red"}>
            Manage Announcement
          </Text>
        </Box>
        <Button
          variant="light"
          leftSection={<IconPlus size={14} />}
          bg={" var(--mantine-color-red-light)"}
          color={" var(--mantine-color-red-light-color)"}
          size="sm"
          onClick={open}
        >
          Add Announcement
        </Button>
      </Group>

      <Divider my={"sm"} />

      <Grid my={"xs"}>
        <Grid.Col span={{ base: 12, md: 6, lg: 8 }}>
          <SearchAnnouncement />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          <SelectAnnouncementCategory />
        </Grid.Col>
      </Grid>
      <AnnouncementList />

      <Modal.Root
        opened={opened}
        onClose={close}
        centered
        size={"xl"}
        scrollAreaComponent={ScrollArea.Autosize}
      >
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Add Announcement</Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body>
            <AnnouncementForm />
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  );
};
export default AnnouncementManagement;
