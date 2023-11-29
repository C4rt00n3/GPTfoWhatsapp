"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const body_parser_1 = __importDefault(require("body-parser"));
const app_1 = __importDefault(require("./app"));
const chatBot_1 = __importDefault(require("./robots/chatBot"));
class Server extends chatBot_1.default {
    constructor() {
        super(...arguments);
        this.appInit = new app_1.default();
    }
    routes() {
        this.appInit.app.use(body_parser_1.default.json());
        this.appInit.app.post("/hook", async (req, res) => {
            const { value } = req?.body?.entry[0]?.changes[0];
            if (value?.messages) {
                const { id, from: destination } = value?.messages[0];
                const message = value?.messages[0]?.text?.body;
                if (message) {
                    try {
                        await this.chatBot(destination, value?.contacts[0].profile.name, message, id);
                    }
                    catch (error) {
                        console.log(error);
                    }
                }
            }
            res.status(200).end();
        });
        this.appInit.app.get("/hook", (req, res) => {
            res.send(req.query["hub.challenge"]).status(200).end(); // Responding is important
        });
    }
    init() {
        this.routes();
        this.appInit.app.listen(this.appInit.port, () => console.log(`🚀 Server running on port ${this.appInit.port}`));
    }
}
exports.default = Server;
