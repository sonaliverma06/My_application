import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserModel } from './model/users.model';
import { InjectModel } from '@nestjs/sequelize';
import { Request, Response } from 'express';
import { UserRoleModel } from 'src/user-role/model/user-role.model';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel) private userModel: typeof UserModel,
    @InjectModel(UserRoleModel) private userRoleModel: typeof UserRoleModel,
    private authService: AuthService,
  ) {}
  async create(req: Request, res: Response) {
    const findemail = await this.userModel.findOne({
      where: { email: req.body.email },
    });

    if (findemail) {
      throw new ConflictException(`${req.body.email} already exists`);
    } else {
      const findRole = await this.userRoleModel.findOne({
        where: { role: req.body.user_role },
      });

      if (!findRole) {
        throw new NotFoundException(`${req.body.user_role} doesnot exists`);
      } else {
        const contactNumberPattern = /^\d{10}$/;

        if (!contactNumberPattern.test(req.body.contact_number)) {
          throw new BadRequestException(
            'Invalid contact number format. It should be a 10-digit number.',
          );
        }
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

  async findAll(req: Request, res: Response) {
    const users = await this.userModel.findAll();
    return users;
  }

  async findOne(id: string) {
    const user = await this.userModel.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    } else {
      return user;
    }
  }

  async update(id: string, body: any) {
    const finduser = await this.userModel.findOne({
      where: { id: id },
    });
    console.log('finduser', finduser);

    if (!finduser) {
      throw new NotFoundException(`Post with ID ${body} not found`);
    } else {
      finduser.first_name = body.first_name;
      finduser.last_name = body.last_name;
      finduser.email = body.email;
      finduser.contact_number = body.contact_number;
      finduser.zip_code = body.zip_code;
      finduser.state = body.state;
      finduser.city = body.city;
      finduser.password = body.password;
      finduser.gender = body.gender;
      finduser.address = body.address;
      await this.userModel.update(finduser.dataValues, { where: { id } });

      return finduser;
    }
  }

  async remove(id: string) {
    const userss = await this.userModel.findOne({ where: { id: id } });
    if (!userss) {
      throw new NotFoundException(`User with id ${id} not found`);
    } else {
      const deleteduser = await this.userModel.destroy({
        where: { id: id },
      });
      return userss;
    }
  }

  async registerUser(req: Request, res: Response) {
    const findemail = await this.userModel.findOne({
      where: { email: req.body.email },
    });

    if (findemail) {
      throw new ConflictException(`${req.body.email} already exists`);
    } else {
      const findRole = await this.userRoleModel.findOne({
        where: { role: req.body.user_role },
      });

      if (!findRole) {
        throw new NotFoundException(`${req.body.user_role} doesnot exists`);
      } else {
        const contactNumberPattern = /^\d{10}$/;

        if (!contactNumberPattern.test(req.body.contact_number)) {
          throw new BadRequestException(
            'Invalid contact number format. It should be a 10-digit number.',
          );
        }
        const newregister = new UserModel();
        newregister.first_name = req.body.first_name;
        newregister.last_name = req.body.last_name;
        newregister.email = req.body.email;
        newregister.contact_number = req.body.contact_number;
        newregister.zip_code = req.body.zip_code;
        newregister.state = req.body.state;
        newregister.city = req.body.city;
        newregister.password = req.body.password;
        newregister.user_role_id = findRole.dataValues.id;
        newregister.gender = req.body.gender;
        newregister.address = req.body.address;
        const entryDone = await this.userModel.create(newregister.dataValues);
        return entryDone;
      }
    }
  }

  async signIn(req: Request, res: Response) {
    const { email, password } = req.body;
    const findUser = await this.userModel.findOne({
      where: { email, password },
    });
    if (!findUser) {
      throw new NotFoundException('Invalid login');
    } else {
      
     const token = await this.authService.createAccessToken({
        email:findUser.dataValues.email,
        sub:findUser.dataValues.id
      })
       return{ user:findUser,token}       
     }
  }
}
