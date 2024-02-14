"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var users_route_1 = require("./users.route");
var students_route_1 = require("./students.route");
var teachers_route_1 = require("./teachers.route");
var return_email_route_1 = require("./return-email.route");
var router = express_1.default.Router();
var RouteModules = [
    {
        path: "/users",
        route: users_route_1.UsersRoute,
    },
    {
        path: "/students",
        route: students_route_1.StudentsRoute,
    },
    {
        path: "/teachers",
        route: teachers_route_1.TeachersRoute,
    },
    {
        path: "/email",
        route: return_email_route_1.EmailReturnedRoute,
    },
];
RouteModules.forEach(function (route) { return router.use(route.path, route.route); });
exports.default = router;
