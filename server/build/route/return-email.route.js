"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailReturnedRoute = void 0;
var express_1 = __importDefault(require("express"));
var email_returned_controller_1 = require("../controller/users/email-returned.controller");
var router = express_1.default.Router();
router.post("/return-email", email_returned_controller_1.EmailReturnedController.createReturnEmail);
router.post("/return-overdue-email", email_returned_controller_1.EmailReturnedController.createReturnOVerdueEmail);
exports.EmailReturnedRoute = router;
