import { HobbiesCategory, Prisma } from '.prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CategoryService extends PrismaService {
  async getCategories(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PersonWhereUniqueInput;
    where?: Prisma.PersonWhereInput;
    orderBy?: Prisma.PersonOrderByWithRelationInput;
  }): Promise<HobbiesCategory[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return await this.hobbiesCategory.findMany({
      skip: skip ? skip : undefined,
      take: take ? take : undefined,
      cursor,
      where,
      orderBy,
    });
  }

  async getCategory(
    categoryWhereUniqueInput: Prisma.HobbiesCategoryWhereUniqueInput,
  ): Promise<HobbiesCategory | null> {
    return this.hobby.findUnique({
      where: categoryWhereUniqueInput,
    });
  }

  async createCategory(
    data: Prisma.HobbiesCategoryCreateInput,
  ): Promise<HobbiesCategory> {
    try {
      return this.hobbiesCategory.create({
        data,
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async updateCategory(params: {
    where: Prisma.HobbiesCategoryWhereUniqueInput;
    data: Prisma.HobbyUpdateInput;
  }): Promise<HobbiesCategory> {
    const { where, data } = params;
    return this.hobbiesCategory.update({
      data,
      where,
    });
  }

  async deleteCategory(
    where: Prisma.HobbiesCategoryWhereUniqueInput,
  ): Promise<HobbiesCategory> {
    try {
      return await this.hobbiesCategory.delete({
        where,
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
