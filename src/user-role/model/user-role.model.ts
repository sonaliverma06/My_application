import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  HasMany,
  Scopes,
} from 'sequelize-typescript';
import { UserModel } from 'src/users/model/users.model';

@Scopes({
  users: () => {
    return {
      include: {
        model: UserModel,
        as: 'users',
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
      },
    };
  },
})
@Table({ modelName: 'user_roles' })
export class UserRoleModel extends Model<UserRoleModel> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
    unique: true,
    allowNull: false,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  role: string;

  @Column({
    type: DataType.BOOLEAN,
    // unique: true,
    allowNull: false,
  })
  status: boolean;

  @CreatedAt
  created_at?: Date;

  @UpdatedAt
  updated_at?: Date;

  @HasMany(() => UserModel)
  users: UserModel[];
}
