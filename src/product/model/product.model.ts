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
  BelongsToMany,
} from 'sequelize-typescript';
import { CategoriesModel } from 'src/categories/model/categories.model';
import { UserModel } from 'src/users/model/users.model';
import { ProductCategoriesModel } from './products_categories.model';

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
  mix_categories: () => {
    return {
      include: {
        model: CategoriesModel,
        as: 'mix_categories',
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
  price: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image: string;

  @CreatedAt
  created_at?: Date;

  @UpdatedAt
  updated_at?: Date;

  @ForeignKey(() => UserModel)
  @Column({
    field: 'users_id',
  })
  users_id: string;

  @BelongsTo(() => UserModel)
  users: UserModel;


  @BelongsToMany(() => CategoriesModel, () => ProductCategoriesModel)
  mix_categories: CategoriesModel[];
}
