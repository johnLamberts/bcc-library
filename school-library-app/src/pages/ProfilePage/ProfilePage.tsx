import Favorites from "@features/UserProfile/Favorites";
import History from "@features/UserProfile/History";
import UserProfile from "@features/UserProfile/UserProfile";
import useReadUserProfile from "@features/UserProfile/useReadUserProfile";
import {
  Container,
  Divider,
  Grid,
  Group,
  Modal,
  ScrollArea,
  SegmentedControl,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { useSearchParams } from "react-router-dom";
import EditStudentProfile from "./EditStudentProfile";
import ChangeStudentPassword from "./ChangeStudentPassword";
import BorrowStudentTransaction from "@features/UserProfile/BorrowStudentTransaction";
import { useMemo } from "react";

const ProfilePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleControl = (value: string | null) => {
    searchParams.set("up", value as string);

    return setSearchParams(searchParams);
  };

  const { userProfile, isLoading } = useReadUserProfile();

  const [opened, { open, close }] = useDisclosure(false);

  const handleClickParams = (params: string) => {
    searchParams.set("u_viewer", params as string);

    open();

    return setSearchParams(searchParams);
  };

  const handeRemoveParams = () => {
    searchParams.delete("u_viewer");

    close();

    return setSearchParams(searchParams);
  };

  const memoizedUserProfile = useMemo(() => userProfile, [userProfile]);
  return (
    <ScrollArea
      scrollbars="y"
      style={{
        height:
          "calc(100vh - var(--mantine-header-height, 0px) - var(--mantine-footer-height, 0px))", // viewport height - height of header - height of footer
      }}
    >
      <Container size={"xl"} mt={"5rem"} p={"xl"} bg={"#FFFAFA"}>
        <Group justify="space-between">
          <Title order={5} ff={"Montserrat"} fw={400}>
            Student Profile
          </Title>

          <SegmentedControl
            data={["Favorites", "On-going Transaction", "Transaction History"]}
            onChange={handleControl}
            value={searchParams.get("up") || "Favorites"}
            bg={"#ffa903"}
          />
        </Group>

        <Divider my={"xs"} />

        <Grid>
          <Grid.Col span={{ base: 12, lg: 4 }}>
            <UserProfile
              user={memoizedUserProfile}
              handleClickParams={handleClickParams}
              isLoading={isLoading}
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, lg: 8 }}>
            {searchParams.get("up") === "Transaction History" && <History />}
            {searchParams.get("up") === "On-going Transaction" && (
              <BorrowStudentTransaction />
            )}

            {searchParams.get("up") === "Favorites" && <Favorites />}

            {searchParams.get("up") === null && <Favorites />}
          </Grid.Col>
        </Grid>
      </Container>

      <Modal
        opened={opened}
        onClose={handeRemoveParams}
        title={`${
          searchParams.get("u_viewer") === "edit_profile"
            ? "Edit Profile"
            : "Change Password"
        }`}
      >
        {searchParams.get("u_viewer") === "edit_profile" && (
          <EditStudentProfile student={memoizedUserProfile} />
        )}

        {searchParams.get("u_viewer") === "change_password" && (
          <ChangeStudentPassword close={close} user={memoizedUserProfile} />
        )}
      </Modal>
    </ScrollArea>
  );
};
export default ProfilePage;
