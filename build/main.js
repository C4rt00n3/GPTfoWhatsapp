"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./app/server"));
const edge_1 = require("@prisma/client/edge");
const prisma = new edge_1.PrismaClient();
async function main() {
    const server = new server_1.default(prisma);
    server.init();
}
main()
    .catch((e) => {
    throw e;
})
    .finally(async () => {
    await prisma.$disconnect();
});
