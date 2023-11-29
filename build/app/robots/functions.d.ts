import "dotenv/config";
declare function toTitleCase(str: string): string;
declare const sendMessage: (number: string, message: string, wmaid?: string) => Promise<void>;
declare const sendImage: (number: string, link: string, caption: string, wmaid: string) => Promise<void>;
declare const sendDevContact: (number: string, wmaid: string) => Promise<void>;
declare const removeCommand: (command: string, text: string) => string;
declare const generateRandomInteger: (max: number) => number;
export { sendMessage, sendImage, sendDevContact, removeCommand, toTitleCase, generateRandomInteger, };
