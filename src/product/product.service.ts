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
import { CategoriesModel } from 'src/categories/model/categories.model';
import { SubcategoryModel } from 'src/subcategory/model/subcategory.model';
import { ProductCategoriesModel } from './model/products_categories.model';
;
@Injectable()
export class ProductService {
  constructor(
    @InjectModel(ProductModel) private productModel: typeof ProductModel,
    @InjectModel(CategoriesModel)
    private categoriestModel: typeof CategoriesModel,
    @InjectModel(UserModel) private userModel: typeof UserModel,
    @InjectModel(SubcategoryModel)
    private subcategoryModel: typeof SubcategoryModel,
    private authService: AuthService,
    @InjectModel(ProductCategoriesModel)
    private productCategoriesModel: typeof ProductCategoriesModel,
  ) {}
  async create(req: Request, res: Response) {

    
    const findUser = await this.userModel.findOne({
      where: { email: req.body.email },
    });


    if (!findUser) {
      throw new ConflictException(`${req.body.email} not found`);
    } else {
      const enterProduct = new ProductModel();
      enterProduct.name = req.body.name;
      enterProduct.price = req.body.price;
      enterProduct.image = req.body.image;
      enterProduct.users_id = findUser.dataValues.id;
      const entryDone = await this.productModel.create(enterProduct.dataValues);
       return entryDone;
    }
  }

  async addProduct (req:Request,res:Response){
    const entrydone = await this.productCategoriesModel.create({
      products_id:req.body.product_id,
      categories_id:req.body.category_id
    })
    return entrydone
  }

  async findAll(req: Request, res: Response) {
    const product = await this.productModel
      .scope([
        // { method: ['categories'] },
        { method: ['users'] },
        { method: ['mix_categories'] },
      ])
      .findAll();
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
      UpdateProduct.image = body.image;

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
