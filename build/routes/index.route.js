"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_controller_1 = require("../controllers/index.controller");
const route = express_1.default.Router();
route.get('/', (req, res) => {
    res.send('Welcome at Home');
});
route.get('/open', index_controller_1.writeData);
exports.default = route;
