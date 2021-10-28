import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [
    PersonService,
    PrismaService,
  ],
  exports: [
    PersonService,
    PrismaService,
  ],
  imports: [
    PrismaService
  ]
})
export class PersonModule {}
