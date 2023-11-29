import { PrismaClient } from "@prisma/client";
export declare class PhoneNumber {
    number: string;
    name: string;
    date_now?: Date;
    count_use?: number | null;
    constructor(number: string, name: string, count_use?: number | null, date_now?: Date);
}
export declare class Service {
    prisma: PrismaClient;
    constructor(prisma: PrismaClient);
    findOrCreate(number: string, name: string): Promise<PhoneNumber>;
    updateCount(number: string, name: string, count: number): Promise<PhoneNumber>;
    isSameDay(date1: Date, date2: Date): boolean;
}
