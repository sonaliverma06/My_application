import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  Scopes,
  HasMany,
  BelongsToMany,
}from 'sequelize-typescript';
import { ProductModel } from 'src/product/model/product.model';
import { ProductCategoriesModel } from 'src/product/model/products_categories.model';
import { SubcategoryModel } from 'src/subcategory/model/subcategory.model';


@Scopes({
  subcategory: () => {
    return {
      include: {
        model: SubcategoryModel,
        as: 'sub_categories',
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
      },
    };
  },
  mix_products: () => {
    return {
      include: {
        model: ProductModel,
        as: 'mix_products',
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
      },
    };
  },
})
@Table({ modelName: 'categories' })
export class CategoriesModel extends Model<CategoriesModel> {
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
  image: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  valueinfo: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;
  @CreatedAt
  created_at?: Date;

  @UpdatedAt
  updated_at?: Date;

  @HasMany(() => SubcategoryModel)
  sub_categories: SubcategoryModel[];

  @BelongsToMany(() => ProductModel, () => ProductCategoriesModel)
  mix_products: ProductModel[];
}
