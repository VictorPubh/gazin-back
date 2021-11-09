import { PrismaClient } from '.prisma/client';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PersonService } from './person.service';
import { HobbyService } from './hobby/hobby.service';
import { HobbyModule } from './hobby/hobby.module';

@Module({
  imports: [PrismaClient, HobbyModule],
  providers: [PrismaService, PersonService, HobbyService],
  exports: [PrismaService, PersonService],
})
export class PersonModule {}
