import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductModel } from './model/product.model';
import { AuthService } from 'src/auth/auth.service';
import { UserModel } from 'src/users/model/users.model';
import { InjectModel } from '@nestjs/sequelize';
import { Request, Response } from 'express';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(ProductModel) private productModel: typeof ProductModel,
    @InjectModel(UserModel) private userModel: typeof UserModel,
    private authService: AuthService,
  ) {}
  async create(req: Request, res: Response) {
    console.log('req', req.body);
    const findUser = await this.userModel.findOne({
      where: { email: req.body.email },
    });

    if (!findUser) {
      throw new ConflictException(`${req.body.email} not found`);
    } else {
      const enterProduct = new ProductModel();
      enterProduct.name = req.body.name;
      enterProduct.quantity = req.body.quantity;
      enterProduct.price = req.body.price;
      enterProduct.category = req.body.category;
      enterProduct.image = req.body.image;
      enterProduct.users_id = findUser.dataValues.id;
      const entryDone = await this.productModel.create(enterProduct.dataValues);
      return entryDone;
    }
  }

  async findAll(req: Request, res: Response) {
    const product = await this.productModel.findAll();
    return product;
  }

  async findOne(id: string) {
    const product = await this.productModel.findOne({ where: { id: id } });

    if (!product) {
      throw new NotFoundException(`User with id ${id} not found`);
    } else {
      return product;
    }
  }

  async update(id: string, body: any) {
    const UpdateProduct = await this.productModel.findOne({
      where: { id: id },
    });
    if (!UpdateProduct) {
      throw new NotFoundException(`User with id ${id} not found`);
    } else {
      UpdateProduct.name = body.name;
      UpdateProduct.price = body.price;
      UpdateProduct.quantity = body.quantity;
      UpdateProduct.image = body.image;
      UpdateProduct.category = body.category;

      await this.productModel.update(UpdateProduct.dataValues, {
        where: { id },
      });
      return UpdateProduct;
    }
  }

  async remove(id: string) {
    const productremove = await this.productModel.findOne({
      where: { id: id },
    });
    if (!productremove) {
      throw new NotFoundException(`User with id ${id} not found`);
    } else {
      const deleteproduct = await this.productModel.destroy({
        where: { id: id },
      });
      return productremove;
    }
  }
}
