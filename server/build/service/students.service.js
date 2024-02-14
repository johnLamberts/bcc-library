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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentService = void 0;
var admin = __importStar(require("firebase-admin"));
var utils_1 = require("../helper/utils");
var getAllStudents = function () { return __awaiter(void 0, void 0, void 0, function () {
    var snapshot;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, admin.firestore().collection("students").get()];
            case 1:
                snapshot = _a.sent();
                return [2 /*return*/, snapshot.docs.map(function (docs) {
                        return __assign({ id: docs.id }, docs.data());
                    })];
        }
    });
}); };
var createStudent = function (student) { return __awaiter(void 0, void 0, void 0, function () {
    var studentNumberSnapshot, userRef, usersDoc;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, admin
                    .firestore()
                    .collection("students")
                    .where("studentNumber", "==", student.studentNumber)
                    .get()];
            case 1:
                studentNumberSnapshot = _a.sent();
                if (studentNumberSnapshot.size) {
                    throw new Error("Student Number were already existed.");
                }
                return [4 /*yield*/, admin.auth().createUser({
                        email: student.email,
                        emailVerified: false,
                        displayName: (0, utils_1.randomizeString)("".concat(student.firstName, " ").concat(student.middleName, " ").concat(student.lastName)),
                        password: student.password,
                        photoURL: student.studentImage,
                        disabled: false,
                    })];
            case 2:
                userRef = _a.sent();
                return [4 /*yield*/, admin
                        .firestore()
                        .collection("users")
                        .add({
                        firstName: student.firstName,
                        lastName: student.lastName,
                        middleName: student.middleName,
                        email: student.email,
                        password: student.password,
                        displayName: (0, utils_1.randomizeString)("".concat(student.firstName, " ").concat(student.middleName, " ").concat(student.lastName)),
                        avatarImage: student.studentImage,
                        userRole: "Student",
                        userUID: userRef.uid,
                        createdAt: admin.firestore.FieldValue.serverTimestamp(),
                        isArchived: false,
                        isEnabled: true,
                    })];
            case 3:
                usersDoc = _a.sent();
                return [4 /*yield*/, admin
                        .firestore()
                        .collection("students")
                        .add(__assign(__assign({}, student), { gradeSection: student.gradeSection || "", gradeLevel: student.gradeLevel || "", academicCourse: student.academicCourse || "", studentImage: student.studentImage, displayName: (0, utils_1.randomizeString)("".concat(student.firstName, " ").concat(student.middleName, " ").concat(student.lastName)), userUID: userRef.uid, userDocID: usersDoc.id, userRole: "Student", createdAt: admin.firestore.FieldValue.serverTimestamp(), isArchived: false, isEnabled: true }))];
            case 4: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var importStudents = function (students) { return __awaiter(void 0, void 0, void 0, function () {
    var defaultPassword, _i, students_1, student, studentNumberSnapshot, userRef, usersDoc;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                defaultPassword = "LMS2023";
                _i = 0, students_1 = students;
                _a.label = 1;
            case 1:
                if (!(_i < students_1.length)) return [3 /*break*/, 7];
                student = students_1[_i];
                if (student.password === "" || !student.password) {
                    student.password = defaultPassword;
                }
                return [4 /*yield*/, admin
                        .firestore()
                        .collection("students")
                        .where("studentNumber", "==", student.studentNumber)
                        .get()];
            case 2:
                studentNumberSnapshot = _a.sent();
                if (studentNumberSnapshot.size) {
                    throw new Error("Student Number were already existed.");
                }
                return [4 /*yield*/, admin.auth().createUser({
                        email: student.email,
                        emailVerified: false,
                        displayName: (0, utils_1.makeUserName)(7),
                        password: student.password,
                        photoURL: student.studentImage,
                        disabled: false,
                    })];
            case 3:
                userRef = _a.sent();
                return [4 /*yield*/, admin
                        .firestore()
                        .collection("users")
                        .add({
                        firstName: student.firstName,
                        lastName: student.lastName,
                        middleName: student.middleName,
                        email: student.email,
                        password: student.password,
                        displayName: (0, utils_1.makeUserName)(7),
                        avatarImage: student.studentImage,
                        userRole: "Student",
                        userUID: userRef.uid,
                        createdAt: admin.firestore.FieldValue.serverTimestamp(),
                        isArchived: false,
                        isEnabled: true,
                    })];
            case 4:
                usersDoc = _a.sent();
                return [4 /*yield*/, admin
                        .firestore()
                        .collection("students")
                        .add(__assign(__assign({}, student), { 
                        // studentEntry: Number(student.studentEntry),
                        studentImage: student.studentImage, userUID: userRef.uid, userDocID: usersDoc.id, createdAt: admin.firestore.FieldValue.serverTimestamp(), isArchived: false, isEnabled: true }))];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6:
                _i++;
                return [3 /*break*/, 1];
            case 7: return [2 /*return*/];
        }
    });
}); };
var updateStudent = function (_a) { return __awaiter(void 0, void 0, void 0, function () {
    var userDocID = _a.userDocID, userUID = _a.userUID, docId = _a.id, student = __rest(_a, ["userDocID", "userUID", "id"]);
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, admin
                    .firestore()
                    .doc("students/".concat(docId))
                    .update(__assign(__assign({}, student), { studentImage: student.studentImage, modifiedAt: admin.firestore.FieldValue.serverTimestamp(), isArchived: false }))];
            case 1:
                _b.sent();
                return [4 /*yield*/, admin.auth().updateUser(userUID, {
                        email: student.email,
                        emailVerified: false,
                        password: student.password,
                        photoURL: student.studentImage,
                        disabled: false,
                    })];
            case 2:
                _b.sent();
                return [4 /*yield*/, admin.firestore().doc("users/".concat(userDocID)).update({
                        firstName: student.firstName,
                        lastName: student.lastName,
                        middleName: student.middleName,
                        email: student.email,
                        password: student.password,
                        displayName: student.displayName,
                        avatarImage: student.studentImage,
                        userRole: "Student",
                        modifiedAt: admin.firestore.FieldValue.serverTimestamp(),
                        isArchived: false,
                    })];
            case 3: return [2 /*return*/, _b.sent()];
        }
    });
}); };
var updateStudentStatus = function (status, userUID, userId, studentId) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: 
            // console.log(users);
            return [4 /*yield*/, admin.auth().updateUser(userUID, {
                    disabled: status,
                })];
            case 1:
                // console.log(users);
                _a.sent();
                return [4 /*yield*/, admin.firestore().doc("users/".concat(userId)).update({
                        isEnabled: status,
                        modifiedAt: admin.firestore.FieldValue.serverTimestamp(),
                    })];
            case 2:
                _a.sent();
                return [4 /*yield*/, admin.firestore().doc("students/".concat(studentId)).update({
                        isEnabled: status,
                        modifiedAt: admin.firestore.FieldValue.serverTimestamp(),
                    })];
            case 3: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.StudentService = {
    createStudent: createStudent,
    getAllStudents: getAllStudents,
    updateStudent: updateStudent,
    importStudents: importStudents,
    updateStudentStatus: updateStudentStatus,
};
