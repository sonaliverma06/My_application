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
@Table({ modelName: 'products' })
export class ProductModel extends Model<ProductModel> {
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
  quantity: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  price: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  category: string;

  @CreatedAt
  created_at?: Date;

  @UpdatedAt
  updated_at?: Date;

  @ForeignKey(() => UserModel)
  @Column({
    // type: DataType.UUID,
    // allowNull: false,
    field: 'users_id',
  })
  users_id: string;

  @BelongsTo(() => UserModel)
  users: UserModel;
}
