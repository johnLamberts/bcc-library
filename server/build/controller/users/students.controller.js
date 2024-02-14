"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentsController = void 0;
var students_service_1 = require("../../service/students.service");
var getAllStudents = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var students, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, students_service_1.StudentService.getAllStudents()];
            case 1:
                students = _a.sent();
                return [2 /*return*/, res.json({
                        data: students,
                        status: "Success",
                    })];
            case 2:
                err_1 = _a.sent();
                if (err_1 instanceof Error) {
                    res.status(500).json({
                        error: err_1.message,
                    });
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var createStudent = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newStudent, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log(req.body);
                return [4 /*yield*/, students_service_1.StudentService.createStudent(__assign({}, req.body))];
            case 1:
                newStudent = _a.sent();
                return [2 /*return*/, res.json({
                        data: newStudent,
                        status: "New Student has been successfully added.",
                    })];
            case 2:
                err_2 = _a.sent();
                if (err_2 instanceof Error) {
                    res.status(500).json({
                        error: err_2.message,
                    });
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var modifyStudent = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var studentId, updateStudent, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log(req.body);
                studentId = req.params.studentId;
                return [4 /*yield*/, students_service_1.StudentService.updateStudent(__assign({ userDocID: req.body.userDocID, userUID: req.body.userUID, id: studentId }, req.body))];
            case 1:
                updateStudent = _a.sent();
                return [2 /*return*/, res.json({
                        data: updateStudent,
                        status: "Updating Student has been successfully done.",
                    })];
            case 2:
                err_3 = _a.sent();
                if (err_3 instanceof Error) {
                    res.status(500).json({
                        error: err_3.message,
                    });
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var importStudents = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, students, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                data = req.body;
                return [4 /*yield*/, students_service_1.StudentService.importStudents(data)];
            case 1:
                students = _a.sent();
                res.send({
                    students: students,
                    status: "Authentication and Students Collection has been successfully migrated.",
                });
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                if (err_4 instanceof Error) {
                    res.status(500).json({
                        error: err_4.message,
                    });
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var updateStudentStatus = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var studentId, updateUser, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                studentId = req.params.studentId;
                return [4 /*yield*/, students_service_1.StudentService.updateStudentStatus(req.body.isEnabled, req.body.userUID, req.body.userDocID, studentId)];
            case 1:
                updateUser = _a.sent();
                return [2 /*return*/, res.json({
                        data: updateUser,
                        status: "Updating User's status has been successfully done.",
                    })];
            case 2:
                err_5 = _a.sent();
                if (err_5 instanceof Error) {
                    res.status(500).json({
                        error: err_5.message,
                    });
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.StudentsController = {
    createStudent: createStudent,
    getAllStudents: getAllStudents,
    modifyStudent: modifyStudent,
    importStudents: importStudents,
    updateStudentStatus: updateStudentStatus,
};
