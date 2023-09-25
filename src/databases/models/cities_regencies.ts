import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../../config/connections";

interface CitiesAttributes {
  id?: number | null;
  province_id?: number | null;
  name?: string | null;
  alt_name?: string | null;
  latitude?: number | null;
  longitude?: number | null;
}

export interface CitiesInput extends Optional<CitiesAttributes, "id"> {}
export interface CitiesOutput extends Required<CitiesAttributes> {}

export default class cities_regencies
  extends Model<CitiesAttributes, CitiesInput>
  implements CitiesAttributes
{
  public id!: number | null;
  public province_id!: number | null;
  public name!: string | null;
  public alt_name!: string | null;
  public latitude!: number | null;
  public longitude!: number | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

cities_regencies.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    province_id: {
      type: DataTypes.INTEGER,
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
