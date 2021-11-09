import { HobbiesCategory, Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
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
      skip,
      take,
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
    return this.hobbiesCategory.create({
      data,
    });
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
    return this.hobbiesCategory.delete({
      where,
    });
  }
}
