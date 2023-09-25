import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../../config/connections";

interface ProvinceAttributes {
  id?: number | null;
  name?: string | null;
  alt_name?: string | null;
  latitude?: number | null;
  longitude?: number | null;
}

export interface ProvinceInput extends Optional<ProvinceAttributes, "id"> {}
export interface ProvinceOutput extends Required<ProvinceAttributes> {}

export default class province
  extends Model<ProvinceAttributes, ProvinceInput>
  implements ProvinceAttributes
{
  public id!: number;
  public name!: string | null;
  public alt_name!: string | null;
  public latitude!: number | null;
  public longitude!: number | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

province.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    alt_name: {
      type: DataTypes.STRING,
    },
    latitude: {
      type: DataTypes.FLOAT,
    },
    longitude: {
      type: DataTypes.FLOAT,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
  }
);
