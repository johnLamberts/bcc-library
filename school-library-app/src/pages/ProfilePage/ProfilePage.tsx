import Favorites from "@features/UserProfile/Favorites";
import History from "@features/UserProfile/History";
import UserProfile from "@features/UserProfile/UserProfile";
import useReadUserProfile from "@features/UserProfile/useReadUserProfile";
import { Container, Divider, SegmentedControl } from "@mantine/core";
import useCurrentUser from "@pages/Authentication/hooks/useCurrentUser";

import { useSearchParams } from "react-router-dom";

const ProfilePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleControl = (value: string | null) => {
    searchParams.set("up", value as string);

    return setSearchParams(searchParams);
  };

  const { userProfile } = useReadUserProfile();

  return (
    <Container p={"xl"}>
      <SegmentedControl
        data={["User Profile", "Favorites", "Transaction History"]}
        onChange={handleControl}
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
  );
};
export default ProfilePage;
