"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const api_1 = __importDefault(require("./routes/api"));
const expressJSDocSwagger = require('express-jsdoc-swagger');
const express_1 = __importDefault(require("express"));
const db_1 = require("./config/db");
const swagger_1 = require("./config/swagger");
// Constants
const PORT = process.env.PORT || 3000;
// Connect to database
(0, db_1.connectDB)();
// App
const app = (0, express_1.default)();
// parse request bodies (req.body)
app.use(express_1.default.json());
// Serving static assets
app.use(express_1.default.static('public'));
// API Routes
app.get('/', (req, res) => {
    res.status(200).send({ message: 'Welcome to My Express App API.' });
});
app.use('/api/v1/', api_1.default);
// Error handler middleware 
app.use(((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
}));
// set swagger
expressJSDocSwagger(app)(swagger_1.swaggerOptions);
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
