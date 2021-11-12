import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { PrismaService } from '../prisma.service';
import { CompanyController } from './company.controller';

@Module({
  providers: [PrismaService, CompanyService],
  exports: [PrismaService, CompanyService],
  controllers: [CompanyController],
})
export class CompanyModule {}
