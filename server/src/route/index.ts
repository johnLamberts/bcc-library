import express from "express";
import { UsersRoute } from "./users.route";
import { StudentsRoute } from "./students.route";
import { TeachersRoute } from "./teachers.route";

const router = express.Router();

const RouteModules = [
  {
    path: "/users",
    route: UsersRoute,
  },
  {
    path: "/students",
    route: StudentsRoute,
  },
  {
    path: "/teachers",
    route: TeachersRoute,
  },
];

RouteModules.forEach((route) => router.use(route.path, route.route));

export default router;
