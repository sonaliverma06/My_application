import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuthService } from 'src/auth/auth.service';
import { CategoriesModel } from 'src/categories/model/categories.model';
import { SubcategoryModel } from './model/subcategory.model';
import { Request, Response } from 'express';

@Injectable()
export class SubcategoryService {
  constructor(
    @InjectModel(SubcategoryModel)
    private subcategoryModel: typeof SubcategoryModel,
    @InjectModel(CategoriesModel)
    private categoriestModel: typeof CategoriesModel,
    private authService: AuthService,
  ) {}
  async create(req: Request, res: Response) {
    const findvalueinfo = await this.subcategoryModel.findOne({
      where: { valueinfo: req.body.valueinfo },
    });

    if (findvalueinfo) {
      throw new ConflictException(`${req.body.valueinfo} already exists`);
    } else {
      const findName = await this.categoriestModel.findOne({
        where: { name: req.body.name },
      });

      if (!findName) {
        throw new NotFoundException(`${req.body.name} doesnot exists`);
      } else {
        const enterUser = new SubcategoryModel();
        enterUser.name = req.body.name;
        enterUser.description = req.body.description;
        enterUser.valueinfo = req.body.valueinfo;
        enterUser.categories_id = findName.dataValues.id;
        enterUser.image = req.body.image;

        const entryDone = await this.subcategoryModel.create(
          enterUser.dataValues,
        );
        return entryDone;
      }
    }
  }

  async findAll(req: Request, res: Response) {
    const users = await this.subcategoryModel.findAll();
    return users;
  }

  async findOne(id: string) {
    const user = await this.subcategoryModel.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    } else {
      return user;
    }
  }

  async update(id: string, body: any) {
    const finduser = await this.subcategoryModel.findOne({
      where: { id: id },
    });
    console.log('finduser', finduser);

    if (!finduser) {
      throw new NotFoundException(`Post with ID ${body} not found`);
    } else {
      finduser.name = body.name;
      finduser.description = body.description;
      finduser.valueinfo = body.valueinfo;
      finduser.image = body.image;
      await this.subcategoryModel.update(finduser.dataValues, {
        where: { id },
      });
      return finduser;
    }
  }

  async remove(id: string) {
    const userss = await this.subcategoryModel.findOne({ where: { id: id } });
    if (!userss) {
      throw new NotFoundException(`User with id ${id} not found`);
    } else {
      const deleteduser = await this.subcategoryModel.destroy({
        where: { id: id },
      });
      return userss;
    }
  }
}










