"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = exports.PhoneNumber = void 0;
const functions_1 = require("../robots/functions");
class PhoneNumber {
    constructor(number, name, count_use, date_now) {
        this.number = number;
        this.date_now = date_now;
        this.count_use = count_use;
        this.name = name;
    }
}
exports.PhoneNumber = PhoneNumber;
class Service {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findOrCreate(number, name) {
        const phoneNumberObject = new PhoneNumber(number, name);
        const find = await this.prisma.numberPhone.findUnique({
            where: {
                number,
            },
        });
        console.log(find?.count_use);
        if (!find) {
            const phoneNumber = await this.prisma.numberPhone.create({
                data: {
                    name: phoneNumberObject.name,
                    number: phoneNumberObject.number,
                    date_now: new Date(),
                },
            });
            (0, functions_1.sendMessage)(number, "Lista de comandos:\n 1) /imagine | Ele criar uma imagen de acordo com  oque você escreve apos o comando. \n 2) /dev | Recebe informações do meu desenvolvedor.");
            return phoneNumber;
        }
        else {
            if (this.isSameDay(find.date_now, new Date())) {
                console.log("UUUUUUUUU");
                await this.updateCount(number, name, find.count_use + 1);
            }
            else {
                await this.updateCount(number, name, 0);
            }
        }
        return find;
    }
    async updateCount(number, name, count) {
        console.log(count);
        const data = {
            count_use: count,
            date_now: new Date(),
        };
        const phoneNumber = await this.prisma.numberPhone.update({
            data,
            where: {
                number,
                name,
            },
        });
        return phoneNumber;
    }
    isSameDay(date1, date2) {
        return (date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate());
    }
}
exports.Service = Service;
