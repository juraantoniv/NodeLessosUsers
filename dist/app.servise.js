"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeFile = exports.readFile = void 0;
const node_path_1 = __importDefault(require("node:path"));
const promises_1 = __importDefault(require("node:fs/promises"));
const readFile = async () => {
    const pathFile = node_path_1.default.join(__dirname, `users.json`);
    const users = await promises_1.default.readFile(pathFile, 'utf8');
    return JSON.parse(users);
};
exports.readFile = readFile;
const writeFile = async (content) => {
    const pathFile = node_path_1.default.join(__dirname, `users.json`);
    await promises_1.default.writeFile(pathFile, JSON.stringify(content));
};
exports.writeFile = writeFile;
