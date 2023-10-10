import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from 'src/users/model/users.model';
import { ProductModel } from './model/product.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [SequelizeModule.forFeature([UserModel, ProductModel]), AuthModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}

