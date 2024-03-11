export enum FIRESTORE_COLLECTION_QUERY_KEY {
  AUTHOR = "author",
  CATEGORY = "category",
  CATEGORY_SECTION = "category-section",
  CATALOGUE = "books-catalogue",
  ACTIVE_CATALOGUE = "active-books-catalogue",

  RETURNED_CONDITION = "return-condition",
  DAMAGE_CATEGORY = "damaged-category",
  MISSING_CATEGORY = "missing-category",

  BOOK_TYPE = "book-type",
  USER_ROLE = "user-role",
  GENRE = "genres",
  USERS = "users",

  // reports
  BOOKS_RETURN_CONDITION = "books-return-condition",
  BORROWERS_HISTORY_TRANSACTION = "borrowers-history",

  STUDENT = "students",
  STUDENT_ENTRY = "students-entry",

  TEACHER = "teachers",
  TEACHER_ENTRY = "teachers-entry",

  GRADE_LEVEL = "grade-level",
  GRADE_SECTION = "grade-section",
  LEVEL_OF_EDUCATION = "level-of-education",
  ACADEMIC_COURSE = "academic-course",

  //

  REQUEST_BOOK = "books-requested",
  RESERVED_BOOK = "books-reserved",
  BORROW_TRANSACTION = "books-borrowed",
  RETURNED_TRANSACTION = "books-returned",
  ALL_BOOKS_TRANSACTION = "books-transaction",

  BOOKS_OVERDUE = "books-overdue",

  AVAILABILITY_TRANSACTION = "availability",

  ACADEMIC_KEY = "academic-key",

  BOOK_DETAILS = "book-details",

  CURRENT_USER = "current-user",
  FORGET_PASSWORD = "forget-password",
  CURRENT_USER_PROFILE = "current-user-profile",
  CURRENT_USERS_HISTORY_TRANSACTION = "current-user-history-transaction",

  PARTIAL_PAYMENT = "partial-payment-transaction",
  COMPLETE_PAYMENT = "complete-payment",
  PAYMENT_TRANSACTION = "payment-transaction",

  //PAGES

  ADMIN_DASHBOARD = "admin-dashboard",
  ADMIN_TEACHER_DASHBOARD = "admin-student",
  ADMIN_STUDENT_DASHBOARD = "admin-teacher",
  ADMIN_WEEKLY_REPORTS = "admin-weekly-reports",

  //
  ACTIVITY_LOGS = "activity-logs-timeline",

  // ARCHIVE
  ARCHIVE_GENRE = "archive-genres",
  ARCHIVE_BOOK_TYPE = "archive-book-type",
  ARCHIVE_AUTHOR = "archive-authors",
  ARCHIVE_CATEGORY_SECTION = "archive-category-section",
  ARCHIVE_LEVEL_OF_EDUCATION = "archive-level-of-education",

  //
  BOOKS_CATALOGUE = "books",
  TRANSACTION_IF_EXIST = "books-borrowed-exist",
}
