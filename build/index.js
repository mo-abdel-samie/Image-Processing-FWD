"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const hbs_1 = __importDefault(require("hbs"));
const logging_middleware_1 = __importDefault(require("./middleware/logging.middleware"));
const web_route_1 = __importDefault(require("./routes/web/web.route"));
const api_route_1 = __importDefault(require("./routes/api/api.route"));
const app = (0, express_1.default)();
const port = process.env.Port || 3000;
const publicPath = path_1.default.join(__dirname, '../public');
const layoutPath = path_1.default.join(__dirname, '../views/layout');
app.set('view engine', 'hbs');
app.use(express_1.default.static(publicPath));
hbs_1.default.registerPartials(layoutPath);
app.use('/', logging_middleware_1.default, web_route_1.default);
app.use('/api', api_route_1.default);
app.use('/*', (req, res) => {
    res.status(404).render('pages/notFound');
});
app.listen(port, () => console.log(`App listening on port http://localhost:${port} !`));
exports.default = app;
