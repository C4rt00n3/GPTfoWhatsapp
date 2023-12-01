import { PrismaClient } from "@prisma/client";
import { sendMessage } from "../robots/functions";
import Format from "../class/Format";
import readline from 'readline';
import TwitterX from "../class/TwitterX";

export class PhoneNumber {
  number: string;
  name: string;
  date_now?: Date;
  count_use?: number;
  image_count?: number;

  constructor(
    number: string,
    name: string,
    count_use?: number,
    date_now?: Date,
    image_count?: number
  ) {
    this.number = number;
    this.date_now = date_now;
    this.count_use = count_use;
    this.name = name;
    this.image_count = image_count;
  }
}

export class Service {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findOrCreate(number: string, name: string) {
    const phoneNumberObject = new PhoneNumber(number, name);
    const find = await this.prisma.phone?.findUnique({
      where: {
        number,
      },
    });

    if (!find) {
      const phoneNumber = await this.prisma.phone?.create({
        data: {
          name: phoneNumberObject.name,
          number: phoneNumberObject.number,
          date_now: new Date(),
        },
      });

      sendMessage(number, "Seu texto já está sendo gerado.");

      return phoneNumber;
    } else {
      if (this.isSameDay(find.date_now!, new Date())) {
        await this.updateCount(number, name, find.count_use! + 1);
      } else {
        await this.updateCount(number, name, 1);
      }
    }

    return find;
  }

  async upCountImage(numberP: string, name: string, count: number) {
    const data = {
      count_use: count,
      date_now: new Date(),
      image_count: count + 1,
    };

    const phoneNumber = await this.prisma.phone.update({
      data,
      where: {
        number: numberP,
        name,
      },
    });

    return phoneNumber;
  }

  async updateCount(number: string, name: string, count: number) {
    console.log(count);

    const data = {
      count_use: count,
      date_now: new Date(),
    };

    const phoneNumber = await this.prisma.phone.update({
      data,
      where: {
        number,
        name,
      },
    });

    return phoneNumber;
  }

  isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  public async findTwitter(name: string) {
    console.log("Total iten", await this.count())
    console.log(name)
    name = name.replace(/\s/g, "");
    name = name.replace("\n", "")

    return await this.prisma.$transaction(async (prisma) => {
      return await prisma.twitter.findMany({
        where: {
          ScreenName: {
            contains: name
          },
          OR: [{
            TwitterID: name
          }]
        }
      });

    }, { timeout: 1000 })
  }

  async count(): Promise<number> {
    return await this.prisma.twitter.count();;
  }

  public async initTwitter() {
    const count = await this.count()
    if (count == 0) {
      await this.createTwitter()
    }
  }
  private temp(int: number) {
    if (int > 3600000) {
      console.log(`\nTempo de execução: ${int / 3600000} horas`);
      return
    } else if (int > 60000) {
      console.log(`\nTempo de execução: ${int / 60000} minutos`);
      return
    } else if (int >= 1000) {
      console.log(`\nTempo de execução: ${int / 1000} minutos`);
      return
    } else {
      console.log(`\nTempo de execução: ${int} milisegundos`);
      return
    }
  }

  private async createTwitter() {
    try {
      const classFormat = await new Format().format();
      const start = performance.now();

      // Iniciar transação
      for (const [i, e] of classFormat.entries()) {
        await this.prisma.$transaction(async (prisma) => {
          await prisma.twitter.create({ data: e });
        }, { timeout: 1000 });

        const porcentagem = ((i + 1) / classFormat.length) * 100;
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(`Progresso: ${porcentagem.toFixed(2)}%`);
      }

      const end = performance.now();
      const tempoDecorrido = end - start;
      this.temp(tempoDecorrido)
    } catch (err) {
      console.log(err);
    } finally {
      // Certifique-se de fechar a conexão após a conclusão
      await this.prisma.$disconnect();
    }
  }
}
