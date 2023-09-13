import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './model/users.model';
import { UserRoleModel } from 'src/user-role/model/user-role.model';

@Module({
  imports: [SequelizeModule.forFeature([UserModel, UserRoleModel])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
