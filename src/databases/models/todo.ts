import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../../config/connections";

interface TodoAttributes {
  id?: number;
  title?: string | null;
  isDone?: boolean | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TodoInput extends Optional<TodoAttributes, "id"> {}
export interface TodoOutput extends Required<TodoAttributes> {}

export default class Todo
  extends Model<TodoAttributes, TodoInput>
  implements TodoAttributes
{
  public id!: number;
  public title!: string | null;
  public isDone!: boolean | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Todo.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    isDone: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
  }
);
