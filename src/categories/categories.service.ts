import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { CategoriesModel } from './model/categories.model';
import { InjectModel } from '@nestjs/sequelize';
import { Request, Response } from 'express';
@Injectable()
export class CategoriesService {
   
  constructor(
    @InjectModel(CategoriesModel)
    private categoriestModel: typeof CategoriesModel,
    
   
  ) {}

  async create(req: Request, res: Response) {
    console.log('req.bodybfgbdffgndmfgndmgn', req.body);
    
    const findCategories = await this.categoriestModel.findOne({
      where: { valueinfo: req.body.valueinfo },
    });

    if (findCategories !== null) {
      throw new ConflictException(`${req.body.valueinfo} not found`);
    } else {
      const enterCategories = new CategoriesModel();
      enterCategories.name = req.body.name;
      enterCategories.valueinfo = req.body.valueinfo;
      enterCategories.image = req.body.image;
      enterCategories.description = req.body.description;
      const entryDone = await this.categoriestModel.create(
      enterCategories.dataValues,
      );
      console.log('entryDone', entryDone);
      
      return entryDone;
    }
  }

  async findAll(req: Request, res: Response) {
    const categories = await this.categoriestModel
      .scope([{ method: ['mix_products'] }])
      .findAll();
    return categories;
  }

  async findOne(id: string) {
    const categories = await this.categoriestModel.findOne({
      where: { id: id },
    });
    if (!categories) {
      throw new NotFoundException(`User with id ${id} not found`);
    } else {
      return categories;
    }
  }

  async update(id: string, body: any) {
    const Updatecategories = await this.categoriestModel.findOne({
      where: { id: id },
    });
    if (!Updatecategories) {
      throw new NotFoundException(`User with id ${id} not found`);
    } else {
      Updatecategories.name = body.name;
      Updatecategories.description = body.description;
      Updatecategories.image = body.image;
      Updatecategories.valueinfo = body.valueinfo;
      await this.categoriestModel.update(Updatecategories.dataValues, {
        where: { id },
      });
      return Updatecategories;
    }
  }

  async remove(id: string) {
    const categoriesremove = await this.categoriestModel.findOne({
      where: { id: id },
    });
    if (!categoriesremove) {
      throw new NotFoundException(`User with id ${id} not found`);
    } else {
      const deletecategories = await this.categoriestModel.destroy({
        where: { id: id },
      });
      return categoriesremove;
    }
  }
}






