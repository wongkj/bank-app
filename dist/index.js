"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const accountRoutes_1 = __importDefault(require("./src/routes/accountRoutes"));
dotenv_1.default.config();
mongoose_1.default.connect("mongodb://wongkj11:wongkj11@mongo:27017/?authSource=admin")
    .then(() => console.log("successfully connected to DB"))
    .catch((error) => console.log(`failed to connect to DB:\n\n${error}`));
const app = (0, express_1.default)();
const port = process.env.PORT;
app.get('/', (req, res) => {
    res.send('Bank TypeScript App is running');
});
app.use(express_1.default.json());
app.use("/api/v1/account", accountRoutes_1.default);
app.listen(port, () => {
    console.log(`[server]: Server is running at url address http://localhost:${port}`);
});
