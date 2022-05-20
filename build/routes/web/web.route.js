"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_controller_1 = require("../../controllers/index.controller");
const web = express_1.default.Router();
web.get('/', index_controller_1.home);
web.get('/thumbnail-img', index_controller_1.thumbnailImage);
web.get('/gallery', index_controller_1.gallery);
exports.default = web;
