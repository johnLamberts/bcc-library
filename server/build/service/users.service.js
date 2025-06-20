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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
var admin = __importStar(require("firebase-admin"));
var utils_1 = require("../helper/utils");
var getAllUsers = function () { return __awaiter(void 0, void 0, void 0, function () {
    var snapshot;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, admin.firestore().collection("users").get()];
            case 1:
                snapshot = _a.sent();
                return [2 /*return*/, snapshot.docs.map(function (docs) {
                        return __assign({ id: docs.id }, docs.data());
                    })];
        }
    });
}); };
var createUser = function (users) { return __awaiter(void 0, void 0, void 0, function () {
    var userRef;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, admin.auth().createUser({
                    email: users.email,
                    emailVerified: false,
                    password: users.password,
                    photoURL: users.avatarImage,
                    disabled: false,
                })];
            case 1:
                userRef = _a.sent();
                return [4 /*yield*/, admin
                        .firestore()
                        .collection("users")
                        .add(__assign(__assign({}, users), { avatarImage: users.avatarImage, userUID: userRef.uid, createdAt: admin.firestore.FieldValue.serverTimestamp(), isArchived: false, isEnabled: true }))];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var updateUser = function (users, userUID, userId) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: 
            // console.log(users);
            return [4 /*yield*/, admin.auth().updateUser(userUID, {
                    email: users.email,
                    emailVerified: false,
                    password: users.password,
                    photoURL: users.avatarImage || "",
                    disabled: false,
                })];
            case 1:
                // console.log(users);
                _a.sent();
                return [4 /*yield*/, admin
                        .firestore()
                        .doc("users/".concat(userId))
                        .update(__assign(__assign({}, users), { avatarImage: users.avatarImage, modifiedAt: admin.firestore.FieldValue.serverTimestamp() }))];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var importUsers = function (users) { return __awaiter(void 0, void 0, void 0, function () {
    var defaultPassword, _i, users_1, user, userRef;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                defaultPassword = "LMS2023";
                _i = 0, users_1 = users;
                _a.label = 1;
            case 1:
                if (!(_i < users_1.length)) return [3 /*break*/, 5];
                user = users_1[_i];
                if (user.password === "" || !user.password) {
                    user.password = defaultPassword;
                }
                return [4 /*yield*/, admin.auth().createUser({
                        email: user.email,
                        emailVerified: false,
                        displayName: (0, utils_1.makeUserName)(7),
                        password: user.password,
                        photoURL: user.avatarImage,
                        disabled: false,
                    })];
            case 2:
                userRef = _a.sent();
                return [4 /*yield*/, admin
                        .firestore()
                        .collection("users")
                        .add(__assign(__assign({}, user), { avatarImage: user.avatarImage, displayName: (0, utils_1.makeUserName)(7), userUID: userRef.uid, createdAt: admin.firestore.FieldValue.serverTimestamp(), isArchived: false, isEnabled: true }))];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 1];
            case 5: return [2 /*return*/];
        }
    });
}); };
var updateUserStatus = function (status, userUID, userId) { return __awaiter(void 0, void 0, void 0, function () {
    var getStudents, getTeachers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, admin
                    .firestore()
                    .collection("students")
                    .where("userUID", "==", userUID)
                    .get()];
            case 1:
                getStudents = _a.sent();
                return [4 /*yield*/, admin
                        .firestore()
                        .collection("teachers")
                        .where("userUID", "==", userUID)
                        .get()];
            case 2:
                getTeachers = _a.sent();
                return [4 /*yield*/, admin.auth().updateUser(userUID, {
                        disabled: status,
                    })];
            case 3:
                _a.sent();
                getStudents.docs.map(function (data) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, admin.firestore().doc("students/".concat(data.id)).update({
                                    isEnabled: status,
                                    modifiedAt: admin.firestore.FieldValue.serverTimestamp(),
                                })];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                }); });
                getTeachers.docs.map(function (data) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, admin.firestore().doc("teachers/".concat(data.id)).update({
                                    isEnabled: status,
                                    modifiedAt: admin.firestore.FieldValue.serverTimestamp(),
                                })];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                }); });
                return [4 /*yield*/, admin.firestore().doc("users/".concat(userId)).update({
                        isEnabled: status,
                        modifiedAt: admin.firestore.FieldValue.serverTimestamp(),
                    })];
            case 4: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.UserService = {
    getAllUsers: getAllUsers,
    createUser: createUser,
    importUsers: importUsers,
    updateUser: updateUser,
    updateUserStatus: updateUserStatus,
};
