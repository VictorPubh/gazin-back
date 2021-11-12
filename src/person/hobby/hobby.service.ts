import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

import { Hobby, Prisma } from '@prisma/client';

@Injectable()
export class HobbyService extends PrismaService {
  constructor() {
    super();
  }

  async getHobbies(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PersonWhereUniqueInput;
    where?: Prisma.PersonWhereInput;
    orderBy?: Prisma.PersonOrderByWithRelationInput;
  }): Promise<Hobby[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return await this.hobby.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async getHobby(
    hobbyWhereUniqueInput: Prisma.HobbyWhereUniqueInput,
  ): Promise<Hobby | null> {
    return this.hobby.findUnique({
      where: hobbyWhereUniqueInput,
    });
  }

  async createHobby(data: Prisma.HobbyCreateInput): Promise<Hobby> {
    return this.hobby.create({
      data,
    });
  }

  async updateHobby(params: {
    where: Prisma.HobbyWhereUniqueInput;
    data: Prisma.HobbyUpdateInput;
  }): Promise<Hobby> {
    const { where, data } = params;
    return this.hobby.update({
      data,
      where,
    });
  }

  async deleteHobby(where: Prisma.HobbyWhereUniqueInput): Promise<Hobby> {
    try {
      return this.hobby.delete({
        where,
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
