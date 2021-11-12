import { Module } from '@nestjs/common';
import { HobbyService } from '../hobby.service';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  controllers: [CategoryController],
  imports: [CategoryService, HobbyService],
  providers: [CategoryService, HobbyService],
})
export class CategoryModule {}
