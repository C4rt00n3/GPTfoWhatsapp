"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = __importDefault(require("openai"));
require("dotenv/config");
class ChatGPT {
    constructor() {
        this.open_api_key = process.env?.OPENAI_API_KEY;
        this.openai = new openai_1.default({
            apiKey: this.open_api_key ? this.open_api_key.toString() : "",
            // "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"
        });
    }
    async chat(msg) {
        try {
            const completion = await this.openai.chat.completions.create({
                messages: [{ role: "user", content: msg }],
                model: "gpt-3.5-turbo",
            });
            return completion.choices[0].message.content + "";
        }
        catch (error) {
            console.error("Erro ao fazer solicitação à API da OpenAI:", error);
            return "Erro ao fazer solicitação à API da OpenAI";
        }
    }
    async imagine(prompt) {
        try {
            const image = await this.openai.images.generate({
                prompt,
                model: "dall-e-2",
                n: 1,
                size: "1024x1024",
                quality: "standard",
            });
            return image;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
}
exports.default = ChatGPT;
