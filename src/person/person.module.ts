import { PrismaClient } from '.prisma/client';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PersonService } from './person.service';
import { HobbyService } from './hobby/hobby.service';
import { HobbyModule } from './hobby/hobby.module';
import { PersonController } from './person.controller';
import { DeveloperController } from './developer.controller';
import { CompanyModule } from 'src/company/company.module';

@Module({
  imports: [PrismaClient, HobbyModule, CompanyModule],
  providers: [PrismaService, PersonService, HobbyService],
  exports: [PrismaService, PersonService],
  controllers: [PersonController, DeveloperController],
})
export class PersonModule {}
