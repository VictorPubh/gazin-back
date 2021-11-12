import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
      skip: skip ? skip : undefined,
      take: take ? take : undefined,
      cursor,
      where,
      orderBy,
    });
  }

  async getHobby(
    hobbyWhereUniqueInput: Prisma.HobbyWhereUniqueInput,
  ): Promise<Hobby | null> {
    try {
      const findHobby = this.hobby.findUnique({
        where: hobbyWhereUniqueInput,
      });

      if (findHobby) {
        return findHobby;
      } else {
        throw new NotFoundException();
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
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
    try {
      const { where, data } = params;
      return this.hobby.update({
        data,
        where,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
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
