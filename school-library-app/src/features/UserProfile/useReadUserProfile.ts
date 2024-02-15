import { useQuery } from "@tanstack/react-query";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { currentUserProfile } from "./services/user-profile.service";
import { useParams } from "react-router-dom";

const useReadUserProfile = () => {
  const { manageProfileId } = useParams();

  const sanitizeUrl = manageProfileId?.split("_");

  const { isLoading, data: userProfile } = useQuery({
    queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.CURRENT_USER_PROFILE],
    queryFn: () => currentUserProfile(sanitizeUrl?.[1], sanitizeUrl?.[0]),
  });

  return { isLoading, userProfile };
};
export default useReadUserProfile;
