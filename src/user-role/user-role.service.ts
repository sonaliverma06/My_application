import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { InjectModel } from '@nestjs/sequelize';
import { UserRoleModel } from './model/user-role.model';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectModel(UserRoleModel) private userRoleModel: typeof UserRoleModel,
  ) {}
  async create(req: Request, res: Response) {
    const findRole = await this.userRoleModel.findOne({
      where: { role: req.body.role },
    });
    if (findRole) {
      throw new ConflictException(`${req.body.role} already exists`);
    } else {
      const enterRole = new UserRoleModel();
      enterRole.name = req.body.name;
      enterRole.status = req.body.status;
      enterRole.role = req.body.role;
      const entryDone = await this.userRoleModel.create(enterRole.dataValues);
      return entryDone;
    }
  }

  async findAll(req: Request, res: Response) {
    const userRoles = await this.userRoleModel
      .scope([{ method: ['users'] }])
      .findAll();
    return userRoles;
  }

  async findOne(id: string) {
    const findRole = await this.userRoleModel.findOne({ where: { id: id } });
    console.log('id', id);

    if (!findRole) {
      throw new NotFoundException(`UserRole with id ${id} not found`);
    } else {
      return findRole;
    }
  }

  async update(id: string, body: any) {
    const findRole = await this.userRoleModel.findOne({
      where: { id: id },
    });
    console.log('findRole', findRole);

    if (!findRole) {
      throw new NotFoundException(`Post with ID ${body} not found`);
    } else {
      findRole.name = body.name;
      findRole.role = body.role;
      findRole.status = body.status;
      await this.userRoleModel.update(findRole.dataValues, { where: { id } });
       return findRole;
    }

  }

  async remove(id: string) {
    const findRole = await this.userRoleModel.findOne({ where: { id: id } });
    console.log('id', id);

    if (!findRole) {
      throw new NotFoundException(`UserRole with id ${id} not found`);
    } else {
      const deletedRole = await this.userRoleModel.destroy({
        where: { id: id },
      });
      return findRole;
    }
  }
}
