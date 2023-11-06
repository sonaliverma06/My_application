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
import { CategoriesModel } from 'src/categories/model/categories.model';


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
})
@Table({ modelName: 'subcategories' })
export class SubcategoryModel extends Model<SubcategoryModel> {
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

  @ForeignKey(() => CategoriesModel)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: 'categories_id',
  })
  categories_id: string;
  @BelongsTo(() => CategoriesModel)
  categories: CategoriesModel;
}
