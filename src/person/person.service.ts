import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Person, Prisma } from '@prisma/client';

import * as CryptoJS from 'crypto-js';
const moment = require('moment');

@Injectable()
export class PersonService extends PrismaService {
  // Encrypt
  encrypt(value: string): string {
    return CryptoJS.AES.encrypt(
      value,
      process.env.CRYPTO_SECRET_KEY,
    ).toString();
  }

  // Descrypt
  decrypt(value: string): string {
    return CryptoJS.AES.decrypt(value, process.env.CRYPTO_SECRET_KEY).toString(
      CryptoJS.enc.Utf8,
    );
  }

  // Calculate Age
  calculateAge(birthday: Date): number {
    const dateNow = moment();
    const dateBirtday = moment(birthday);
    return dateNow.diff(dateBirtday, 'years');
  }

  async getPerson(
    personWhereUniqueInput: Prisma.PersonWhereUniqueInput,
    full = false,
  ): Promise<Person | null> {
    const person = await this.person.findUnique({
      where: personWhereUniqueInput,
      include: {
        company: true,
        hobbies: true,
      },
    });

    const { birthday } = person;
    person.age = this.calculateAge(birthday);
    if (!full) person.password = undefined;

    return person;
  }

  async getPeoples(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PersonWhereUniqueInput;
    where?: Prisma.PersonWhereInput;
    orderBy?: Prisma.PersonOrderByWithRelationInput;
  }): Promise<Person[]> {
    const { skip, take, cursor, where, orderBy } = params;
    const result = await this.person.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        company: true,
        hobbies: true,
      },
    });

    result.map(async (person) => {
      person.password = undefined;
      person.companyId = undefined;
      person.age = this.calculateAge(person.birthday);
    });

    return result;
  }

  async createPerson(data: Prisma.PersonCreateInput): Promise<Person> {
    data.password = this.encrypt(data.password);
    data.age = this.calculateAge(new Date(data.birthday));

    const { ...person } = await this.person.create({
      data,
      include: {
        company: true,
        hobbies: true,
      },
    });

    person.age = this.calculateAge(person.birthday);
    return person;
  }

  async updatePerson(params: {
    where: Prisma.PersonWhereUniqueInput;
    data: Prisma.PersonUpdateInput;
  }): Promise<Person> {
    const { where, data } = params;
    const updatePerson = await this.person.update({
      data,
      where,
      include: {
        company: true,
        hobbies: true,
      },
    });

    updatePerson.age = this.calculateAge(updatePerson.birthday);
    return updatePerson;
  }

  async deletePerson(where: Prisma.PersonWhereUniqueInput): Promise<Person> {
    return this.person.delete({
      where,
    });
  }
}
