import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { HobbyService } from './hobby.service';
import { HobbyController } from './hobby.controller';
import { CategoryService } from './category/category.service';
import { CategoryModule } from './category/category.module';

@Module({
  providers: [PrismaService, HobbyService, CategoryService],
  exports: [PrismaService, HobbyService],
  controllers: [HobbyController],
  imports: [CategoryModule],
})
export class HobbyModule {}
