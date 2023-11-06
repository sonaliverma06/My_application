import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from 'src/users/model/users.model';
import { ProductModel } from './model/product.model';
import { AuthModule } from 'src/auth/auth.module';
import { CategoriesModel } from 'src/categories/model/categories.model';
import { SubcategoryModel } from 'src/subcategory/model/subcategory.model';
import { ProductCategoriesModel } from './model/products_categories.model';

@Module({
  imports: [SequelizeModule.forFeature([UserModel, ProductModel,CategoriesModel,SubcategoryModel, ProductCategoriesModel]), AuthModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}

