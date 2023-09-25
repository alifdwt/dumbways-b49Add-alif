import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../../config/connections";

interface DistrictsAttributes {
  id?: number | null;
  regency_id?: number | null;
  name?: string | null;
  alt_name?: string | null;
  latitude?: number | null;
  longitude?: number | null;
}

export interface DistrictsInput extends Optional<DistrictsAttributes, "id"> {}
export interface DistrictsOutput extends Required<DistrictsAttributes> {}

export default class district
  extends Model<DistrictsAttributes, DistrictsInput>
  implements DistrictsAttributes
{
  public id!: number | null;
  public regency_id!: number | null;
  public name!: string | null;
  public alt_name!: string | null;
  public latitude!: number | null;
  public longitude!: number | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

district.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    regency_id: {
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
