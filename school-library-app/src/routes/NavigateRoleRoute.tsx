import useCurrentUser from "@pages/Authentication/hooks/useCurrentUser";
import AdminDashboard from "@pages/Dashboard/Admin/AdminDashboard";
import LibrarianDashboard from "@pages/Dashboard/Librarian/LibrarianDashboard";

const NavigateRoleRoute = () => {
  const { user } = useCurrentUser();

  return (
    <>
      {user?.userRole.toLowerCase().includes("admin") && <AdminDashboard />}
      {user?.userRole.toLowerCase().includes("staff") && <>Staff Dashboard</>}
      {user?.userRole.toLowerCase().includes("librarian") && (
        <LibrarianDashboard />
      )}
    </>
  );
};
export default NavigateRoleRoute;
