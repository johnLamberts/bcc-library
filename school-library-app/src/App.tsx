import AdminLayout from "@layouts/AdminLayout";
import AdminDashboard from "@pages/AdminDashboard";
import StudentManagement from "@pages/StudentManagement";
import LevelEducation from "@pages/SystemSettings/LevelEducation";
import TeacherManagement from "@pages/TeacherManagement";
import UserManagement from "@pages/UserManagement";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { GradeSection, GradeLevel, AcademicCourse } from "./routes";
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
import StudentReportTable from "@features/Reports/StudentReport";
import ReturnTransaction from "@pages/Transaction/ReturnTransaction";
import TransactionManagement from "@pages/TransactionManagement";
import BorrowTransactionPage from "@pages/Transaction/BorrowTransactionPage";

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
          <Route element={<AppPageLayout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
          </Route>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/user-management" element={<UserManagement />} />
            <Route path="/student-management" element={<StudentManagement />} />
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
            <Route path="/return-condition" element={<ReturnCondition />} />
            {/* reports */}
            <Route path="/user-report" element={<UserReport />} />
            <Route path="/student-report" element={<StudentReportTable />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
