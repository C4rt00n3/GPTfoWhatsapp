"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomInteger = exports.toTitleCase = exports.removeCommand = exports.sendDevContact = exports.sendImage = exports.sendMessage = void 0;
const axios_1 = __importDefault(require("axios"));
require("dotenv/config");
const axiosConfig = {
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.WA_TOKEN}`,
    },
};
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
exports.toTitleCase = toTitleCase;
const gprint = (number, message, wmaid) => {
    let text = "";
    for (let i = 0; i < 100; i++) {
        text += "=";
    }
    console.log(text);
    console.log(number, message, wmaid);
    console.log(text);
};
const sendMessage = async (number, message, wmaid) => {
    gprint(number, message, wmaid);
    const context = {
        message_id: wmaid,
    };
    const postData = {
        messaging_product: "whatsapp",
        to: number,
        type: "text",
        text: {
            body: message,
        },
    };
    // Adiciona o contexto se wmaid existir
    if (wmaid) {
        postData.context = context;
    }
    axios_1.default
        .post(`https://graph.facebook.com/v14.0/${process.env.WAID}/messages`, postData, axiosConfig)
        .then(function (response) {
        return response.data;
    })
        .catch(function (error) {
        console.log(error);
    });
};
exports.sendMessage = sendMessage;
const sendImage = async (number, link, caption, wmaid) => {
    axios_1.default
        .post(`https://graph.facebook.com/v14.0/${process.env.WAID}/messages`, {
        messaging_product: "whatsapp",
        context: {
            message_id: wmaid,
        },
        to: number,
        type: "image",
        image: {
            link: link,
            caption: caption,
        },
    }, axiosConfig)
        .then(function (response) {
        return response;
    })
        .catch(function (error) {
        console.log(error);
    });
};
exports.sendImage = sendImage;
const sendDevContact = async (number, wmaid) => {
    axios_1.default
        .post(`https://graph.facebook.com/v14.0/${process.env.WAID}/messages`, {
        messaging_product: "whatsapp",
        context: {
            message_id: wmaid,
        },
        to: number,
        type: "contacts",
        contacts: [
            {
                birthday: "2006-04-14",
                emails: [
                    {
                        email: "jeffersunde72@gmail.com",
                        type: "WORK",
                    },
                ],
                name: {
                    first_name: "Jeffer",
                    formatted_name: "Jeffer Marcelino",
                    last_name: "Sunde",
                },
                org: {
                    company: "CEG Microsystems",
                    department: "Tech",
                    title: "Developer",
                },
                phones: [
                    {
                        phone: "+258 84 399 7730",
                        type: "WORK",
                        wa_id: "258843997730",
                    },
                    {
                        phone: "+258 87 012 6103",
                        type: "HOME",
                    },
                ],
                urls: [
                    {
                        url: "https://github.com/JefferMarcelino",
                        type: "WORK",
                    },
                ],
            },
        ],
    }, axiosConfig)
        .then(function (response) {
        return response;
    })
        .catch(function (error) {
        console.log(error);
    });
};
exports.sendDevContact = sendDevContact;
const removeCommand = (command, text) => {
    const slipted = text.split(" ");
    let params = "";
    slipted.forEach((item) => {
        if (item.toLowerCase() !== command) {
            params += ` ${item}`;
        }
    });
    return params.trim();
};
exports.removeCommand = removeCommand;
const generateRandomInteger = (max) => {
    return Math.floor(Math.random() * max) + 1;
};
exports.generateRandomInteger = generateRandomInteger;
