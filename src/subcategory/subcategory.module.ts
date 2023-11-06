import { Module } from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';
import { SubcategoryController } from './subcategory.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { SubcategoryModel } from './model/subcategory.model';
import { CategoriesModel } from 'src/categories/model/categories.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [SequelizeModule.forFeature([SubcategoryModel, CategoriesModel]),AuthModule],
  controllers: [SubcategoryController],
  providers: [SubcategoryService],
})
export class SubcategoryModule {}


