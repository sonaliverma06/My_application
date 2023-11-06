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
  BelongsToMany,
} from 'sequelize-typescript';
import { CategoriesModel } from 'src/categories/model/categories.model';
import { ProductModel } from './product.model';

@Scopes({
  categories: () => {
    return {
      include: {
        model: CategoriesModel,
        as: 'categories',
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
      },
    };
  },
  
  products: () => {
    return {
      include: {
        model: ProductModel,
        as: 'products',
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
      },
    };
  },
})
@Table({ modelName: 'products_categories' })
export class ProductCategoriesModel extends Model<ProductCategoriesModel> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
    unique: true,
    allowNull: false,
  })
  id: string;

  @CreatedAt
  created_at?: Date;

  @UpdatedAt
  updated_at?: Date;

  @ForeignKey(() => CategoriesModel)
  @Column({
    field: 'categories_id',
  })
  categories_id: string;

  @BelongsTo(() => CategoriesModel)
  categories: CategoriesModel;

  @ForeignKey(() => ProductModel)
  @Column({
    field: 'products_id',
  })
  products_id: string;

  @BelongsTo(() => ProductModel)
  products: ProductModel;

   
}
