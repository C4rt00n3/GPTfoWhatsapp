"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("../repository");
const functions_1 = require("./functions");
const openIa_1 = __importDefault(require("./openIa"));
class ChatBoot {
    constructor(prisma) {
        this.chatGPT = new openIa_1.default();
        this.prisma = prisma;
    }
    calcularIdadeComDiaMes(yyyy, mm, dd) {
        const hoje = new Date();
        const aniversario = new Date(yyyy, mm - 1, dd);
        let idade = hoje.getFullYear() - aniversario.getFullYear();
        // Verifica se o aniversário já ocorreu neste ano
        if (hoje.getMonth() < aniversario.getMonth() ||
            (hoje.getMonth() === aniversario.getMonth() &&
                hoje.getDate() < aniversario.getDate())) {
            idade--;
        }
        return idade;
    }
    async chatBot(number, name, input, wamid) {
        if (input.includes("/dev")) {
            const text = `nome: Rafael Felipe, \nidade: ${this.calcularIdadeComDiaMes(2004, 1, 2)},\nlinkedin:https://www.linkedin.com/in/rafael-felipe-3724ab21a/ ,\ngithub: https://github.com/C4rt00n3,\ncurriculo: https://drive.google.com/drive/u/0/my-drive,`;
            (0, functions_1.sendMessage)(number, text, wamid);
        }
        else {
            const service = new repository_1.Service(this.prisma);
            const result = await service.findOrCreate(number, name);
            console.log(result.count_use);
            if (result.count_use < 11 || number == "557781032674") {
                if (input.includes("/imagine")) {
                    (0, functions_1.sendMessage)(number, "Criando imagen, aguarde...", wamid);
                    const res = await this.chatGPT.chat(`crie um titulo pequeno e breve para oque há nesse input: ${input}`);
                    const image = await this.chatGPT.imagine(input.replace(new RegExp("/imagine", "ig"), ""));
                    if (image.data[0].url) {
                        await (0, functions_1.sendImage)(number, image.data[0].url, `${res}`, wamid);
                    }
                }
                else {
                    result.count_use &&
                        result.count_use > 1 &&
                        (0, functions_1.sendMessage)(number, "gerando texto...");
                    const res = await this.chatGPT.chat(`O nome de quem está conversando com você é ${name}. Esse é o texto dele: ${input}`);
                    if (res) {
                        (0, functions_1.sendMessage)(number, res, wamid);
                    }
                }
            }
            else {
                (0, functions_1.sendMessage)(number, `Peço desculpas, ${name}, mas este projeto destina-se exclusivamente a fins de pesquisa e não é permitido mais de 10 usos diarios. Para qualquer dúvida ou esclarecimento, por favor, entre em contato conosco. Agradecemos sua compreensão.`);
            }
        }
    }
}
exports.default = ChatBoot;
