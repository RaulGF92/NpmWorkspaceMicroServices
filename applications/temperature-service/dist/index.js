"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const hello_i18n_1 = __importDefault(require("hello-i18n"));
const app = (0, express_1.default)();
const port = 3000;
app.get('/hi', (req, res) => {
    const userName = 'Raúl';
    res.json({ msg: hello_i18n_1.default.getHelloByLanguage() + userName });
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
