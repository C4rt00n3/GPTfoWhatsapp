"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
class App {
    constructor() {
        this.limiter = (0, express_rate_limit_1.default)({
            windowMs: 15 * 60 * 1000, // 15 minutos
            max: 100, // número máximo de requisições por IP durante o intervalo de tempo
            message: "Você atingiu o limite de requisições. Por favor, tente novamente mais tarde.",
        });
        this.port = process.env.PORT;
        this.app = (0, express_1.default)();
    }
    App() {
        var queue = require("express-queue");
        this.app.use(this.limiter);
        this.app.use(queue({ activeLimit: 2, queuedLimit: 10 }));
    }
}
exports.default = App;
