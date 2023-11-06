import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
  Scopes,
  HasMany,
} from 'sequelize-typescript';
import { UserRoleModel } from 'src/user-role/model/user-role.model';
import { Gender } from '../user.constants';
import { ProductModel } from 'src/product/model/product.model';

@Scopes({
  user_roles: () => {
    return {
      include: {
        model: UserRoleModel,
        as: 'user_roles',
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
      },
    };
  },
})
@Table({ modelName: 'users' })
export class UserModel extends Model<UserModel> {
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
  contact_number: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  state: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  city: string;

  @Column({
    type: DataType.ENUM,
    values: [Gender.FEMALE, Gender.MALE],
    allowNull: false,
  })
  gender: Gender;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @CreatedAt
  created_at?: Date;

  @UpdatedAt
  updated_at?: Date;

  @ForeignKey(() => UserRoleModel)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: 'user_role_id',
  })
  user_role_id: string;

  @HasMany(() => ProductModel)
  products: ProductModel[];

  @BelongsTo(() => UserRoleModel)
  user_roles: UserRoleModel;
}
