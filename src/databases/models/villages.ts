import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../../config/connections";

interface VillagesAttributes {
  id?: number | null;
  district_id?: number | null;
  name?: string | null;
  latitude?: number | null;
  longitude?: number | null;
}

export interface VillagesInput extends Optional<VillagesAttributes, "id"> {}
export interface VillagesOutput extends Required<VillagesAttributes> {}

export default class village
  extends Model<VillagesAttributes, VillagesInput>
  implements VillagesAttributes
{
  public id!: number | null;
  public district_id!: number | null;
  public name!: string | null;
  public latitude!: number | null;
  public longitude!: number | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

village.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    district_id: {
      type: DataTypes.INTEGER,
    },
    name: {
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
