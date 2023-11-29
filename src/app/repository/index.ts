import { PrismaClient } from "@prisma/client";
import { sendMessage } from "../robots/functions";

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

      sendMessage(
        number,
        "Lista de comandos:\n 1) /imagine Ele criar uma imagem de acordo com  oque você escreve apos o comando. você só pode usar 3 vezes \n 2) /dev Recebe informações do meu desenvolvedor. \n 3) Seu texto ele irá lhe responder desde que seja menor que 200 caracteres"
      );

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
}
