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
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomizeString = exports.makeUserName = exports.generateStudentNumber = exports.blobToFile = exports.imageToBlob = void 0;
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var constant_1 = require("../constant");
var buffer_1 = require("buffer");
function imageToBlob(filePath) {
    return new Promise(function (resolve, reject) {
        fs.readFile(filePath, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                var extension = path.extname(filePath).slice(1); // Get file extension
                var mimeTypes = {
                    png: "image/png",
                    jpg: "image/jpeg",
                    jpeg: "image/jpeg",
                    gif: "image/gif",
                };
                var blob = new Blob([data], {
                    type: mimeTypes[extension] || "application/octet-stream",
                });
                resolve(blob);
            }
        });
    });
}
exports.imageToBlob = imageToBlob;
function blobToFile(blob, fileName) {
    var file = new buffer_1.File([blob], fileName, { type: blob.type });
    return file;
}
exports.blobToFile = blobToFile;
function generateStudentNumber(numVal) {
    // const startValue = 0;
    var currentYear = new Date().getFullYear();
    var newNum = numVal.toString();
    for (var num = newNum.length; num < constant_1.MIN_SIZE_STUDENT_NUMBER; num++) {
        newNum = "0" + newNum;
    }
    var incrementNum = "B".concat(currentYear, "-").concat(newNum);
    return incrementNum;
}
exports.generateStudentNumber = generateStudentNumber;
function makeUserName(length) {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    var counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}
exports.makeUserName = makeUserName;
function randomizeString(inputString) {
    var _a;
    // Convert the string to an array of characters
    var characters = inputString.split("");
    // Shuffle the array of characters randomly
    for (var i = characters.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = [characters[j], characters[i]], characters[i] = _a[0], characters[j] = _a[1];
    }
    // Join the array back into a string
    var randomizedString = characters.join("");
    return randomizedString;
}
exports.randomizeString = randomizeString;
