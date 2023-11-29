import Server from "./app/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const server = new Server(prisma);
  server.init();
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
