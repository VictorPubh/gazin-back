import { PrismaClient } from '.prisma/client';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PersonService } from './person.service';

@Module({
  imports: [PrismaClient],
  providers: [PrismaService, PersonService],
  exports: [PrismaService, PersonService],
})
export class PersonModule {}
