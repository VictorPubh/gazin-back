import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { PrismaService } from './prisma.service';

import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard'

import { PersonService } from './person/person.service';
import { PersonModule } from './person/person.module';

import { CompanyService } from './company/company.service';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [
    PrismaService,
    AuthModule,
    PersonModule,
    CompanyModule
  ],
  controllers: [AppController],
  providers: [
    PersonService,
    PrismaService,
    CompanyService,
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
  ],
  exports: [PrismaService]
})
export class AppModule {}
