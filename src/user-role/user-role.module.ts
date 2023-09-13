import { Module } from '@nestjs/common';
import { UserRoleService } from './user-role.service';
import { UserRoleController } from './user-role.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserRoleModel } from './model/user-role.model';

@Module({
  imports: [SequelizeModule.forFeature([UserRoleModel])],
  controllers: [UserRoleController],
  providers: [UserRoleService],
})
export class UserRoleModule {}
