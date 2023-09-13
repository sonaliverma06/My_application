import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserModel } from './model/users.model';
import { InjectModel } from '@nestjs/sequelize';
import { Request, Response } from 'express';
import { UserRoleModel } from 'src/user-role/model/user-role.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel) private userModel: typeof UserModel,
    @InjectModel(UserRoleModel) private userRoleModel: typeof UserRoleModel,
  ) {}
  async create(req: Request, res: Response) {
    const findRoleId = await this.userModel.findOne({
      where: { email: req.body.email },
    });
    console.log('user_role_id', findRoleId);
    if (findRoleId) {
      throw new ConflictException(`${req.body.email} already exists`);
    } else {
      const findRole = await this.userRoleModel.findOne({
        where: { role: req.body.user_role },
      });
      if (!findRole) {
        throw new NotFoundException(`${req.body.user_role} doesnot exists`);
      } else {
        const enterUser = new UserModel();
        enterUser.first_name = req.body.first_name;
        enterUser.last_name = req.body.last_name;
        enterUser.email = req.body.email;
        enterUser.contact_number = req.body.contact_number;
        enterUser.zip_code = req.body.zip_code;
        enterUser.state = req.body.state;
        enterUser.city = req.body.city;
        enterUser.password = req.body.password;
        enterUser.user_role_id = findRole.dataValues.id;
        enterUser.gender = req.body.gender;
        enterUser.address = req.body.address;
         const entryDone = await this.userModel.create(enterUser.dataValues);
        return entryDone;
      }
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
