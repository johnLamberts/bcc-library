import AppLayout from "@layouts/AdminLayout";
import StudentManagement from "@pages/StudentManagement";
import LevelEducation from "@pages/SystemSettings/LevelEducation";
import TeacherManagement from "@pages/TeacherManagement";
import UserManagement from "@pages/UserManagement";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { GradeSection, GradeLevel, AcademicCourse, AuditTrail } from "./routes";
import { Flex, Loader } from "@mantine/core";
import UserRole from "@pages/SystemSettings/UserRoles";
import UserReport from "@pages/Reports/UserReport";
import BookType from "@pages/SystemSettings/BookType";
import CategorySection from "@pages/SystemSettings/CategorySection";
import BookGenre from "@pages/SystemSettings/BookGenres";
import CatalogueManagement from "@pages/CatalogueManagement";
import BookAuthor from "@pages/SystemSettings/BookAuthor";
import ReturnCondition from "@pages/SystemSettings/ReturnCondition";
import AppPageLayout from "@layouts/PagesLayout";
import Home from "@pages/Homepage/Home";
import ReturnTransaction from "@pages/Transaction/ReturnTransaction";
import TransactionManagement from "@pages/TransactionManagement";
import BorrowTransactionPage from "@pages/Transaction/BorrowTransactionPage";
import BookDetail from "@pages/Homepage/BookDetail";
import LibraryPage from "@pages/Homepage/LibraryPage";
import Login from "@pages/Authentication/Login";
import ProfilePage from "@pages/ProfilePage/ProfilePage";
import TransactionReport from "@pages/Reports/TransactionReport";
import StudentReportTable from "@features/Reports/StudentReport";
import BookConditionReport from "@pages/Reports/BookConditionReport";
import InventoryReport from "@pages/Reports/InventoryReport";
import FeeReport from "@pages/Reports/FeeReport";
import TeacherReport from "@pages/Reports/TeacherReport";
import { PageNotFound } from "@pages/PageNotFound";
import ForgetPassword from "@pages/ForgetPassword";
import Announcement from "@pages/Homepage/Announcement";
import { Forbidden } from "@pages/Forbidden";
import DetailsFAQ from "@pages/Homepage/DetailsFAQ";
import AnnouncementManagement from "@pages/AnnouncementManagement";
import ManageAcquisationStock from "@pages/ManageAcquisationStock";
import StockReport from "@pages/Reports/StockReport";
import { NewsCategory } from "@pages/SystemSettings/NewsCategory";
import AdminRequired from "./routes/AdminRequired";
import ProtectedRoute from "./routes/ProtectedRoute";
import AnnouncementDetails from "@pages/Homepage/AnnouncementDetails";
import ContactUs from "@pages/Homepage/ContactUs/ContactUs";
import NavigateRoleRoute from "./routes/NavigateRoleRoute";
import ContactSupport from "@features/ContactUs/ContactSupport";

function App() {
  // Will Refactor this after I finish the admin page with fully functionality

  return (
    <>
      <Toaster richColors />
      <Suspense
        fallback={
          <>
            <Flex
              justify={"center"}
              align={"center"}
              mih={"100vh"}
              pos="relative"
            >
              <Loader color="red.5" />
            </Flex>
          </>
        }
      >
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="forget-password" element={<ForgetPassword />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="forbidden" element={<Forbidden />} />

          <Route element={<AppPageLayout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="announcement" element={<Announcement />} />
            <Route
              path="announcement/:postId"
              element={<AnnouncementDetails />}
            />
            <Route path="frequently-ask-questions" element={<DetailsFAQ />} />
            <Route path="library" element={<LibraryPage />} />
            <Route path="library/:bookId" element={<BookDetail />} />
            <Route
              path="profile/:manageProfileId"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route path="contact-us" element={<ContactUs />} />
          </Route>

          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<NavigateRoleRoute />} />
            <Route path="/dashboard" element={<NavigateRoleRoute />} />
            <Route
              path="/manage-announcement"
              element={<AnnouncementManagement />}
            />
            <Route
              path="/user-management"
              element={
                <AdminRequired>
                  <UserManagement />
                </AdminRequired>
              }
            />
            <Route path="/student-management" element={<StudentManagement />} />
            <Route
              path="/acquisition-and-stock-management"
              element={<ManageAcquisationStock />}
            />
            <Route path="/teacher-management" element={<TeacherManagement />} />
            <Route
              path="/catalogue-management"
              element={<CatalogueManagement />}
            />

            {/* TRANSACTION */}
            <Route
              path="/transaction-management"
              element={<TransactionManagement />}
            />

            <Route
              path="/borrow-transaction"
              element={<BorrowTransactionPage />}
            />

            <Route path="/return-transaction" element={<ReturnTransaction />} />
            {/* END OF TRANSACTION */}

            {/* Audit Trail */}
            <Route path="/audit-trail" element={<AuditTrail />} />
            {/* End of Audit Trail */}

            {/* System Settings */}
            {/* student settings */}
            <Route path="/level-education" element={<LevelEducation />} />
            <Route path="/academic-course" element={<AcademicCourse />} />
            <Route path="/grade-level" element={<GradeLevel />} />
            <Route path="/grade-section" element={<GradeSection />} />
            {/* user settings */}
            <Route path="/user-role" element={<UserRole />} />
            {/* Catalogue Settings */}
            <Route path="/book-type" element={<BookType />} />
            <Route path="/category-section" element={<CategorySection />} />
            <Route path="/book-genre" element={<BookGenre />} />
            <Route path="/book-author" element={<BookAuthor />} />
            <Route path="/news-category" element={<NewsCategory />} />
            <Route path="/return-condition" element={<ReturnCondition />} />
            {/* reports */}
            <Route path="/user-report" element={<UserReport />} />
            <Route path="/student-report" element={<StudentReportTable />} />
            <Route path="/teacher-report" element={<TeacherReport />} />
            <Route path="/transaction-report" element={<TransactionReport />} />
            <Route
              path="/book-condition-report"
              element={<BookConditionReport />}
            />
            <Route path="/inventory-report" element={<InventoryReport />} />
            <Route path="/fee-report" element={<FeeReport />} />
            <Route path="/stock-report" element={<StockReport />} />

            <Route path="/contact-us-support" element={<ContactSupport />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
