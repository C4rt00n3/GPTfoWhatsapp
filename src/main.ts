import Server from "./app/server";
import { PrismaClient } from "@prisma/client";
// import Format from "./class/Format";
const prisma = new PrismaClient();

async function main() {
  const server = new Server(prisma);
  await server.init();

}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
