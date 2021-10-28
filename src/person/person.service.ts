import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  Person,
  Prisma
} from '@prisma/client';

// Crypto-JS
import * as CryptoJS from 'crypto-js';

var moment = require('moment');

@Injectable ()
export class PersonService {
  constructor(private prisma: PrismaService) {}

  // Encrypt
  encrypt(value: string): string {
    return CryptoJS.AES.encrypt(value, process.env.CRYPTO_SECRET_KEY).toString();
  }

  // Descrypt
  decrypt(value: string): string {
    return CryptoJS.AES.decrypt(value, process.env.CRYPTO_SECRET_KEY).toString(CryptoJS.enc.Utf8);
  }

  // Calculate Age
  calculateAge(birthday: Date): number {
    const dateNow = moment();
    const dateBirtday = moment(birthday);
    return dateNow.diff(dateBirtday, 'years');
  }

  async person(personWhereUniqueInput: Prisma.PersonWhereUniqueInput): Promise<Person | null> {
    const person = await this.prisma.person.findUnique({
      where: personWhereUniqueInput,
    });

    const { birthday } = person;
    person.age = this.calculateAge(birthday);
    person.password = undefined;

    return person;
  }

  async peoples(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PersonWhereUniqueInput;
    where?: Prisma.PersonWhereInput;
    orderBy?: Prisma.PersonOrderByWithRelationInput;
  }): Promise<Person[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.person.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createPerson(data: Prisma.PersonCreateInput): Promise<Person> {
    const { password } = data;
    const encryptPassword = this.encrypt(password);
    data.password = encryptPassword;

    return this.prisma.person.create({
      data,
    });
  }

  async updatePerson(params: {
    where: Prisma.PersonWhereUniqueInput;
    data: Prisma.PersonUpdateInput;
  }): Promise<Person> {
    const { where, data } = params;
    return this.prisma.person.update({
      data,
      where,
    });
  }

  async deletePerson(where: Prisma.PersonWhereUniqueInput): Promise<Person> {
    return this.prisma.person.delete({
      where,
    });
  }
}