import Favorites from "@features/UserProfile/Favorites";
import History from "@features/UserProfile/History";
import UserProfile from "@features/UserProfile/UserProfile";
import useReadUserProfile from "@features/UserProfile/useReadUserProfile";
import {
  Container,
  Divider,
  ScrollArea,
  SegmentedControl,
} from "@mantine/core";

import { useSearchParams } from "react-router-dom";

const ProfilePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleControl = (value: string | null) => {
    searchParams.set("up", value as string);

    return setSearchParams(searchParams);
  };

  const { userProfile } = useReadUserProfile();

  return (
    <ScrollArea
      scrollbars="y"
      style={{
        paddingBottom: "var(--mantine-footer-height, 5rem)",
        height:
          "calc(100vh - var(--mantine-header-height, 0px) - var(--mantine-footer-height, 0px))", // viewport height - height of header - height of footer
      }}
    >
      <Container p={"xl"}>
        <SegmentedControl
          data={["User Profile", "Favorites", "Transaction History"]}
          onChange={handleControl}
          value={searchParams.get("up") || "User Profile"}
          bg={"#ffa903"}
        />

        <Divider my={"lg"} />

        {searchParams.get("up") === "User Profile" && (
          <UserProfile user={userProfile} />
        )}

        {searchParams.get("up") === null && <UserProfile user={userProfile} />}

        {searchParams.get("up") === "Transaction History" && <History />}

        {searchParams.get("up") === "Favorites" && <Favorites />}
      </Container>
    </ScrollArea>
  );
};
export default ProfilePage;
