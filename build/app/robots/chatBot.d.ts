import { PrismaClient } from "@prisma/client";
declare class ChatBoot {
    private chatGPT;
    prisma: PrismaClient;
    constructor(prisma: PrismaClient);
    calcularIdadeComDiaMes(yyyy: number, mm: number, dd: number): number;
    chatBot(number: string, name: string, input: string, wamid: string): Promise<void>;
}
export default ChatBoot;
