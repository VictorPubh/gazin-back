import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Company, Prisma } from '@prisma/client';

@Injectable()
export class CompanyService {
  companies: Company[];

  constructor(private prisma: PrismaService) {}

  async getCompany(
    companyWhereUniqueInput: Prisma.CompanyWhereUniqueInput,
  ): Promise<Company | null> {
    const companies = await this.prisma.company.findUnique({
      where: companyWhereUniqueInput,
    });

    if (!companies) throw new NotFoundException();
    return companies;
  }

  async getCompanies(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CompanyWhereUniqueInput;
    where?: Prisma.CompanyWhereInput;
    orderBy?: Prisma.CompanyOrderByWithRelationInput;
  }): Promise<Company[]> {
    const { skip, take, cursor, where, orderBy } = params;

    return this.prisma.company.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createCompany(data: Prisma.CompanyCreateInput): Promise<Company> {
    return this.prisma.company.create({
      data,
    });
  }

  async updateCompany(params: {
    where: Prisma.CompanyWhereUniqueInput;
    data: Prisma.CompanyUpdateInput;
  }): Promise<Company> {
    try {
      const { where, data } = params;
      const company = this.prisma.company.update({
        data,
        where,
      });

      if (!company) throw new NotFoundException();
      return company;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async deleteCompany(where: Prisma.CompanyWhereUniqueInput): Promise<Company> {
    try {
      return await this.prisma.company.delete({
        where,
      });
    } catch (err) {
      throw new NotFoundException();
    }
  }
}
