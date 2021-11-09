import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [PrismaService, CompanyService],
  exports: [PrismaService, CompanyService],
})
export class CompanyModule {}
