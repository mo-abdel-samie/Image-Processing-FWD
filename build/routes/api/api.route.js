"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_controller_1 = require("../../controllers/api.controller");
const api = express_1.default.Router();
api.get('/update-image', api_controller_1.updateImage);
exports.default = api;
