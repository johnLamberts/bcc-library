"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app_1 = require("firebase-admin/app");
var admin = __importStar(require("firebase-admin"));
var dotenv_1 = __importDefault(require("dotenv"));
var library_management_syste_fb3e9_firebase_adminsdk_jc43t_ffae87ba8d_json_1 = __importDefault(require("./config/library-management-syste-fb3e9-firebase-adminsdk-jc43t-ffae87ba8d.json"));
var body_parser_1 = __importDefault(require("body-parser"));
var route_1 = __importDefault(require("./route"));
var cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
var server = (0, express_1.default)();
server.use((0, cors_1.default)({
    origin: "*",
}));
(0, app_1.initializeApp)({
    credential: admin.credential.cert(library_management_syste_fb3e9_firebase_adminsdk_jc43t_ffae87ba8d_json_1.default),
    databaseURL: "https://library-management-syste-fb3e9.asia-southeast1.firebasedatabase.app",
});
server.use(express_1.default.json({ limit: "10kb" }));
server.use(body_parser_1.default.json());
server.use(express_1.default.urlencoded({ extended: true })); // Returns middleware that only parses urlencoded bodies
/** ROUTES */
server.use("/api/v1", route_1.default);
var PORT = process.env.PORT || 8800;
server.listen(PORT, function () {
    console.log("Server is running at ".concat(PORT));
});
