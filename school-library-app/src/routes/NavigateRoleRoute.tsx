import AdminDashboard from "@pages/AdminDashboard";
import useCurrentUser from "@pages/Authentication/hooks/useCurrentUser";

const NavigateRoleRoute = () => {
  const { user } = useCurrentUser();

  return (
    <>
      {user?.userRole.toLowerCase().includes("admin") && <AdminDashboard />}
      {user?.userRole.toLowerCase().includes("staff") && <>Staff Dashboard</>}
      {user?.userRole.toLowerCase().includes("librarian") && (
        <>Librarian Dashboard</>
      )}
    </>
  );
};
export default NavigateRoleRoute;
