// I will will loading here the LAZY LOADING

import { lazy } from "react";

const GradeLevel = lazy(() => import("../pages/SystemSettings/GradeLevel"));
const GradeSection = lazy(() => import("../pages/SystemSettings/GradeSection"));
const AcademicCourse = lazy(
  () => import("../pages/SystemSettings/AcademicCourse")
);

export { GradeLevel, GradeSection, AcademicCourse };
